# Product

<!-- impeccable:product-schema 1 -->

Sources: [docs/PLAN.md](docs/PLAN.md), [docs/research/](docs/research/) and the project brief. The developer reviewed and corrected it on 2026-11-20 and confirmed the ordering, contact and design decisions on 2026-11-21. Visual style lives in [docs/DESIGN.md](docs/DESIGN.md), not here.

## Platform

web

## Stack

Next.js (front end and back end) on Firebase: App Hosting, Firestore (`me-west1`, Tel Aviv) and Storage for product photos. Decided in PLAN.md; the app skeleton does not exist yet. Dev project `tamir-bakery-dev` on the developer's account; production moves to a Firebase project the owner pays for before launch, so all Firebase config stays in environment variables.

## Users

- **Customers (primary):** people in Israel, mostly Hebrew speakers, ordering cakes and baked goods from a local home bakery for an occasion or for the week. In phase 1 they mostly browse and order on a phone. Their job: see what is on offer and what it costs, pick a size or option and a date, choose pickup or delivery, and get a clear answer on how and when to pay.
- **English-speaking customers (secondary):** the same job in English. Whether English is a full mirror or key pages only is still open.
- **The owner (admin):** manages products, photos, delivery and pickup settings, closed dates and orders in `/admin`, most likely from a phone, between baking.
- **Other admins:** in practice, the owner's wife. The owner can add and remove admins from the admin panel, but the expected admins are the owner and his wife, plus the developer during development. The first admins come from a short hardcoded list.

## Product Purpose

A small web store for a home bakery, working name **Tamir Bakery (מאפיית תמיר)**. That name is used for now; it is a placeholder, and a final name may come later without blocking work. It shows the baker's work, lists products with real prices, and lets customers place an order that the owner fulfils by pickup or delivery and is paid for in cash or by a manual pay link.

Phase 1 is deliberately quick and simple: a working, legal-enough store with the fewest moving parts. Polish comes later. There is no fixed launch date.

Success for phase 1 (confirmed 2026-11-21): a customer on a phone can find a product, understand price, lead time and how to pay, and send an order without messaging first; the owner and the admins they add can keep the catalogue and orders current from a phone without the developer.

## Positioning

A real home baker selling made-to-order goods, in Hebrew first, with direct contact (WhatsApp) and plain, honest terms. It is not a chain or a marketplace: the trust comes from the baker's own photos and story, concrete lead times and prices, and truthful claims (for example, no "כשר" without a Rabbinate certificate).

## Operating Context

- **Routes decided:** `/` (information and photo gallery), `/store` (catalogue), `/about` (the owner and the business), `/admin` (products, settings, orders). The research recommends adding `/store/[slug]`, `/cart`, `/order/[id]`, `/policies` and `/accessibility`; not adopted yet (PLAN open questions 9 to 15).
- **Ordering (decided 2026-11-21, PLAN open question 1):** orders are saved in Firestore and the owner is told by **email**. `/admin` has an **orders summary** where admins see and update orders. **WhatsApp** notifications are added later through **Twilio**, during the build, not for launch. Research suggests a cart for fixed items and an order-request form for custom cakes.
- **Payment:** cash, or Bit (or a similar app) straight to the owner. No payment gateway and no card processing in phase 1. A private Bit account cannot issue a link with a preset amount, and Bit gives no automatic confirmation, so payment status is marked by hand in `/admin`. Who starts the payment request is open.
- **Delivery and pickup:** set by the owner in `/admin`, globally as defaults and per item as overrides. Exact fields are defined when `/admin` is built.
- **Notifications to the owner:** email first; WhatsApp through Twilio later. Both sit behind one small notification interface, so adding Twilio is a new channel, not a rewrite.
- **Contact email:** the developer's account Gmail for now, until a business email exists. It is never written into the repo: the code reads it from environment variables (`CONTACT_EMAIL` for the site, `ORDER_EMAIL_TO` for order emails).
- **Domain:** none yet; it will be bought and added later. The site URL comes from `SITE_URL`.
- **Calendar realities:** lead times, order cutoffs, and closures for Shabbat and holidays (rules still open).
- **Legal frame (Israel):** consumer-protection seller details and cancellation terms in the footer and policies; a section 11 privacy collection notice on every form; anti-spam rules for marketing ("פרסומת" plus prior consent); a receipt for every payment. Research says ordering should stay off until the business licence is in hand, so the site may first launch as a portfolio with no ordering (PLAN open question 18).

## Capabilities and Constraints

