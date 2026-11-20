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

Anything else a basic store needs (contact, FAQ, policies, accessibility statement, etc.) is an open research item; see [Research to do](#3-research-to-do).

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
6. **Business status:** is the owner an עוסק פטור? This decides whether the accessibility rules legally apply (see [accessibility research](research/israeli-web-accessibility-law.md#4-exemptions-and-thresholds)), and what business details go in the footer. The [licensing research](research/home-bakery-licences-and-permits.md#4-tax-registration) recommends opening an עוסק פטור file online now (2026 ceiling NIS 122,833).
7. **Card payments:** the storefront research says card should always be offered in Israel. Phase 1 deliberately skips it; revisit if customers ask.
8. **Kashrut wording:** only say "כשר" with a Rabbinate certificate. Confirm whether the owner has one. Without one, the site may only describe its standards truthfully next to an explicit "no kashrut certificate" line, and the Rabbinate refuses certificates to businesses in private homes in principle (see [licensing research](research/home-bakery-licences-and-permits.md#6-kashrut-claims)).
9. **Where will the baking happen?** The [licensing research](research/home-bakery-licences-and-permits.md#8-recommended-path-from-zero) found no legal route for selling food made in an ordinary family kitchen. Options: a licensed rented or shared kitchen, or a separate self-contained unit at home licensed under item 4.2ג. Until then, the site should launch as a portfolio with no ordering.

---

## 3. Research to do

Each item gets its own file in `docs/research/` and is linked back here.

| Topic | Focus | Status |
|---|---|---|
| **Basic layout gaps** | What's missing from `/`, `/store`, `/about`, `/admin` for a basic store (e.g. contact, FAQ, policies, accessibility statement, cart/checkout, order confirmation). Start from the page map in [storefront-layouts.md](research/storefront-layouts.md#recommended-page-map). | To do |
| **Local SEO and marketing** | Cheap and quick: Google Business Profile, basic on-page SEO in Hebrew, social and WhatsApp channels. | To do |
| **Privacy law** | Israeli Privacy Protection Law (incl. Amendment 13), what a privacy policy must say, what customer data we can keep in Firestore, cookie notice. | To do |

### Done

- [Storefront layouts for a home bakery](research/storefront-layouts.md): page map, homepage order, ordering flow, trust signals, RTL/bilingual layout, Israeli legal items that affect layout.
- [Israeli web accessibility law](research/israeli-web-accessibility-law.md): who must comply (SI 5568-1 level AA, based on WCAG 2.0), the עוסק פטור / NIS 100k exemption, accessibility statement template. Recommendation: build to AA and publish a statement even if exempt.
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

1. Next.js app skeleton with Hebrew RTL default and English, deployed to Yevgeny's Firebase.
2. Firestore data model: products, global settings (delivery/pickup), orders (if we store them).
3. `/admin` with the hardcoded admin list: manage products, photos, delivery/pickup settings.
4. `/store` catalogue reading from Firestore.
5. `/` and `/about` with our own copy and gallery.
6. Ordering path, once open question 1 is decided, with cash and Bit link payment.
7. Email and WhatsApp notification code.
8. Footer business details, policies and accessibility statement (after the research above).
9. Domain, business email and migration to the owner's Firebase.
