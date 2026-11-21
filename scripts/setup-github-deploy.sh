#!/usr/bin/env bash
# One-time setup so GitHub Actions can deploy to Firebase App Hosting without any key.
#
# Run it in Google Cloud Shell (it already has gcloud and is signed in as you):
#   https://shell.cloud.google.com/?show=terminal
# Re-running it is safe.
#
# It creates:
#   - a service account that can only deploy App Hosting rollouts
#   - a Workload Identity pool + provider that trusts GitHub's OIDC tokens,
#     restricted to this repository's main branch
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-tamir-bakery-dev}"
REPO="${REPO:-YevgenyBen/TamirBakery}"
REGION="${REGION:-europe-west4}"
POOL="github"
PROVIDER="tamir-bakery-repo"
SA_NAME="github-deploy"

PROJECT_NUMBER="$(gcloud projects describe "$PROJECT_ID" --format='value(projectNumber)')"
SA_EMAIL="${SA_NAME}@${PROJECT_ID}.iam.gserviceaccount.com"
COMPUTE_SA="firebase-app-hosting-compute@${PROJECT_ID}.iam.gserviceaccount.com"
SOURCE_BUCKET="firebaseapphosting-sources-${PROJECT_NUMBER}-${REGION}"
POOL_ID="projects/${PROJECT_NUMBER}/locations/global/workloadIdentityPools/${POOL}"

gcloud config set project "$PROJECT_ID" >/dev/null

echo "Enabling APIs..."
gcloud services enable iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com

echo "Service account..."
gcloud iam service-accounts describe "$SA_EMAIL" >/dev/null 2>&1 ||
  gcloud iam service-accounts create "$SA_NAME" --display-name="GitHub Actions deploy (App Hosting)"

echo "Project roles..."
for role in roles/firebaseapphosting.admin roles/serviceusage.serviceUsageConsumer roles/storage.bucketViewer roles/browser; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:${SA_EMAIL}" --role="$role" --condition=None >/dev/null
done

echo "Upload access to the App Hosting source bucket only..."
gcloud storage buckets add-iam-policy-binding "gs://${SOURCE_BUCKET}" \
  --member="serviceAccount:${SA_EMAIL}" --role=roles/storage.objectAdmin >/dev/null

echo "Permission to start rollouts that run as the App Hosting compute account..."
gcloud iam service-accounts add-iam-policy-binding "$COMPUTE_SA" \
  --member="serviceAccount:${SA_EMAIL}" --role=roles/iam.serviceAccountUser >/dev/null

echo "Workload Identity pool and GitHub provider..."
gcloud iam workload-identity-pools describe "$POOL" --location=global >/dev/null 2>&1 ||
  gcloud iam workload-identity-pools create "$POOL" --location=global --display-name="GitHub Actions"

CONDITION="assertion.repository == '${REPO}' && assertion.ref == 'refs/heads/main'"
if gcloud iam workload-identity-pools providers describe "$PROVIDER" \
  --location=global --workload-identity-pool="$POOL" >/dev/null 2>&1; then
  gcloud iam workload-identity-pools providers update-oidc "$PROVIDER" \
    --location=global --workload-identity-pool="$POOL" --attribute-condition="$CONDITION"
else
  gcloud iam workload-identity-pools providers create-oidc "$PROVIDER" \
    --location=global --workload-identity-pool="$POOL" \
    --display-name="TamirBakery main branch" \
    --issuer-uri="https://token.actions.githubusercontent.com" \
    --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
    --attribute-condition="$CONDITION"
fi

echo "Let the repository impersonate the deploy account..."
gcloud iam service-accounts add-iam-policy-binding "$SA_EMAIL" \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/${POOL_ID}/attribute.repository/${REPO}" >/dev/null

cat <<OUT

Done. These GitHub repository variables (not secrets) must match:
  GCP_WORKLOAD_IDENTITY_PROVIDER = ${POOL_ID}/providers/${PROVIDER}
  GCP_DEPLOY_SERVICE_ACCOUNT     = ${SA_EMAIL}
  FIREBASE_PROJECT_ID            = ${PROJECT_ID}
OUT