- **Languages:** Hebrew is the default (RTL); English is the only other language for now (LTR). Copy is written by us now and replaced by professional copy later.
- **Devices:** every page, including `/admin`, must be fully usable on both phone and desktop. Design phone first, then check each feature on phone and desktop sizes before calling it done.
- **No hardcoded domain, contact email or sender address:** the domain comes later, and the email in use for now is a stand-in, so all of them live in environment variables.
- **No analytics or marketing cookies in phase 1**, so no cookie banner.
- **Customer data access:** PLAN open question 17 aims for the owner plus at most two others, to stay in the lightest Israeli data-security tier. The expected admins (the owner, his wife and the developer) are exactly three people, which fits, so admins may see orders and customer details. Adding a further admin who can see customer data would exceed that limit, so the admin panel should warn about it when someone is added. Allergy details are not collected as free-text personal data; allergen-free options are product choices instead.
- **Admin accounts:** a hardcoded admin list first; the owner can add and remove further admins from the admin panel. Auth provider not decided (Firebase Auth is the natural fit; Google-only or email too is open).
- **Out of scope for now:** card payments, a payment gateway, competitor analysis. WhatsApp through Twilio (a paid, per-message service) is planned for later in the build, not for launch.
- **Open product decisions** (see PLAN.md §2 for the full list): who marks orders paid and when payment is due; which service sends the order emails; full English mirror or key pages; product pages vs expanding cards; closures and cutoffs; home address vs pickup area in the footer; business status (עוסק פטור); kashrut certificate; where the baking legally happens.

## Brand Commitments

- **Name:** not final. מאפיית תמיר / Tamir Bakery ("home bakery", מאפייה ביתית) is the name we use for now, but it is a placeholder, so keep the name in one place (config or translation strings), never baked into images, metadata or URLs. No logo yet.
- **Voice:** warm, direct and honest, like the baker talking at the counter. Hebrew calls to action use the gender-neutral plural ("הזמינו", "בחרו"). English is a faithful, friendly translation, not a different voice. Concrete about time and money; no superlatives we cannot prove. Full voice rules are in DESIGN.md §8.
- **Truthfulness rules that bind all copy:** never "כשר" without a Rabbinate certificate; reviews only real, named and with permission; marketing only with prior consent and labelled "פרסומת".

## Evidence on Hand

- **Mockups:** [tamir-bakery-preview.html](docs/mockups/tamir-bakery-preview.html) and [tamir-bakery-v2.html](docs/mockups/tamir-bakery-v2.html), with desktop screenshots in [docs/mockups/screenshots/](docs/mockups/screenshots/). They use sample products, prices and orders. **The design follows the v2 mock together with DESIGN.md** (decided 2026-11-21); a later impeccable mock in a different direction was discarded.
- **Research:** six reports in [docs/research/](docs/research/) on storefront layout, layout gaps and payments, accessibility law, privacy law, local SEO and marketing, and licences and kashrut.
- **Absent, must not be fabricated:** real product photos (mockup v2 uses Unsplash stand-ins for preview only), the owner's name, photo and story, real products and prices, customer reviews or testimonials, a kashrut certificate, a business licence, business registration details, a domain and business email, a logo, the final business name.

## Product Principles

1. **Simple first.** Phase 1 ships the fewest moving parts that make a working, legal-enough store. Manual steps (payment status, order confirmation) are acceptable where automation would add a service or a cost.
2. **Hebrew and phone are the default, not a port.** Hebrew RTL on a phone is the primary experience; English and desktop are complete, first-class versions of it, never afterthoughts.
3. **Honest and concrete.** Show prices, lead times, payment steps and terms up front. Make no claim (kashrut, reviews, superlatives) the business cannot back.
4. **Admins run it from a phone.** Anything the owner, or an admin they add, needs to change day to day is editable in `/admin` on a phone without the developer.
5. **Portable.** Config in environment variables and rules in the repo, so moving to the owner's Firebase project and domain is a deploy, not a rewrite.

## Accessibility & Inclusion

- Build to **Israeli Standard SI 5568 Part 1, level AA** (based on WCAG 2.0 AA) on every page, including `/admin`, even if the business turns out to be exempt as an עוסק פטור. WCAG 2.1/2.2 AA where it costs nothing extra.
- Publish an accessibility statement (הצהרת נגישות) on its own page, linked prominently from the header and footer, with a way to report problems. No accessibility overlay or widget.
- Correct `lang` and `dir` per language, mixed-direction text handled properly, alt text in Hebrew and English on every product and gallery photo.
- Design-side rules (contrast, focus, target sizes, reduced motion) are in DESIGN.md §9.
