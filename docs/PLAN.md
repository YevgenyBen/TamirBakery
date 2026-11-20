# Tamir Bakery: phase 1 plan

A web store for a home bakery, aimed at the Israeli market. Hebrew first (RTL), English second.

- **Developer:** Yevgeny
- **Last updated:** 2026-11-20
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

### Tech stack and hosting

- **Next.js** for both front end and back end.
- **Firebase** for hosting and database (Firestore). Product photos go in Firebase Storage.
- **Hosting account, for now:** Yevgeny's own Firebase project, on the Blaze plan (needed for Next.js on Firebase App Hosting; expected cost at this traffic is close to nothing).
- **At deploy:** move hosting to a new Firebase project paid for by the owner. See [Firebase migration](#4-firebase-migration-at-deploy).

### Payments

- **Cash** and **Bit (or a similar app) through a pay link straight to the owner.** No payment gateway, no card processing in phase 1.
- Bit links have no automatic confirmation, so payment status is marked by hand in `/admin`. Who does this depends on how orders reach the owner (open question 1).

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

When the test setup is created, accessibility checks are part of it from day one, next to the functional tests:

- **Lint:** `eslint-plugin-jsx-a11y` (included in Next.js's ESLint config) with errors failing the build.
- **Component tests:** run axe (`vitest-axe` or `jest-axe`) on each component's rendered states, including error and empty states.
- **End-to-end:** Playwright with `@axe-core/playwright` scans every route in Hebrew and English, at phone and desktop sizes, in light and dark themes, tagged for WCAG 2.0/2.1/2.2 A and AA. Any violation fails the run. Also cover key flows by keyboard only (browse the store, fill the cart and order form, use `/admin`).
- **CI:** lint, component and end-to-end tests run on every pull request.
- **Manual pass before each release:** automated tools catch only part of the problems, so also check with a screen reader in Hebrew (NVDA on Windows, VoiceOver on iPhone), check zoom to 200%, and review alt text and headings by hand.

### Notifications to the owner

- **Email** and **WhatsApp**. Build the code so both channels are ready, behind a small notification interface, even if one isn't switched on at launch.

### Domain and email

- None yet. Both will be provided later. Nothing in the code should hardcode a domain or sender address.

### Out of scope for now

- Competitor analysis.

---

## 2. Open questions

1. **How does an order reach the owner?** Decide later. Options on the table: a cart that ends in a prefilled WhatsApp message; orders saved in Firestore and shown in `/admin`; or both. The [storefront research](research/storefront-layouts.md#3-ordering-flow) suggests a hybrid: a cart for fixed items and an order-request form for custom cakes.
2. **Who marks an order as paid,** and when, given Bit has no automatic confirmation.
3. **Admin sign-in method:** Google sign-in only, or email/password too.
4. **Is English a full mirror of the site or only key pages?** The storefront research assumes a full `/en/` mirror.
5. **Where photos come from** (owner's own, a photographer, or both) and who uploads them.
6. **Business status:** is the owner an עוסק פטור? This decides whether the accessibility rules legally apply (see [accessibility research](research/israeli-web-accessibility-law.md#4-exemptions-and-thresholds)), though we build to the standard either way (see [Accessibility](#accessibility)), and what business details go in the footer. The [licensing research](research/home-bakery-licences-and-permits.md#4-tax-registration) recommends opening an עוסק פטור file online now (2026 ceiling NIS 122,833).
7. **Card payments:** the storefront research says card should always be offered in Israel. Phase 1 deliberately skips it; revisit if customers ask.
8. **Kashrut wording:** only say "כשר" with a Rabbinate certificate. Confirm whether the owner has one. Without one, the site may only describe its standards truthfully next to an explicit "no kashrut certificate" line, and the Rabbinate refuses certificates to businesses in private homes in principle (see [licensing research](research/home-bakery-licences-and-permits.md#6-kashrut-claims)).
9. **Who starts a Bit/PayBox payment:** the owner sends an in-app request, or the customer sends money with the order ref in the note. A private Bit account has no shareable link with a preset amount; "bit לעסקים" links need a payment company. See [layout gaps §2](research/basic-layout-gaps.md#2-order-and-payment-path-cash-and-bitpaybox-only).
10. **Private Bit for business use:** Bit's terms ask users to declare business use and cap receipts (₪25k/year free, ₪100k/year max). PayBox for business needs dealer status (ties to question 6).
11. **When payment is due:** before confirmation, after it, or at pickup; and whether custom cakes need a deposit.
12. **Store closures:** on Shabbat and holidays, keep taking orders and only block those dates, or close the store? Closed dates entered by hand, or from a holiday calendar (Hebcal)? What is the order cutoff and how far ahead can people order?
13. **Home address in the footer:** consumer law asks for the business's name and address, which for a home bakery is the home. Full address, or pickup area only? Needs legal input.
14. **English policies:** full translation, or a summary pointing to the binding Hebrew text?
15. **Product pages:** separate `/store/[slug]` pages (shareable links), or cards that expand in place?
16. **Firestore region:** it can't be changed after the database is created. The [privacy research](research/israeli-privacy-law.md#7-cross-border-transfer-and-firebase) suggests `me-west1` (Tel Aviv) or an EU region. Decide before creating the owner's project.
17. **Who can see customer data:** keep it to the owner plus at most two others (the developer counts) so the lightest security level applies ([privacy research](research/israeli-privacy-law.md#1-tldr-what-this-bakery-store-must-do)).
18. **Where will the baking happen?** The [licensing research](research/home-bakery-licences-and-permits.md#8-recommended-path-from-zero) found no legal route for selling food made in an ordinary family kitchen. Options: a licensed rented or shared kitchen, or a separate self-contained unit at home licensed under item 4.2ג. Until then, the site should launch as a portfolio with no ordering.

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

1. Next.js app skeleton with Hebrew RTL default and English, deployed to Yevgeny's Firebase. Set up the test tooling here too, with the accessibility checks from [Testing](#testing) wired into CI before any pages are built.
2. Firestore data model: products, global settings (delivery/pickup), orders (if we store them).
3. `/admin` with the hardcoded admin list: manage products, photos, delivery/pickup settings.
4. `/store` catalogue reading from Firestore.
5. `/` and `/about` with our own copy and gallery.
6. Ordering path, once open question 1 is decided, with cash and Bit link payment.
7. Email and WhatsApp notification code.
8. Footer business details, policies and the accessibility statement page.
9. Manual accessibility pass (screen reader in Hebrew, keyboard, zoom) before going live.
10. Domain, business email and migration to the owner's Firebase.
