# Tamir Bakery: phase 1 plan

A web store for home made goods, aimed at the Israeli market. Hebrew first (RTL), English second.

- **Developer:** Yevgeny
- **Last updated:** 2026-11-25
- **Phase 1 goal:** quick and dirty. Get a working, legal-enough store live with the least moving parts. Polish comes later.
- **Launch date:** none fixed. Nothing is pushing us to release.

---

## 1. Decisions

### Scope (pages)

| Route | Purpose |
|---|---|
| `/` | Mostly information and a photo gallery |
| `/store` | The product catalogue |
| `/about` | The owner and the business |
| `/store/[slug]` | One product's page (shareable link, SEO, share image) |
| `/cart` | The cart and the order form |
| `/order/[id]` | The customer's order confirmation, reached only by its secret link ([ADR 0001](adr/0001-order-access-by-secret-link.md)) |
| `/policies` | Terms of sale, cancellation, delivery and privacy |
| `/accessibility` | The accessibility statement |
| `/admin` | Admin area for the owner to manage products, settings and orders |

Anything else a basic store needs is covered in [basic-layout-gaps.md](research/basic-layout-gaps.md#recommended-phase-1-route-list). Its route list was adopted on 2026-11-25 (table above), with FAQ and contact folded into `/` and `/about`. English mirrors every public route under `/en/`.

A clickable client preview of these pages (Hebrew, phone and desktop, including `/admin`) is in [docs/mockups/tamir-bakery-preview.html](mockups/tamir-bakery-preview.html). Open it in a browser; it is a single self-contained file.

The visual style (colours, Hebrew fonts, spacing, components and tone of voice) is defined in [DESIGN.md](DESIGN.md). [tamir-bakery-v2.html](mockups/tamir-bakery-v2.html) is a newer preview built from it from scratch. It adds a cart with form validation, an order-confirmation timeline, a dark theme switch and a style-guide page.

### Design direction

- **Decided 2026-11-21:** build from the [v2 mock](mockups/tamir-bakery-v2.html) and [DESIGN.md](DESIGN.md). A later mock made with impeccable in a different direction was discarded and is not in the repo.

### Name

- **Tamir Bakery (מאפיית תמיר)** is the name for now. A final name may come later and does not block work, so the name lives in one place (config or translation strings), never in images, metadata or URLs.

### Tech stack and hosting

- **Next.js** for both front end and back end.
- **Firebase** for hosting and database (Firestore). Product photos go in Firebase Storage.
- **Hosting account, for now:** Yevgeny's own Firebase project, on the Blaze plan (needed for Next.js on Firebase App Hosting; expected cost at this traffic is close to nothing).
- **At deploy:** move hosting to a new Firebase project paid for by the owner. See [Firebase migration](#4-firebase-migration-at-deploy).
- **Dev project (created 2026-11-20):** `tamir-bakery-dev` ("Tamir Bakery dev"), with a web app and a Firestore database in `me-west1` (Tel Aviv). Rules and indexes live in the repo (`firestore.rules`, `firestore.indexes.json`) and deploy with `npx firebase-tools deploy --only firestore`. Web config goes in `.env.local` (see `.env.example`). The project is on the Blaze plan;
- **App hosting (decided 2026-11-21): Firebase App Hosting, backend `tamir-bakery` in `europe-west4` (Netherlands).** Live at https://tamir-bakery--tamir-bakery-dev.europe-west4.hosted.app (noindexed).
  - **Why App Hosting:** it is Firebase's supported path for Next.js (server rendering, server actions, image optimisation, Next.js version support), runs on Cloud Run behind Cloud CDN, and reads Secret Manager secrets through `apphosting.yaml`. The older "Hosting with web frameworks" is still a preview, lags new Next.js releases, and Firebase points Next.js apps to App Hosting.
  - **Why not `me-west1`:** App Hosting doesn't offer Tel Aviv (its regions are us-central1, us-east4, us-east5, asia-east1, asia-southeast1 and europe-west4). Web frameworks could run in `me-west1`, but not on a supported path. `europe-west4` is the closest App Hosting region, and the EU counts as adequate for transfers from Israel ([privacy research](research/israeli-privacy-law.md#7-cross-border-transfer-and-firebase)), unlike the US regions. Stored data stays in Firestore in `me-west1`; only the web server runs in the EU, and cached pages are served from Google's CDN edge.
  - **Config:** `firebase.json` (`apphosting` block) and `apphosting.yaml` (scale to zero, at most 2 instances). Env values and `secret:` references go in `apphosting.yaml`; secret values go in Secret Manager (`npx firebase-tools apphosting:secrets:set`), never in the repo.
  - **Deploys:** `.github/workflows/deploy.yml` deploys every push to `main` after the CI checks pass, with `firebase deploy --only apphosting`. It signs in to Google Cloud keylessly with Workload Identity Federation, which trusts only this repo's `main` branch; there is no service account key anywhere. One-time setup is `scripts/setup-github-deploy.sh` (run in Cloud Shell), and the repo variables `GCP_WORKLOAD_IDENTITY_PROVIDER`, `GCP_DEPLOY_SERVICE_ACCOUNT` and `FIREBASE_PROJECT_ID` (identifiers, not secrets) point at the project. Moving to the owner's project means re-running the script there and changing those variables. A manual deploy from a signed-in PC is `npx firebase-tools deploy --only apphosting`.
  - **CI:** `.github/workflows/ci.yml` runs lint, type checks, Vitest (with axe), a Lighthouse speed budget, Playwright (with axe, phone and desktop, light and dark) and the Firestore rules tests on the emulator, on every pull request. See [Operations, security and launch readiness](#5-operations-security-and-launch-readiness).

### Payments

- **Cash**, **Bit** and **PayBox** straight to the owner, with **bank transfer** as a fallback. No payment gateway, no card processing in phase 1.
- **There is no Bit "pay link" with a preset amount for a personal account** ([Bit payment links](research/bit-payment-links.md)). In phase 1 the owner sends a Bit request for the exact amount to the customer's phone after confirming the order. The confirmation page shows the amount, the owner's Bit number and the order ref with copy buttons, as a fallback for customers who prefer to send the money themselves. No "pay now" button.
- **PayBox (personal account)** is an equal second option for customers who don't use Bit: free today, up to ₪50k a year received on Basic or ₪100k on Plus, ₪4,000 per payment. Like Bit, it has no link with a preset amount, so it works the same way ([Bit alternatives §2](research/israeli-payment-alternatives-to-bit.md#2-paybox-personal-account)).
- **Bank transfer** details appear only in the customer's own order confirmation, never on a public page. Useful for large or catering orders, since Bit limits the payer to ₪7,000 a day ([Bit alternatives §6](research/israeli-payment-alternatives-to-bit.md#6-bank-transfer-and-bank-request-to-pay)).
- **Not in phase 1:** Apple Pay and Google Pay can't receive money person to person in Israel (they only work inside a gateway), and PayPal costs 3.4% + ₪1.20 per payment ([Bit alternatives §3 and §5](research/israeli-payment-alternatives-to-bit.md#3-apple-pay-and-google-pay)).
- `/admin` shows a yearly total received per method, so the owner sees when Bit passes ₪25k (0.8% fee) or PayBox Basic nears ₪50k.
- Nothing confirms a Bit or PayBox payment automatically, so payment status is marked by hand in `/admin`, in the orders summary (see [Orders](#orders-and-notifications-to-the-owner)).
- Build payment behind one small seam (for example `createPaymentRequest(order)` returning either instructions or a URL), so a payment company can replace it later without touching the pages.
- **Later, once the business is registered and ordering goes live:** Grow payment links (API link with the exact amount, Bit or card, webhook marks the order paid, automatic receipt). About ₪85–95 a month plus VAT at ~30 orders a month. See [Bit payment links §2 and §6](research/bit-payment-links.md#2-bit-לעסקים-through-a-payment-company-yes). Grow links also take Apple Pay, Google Pay, PayBox and bank transfer. If Grow refuses an *עוסק פטור* or Grow Light lacks the API, ask **Cardcom** and **Hyp** for quotes; both have an API with an order ref and a server notification ([Bit alternatives §4](research/israeli-payment-alternatives-to-bit.md#4-payment-gateways-and-link-providers)). Every such gateway needs a registered business.

### Delivery and pickup

- Set by the owner/admin in `/admin`, **globally** (defaults) and **per item** (overrides).
- Exact fields (areas, fees, lead times, pickup slots) are defined when building `/admin`.

### Admins and login

- **Start:** a hardcoded list of admin accounts (the owner, the owner's wife and Yevgeny).
- **Later:** add and remove admins from the `/admin` page.
- **Firebase Authentication, only for `/admin`.** Customers never sign in. Enabled on `tamir-bakery-dev` on 2026-11-21 with two providers:
  - **Google sign-in** (main path). The OAuth consent screen is named "Tamir Bakery"; its support email is the developer's Gmail, set in the Firebase project, not in the repo.
  - **Email and password** as a fallback, for an admin who would rather not use a Google account.
- **Authorised domains:** projects created after April 2025 don't include `localhost` by default, so it is added by hand (Authentication > Settings > Authorised domains). Add the App Hosting URL and the business domain the same way when they exist. Leave `localhost` off the owner's live project.
- **The allowlist is a Firestore collection, `admins/{email}`**, keyed by the lower-cased email. A custom claim was the other option, but a claim needs a user ID, so an admin would have to sign in once before being added. With email keys the owner can add their wife before she has ever signed in.
  - **Seed:** a small script reads `ADMIN_EMAILS` (comma-separated, from `.env.local`, never committed) and writes one `admins` document per address. Run it once per Firebase project, including the owner's project at migration.
  - **Checking an admin:** the Next.js server verifies the Firebase ID token with the Admin SDK and reads `admins/{token.email}`. It also requires `email_verified`, so nobody can claim an admin's address through an unverified email/password account. Google accounts are always verified; an email/password admin must click the verification email first.
  - **Security rules** do the same check for anything the browser reads or writes directly (for example photo uploads to Storage): `request.auth.token.email_verified == true && exists(/databases/$(database)/documents/admins/$(request.auth.token.email.lower()))`. Rules stay locked down until those paths exist.
  - **Managing admins in `/admin` later** means adding and deleting `admins` documents, done only by an existing admin. Don't let an admin remove themselves or the last remaining admin.
  - Anyone can create an email/password account by default. That gives them nothing, since they aren't in `admins`, but sign-up can be turned off under Authentication > Settings > User actions if junk accounts appear.

### Content and language

- **Hebrew is the default language.** English is the only other language for now.
- We write our own copy now and replace it with professional copy later.

### Desktop and mobile

- **Every page must be fully usable on both desktop and mobile**, including `/admin`. The owner will likely manage products and orders from a phone.
- Design mobile first, then check each feature on a phone-sized and a desktop screen before calling it done.

### Accessibility

- **The site is fully accessible from the first commit,** whether or not the business turns out to be legally exempt (open question 6). Accessibility is built in from the start, not fixed up before launch.
- **Target:** Israeli standard SI 5568-1 at level AA (WCAG 2.0 AA with Israeli changes, such as section headings at AA), plus WCAG 2.2 AA where it adds something. Details in the [accessibility research](research/israeli-web-accessibility-law.md).
- **Applies to every page, `/admin` included,** in both Hebrew (RTL) and English: semantic HTML and landmarks, full keyboard use with visible focus, labelled form fields with clear errors, alt text for every product and gallery photo (the `/admin` photo upload requires it), colour contrast that passes in light and dark themes, a correct `lang`/`dir` on each page and on mixed-language text, and respect for reduced motion.
- **No overlay widgets** (accessibility toolbars or plugins). They don't make a site compliant.
- **Accessibility statement** at `/accessibility`, linked from the footer, using the Hebrew template in the research.
- **A feature is not done until it passes the accessibility tests below,** on phone and desktop sizes.

### Testing

**Functional and end-to-end tests exist from the first commit,** set up with the app skeleton, before any feature is built. Every feature ships with its tests, and a feature is not done until they pass. Accessibility checks are part of both layers.

**Functional tests** (Vitest + React Testing Library):

- Unit tests for logic: prices, cart totals, delivery and pickup rules (global defaults and per-item overrides), order cutoffs and closed dates, Hebrew/English text lookup.
- Component tests for each component's states (loading, empty, error, filled), in both languages.
- Integration tests against the Firebase Emulator Suite: Firestore and Storage security rules (only admins can write products, customers can't read other orders), server actions and API routes, and the email/WhatsApp notification interface with fake senders.
- Axe on rendered components (`vitest-axe`), including error and empty states.

**End-to-end tests** (Playwright, against the built app and the Firebase emulators, never a live project):

- The main user journeys: browse `/` and `/store`, switch language, view a product, place an order with cash and with Bit, and see the confirmation.
- The admin journeys: sign in as a listed admin, be blocked as a non-admin, add and edit a product with a photo and alt text, change delivery settings, mark an order as paid.
- Run at phone and desktop sizes.
- `@axe-core/playwright` scans every route in Hebrew and English, at phone and desktop sizes, in light and dark themes, tagged for WCAG 2.0/2.1/2.2 A and AA. Any violation fails the run. Key flows are also run by keyboard only.

**Also:**

- **Lint and types:** ESLint with `eslint-plugin-jsx-a11y` (included in Next.js's config) and `tsc` type checks, with errors failing the build.
- **CI:** lint, type checks, functional tests and end-to-end tests run on every pull request (GitHub Actions). Seed data for tests lives in the repo, alongside the seed/export script from [Firebase migration](#4-firebase-migration-at-deploy).
- **Manual accessibility pass before each release:** automated tools catch only part of the problems, so also check with a screen reader in Hebrew (NVDA on Windows, VoiceOver on iPhone), check zoom to 200%, and review alt text and headings by hand.

### Orders and notifications to the owner

Decided 2026-11-21 (open question 1):

- **Orders are saved in Firestore.** Customers order on the site without messaging first; that is the phase 1 success test.
- **The owner is told by email** for each new order. This is the only channel at launch.
- **`/admin` has an orders summary:** a list of orders with their status, where admins open an order and mark it confirmed, paid and done.
- **WhatsApp comes later, through Twilio,** added during the build. Twilio is a paid, per-message service, so it gets its own config and is switched on separately.
- Both channels sit behind one small notification interface, so adding Twilio is a new channel, not a rewrite.

### Domain and email

- **Email:** the developer's account Gmail is the contact and order email for now, until a business email exists. It is **not written into the repo** (the repo is public). The code reads it from environment variables: `CONTACT_EMAIL` (shown on the site) and `ORDER_EMAIL_TO` (where order emails go). Both go into `.env.example` empty, with the real value only in `.env.local` and the hosting config.
- **Domain:** none yet; it will be bought and added later. Nothing in the code hardcodes a domain or sender address; the site URL comes from `SITE_URL`.
- **Sending service: Resend.** Decided 2026-11-21 (open question 19). The free tier allows about 3,000 emails a month and 100 a day, far more than a home bakery needs.
  - **Until the domain exists,** emails go out from Resend's test sender, `onboarding@resend.dev`. The test sender only delivers to the email address of the Resend account owner, so `ORDER_EMAIL_TO` must be that address for now (the developer's Gmail). The owner does not get order emails directly until the domain is verified.
  - **Once the domain is bought,** verify it in Resend (DNS records), then send from an address on it and point `ORDER_EMAIL_TO` at the owner.
  - **Config is env only,** since the repo is public: `RESEND_API_KEY` (secret, server side only, never `NEXT_PUBLIC_`), `ORDER_EMAIL_FROM` (the sender address) and `ORDER_EMAIL_TO` (the recipient). They go into `.env.example` empty, with real values only in `.env.local` and the hosting config. Moving to the domain is then an env change, not a code change.
  - Resend is the email channel behind the notification interface in [Orders](#orders-and-notifications-to-the-owner); tests use a fake sender.

### SEO and marketing

From the [local SEO research](research/local-seo-and-marketing.md#10-prioritised-action-list). Everything here is free except the domain. The code part is small and goes in before launch.

**Code (before launch):**

- **Env vars in `apphosting.yaml`:** `SITE_URL`, `ALLOW_INDEXING` and `GOOGLE_SITE_VERIFICATION`. Root metadata sets `metadataBase: new URL(process.env.SITE_URL)`, so canonical, hreflang, Open Graph and sitemap URLs never hardcode a domain ([T1](research/local-seo-and-marketing.md#31-what-to-build)).
- **`noindex` unless `ALLOW_INDEXING=true`**, as a robots meta tag and/or `X-Robots-Tag` header. The skeleton hardcodes `noindex` today; switch it to the env flag. Never disallow the site in `robots.txt` as well, or Google can't see the `noindex` ([3.3](research/local-seo-and-marketing.md#33-before-the-domain-exists)).
- **`lang` and `dir` per language:** `he`/`rtl` at `/` (served by a rewrite, not a redirect) and `en`/`ltr` under `/en/`, with a visible language link. No `Accept-Language` redirect. The skeleton already has `lang="he" dir="rtl"` ([T2, T3](research/local-seo-and-marketing.md#31-what-to-build)).
- **Per-page Hebrew and English metadata:** a title template plus a `title` and `description` for every page, and `alternates.canonical` with `alternates.languages` (`he`, `en`, `x-default` pointing at Hebrew), built by one helper from the path ([T4, T5](research/local-seo-and-marketing.md#31-what-to-build)). Check that TypeScript accepts the `'x-default'` key.
- **`app/sitemap.ts`** (static pages plus Firestore products, with language alternates) and **`app/robots.ts`** (disallow `/admin`, point at the sitemap) ([T6, T7](research/local-seo-and-marketing.md#31-what-to-build)).
- **Open Graph image:** a default 1200×630 JPEG **under 600 KB** (WhatsApp's limit) with alt text, the product photo on product pages, and `og:locale` `he_IL`/`en_US`. Use real photos, not generated Hebrew text. Test by sending a link on WhatsApp and in Facebook's Sharing Debugger ([T8 to T10](research/local-seo-and-marketing.md#31-what-to-build)).
- **ASCII product slugs**, such as `/store/chocolate-birthday-cake` ([T11](research/local-seo-and-marketing.md#31-what-to-build)).
- **JSON-LD:** `Organization` in the layout; `Product` + `Offer` (`ILS`, price above zero) only on fixed-price items; nothing, or `Product` without an offer, on "from ₪X" custom cakes. Validate with the Rich Results Test ([3.2](research/local-seo-and-marketing.md#32-structured-data-json-ld)).
- **`wa.me` click-to-chat button** on each product, with a prefilled Hebrew message and the owner's number from settings ([§6](research/local-seo-and-marketing.md#6-social-and-messaging-channels)).
- **Marketing consent** (only if the site collects it): an unticked checkbox, with the consent text, time and channel stored, an unsubscribe flag, and an admin export of opted-in contacts only ([9.1](research/local-seo-and-marketing.md#91-anti-spam-law-communications-law-bezeq-and-broadcasts-30a-חוק-הספאם)).

**Once the domain exists:**

- Set `SITE_URL` to the domain and `ALLOW_INDEXING=true`. Keep `noindex` (or a 301 redirect) on any request whose host isn't the domain, since the `hosted.app` URL may keep serving.
- **Google Search Console:** add a Domain property (DNS record), submit `/sitemap.xml`, and check Page indexing. **Bing Webmaster Tools:** import from Search Console and submit the sitemap. About 30 minutes, mostly DNS wait ([§4](research/local-seo-and-marketing.md#4-google-search-console-and-bing-webmaster-tools-once-the-domain-exists)).
- Add a "leave a Google review" link (the owner's profile link, from settings) to the order confirmation page and the footer.

**Owner tasks (outside the code)** ([10.2](research/local-seo-and-marketing.md#102-owner-tasks)):

- **Google Business Profile, first and most important.** Set it up as a service-area business: real name only, category Bakery, home address hidden, up to 20 service areas, hours, phone and WhatsApp. Verification is probably a short video. Pickup-only with no delivery fits the rules less cleanly, so decide on local delivery first. Add the website once the domain exists.
- **WhatsApp Business app** (free) on the business number: profile, a catalogue of 5 to 10 items, quick replies, greeting and away messages, and order-status labels. It is the main sales channel. The paid WhatsApp API is not needed in phase 1.
- Instagram professional account and a Facebook page, with the site and `wa.me` link in the bio.
- 20 to 30 good photos of real products, which feed the site, the profile and Instagram.
- At launch: free listings (Bing Places, Apple Business, b144, Dapei Zahav) with the same name, phone and area everywhere.
- Ongoing: ask every customer for a review (no incentives), and send promotional messages only to customers who opted in, starting with "פרסומת" and with an opt-out.

### Technical decisions (2026-11-25)

From the technical grilling session. Terms in **bold** are defined in [CONTEXT.md](../CONTEXT.md). The business questions it raised are in [the grilling resume file](grilling/2026-11-25-grilling.md).

**Languages and text**

- **T2:** next-intl with `localePrefix: "as-needed"` for the public site (Hebrew at `/`, English at `/en/`). `/admin` is Hebrew only, outside the locale folder.
- **T3:** Hebrew text is required and English optional. A missing English field shows the Hebrew in its place, marked `lang="he" dir="rtl"`, and `/admin` shows a "missing English" badge.
- **T15:** fixed interface text lives in the repo (`he.json`, `en.json`). Owner-written text (home, about, FAQ, business details, product text, policies, accessibility statement) lives in Firestore and is edited in `/admin`.

**Catalogue**

- **T1:** real `/store/[slug]` product pages (closes open question 15).
- **T16:** a required **Slug** field in the admin form, prefilled from the English name, ASCII only, kept unique by claiming `slugs/{slug}`. Changing a published Product's Slug keeps the old one as a permanent redirect.
- **T17:** **Visibility** is draft, published or hidden. Only drafts can be deleted. A hidden Product's page returns 404 and leaves the sitemap.
- **T18:** admin-edited **Categories** (Hebrew and English name, sort order), one per Product. `/store` shows them as sections and filters with `/store?c=<category>`.
- **T8, T29:** the browser resizes photos to 2000 px and uploads them to Storage under a new file name (Storage rules check `admins`). A server action saves the path and alt text. The old file is deleted only after the Product saves. An admin action lists orphan files; no cleanup job.

**Ordering**

- **T4:** two identifiers. The random Firestore ID is the secret link to `/order/[id]` ([ADR 0001](adr/0001-order-access-by-secret-link.md)). The **Order ref** (`TB-` plus 6 characters with no look-alike letters) is for conversation and Bit/PayBox notes.
- **T5:** **Order status** (new → confirmed → ready → completed, or cancelled from new or confirmed) and **Payment status** (unpaid or paid, with method, time and who marked it) are separate. The server rejects any other move.
- **T6:** the **Cart** lives in `localStorage`. On submit the server re-reads Products and settings, recomputes prices and date rules with one shared zod schema, and copies name and price onto each **Order line**. Money is whole agorot.
- **T9:** `settings/store.orderingOpen`, edited in `/admin`, **on by default**. When off, the site is a **Portfolio**: no cart, a WhatsApp "ask about this" button per Product, and the order action refuses on the server. Whether it stays on before the business licence is a business question.
- **T12:** date rules are computed in `Asia/Jerusalem` by one tested module (including the summer-time switches). The pickup or delivery date is stored as `YYYY-MM-DD` plus a slot; the order time as a Firestore Timestamp.
- **T19:** Israeli mobile numbers only (05X), stored as `+9725…` via libphonenumber-js on the server. The browser does only a light format check.
- **T20:** one Firestore transaction checks **Ordering open** and the daily cap, bumps the rate-limit counters, claims `orderRefs/{ref}` (retrying on a clash) and writes the Order. The email goes after it commits.
- **T23:** an Order may use only a **Fulfilment method** that every Order line allows, and its **Lead time** is the longest of its lines'. One pure, tested function, used by the Cart and the server.
- **T24:** if a Product was hidden or repriced since it went into the Cart, the Order is not saved. The Cart shows what changed and asks the Customer to confirm again. Prices never change silently.

**Admin**

- **T7:** after sign-in the ID token is swapped for a Firebase session cookie (httpOnly, 5 days). One `requireAdmin()` helper checks it (with revocation and the `admins` lookup) on every `/admin` page and action. `/admin` is never cached.
- **T21:** the orders list is server-rendered, with a refresh button that also runs when the tab regains focus. No live listeners; `orders` stays closed to browser reads.
- **T27:** the new-order email uses React Email, in Hebrew and right to left, with a plain-text part: Order ref, Order lines, total, date, the Customer's name and phone, and a link to the Order in `/admin`. Subject `הזמנה חדשה TB-XXXX · ₪total`.

**Platform**

- **T10:** build one thin slice end to end first: seeded Products → `/store` → product page → Cart → Order saved → email → admin orders list. Admin product editing comes after (checklist below).
- **T11:** public pages are cached and tagged (`products`, `content`, `settings`). Each admin save revalidates its tag. Product pages are generated per Slug on first visit.
- **T13, T14:** the full light and dark theme from the start, **dark by default**, with a switch saved in a cookie and rendered on the server (see [DESIGN.md](DESIGN.md#2-colour)). Tests set the cookie.
- **T22:** a JSON seed in the repo (baked and pantry Products, two Categories, settings, one admin) with generated placeholder photos. One script loads it into the emulators and into the dev project.
- **T25:** logs and error reports carry only the Order ref and Firestore ID, never a name, phone or address. One logging helper enforces it, with a unit test.
- **T26:** HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and `frame-ancestors 'none'` on every route from `next.config.ts`. A Content Security Policy starts report-only with no nonce (a nonce would make every page dynamic); `/admin` can use a nonce-based CSP straight away.
- **T28:** no extra environments yet. Pull requests run CI against the emulators, and `main` deploys to the dev site. A staging project comes when the Owner's live project exists; live then deploys from a tag or a manual run.

### Out of scope for now

- Competitor analysis.

---

## 2. Open questions

1. **How does an order reach the owner?** Decided 2026-11-21: orders are saved in Firestore, the owner gets an email, `/admin` has an orders summary, and WhatsApp through Twilio is added later. See [Orders](#orders-and-notifications-to-the-owner). Still open within this: whether to follow the [storefront research](research/storefront-layouts.md#3-ordering-flow) hybrid of a cart for fixed items and an order-request form for custom cakes.
2. **Who marks an order as paid,** and when, given Bit has no automatic confirmation. It happens in the `/admin` orders summary; who does it is still open.
3. **Admin sign-in method:** decided 2026-11-21: Google sign-in, with email/password as a fallback. See [Admins and login](#admins-and-login).
4. **Is English a full mirror of the site or only key pages?** Decided 2026-11-25: every public route is mirrored under `/en/`; `/admin` is Hebrew only (T2). Whether the English policies are a full translation is still open question 14.
5. **Where photos come from** (owner's own, a photographer, or both) and who uploads them.
6. **Business status:** is the owner an עוסק פטור? This decides whether the accessibility rules legally apply (see [accessibility research](research/israeli-web-accessibility-law.md#4-exemptions-and-thresholds)), though we build to the standard either way (see [Accessibility](#accessibility)), and what business details go in the footer. The [licensing research](research/home-bakery-licences-and-permits.md#4-tax-registration) recommends opening an עוסק פטור file online now (2026 ceiling NIS 122,833).
7. **Card payments:** the storefront research says card should always be offered in Israel. Phase 1 deliberately skips it; revisit if customers ask. Cards, Apple Pay and Google Pay all come with the later Grow link at no extra fee ([Bit alternatives](research/israeli-payment-alternatives-to-bit.md)).
8. **Kashrut wording:** only say "כשר" with a Rabbinate certificate. Confirm whether the owner has one. Without one, the site may only describe its standards truthfully next to an explicit "no kashrut certificate" line, and the Rabbinate refuses certificates to businesses in private homes in principle (see [licensing research](research/home-bakery-licences-and-permits.md#6-kashrut-claims)).
9. **Who starts a Bit/PayBox payment:** the owner sends an in-app request, or the customer sends money with the order ref in the note. A private Bit or PayBox account has no shareable link with a preset amount; "bit לעסקים" links need a payment company. See [layout gaps §2](research/basic-layout-gaps.md#2-order-and-payment-path-cash-and-bitpaybox-only) and [Bit payment links](research/bit-payment-links.md).
10. **Private Bit for business use:** Bit's terms ask users to declare business use and cap receipts (₪25k/year free, then 0.8% from 1.5.26, ₪100k/year max). PayBox for business needs dealer status (ties to question 6). A personal PayBox account's terms summary says nothing on business use; check its full terms ([Bit alternatives §10](research/israeli-payment-alternatives-to-bit.md#10-open-questions)).
11. **When payment is due:** before confirmation, after it, or at pickup; and whether custom cakes need a deposit.
12. **Store closures:** on Shabbat and holidays, keep taking orders and only block those dates, or close the store? Closed dates entered by hand, or from a holiday calendar (Hebcal)? What is the order cutoff and how far ahead can people order?
13. **Home address in the footer:** consumer law asks for the business's name and address, which for a home bakery is the home. Full address, or pickup area only? Needs legal input.
14. **English policies:** full translation, or a summary pointing to the binding Hebrew text?
15. **Product pages:** decided 2026-11-25: separate `/store/[slug]` pages (T1).
16. **Firestore region:** decided: `me-west1` (Tel Aviv), per the [privacy research](research/israeli-privacy-law.md#7-cross-border-transfer-and-firebase). The dev project uses it; the owner's project must use it too, since the region can't be changed after the database is created.
17. **Who can see customer data:** keep it to the owner plus at most two others (the developer counts) so the lightest security level applies ([privacy research](research/israeli-privacy-law.md#1-tldr-what-this-bakery-store-must-do)).
18. **Where will the baking happen?** The [licensing research](research/home-bakery-licences-and-permits.md#8-recommended-path-from-zero) found no legal route for selling food made in an ordinary family kitchen. Options: a licensed rented or shared kitchen, or a separate self-contained unit at home licensed under item 4.2ג. Until then, the site should launch as a portfolio with no ordering.
19. **Which service sends the order emails?** Decided 2026-11-21: Resend, from its test sender until the domain exists, then from the verified domain. See [Domain and email](#domain-and-email).

---

## 3. Research to do

Each item gets its own file in `docs/research/` and is linked back here.

No research is open right now. Add new topics here as a table (topic, focus, status) when they come up.

### Done

- [Basic layout gaps](research/basic-layout-gaps.md): minimal phase 1 route list, order and confirmation path with cash/Bit (how Bit and PayBox requests really work), footer and global components, Next.js system pages, store open/closed and holiday states, `/admin` screens. Raised open questions 9 to 15.
- [Storefront layouts for a home bakery](research/storefront-layouts.md): page map, homepage order, ordering flow, trust signals, RTL/bilingual layout, Israeli legal items that affect layout.
- [Israeli web accessibility law](research/israeli-web-accessibility-law.md): who must comply (SI 5568-1 level AA, based on WCAG 2.0), the עוסק פטור / NIS 100k exemption, accessibility statement template. Recommendation: build to AA and publish a statement even if exempt.
- [Local SEO and marketing](research/local-seo-and-marketing.md): Google Business Profile as a service-area business (hide the home address), Next.js SEO setup for Hebrew + English (`SITE_URL` env var, noindex the temporary Firebase URL, hreflang, sitemap, Open Graph image, Product JSON-LD), free WhatsApp Business app and `wa.me` links instead of the paid API, free Israeli directories, review rules, and the anti-spam law ("פרסומת" + prior consent). Section 10 is a prioritised to-do list split into developer and owner tasks.
- [Israeli privacy law](research/israeli-privacy-law.md): Amendment 13 (no database registration or DPO needed at this size), the section 11 collection notice on every form, light 2017 security duties if at most three people can access the data, opt-in and "פרסומת" rules for marketing (spam law), Firestore region choice, no analytics cookies in phase 1, and a Hebrew privacy-policy template.
- [Bit payment links](research/bit-payment-links.md): a personal Bit account has no link that opens Bit with the owner's number and an amount, so phase 1 stays with owner-sent Bit requests and a manual "paid" toggle. A preset-amount Bit link with automatic confirmation needs a payment company; Grow fits best (API link + webhook + automatic receipt, about ₪85–95/month at small volume, needs a registered business). Bit's fee above ₪25k/year is now 0.8%.
- [Israeli payment alternatives to Bit](research/israeli-payment-alternatives-to-bit.md): PayBox personal (free, ₪50k/₪100k a year, no amount link) is a fair second option to Bit in phase 1, with bank transfer as a private fallback. Apple Pay and Google Pay only work inside a gateway; PayPal is too costly (3.4% + ₪1.20). Every gateway with an amount link and webhook needs a registered business: Grow first, Cardcom or Hyp as backups. Bit payer limit is ₪7,000 a day.
- [Home bakery licences and permits](research/home-bakery-licences-and-permits.md): municipal business licence (item 4.2ג, separate preparation area needed; no legal family-kitchen route found), Ministry of Health, *עוסק פטור* registration (2026 ceiling NIS 122,833), receipts for every Bit/cash payment, kashrut wording rules, seller details the site must show. Recommendation: register with the Tax Authority now, run the site with no ordering until the business licence is in hand.

---

## 4. Firebase migration at deploy

Development runs on Yevgeny's Firebase project. Before going live, move to a project the owner pays for. To keep that easy:

- Keep all Firebase config (project ID, keys, service accounts) in environment variables, never in code.
- Keep Firestore security rules, indexes and Storage rules in the repo, so they deploy to any project.
- Write a short seed/export script for products and settings, so data can be copied to the new project.
- At migration: create the owner's project on Blaze with the owner as billing owner and Yevgeny as a member; deploy rules and app; copy data and photos; point the domain at it; recreate admin accounts.
- Auth on the new project: enable Google sign-in and email/password (Firebase MCP `firebase_init` with the auth feature, then `firebase deploy --only auth`, or the console), add the live domain to the authorised domains, and run the admin seed script with the owner's `ADMIN_EMAILS`. The `auth` block that `firebase_init` writes into `firebase.json` holds the support email, so it is not committed; drop it from the diff before committing.

---

## 5. Operations, security and launch readiness

Added 2026-11-21. Phase 1 is quick and dirty, so each item here is the lightest version that still protects the owner. Most of it slots into checklist steps 2, 3, 6, 7, 8 and 10 below.

### Security rules tests

- **`npm run test:rules`** starts the Firestore emulator under a `demo-` project ID (so it can never touch a real project) and runs `tests/rules/*.test.ts` with `@firebase/rules-unit-testing`. The tests try every path as an anonymous visitor, a signed-in non-admin, an admin with an unverified email and a verified admin.
- **CI** runs it as its own job (`Security rules`) on every pull request and before every deploy.
- **Today the rules deny everything,** so every test expects a denial. When a path opens (public read of products, admin photo uploads), change its tests first, in the same pull request as the rule. Storage rules get the same treatment when `storage.rules` exists.
- **Locally** the emulator needs Java 21 or newer. The dev PC has Java 8, so either install Temurin 21 or let CI run it.

### App Check and order-form abuse

The order form is the only public write in phase 1, so it is the thing to protect. It is a Next.js server action that writes with the Admin SDK; the browser never writes to Firestore.

- **App Check on `tamir-bakery-dev`:** a score-based (invisible) reCAPTCHA key for the App Hosting URL and `localhost`, registered with App Check for the web app (done 2026-11-21). **Not enforced** on any Firebase product: the browser doesn't use Firestore directly, and the order action checks the token itself. Set up by `scripts/setup-project-protection.sh` in Cloud Shell (gcloud isn't on the dev PC). Its site key is `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` (a public identifier, set in `.env.local` and `apphosting.yaml`; the owner's project gets its own key). reCAPTCHA is free up to 10,000 assessments a month.
- **Rate-limit plan for the order form,** cheapest layer first. Build it with the ordering path (checklist step 6):
  1. **Honeypot and timing:** a hidden field that must stay empty, and reject a submit that comes less than 3 seconds after the form rendered. Free, and stops most simple bots.
  2. **App Check token:** the form gets a limited-use token (`getLimitedUseToken`) and sends it with the order; the action calls `getAppCheck().verifyToken(token, { consume: true })`, so a token can't be replayed. The check sits behind a small interface so tests and the emulator use a fake.
  3. **Firestore counters:** in the same transaction that saves the order, bump fixed-window counters in `rateLimits/{key}`: at most 5 orders per IP per hour and 3 per phone number per day. Keys are SHA-256 of the value plus a server-side salt (`RATE_LIMIT_SALT`, a secret), so no raw IP or phone is stored there. The client IP is the first entry of `X-Forwarded-For`. Each document has an `expiresAt` field with a Firestore TTL policy, so old counters delete themselves for free.
  4. **Daily circuit breaker:** above a daily total (placeholder 20 orders), the form shows "we're full today, message us on WhatsApp" and the owner gets one email. This caps cost and spam if everything else fails.
  5. **Validation:** a server-side schema check with size limits on every field, whatever the browser sent.
  - `maxInstances: 2` in `apphosting.yaml` already caps what a flood can cost. Cloud Armor needs a paid load balancer and isn't worth it at this size.
  - The limits live in the order rules settings (below), so the owner can loosen them without a deploy.

### Speed budget and images

- **Lighthouse CI** (`npm run test:speed`, config in `lighthouserc.json`) runs three times on the production build in CI, with phone emulation and throttling, and fails the build when the median run breaks a budget: performance score 0.9, accessibility score 1.0, LCP 2.5 s, CLS 0.1, total blocking time 200 ms, JavaScript 250 KB, fonts 120 KB and the whole first load 600 KB (transfer sizes). Reports are kept as a CI artifact for 7 days.
- **Today (2026-11-21, skeleton page):** performance 99 to 100, LCP about 0.8 s warm, 188 KB in total, 137 KB of it JavaScript. Raise a budget only on purpose, in its own commit that says why.
- **The budget covers `/` only for now.** Add each route to `lighthouserc.json` as it is built (`/store`, a product page, `/cart`).
- **`next/image` defaults in `next.config.ts`:** WebP only (AVIF encodes much slower on a 1-CPU instance and doubles the cache), widths up to 1920 px, qualities 60 and 75, a 31-day cache (photo uploads get a new file name each time, so nothing goes stale), a 10 MB cap on source photos, no redirects, and remote photos allowed only from this project's Storage bucket (read from `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`).
- **When using `<Image>`:** always pass `sizes` for anything not full width; mark only the one hero photo per page as the LCP image, with `preload` (Next.js 16 replaced `priority` with it) or `fetchPriority="high"`; every photo has real alt text. Resize uploads in `/admin` to at most 2000 px before they go to Storage.

### Backups

- **Dev (`tamir-bakery-dev`):** a weekly Firestore backup on Sunday (UTC), kept 4 weeks. Created 2026-11-21; `scripts/setup-project-protection.sh` makes the same schedule on any project and skips it if one exists. Dev data has little value, so weekly is enough.
- **Live (the owner's project):** run the same script with `BACKUP_RECURRENCE=daily` (kept 7 days), since orders are real there. Consider point-in-time recovery too (7 days of versions). Both cost storage per GiB, which at this size is cents a month.
- **Restoring** creates a new database from a backup (`gcloud firestore databases restore`); it does not overwrite the live one. Practise it once on dev before launch.
- **Photos** are not in Firestore backups. Keep the originals, and rely on Cloud Storage soft delete (on by default for new buckets, 7 days).

### Analytics

**Recommendation (2026-11-21): no analytics script before launch. At launch, Google Search Console plus Cloudflare Web Analytics, both free.**

- **Google Search Console** shows search queries, clicks and indexing with no script on the site at all. It comes with the domain (see SEO).
- **Cloudflare Web Analytics** for page views, referrers and Core Web Vitals: free, a single script tag, works without moving DNS or proxying through Cloudflare, uses no cookies or `localStorage`, and Cloudflare says it doesn't fingerprint visitors ([Cloudflare Web Analytics](https://www.cloudflare.com/web-analytics/)). No cookies means no cookie banner. The privacy policy should still say that anonymous page-view statistics are collected by Cloudflare. Add its hosts to the Content Security Policy when there is one.
- **The Google Business Profile** has its own insights (calls, direction requests, searches), also free.
- **Not chosen:** Google Analytics 4 and Firebase Analytics (cookies and device IDs, so consent is needed; see the [privacy research](research/israeli-privacy-law.md)), Plausible and Fathom (paid), and self-hosted Umami or GoatCounter (another server and database to run).

### Still to do, waiting on others or later

- **Legal pages, waiting on the owner's copy.** `/policies` (terms of sale, cancellation and refunds under the distance-selling rules, and the privacy policy) and `/accessibility` (the statement). Build the pages and the footer links early, with the templates from the research marked as drafts; publish the real text only when the owner has supplied or approved it with their business details (open questions 6, 13 and 14). Ordering doesn't go live before these exist.
- **Order rules as admin settings, with placeholder defaults.** One `settings/orderRules` document edited in `/admin`: lead time (placeholder 48 hours), daily cutoff (18:00 the day before), how far ahead people can order (30 days), closed weekdays (Saturday), closed dates, minimum order (₪0), daily order cap (20), and the rate limits above (5 per IP per hour, 3 per phone per day). Until the owner sets them, `/admin` marks each value as a placeholder. This settles open questions 11 and 12 without a deploy.
- **Production on the owner's Firebase** (see [migration](#4-firebase-migration-at-deploy)): on the new project also re-run `scripts/setup-github-deploy.sh`, run `scripts/setup-project-protection.sh` with the live domain in `DOMAINS` and `BACKUP_RECURRENCE=daily`, set a budget alert, and deploy the rules. Leave `localhost` out of the live reCAPTCHA key.
- **`/admin` content management.** Besides products and settings, admins edit the site's own content: home and about text, gallery photos (alt text required), FAQ, business details for the footer, the Bit, PayBox and WhatsApp numbers, and the Google review link. Hebrew and English fields side by side. Stored in Firestore `content/*` and `settings/*`; saving revalidates the cached pages.
- **Monitoring, with alerts when order emails fail.** An order is saved before the email is sent, so a failed email never loses an order. When Resend fails, the action retries once, marks the order `notification: failed`, and `/admin` shows a red banner on that order. The server also writes a structured log line (`ORDER_EMAIL_FAILED`); a log-based alert in Cloud Monitoring emails the developer. Add a free uptime check on the home page too. Check Cloud Monitoring's current alerting price before turning it on; one or two alert conditions should cost a dollar or two a month at most.
- **Later: error tracking.** Start with Google Cloud Error Reporting, which groups server exceptions from the App Hosting logs automatically at no extra cost. Add Sentry's free plan only if browser-side errors need tracking too.

---

## 6. Phase 1 checklist (rough order)

Reordered 2026-11-25 to build one thin slice end to end first (T10).

1. Next.js app skeleton with Hebrew RTL default and English, deployed to Yevgeny's Firebase, with functional, end-to-end and accessibility tests in CI. **Done** (PR #15).
2. **Thin slice:** next-intl routing, the light/dark theme and switch, the Firestore data model (Products, Categories, settings, Orders) with the JSON seed, `/store` and `/store/[slug]` from Firestore, the Cart, the order action (validation, App Check, rate limits, Order ref, transaction), `/order/[id]`, the new-order email through Resend, and a read-only `/admin` orders list behind sign-in. Each piece with its tests.
3. `/admin` order handling: confirm, mark paid, Order status changes, yearly totals per payment method.
4. `/admin` products, Categories, photos and delivery/pickup settings; `settings/store.orderingOpen` and the order rules.
5. `/` and `/about` with our own copy and gallery, edited in `/admin`.
6. Footer business details, `/policies` and the accessibility statement page.
7. WhatsApp notification through Twilio, behind the same notification interface.
8. SEO basics from [SEO and marketing](#seo-and-marketing): env-driven `noindex` and `metadataBase`, per-page Hebrew and English metadata with canonical and hreflang, `sitemap.ts`, `robots.ts`, the Open Graph image, Product JSON-LD and the `wa.me` buttons. Security headers (T26).
9. Manual accessibility pass (screen reader in Hebrew, keyboard, zoom) before going live.
10. Domain, business email and migration to the owner's Firebase. Then switch on indexing, add the site to Search Console and Bing, and submit the sitemap.
