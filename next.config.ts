import type { NextConfig } from "next";

// Product photos live in Firebase Storage (PLAN.md "Tech stack and hosting").
// The bucket comes from env so the app moves to the owner's project unchanged.
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  // next/image defaults (PLAN.md "Speed budget"). Image optimisation runs on the
  // App Hosting server (1 CPU, scale to zero), so keep the work per photo small.
  images: {
    // WebP only: AVIF is ~20% smaller but ~50% slower to encode and doubles the cache.
    formats: ["image/webp"],
    // Drop the 2048 and 3840 defaults; no page shows a photo wider than 1920px.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    // 75 is the default; 60 is for small thumbnails and gallery grids.
    qualities: [60, 75],
    // Uploads get a new file name each time, so an optimised photo never goes stale.
    minimumCacheTTL: 2_678_400, // 31 days
    // Admin uploads are capped well below this; protects the 512 MB instance.
    maximumResponseBody: 10_000_000,
    maximumRedirects: 0,
    remotePatterns: storageBucket
      ? [
          {
            protocol: "https",
            hostname: "firebasestorage.googleapis.com",
            port: "",
            // Download URLs carry ?alt=media&token=..., so the query can't be pinned.
            pathname: `/v0/b/${storageBucket}/o/**`,
          },
        ]
      : [],
  },
};

export default nextConfig;
