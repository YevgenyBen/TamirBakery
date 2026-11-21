# Basic layout gaps in the phase 1 plan

Research for **Tamir Bakery**. Researched 2026-11-20.

[PLAN.md](../PLAN.md) names four routes: `/`, `/store`, `/about`, `/admin`. This file lists what a working phase 1 store needs beyond those four: routes, global components, system pages and states, and `/admin` screens. It also checks how Bit and PayBox payments actually work, because that decides what the order confirmation can show. A later, deeper look at Bit links, payment companies and their costs is in [bit-payment-links.md](bit-payment-links.md), and other options (PayBox personal, PayPal, bank transfer, more gateways) are in [israeli-payment-alternatives-to-bit.md](israeli-payment-alternatives-to-bit.md). It does **not** repeat [storefront-layouts.md](storefront-layouts.md) (page map, homepage order, configurators, pricing, dates, trust, RTL, distance-sale disclosures) or [israeli-web-accessibility-law.md](israeli-web-accessibility-law.md). It links to them instead. SEO, privacy law and food licensing have their own research threads, so this file only names the layout slots they need.

How to read the citations: each claim links to the source that owns it. **[secondary]** means only a secondary source was available. **[judgement]** marks a design inference, not a finding.

---

## TL;DR

### Recommended phase 1 route list

```
/ (Home)                 hero, gallery, how ordering works, delivery/pickup + hours,
                         short FAQ (accordion), contact block           /en/ mirrors all public routes
├── /store               catalogue + store-closed banner + empty state
│   └── /store/[slug]    product detail: photos, options, allergens, add to cart / request
├── /cart                cart + order form on ONE page (fulfilment, date, details, payment method)
├── /order/[id]          confirmation: order ref, summary, payment instructions, disclosures
├── /about               baker story, kitchen, kashrut slot, business details, full contact
├── /policies            one page with anchors: #terms #cancellation #delivery #privacy
├── /accessibility       accessibility statement (own route; law wants it prominent)
└── /admin               own layout, noindex, sign-in gate
    ├── /admin/orders    (+ /admin/orders/[id])
    ├── /admin/products  (+ /admin/products/[id])
    ├── /admin/gallery
    └── /admin/settings  delivery/pickup, closed dates, payment details, business details
```

This folds the storefront page map's `/cakes` and `/shop` into `/store`, `/faq` and `/contact` into `/` and `/about`, and `/checkout` into `/cart`. It keeps `/policies` and `/accessibility` as their own routes. **[judgement]**

### Top gaps, in priority order

| # | Gap | Tag |
|---|-----|-----|
| 1 | **Order path routes**: `/cart` (with order form) and `/order/[id]` confirmation. The plan has no route between "add to cart" and "owner gets paid". | Must |
| 2 | **Payment instructions on the confirmation.** A private Bit or PayBox account cannot hand out a web link with a preset amount (see §2). The confirmation must say who sends the request, the amount, the phone number and the order ref. | Must |
| 3 | **`/policies` and `/accessibility` routes, and a footer** with business details, policy links, the cancellation link and the accessibility link. | Must |
| 4 | **Store state banner and date rules**: open / closed / vacation, Shabbat and holiday closures, order cutoff, sold-out items. | Must |
| 5 | **`/admin` orders screen** with a manual "paid" toggle, plus a settings screen for closed dates and payment details. | Must |
| 6 | **System files**: `not-found`, `error`, `global-error`, `loading`. With `/admin` outside `[lang]`, a `global-not-found` is also needed. | Should |
| 7 | **`/store/[slug]` product page**, so items have a shareable URL and their own preview image. | Should |
| 8 | **Metadata slots**: icon, `opengraph-image`, `sitemap.ts`, `robots.ts` (block `/admin`). Contents belong to the SEO research. | Should |
| — | Customer order-status page, site-text editor, admin management screen, cookie banner (only if analytics are added). | Later |

---

## 1. Reconciling the plan with the storefront page map

