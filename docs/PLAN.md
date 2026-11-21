# Tamir Bakery: phase 1 plan

A web store for a home bakery, aimed at the Israeli market. Hebrew first (RTL), English second.

- **Developer:** Yevgeny
- **Last updated:** 2026-11-21
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
| `/admin` | Admin area for the owner to manage products, settings and orders |

Anything else a basic store needs is covered in [basic-layout-gaps.md](research/basic-layout-gaps.md#recommended-phase-1-route-list). It recommends adding `/store/[slug]`, `/cart`, `/order/[id]`, `/policies` and `/accessibility`, and folding FAQ and contact into `/` and `/about`. Not adopted yet; see open questions 9 to 15.

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

- **Start:** a hardcoded list of admin accounts.
- **Later:** add and remove admins from the `/admin` page.
- Auth provider is not decided yet (Firebase Auth is the natural fit).

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

### Out of scope for now

- Competitor analysis.

---

## 2. Open questions

1. **How does an order reach the owner?** Decided 2026-11-21: orders are saved in Firestore, the owner gets an email, `/admin` has an orders summary, and WhatsApp through Twilio is added later. See [Orders](#orders-and-notifications-to-the-owner). Still open within this: whether to follow the [storefront research](research/storefront-layouts.md#3-ordering-flow) hybrid of a cart for fixed items and an order-request form for custom cakes.
2. **Who marks an order as paid,** and when, given Bit has no automatic confirmation. It happens in the `/admin` orders summary; who does it is still open.
3. **Admin sign-in method:** Google sign-in only, or email/password too.
4. **Is English a full mirror of the site or only key pages?** The storefront research assumes a full `/en/` mirror.
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
15. **Product pages:** separate `/store/[slug]` pages (shareable links), or cards that expand in place?
16. **Firestore region:** it can't be changed after the database is created. The [privacy research](research/israeli-privacy-law.md#7-cross-border-transfer-and-firebase) suggests `me-west1` (Tel Aviv) or an EU region. Decide before creating the owner's project.
17. **Who can see customer data:** keep it to the owner plus at most two others (the developer counts) so the lightest security level applies ([privacy research](research/israeli-privacy-law.md#1-tldr-what-this-bakery-store-must-do)).
18. **Where will the baking happen?** The [licensing research](research/home-bakery-licences-and-permits.md#8-recommended-path-from-zero) found no legal route for selling food made in an ordinary family kitchen. Options: a licensed rented or shared kitchen, or a separate self-contained unit at home licensed under item 4.2ג. Until then, the site should launch as a portfolio with no ordering.
19. **Which service sends the order emails?** Options include Gmail SMTP with an app password, the Firebase "Trigger Email" extension over SMTP, or a transactional email service such as Resend. The sender address has to work before the business domain exists.

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

---

## 5. Phase 1 checklist (rough order)

1. Next.js app skeleton with Hebrew RTL default and English, deployed to Yevgeny's Firebase. Set up functional tests, end-to-end tests and the accessibility checks from [Testing](#testing) here too, running in CI before any pages are built.
2. Firestore data model: products, global settings (delivery/pickup), orders.
3. `/admin` with the hardcoded admin list: manage products, photos, delivery/pickup settings.
4. `/store` catalogue reading from Firestore.
5. `/` and `/about` with our own copy and gallery.
6. Ordering path: orders saved in Firestore, the `/admin` orders summary, and cash, Bit, PayBox and bank transfer payment (owner-sent request, manual "paid"; see [Bit payment links](research/bit-payment-links.md) and [Bit alternatives](research/israeli-payment-alternatives-to-bit.md)).
7. Email notification to the owner for each new order; then WhatsApp through Twilio.
8. Footer business details, policies and the accessibility statement page.
9. Manual accessibility pass (screen reader in Hebrew, keyboard, zoom) before going live.
10. Domain, business email and migration to the owner's Firebase.
