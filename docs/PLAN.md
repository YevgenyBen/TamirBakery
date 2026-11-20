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
6. **Business status:** is the owner an עוסק פטור? This decides whether the accessibility rules legally apply (see [accessibility research](research/israeli-web-accessibility-law.md#4-exemptions-and-thresholds)), and what business details go in the footer.
7. **Card payments:** the storefront research says card should always be offered in Israel. Phase 1 deliberately skips it; revisit if customers ask.
8. **Kashrut wording:** only say "כשר" with a Rabbinate certificate. Confirm whether the owner has one.
9. **Who starts a Bit/PayBox payment:** the owner sends an in-app request, or the customer sends money with the order ref in the note. A private Bit account has no shareable link with a preset amount; "bit לעסקים" links need a payment company. See [layout gaps §2](research/basic-layout-gaps.md#2-order-and-payment-path-cash-and-bitpaybox-only).
10. **Private Bit for business use:** Bit's terms ask users to declare business use and cap receipts (₪25k/year free, ₪100k/year max). PayBox for business needs dealer status (ties to question 6).
11. **When payment is due:** before confirmation, after it, or at pickup; and whether custom cakes need a deposit.
12. **Store closures:** on Shabbat and holidays, keep taking orders and only block those dates, or close the store? Closed dates entered by hand, or from a holiday calendar (Hebcal)? What is the order cutoff and how far ahead can people order?
13. **Home address in the footer:** consumer law asks for the business's name and address, which for a home bakery is the home. Full address, or pickup area only? Needs legal input.
14. **English policies:** full translation, or a summary pointing to the binding Hebrew text?
15. **Product pages:** separate `/store/[slug]` pages (shareable links), or cards that expand in place?

---

## 3. Research to do

Each item gets its own file in `docs/research/` and is linked back here.

| Topic | Focus | Status |
|---|---|---|
| **Local SEO and marketing** | Cheap and quick: Google Business Profile, basic on-page SEO in Hebrew, social and WhatsApp channels. | To do |
| **Privacy law** | Israeli Privacy Protection Law (incl. Amendment 13), what a privacy policy must say, what customer data we can keep in Firestore, cookie notice. | To do |
| **Business licence and food permits** | What a home baker needs to sell food online in Israel (Ministry of Health, municipal business licence), and what we can claim on the site. The owner has no licence yet, so this is near-term. | To do, soon |

### Done

- [Basic layout gaps](research/basic-layout-gaps.md): minimal phase 1 route list, order and confirmation path with cash/Bit (how Bit and PayBox requests really work), footer and global components, Next.js system pages, store open/closed and holiday states, `/admin` screens. Raised open questions 9 to 15.
- [Storefront layouts for a home bakery](research/storefront-layouts.md): page map, homepage order, ordering flow, trust signals, RTL/bilingual layout, Israeli legal items that affect layout.
- [Israeli web accessibility law](research/israeli-web-accessibility-law.md): who must comply (SI 5568-1 level AA, based on WCAG 2.0), the עוסק פטור / NIS 100k exemption, accessibility statement template. Recommendation: build to AA and publish a statement even if exempt.

---

## 4. Firebase migration at deploy

Development runs on Yevgeny's Firebase project. Before going live, move to a project the owner pays for. To keep that easy:

- Keep all Firebase config (project ID, keys, service accounts) in environment variables, never in code.
- Keep Firestore security rules, indexes and Storage rules in the repo, so they deploy to any project.
- Write a short seed/export script for products and settings, so data can be copied to the new project.
- At migration: create the owner's project on Blaze with the owner as billing owner and Yevgeny as a member; deploy rules and app; copy data and photos; point the domain at it; recreate admin accounts.

---

## 5. Phase 1 checklist (rough order)

1. Next.js app skeleton with Hebrew RTL default and English, deployed to Yevgeny's Firebase.
2. Firestore data model: products, global settings (delivery/pickup), orders (if we store them).
3. `/admin` with the hardcoded admin list: manage products, photos, delivery/pickup settings.
4. `/store` catalogue reading from Firestore.
5. `/` and `/about` with our own copy and gallery.
6. Ordering path, once open question 1 is decided, with cash and Bit link payment.
7. Email and WhatsApp notification code.
8. Footer business details, policies and accessibility statement (after the research above).
9. Domain, business email and migration to the owner's Firebase.