| Storefront page ([map](storefront-layouts.md#recommended-page-map)) | Phase 1 home | Why |
|---|---|---|
| `/cakes` + `/shop` | **`/store`**, with category filter chips | Under ~30 products, one catalogue with categories is enough. The cart vs order-request split is a per-product setting, not a separate route. **[judgement]** |
| `/cakes/[slug]`, `/shop/[slug]` | **`/store/[slug]`** | One detail route per product holds the configurator and a link that can be shared on WhatsApp. **[judgement]** |
| `/cart` → `/checkout` | **`/cart`** (one page) | Fewer steps. The order form is short: name, phone, email, date, fulfilment and notes ([storefront §3](storefront-layouts.md#guest-checkout-and-form-minimisation)). **[judgement]** |
| `/order-request/thanks` | **`/order/[id]`** | Needs to show this order's ref and amount (see §2). |
| `/faq` | Section on `/` (accordion), with key answers repeated in `/policies` | Phase 1 has few questions. Allergen and cancellation detail lives in `/policies`. **[judgement]** |
| `/contact` | Contact block on `/` + full details on `/about` + footer | WhatsApp, phone, pickup area and hours. A separate route adds nothing. **[judgement]** |
| `/policies` | **Own route** | Footer, product page and cart all deep-link to anchors, and the cancellation info must be easy to find ([storefront §7](storefront-layouts.md#7-israel-specific-requirements-that-affect-layout)). |
| `/accessibility` | **Own route** | The statement must be "במקום בולט" ([accessibility research §6](israeli-web-accessibility-law.md#6-accessibility-statement-הצהרת-נגישות)). A stable URL is the simplest way to meet that. |

**Language prefix.** The Next.js i18n guide nests everything under `app/[lang]` and uses Proxy (formerly Middleware) to pick the locale from `Accept-Language`. [Next.js, Internationalization](https://nextjs.org/docs/app/guides/internationalization) Hebrew is the default with no prefix, and English lives at `/en/`, so the proxy must **rewrite** unprefixed paths to `/he/...` rather than redirect. **[judgement, built on the guide's proxy pattern]** Keep `/admin` Hebrew-only and outside `[lang]`. **[judgement]**

## 2. Order and payment path (cash and Bit/PayBox only)

### How Bit and PayBox actually work for a small seller

| Question | Finding | Source |
|---|---|---|
| Can a **private** Bit user send a payment request? | Yes, from inside the app, to a recipient chosen from contacts or by phone number. The recipient approves it in the app. If it is ignored or declined within the response window, nothing moves. The recipient sees the requester's name. P2P explicitly covers payment "בתמורה עבור שירות או נכס". | [Bit terms of use, Bank Hapoalim PDF](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf) §1.1.2, §4.6, P2P item (4) |
| Is there a **web link with a preset amount** for a private Bit account? | **Not found.** The terms describe in-app requests and QR, but no shareable URL. Merchant payments use "bitcom", described as "כפתור ייעודי בערוצי רכישה מקוונים של בית העסק", which goes through a merchant setup. bitpay.co.il and the bankhapoalim.co.il pages were **blocked** (HTTP 403 / client error), so Bit's own marketing pages were not read. | [Bit terms](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf) §1.1.4 |
| Limits and fees on a private Bit account | Receiving is free up to ₪25,000 per calendar year, then 0.6% on amounts above that (**updated:** 0.8% from 1.5.26, per [bitpay.co.il](https://www.bitpay.co.il/he); see [bit-payment-links §1](bit-payment-links.md#1-personal-bit-account-no-amount-link)), up to an annual receiving cap of ₪100,000. Until the bank account is verified, receipts are capped at ₪5,000. | [Bit terms](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf) §2.8, §11; [Globes, Nov 2024](https://en.globes.co.il/en/article-hapoalim-reveals-bit-app-charges-from-january-1001494038) |
| Business use of a private Bit account | At registration the user must declare whether the use is "למטרה עסקית או למטרה שאינה עסקית" (§2.3). Interoperable transfers with other apps are allowed only between individuals who are not an "עוסק" under the Consumer Protection Law (§5.2). Globes reports that about 6% of users are commercial and reach the fee threshold. | [Bit terms](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf); [Globes](https://en.globes.co.il/en/article-hapoalim-reveals-bit-app-charges-from-january-1001494038) |
| Is **"bit לעסקים"** real? | Yes, as a clearing product, not an app mode. Grow (with Hapoalim, since May 2020) says "המערכת של בית העסק מייצרת קישור לתשלום באפליקציית bit הכולל סכום מוגדר מראש", sent by SMS or shown as a QR code. Money lands in the business's bank account, there is no annual cap, and a clearing fee (עמלת סליקה) applies. Invoicing tools (Morning/greeninvoice) attach a Bit pay button to an invoice through the same provider. Eligibility for an עוסק פטור is not stated. **Follow-up:** Grow's API creates such a link, supports Bit and sends a webhook; fees and plans are in [bit-payment-links §2](bit-payment-links.md#2-bit-לעסקים-through-a-payment-company-yes). | [Grow magazine, Feb 2026 **[secondary: vendor]**](https://grow.business/magazine-bit/); [greeninvoice help **[secondary: vendor]**](https://www.greeninvoice.co.il/help-center/digital-payments-bit-request/) |
| **PayBox** for business | "PayBox לעסקים" is available "לעוסקים פטורים או מורשים בלבד". It is the same in-app request flow: choose a contact or phone number, enter the amount, tap "בקשה". The page also mentions a "לינק אישי" sent on WhatsApp, but doesn't say whether it carries an amount. Money goes to the in-app balance first. No clearing fee up to ₪100,000 a year on PayBox Plus. The PayBox terms (effective 01.11.2026) cap receipts at ₪50,000 a year on Basic and ₪100,000 on Plus, and say no fees are charged today. | [PayBox for business](https://www.payboxapp.com/business); [PayBox paylink](https://payboxapp.com/paylink); [PayBox terms](https://www.payboxapp.com/tos) |
| Automatic payment confirmation to the site | None of the private or business-app flows above expose a webhook to us. Only a PSP integration (Grow etc.) could. | Same sources. PLAN.md already assumes manual marking. |

**What the confirmation page can therefore show (phase 1, no PSP) [judgement]:**
- **Order ref** (short, human-readable, e.g. `T-1042`), the **total in ₪**, and the chosen **payment method**.
- **Bit/PayBox:** "We'll confirm your order and send a Bit/PayBox payment request for ₪X to 05X-XXXXXXX" (owner-initiated, so the owner sets the amount). Fallback: "or send ₪X to <owner name>, 05X-XXXXXXX, and write `T-1042` in the note". Add copy buttons for the phone number, amount and ref. Do **not** promise a "pay now" link.
- **Cash:** "Pay on pickup/delivery", plus the date, time slot and pickup address or delivery area.
- **When payment is due** (on confirmation, or before production starts) and the deposit, if any. This is an open decision (see §7).
- **Distance-sale details:** §14ג(ב) requires a written document in Hebrew (or the marketing language) **no later than delivery**, with the seller's details, price and payment terms, how to cancel, and so on. [Knesset, 1998 amendment adding §14ג (PDF)](https://fs.knesset.gov.il/14/law/14_lsr_211534.PDF) The confirmation page plus the confirmation email or WhatsApp is where that document lives. The required fields are listed in [storefront §7](storefront-layouts.md#consumer-protection-law-distance-sales-עסקת-מכר-מרחוק).
- **Next step and response time** ("נאשר בוואטסאפ תוך X שעות"), plus a WhatsApp button prefilled with the ref.

**Order states the UI needs [judgement]:** `new` → `confirmed` (or `declined`) → `paid` (manual; record cash/Bit/PayBox and amount) → `ready` → `completed`, plus `cancelled`. Customers see a status only through messages in phase 1. A customer-facing `/order/[id]` status view can come later. If `/order/[id]` is public, the id must be unguessable (a random doc id, not the ref number), and the page should show no more than name initial, items, date and amount. **[judgement; details belong to the privacy research]**

**Dependency:** if the decision on PLAN open question 1 is "WhatsApp only, no Firestore orders", then `/order/[id]` collapses to a client-side "message sent" page and the ref has to be generated client-side. The page contents above still apply.

## 3. Global components missing from the storefront research

Already covered there: header links, language switch, cart, and the WhatsApp CTAs ([storefront §1, §5, §6](storefront-layouts.md#language-switcher)). Missing:

| Component | Contents | Source |
|---|---|---|
| **Skip link** | "דלג לתוכן" as the first focusable element, targeting `<main>` | WCAG 2.0 SC 2.4.1 Bypass Blocks, level A. [W3C, WCAG 2.0](https://www.w3.org/TR/WCAG20/#navigation-mechanisms-skip) |
| **Footer** (full spec) | Business name, ID or business number, address or pickup area, phone, email · hours with "סגור בשבת ובחגים" · links: תקנון ומדיניות, ביטול עסקה, פרטיות, הצהרת נגישות · WhatsApp, Instagram/Facebook · language switch · © year | Disclosure items: [§14ג(א)](https://fs.knesset.gov.il/14/law/14_lsr_211534.PDF) and [storefront §7](storefront-layouts.md#7-israel-specific-requirements-that-affect-layout). Layout: **[judgement]** |
| **Store status banner** | Thin bar under the header, driven by admin settings: "החנות סגורה לחופשה עד 3.12", "סגור בחג — הזמנות לאחר החג", "הזמנות לשישי עד חמישי 12:00" | **[judgement]** (§4) |
| **Floating WhatsApp button** | Optional. On mobile, either the header icon or a floating button, not both. It must not cover the sticky product bar or the cart submit button. Needs an `aria-label` | **[judgement]**; label: WCAG 2.0 SC 4.1.2 ([W3C](https://www.w3.org/TR/WCAG20/)) |
| **Cookie notice slot** | Reserve a bottom-of-viewport slot, but render it only if non-essential cookies or analytics are added. Wording and whether it is needed → privacy research | — |
| **Accessibility link in the header** | Small link (or icon with a label) to `/accessibility`, in addition to the footer link | [accessibility research §6](israeli-web-accessibility-law.md#6-accessibility-statement-הצהרת-נגישות) |
| **Cart count + toast** | Item count on the cart icon. A polite live-region toast saying "נוסף לסל" | WCAG 2.0 SC 4.1.2 / ARIA live regions. **[judgement]** |
| **Admin chrome** | `/admin` gets its own layout: no store header or footer, a sign-out button and a section nav | **[judgement]** |

Keep header, nav, footer and the language switch in the **same order on every page**. WCAG 2.0 SC 3.2.3 (Consistent Navigation, AA) requires it. [W3C, WCAG 2.0](https://www.w3.org/TR/WCAG20/#consistent-behavior-consistent-locations)

## 4. System pages and states

### Next.js App Router file slots

| File | What it does (per docs) | Tamir use |
|---|---|---|
| `not-found.js` | Renders when `notFound()` is thrown. Returns 404 if this happens before streaming starts, otherwise 200. Next.js injects `noindex` either way. The root `app/not-found` also handles unmatched URLs. [Next.js, not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | `app/[lang]/not-found` for unknown product slugs (bilingual, link to `/store`) |
| `global-not-found.js` (experimental) | For apps with **multiple root layouts**, or a root layout under a dynamic segment like `app/[country]/layout`. Bypasses layouts, so it must import its own styles and return `<html>`/`<body>`. Needs `experimental.globalNotFound`. [Next.js, not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) | Needed if `/admin` and `[lang]` have separate root layouts (§1). Hebrew-first, RTL |
| `error.js` | Client Component error boundary for a segment, with `retry()` (stable since v16.3). Does **not** catch errors in the same segment's layout. [Next.js, error](https://nextjs.org/docs/app/api-reference/file-conventions/error) | `/store`, `/cart`, `/admin`: "משהו השתבש" + retry + WhatsApp fallback, so an order is never lost |
| `global-error.js` | Replaces the root layout on error. Must render its own `<html>`/`<body>`. No `metadata` export, so use React `<title>`. [Next.js, error](https://nextjs.org/docs/app/api-reference/file-conventions/error) | Minimal page, inline styles, `dir="rtl"` |
| `loading.js` | Instant Suspense fallback for a segment. Doesn't hurt SEO. [Next.js, loading](https://nextjs.org/docs/app/api-reference/file-conventions/loading) | Catalogue and admin list skeletons |
| `forbidden.js` / `unauthorized.js` (experimental, `authInterrupts`) | 403/401 UI thrown from server code. Cannot be called in the root layout. [Next.js, forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) | "Not on the admin list" screen in `/admin` (or a plain redirect to sign-in) |
| Metadata files: `favicon.ico`, `icon`, `apple-icon`, `opengraph-image`, `robots`, `sitemap`, `manifest`; plus `generateMetadata` | File-based metadata, cached by default. If you use `proxy.ts`, exclude these files from its matcher. [Next.js, Metadata files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) | Slots only: icon in `app/`, `opengraph-image` on `/` and `/store/[slug]`, `robots.ts` disallowing `/admin`. Titles, hreflang and sitemap contents → SEO research |

### Store states (data-driven, not files)

| State | Where | Behaviour **[judgement unless noted]** |
|---|---|---|
| **Empty catalogue** | `/store` | "אין כרגע מוצרים זמינים" + WhatsApp CTA. Never a blank grid |
| **Sold out / unavailable** | Card + `/store/[slug]` | Badge, disabled add button with a text reason (not colour alone, per WCAG 2.0 SC 1.4.1), "שאלו בוואטסאפ" |
| **Store closed / vacation** | Banner + `/store` + `/cart` | Admin toggle with a message and a reopen date. Browsing still works. Submitting is blocked, or switches to "pre-order for after <date>" |
| **Shabbat and holidays** | Date picker + banner | Two separate rules: *fulfilment* days (no pickup on Shabbat or holidays) and *order intake* (the site can take orders 24/7; the owner just doesn't answer). Disable non-fulfilment dates ([storefront §2](storefront-layouts.md#lead-time-date-and-pickupdelivery-selection)). For holiday dates, the Hebcal REST API returns Israeli holidays (`i=on`) and candle-lighting/havdalah times as JSON, licensed CC BY 4.0. [Hebcal API](https://www.hebcal.com/home/195/jewish-calendar-rest-api) Phase 1 can also simply use **admin-entered closed dates** |
| **Order cutoff reached** | Product page + cart | "ההזמנות לשישי נסגרו — המועד הקרוב: 27.11". The earliest date updates live. Cutoff is set in admin |
| **Date no longer valid at submit** | `/cart` | Server re-validates. Show an inline error on the date field and keep the rest of the form |
| **Submit failure** | `/cart` | Keep the form data. Offer "שלחו את ההזמנה בוואטסאפ" with the order prefilled |
| **Cart item changed** | `/cart` | If the price changed or an item sold out since it was added, show a notice per line |

## 5. `/admin` screens for phase 1

| Screen | Contents | Tag |
|---|---|---|
| **Sign-in** | Firebase Auth (Google sign-in is the simplest). After sign-in, check the uid or email against the hardcoded admin list. Non-admins see a "no access" screen | Must |
| **Orders** (list + detail) | Filter by fulfilment date and status. Detail shows items, options, customer, date and fulfilment, notes, a **"mark paid" control** (method, amount, date, who marked it), status buttons (§2), "WhatsApp the customer" link, internal note | Must |
| **Products** (list + edit) | Hebrew and English name/description, price or "from" price plus options, category, photos (upload, order, **alt text in he/en**), allergens, lead time, fulfilment overrides (per PLAN), available/sold-out toggle, cart vs request mode, sort order, hidden/draft | Must |
| **Settings** | Delivery and pickup defaults (areas, fees, slots, lead time); **closed dates and store open/vacation toggle + banner text**; order cutoff; **payment details shown to customers** (Bit/PayBox phone, display name, deposit rule); **business details** for the footer; notification recipients (email, WhatsApp number) | Must |
| **Gallery** | Homepage photos: upload, reorder, alt text | Should |
| **Today / prep list** | Orders for a chosen date, grouped by product, printable | Should |
| **Site texts** | Editable homepage, about and policy copy. PLAN says copy is ours for now, so keep it in code or dictionary files | Later |
| **Admins** | Add or remove admins (PLAN: later) | Later |

**Gating and storage (layout-relevant only):**
- Firebase **custom claims** suit an `admin: true` flag. They are set with the Admin SDK (`setCustomUserClaims`) from a trusted server, limited to 1000 bytes, and only reach the user's ID token when a new token is issued, so a newly added admin must sign in again. [Firebase, Custom claims](https://firebase.google.com/docs/auth/admin/custom-claims) A hardcoded allowlist checked on the server is simpler for phase 1. **[judgement]**
- Firestore rules can gate writes on `request.auth` or on a lookup with `get()` of a user document, and can validate incoming data. [Firebase, Firestore rules conditions](https://firebase.google.com/docs/firestore/security/rules-conditions) Storage rules can require auth and check `request.resource.size` and `contentType`, so the upload UI should show the limit (for example "images only, up to 5 MB"). [Firebase, Storage security](https://firebase.google.com/docs/storage/security)
- App Hosting builds from a GitHub branch on every push, and keeps secrets in Cloud Secret Manager, so admin and Firebase config never appear in the page. [Firebase App Hosting](https://firebase.google.com/docs/app-hosting)
- Mark all of `/admin` `noindex` and disallow it in `robots.ts`. Also gate it on the server. **[judgement]**

## 6. Other pages an Israeli store usually has

- **תקנון (terms of use).** No statute names a "תקנון", but the content the law does require (seller details, price and payment terms, delivery timing and method, how long the offer is valid, warranty, cancellation right; §14ג(א)) is what a תקנון normally collects. [Knesset, §14ג (1998 PDF)](https://fs.knesset.gov.il/14/law/14_lsr_211534.PDF) Put it at `/policies#terms`, and link it from the cart with a "קראתי ואני מסכים/ה" checkbox. **[judgement]** The 1998 text was read. Later amendments (for example adding ID or business number and email) were **not** verified from a primary source. The [storefront research](storefront-layouts.md#consumer-protection-law-distance-sales-עסקת-מכר-מרחוק) has them from the CPFTA bulletin.
- **Business details.** §14ג(א)(1) requires "השם והכתובת של העוסק". For a home bakery that is the home address, which may clash with the owner's privacy. This needs a decision and probably a lawyer's view. Show it in the footer or on `/about`. **[judgement]**
- **Delivery and pickup info** → `/policies#delivery` (areas, fees, slots, what happens if nobody is home). This repeats the settings data, so render it from Firestore, not as hand-written copy. **[judgement]**
- **Cancellation form.** A footer link "ביטול עסקה" goes to `/policies#cancellation`, with a short form or WhatsApp/email option ([storefront §7](storefront-layouts.md#7-israel-specific-requirements-that-affect-layout)).
- **Slots owned by other research threads:** privacy policy at `/policies#privacy` and the cookie notice → privacy research; licence or food-permit badge on `/about` and in the footer → licensing research; titles, hreflang, sitemap and Google Business link → SEO research.
- **Receipts (קבלה) for cash and Bit payments** are a tax and bookkeeping matter, not a page. They may add a "receipt sent" field to the order detail in `/admin`. → licensing and business-status thread. **[judgement]**

## 7. Decisions this raises for the plan

1. **Who starts a Bit/PayBox payment:** the owner sends an in-app request to the customer's phone (owner sets the amount), or the customer sends to the owner's number with the ref in the note. A preset-amount link needs a clearing provider ("bit לעסקים" via Grow etc.) with fees. That contradicts "no gateway" in phase 1.
2. **Private Bit account for business:** Bit's terms ask users to declare business use. The free tier ends at ₪25,000 a year, after which 0.6% applies, with a cap of ₪100,000. PayBox for business requires עוסק פטור or מורשה status. This ties to PLAN open question 6.
3. **Pay when:** before confirmation, after confirmation, or at pickup. Full payment or a deposit for custom cakes.
4. **Is the confirmation a real route (`/order/[id]`)?** This depends on PLAN open question 1. If yes, it needs unguessable ids and a minimal public summary.
5. **Separate `/store/[slug]` pages, or expand-in-place cards?** Recommendation: separate pages.
6. **Shabbat and holidays:** are orders accepted on Shabbat (site open, only fulfilment closed) or is the site "closed" too? Manual closed dates or a Hebcal feed?
7. **Order cutoff rule** (for example "for Friday, order by Thursday 12:00") and how far ahead orders can be placed.
8. **Address disclosure:** full home address in the footer, or pickup area plus address given on confirmation. Needs legal input.
9. **English legal pages:** must `/en/policies` be a full translation, or a summary pointing to the binding Hebrew text?
10. **Admin gating:** hardcoded allowlist on the server, or custom claims (PLAN open question 3 covers the sign-in method only).

---

## Sources

**Payments (primary)**
- [Bit terms of use, Bank Hapoalim (PDF, undated)](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf)
- [PayBox for business](https://www.payboxapp.com/business) · [PayBox paylink](https://payboxapp.com/paylink) · [PayBox terms (effective 01.11.2026)](https://www.payboxapp.com/tos) · [PayBox home](https://www.payboxapp.com/)

**Payments (secondary)**
- [Globes: Hapoalim reveals Bit charges (Nov 2024)](https://en.globes.co.il/en/article-hapoalim-reveals-bit-app-charges-from-january-1001494038) · [Grow: bit לעסקים (Feb 2026, vendor)](https://grow.business/magazine-bit/) · [greeninvoice: invoice with Bit button (vendor)](https://www.greeninvoice.co.il/help-center/digital-payments-bit-request/)

**Next.js docs**
- [not-found / global-not-found](https://nextjs.org/docs/app/api-reference/file-conventions/not-found) · [error / global-error](https://nextjs.org/docs/app/api-reference/file-conventions/error) · [loading](https://nextjs.org/docs/app/api-reference/file-conventions/loading) · [forbidden](https://nextjs.org/docs/app/api-reference/functions/forbidden) · [Metadata files](https://nextjs.org/docs/app/api-reference/file-conventions/metadata) · [Internationalization](https://nextjs.org/docs/app/guides/internationalization)

**Firebase docs**
- [App Hosting](https://firebase.google.com/docs/app-hosting) · [Auth custom claims](https://firebase.google.com/docs/auth/admin/custom-claims) · [Firestore rules conditions](https://firebase.google.com/docs/firestore/security/rules-conditions) · [Storage security rules](https://firebase.google.com/docs/storage/security)

**Standards and data**
- [W3C, WCAG 2.0](https://www.w3.org/TR/WCAG20/) (SC 1.4.1, 2.4.1, 3.2.3, 4.1.2) · [Hebcal Jewish calendar REST API](https://www.hebcal.com/home/195/jewish-calendar-rest-api)

**Israeli law**
- [Consumer Protection Law, 1998 amendment adding §14ג (Knesset PDF)](https://fs.knesset.gov.il/14/law/14_lsr_211534.PDF)

**Internal**
- [storefront-layouts.md](storefront-layouts.md) · [israeli-web-accessibility-law.md](israeli-web-accessibility-law.md) · [PLAN.md](../PLAN.md)

---

## Open questions and weak evidence

1. **Bit's own site was not read.** bitpay.co.il and bankhapoalim.co.il HTML/press pages returned 403 or client errors through this environment. A dated terms PDF (`conditions_bit_291025.pdf`) also failed. The undated static terms PDF was read instead, so the limits (₪25k free / 0.6% / ₪100k) may have changed. Check them in the app before launch.
2. **Private Bit payment links:** no primary source shows a shareable URL with a preset amount for private accounts. **Followed up in [bit-payment-links.md](bit-payment-links.md):** Bit's own business page sends businesses to partner payment companies, and no public link format exists.
3. **PayBox "לינק אישי":** the business page mentions it but doesn't say whether it carries a preset amount. **Followed up:** PayBox's terms document no link with an amount for personal accounts either ([alternatives §2](israeli-payment-alternatives-to-bit.md#2-paybox-personal-account)). Check in the app.
4. **"bit לעסקים" eligibility and fees** come from vendor pages only (Grow, greeninvoice). Whether an עוסק פטור qualifies is unknown. **Fees now in [bit-payment-links §2 and §5](bit-payment-links.md#5-cost-comparison-for-a-small-bakery);** עוסק פטור eligibility is still unconfirmed.
5. **Bit §5.2 (interoperability only between non-עוסק individuals):** it is unclear whether this affects a customer paying from PayBox to a Bit-registered home business. Check with the bank if cross-app payment matters.
6. **§14ג current text:** only the 1998 amendment was read (Knesset PDF, OCR). Wikisource and Nevo were blocked, so later changes to the disclosure list are unverified here.
7. **Home address disclosure** for a home business: the legal requirement is clear in the 1998 text, but how it applies to a pickup-only home bakery needs a lawyer.
8. **`global-not-found` is experimental** (Next.js 15.4+). If it is not wanted, put `/admin` under the same root layout instead.
