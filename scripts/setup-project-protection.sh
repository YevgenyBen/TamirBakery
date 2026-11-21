#!/usr/bin/env bash
# One-time setup of App Check and scheduled Firestore backups (PLAN.md "Operations and security").
#
# Run it in Google Cloud Shell (it already has gcloud and is signed in as you):
#   https://shell.cloud.google.com/?show=terminal
# Re-running it is safe: it skips what already exists.
#
#   PROJECT_ID=tamir-bakery-dev bash scripts/setup-project-protection.sh
#
# It does three things:
#   1. Creates a reCAPTCHA (score-based, invisible) key for the site's domains.
#   2. Registers that key with Firebase App Check for the project's web app.
#      App Check is NOT enforced on any Firebase product; the order form's server
#      action checks the token itself. Enforcing comes later, on purpose.
#   3. Creates a Firestore backup schedule (weekly on the dev project, daily on live).
#
# Cost: reCAPTCHA is free up to 10,000 assessments a month. Backups are billed per
# GiB stored; at this data size that is a few cents a month at most.
#
# At the end it prints NEXT_PUBLIC_RECAPTCHA_SITE_KEY. It is a public identifier;
# put it in .env.local and in apphosting.yaml.
set -euo pipefail

PROJECT_ID="${PROJECT_ID:-tamir-bakery-dev}"
# Comma-separated hosts the key accepts. localhost is for dev on the dev project only.
DOMAINS="${DOMAINS:-tamir-bakery--${PROJECT_ID}.europe-west4.hosted.app,localhost}"
# weekly (dev) or daily (live project, where losing orders matters).
BACKUP_RECURRENCE="${BACKUP_RECURRENCE:-weekly}"
KEY_NAME="Tamir Bakery web (App Check)"

gcloud config set project "$PROJECT_ID" >/dev/null
TOKEN="$(gcloud auth print-access-token)"
api() { # api METHOD URL [json]
  local body=()
  [ $# -ge 3 ] && body=(-d "$3")
  curl -sS --fail-with-body -X "$1" "$2" \
    -H "Authorization: Bearer ${TOKEN}" -H "x-goog-user-project: ${PROJECT_ID}" \
    -H "Content-Type: application/json" "${body[@]}"
}

echo "Enabling APIs..."
gcloud services enable recaptchaenterprise.googleapis.com firebaseappcheck.googleapis.com firestore.googleapis.com

echo "Finding the web app..."
APP_ID="$(api GET "https://firebase.googleapis.com/v1beta1/projects/${PROJECT_ID}/webApps" |
  python3 -c 'import json,sys; apps=json.load(sys.stdin).get("apps",[]); print(apps[0]["appId"] if apps else "")')"
[ -n "$APP_ID" ] || { echo "No Firebase web app in ${PROJECT_ID}. Create one first."; exit 1; }
echo "  ${APP_ID}"

echo "reCAPTCHA key..."
SITE_KEY="$(gcloud recaptcha keys list --format=json |
  python3 -c "import json,sys; ks=[k for k in json.load(sys.stdin) if k.get('displayName')=='${KEY_NAME}']; print(ks[0]['name'].split('/')[-1] if ks else '')")"
if [ -z "$SITE_KEY" ]; then
  SITE_KEY="$(gcloud recaptcha keys create --web --display-name="$KEY_NAME" \
    --domains="$DOMAINS" --integration-type=score --format='value(name)')"
  SITE_KEY="${SITE_KEY##*/}"
  echo "  created ${SITE_KEY}"
else
  echo "  exists ${SITE_KEY} (domains unchanged; edit them in the console if needed)"
fi

echo "App Check (reCAPTCHA Enterprise provider, not enforced)..."
api PATCH "https://firebaseappcheck.googleapis.com/v1/projects/${PROJECT_ID}/apps/${APP_ID}/recaptchaEnterpriseConfig?updateMask=siteKey,tokenTtl" \
  "{\"siteKey\":\"${SITE_KEY}\",\"tokenTtl\":\"3600s\"}" >/dev/null
echo "  registered"

echo "Firestore backup schedule (${BACKUP_RECURRENCE})..."
if [ -n "$(gcloud firestore backups schedules list --database='(default)' --format='value(name)')" ]; then
  echo "  a schedule already exists; leaving it"
elif [ "$BACKUP_RECURRENCE" = daily ]; then
  gcloud firestore backups schedules create --database='(default)' --recurrence=daily --retention=7d >/dev/null
  echo "  daily, kept 7 days"
else
  gcloud firestore backups schedules create --database='(default)' --recurrence=weekly \
    --day-of-week=SUN --retention=4w >/dev/null
  echo "  weekly on Sunday (UTC), kept 4 weeks"
fi

echo
echo "Done. Add this to .env.local and apphosting.yaml:"
echo "NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${SITE_KEY}"
