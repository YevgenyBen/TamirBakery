# Bit payment links: can the site send the customer to Bit with the amount filled in?

- **Research date:** 2026-11-20
- **Question (Yevgeny):** Can the site build a link that holds the owner's phone number and the order amount, so that tapping it opens Bit with that amount ready to pay?
- **Scope:** Bit (Bank Hapoalim) personal accounts, "bit לעסקים", PayBox, Pepper Pay, payment-link providers that support Bit (Grow, Morning/Green Invoice, PayMe), desktop vs mobile behaviour, fees and eligibility for a small home business. Builds on [basic layout gaps §2](basic-layout-gaps.md#2-order-and-payment-path-cash-and-bitpaybox-only), which already found no preset-amount link for private accounts. This file goes deeper and adds the business routes and their costs.
- **Status:** research, not financial or legal advice. Prices exclude VAT unless stated.

## Short answer

**No, not with a personal Bit account.** Bit has no public link or URL scheme that takes a phone number and an amount. A personal account can only send or request money from inside the app. Bit's own business page says businesses get links through partner payment companies, not from Bit directly.

**Yes, through a payment company.** Grow (and others Bit lists, such as Cardcom, Upay and Gama) can create a payment link with a fixed amount, by API from our server, with Bit as a payment method and a webhook when the customer pays. That is a payment gateway, which phase 1 ruled out, and it needs a registered business (at least *עוסק פטור*), a monthly fee and a per-transaction fee.

**Recommendation:**

1. **Phase 1 (no gateway, as planned):** don't promise a "pay now" button. After an order is confirmed, the owner sends a Bit request from the app to the customer's phone for the exact amount. The confirmation page and message show the amount, the owner's Bit phone number and the order ref, with copy buttons, as a fallback for customers who prefer to send the money themselves. "Paid" stays a manual toggle in `/admin`.
2. **When the business is registered and ordering goes live:** move to **Grow** payment links. The site creates the link with the exact amount, the customer pays by Bit or card, Grow sends a webhook, the order is marked paid automatically and Grow issues the receipt the law requires. Expected cost for a small volume is roughly ₪85–95 a month plus VAT (see §5). Ordering can't go live before the business licence anyway ([licences research](home-bakery-licences-and-permits.md)), and by then the *עוסק פטור* file Grow needs will exist.

## How to read the evidence tags

| Tag | Meaning |
|---|---|
| **[P]** | Read on the provider's own site or docs (Bit, Grow, Morning, PayMe, PayBox). |
| **[S]** | Secondary source (forum, news, review site). |
| **[I]** | My inference. Not stated in a source. |

Sources I could not read: `greeninvoice.co.il/payment-links` and `greeninvoice.co.il/market/clearing` returned client errors. Shell access to all these sites was blocked by the sandbox proxy, so pages were read through a fetch tool, and nothing was tested in the Bit app itself.

---

## 1. Personal Bit account: no amount link

| Finding | Tag / source |
|---|---|
| Bit's business page describes only phone-based requests for small businesses: "הלקוחות מעבירים לכם את מספר הטלפון ואתם שולחים להם בקשה לתשלום באמצעות bit!" (customers give you their phone number and you send them a payment request). | [P] [bit for businesses](https://www.bitpay.co.il/he/bit-for-businesses) |
| For anything more, Bit sends businesses to partner companies: "ניתן להתחבר באופן ישיר באמצעות מספר חברות" (Grow, Gama, Keep, Upay, ONE City, Giveback, Cardcom, E-C and others), "בכפוף להתקשרות בית עסק עם חברה" (subject to a contract with that company and its terms and costs). | [P] [bit for businesses](https://www.bitpay.co.il/he/bit-for-businesses) |
| No public `bit://` scheme, universal link or URL format with phone and amount is documented anywhere I looked. A developer forum reply says Bit's API "is intended for businesses or licensed PISPs" and "there is no public-consumer P2P API". | [S] [B4X forum](https://b4x.com/android/forum/threads/bit-israeli-ewallet-payment-request.166901) |
| Earlier research read Bit's terms of use: in-app requests and QR only, no shareable URL. | [P] [Bit terms PDF](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf), summarised in [layout gaps §2](basic-layout-gaps.md#how-bit-and-paybox-actually-work-for-a-small-seller) |
| Even if an undocumented app link existed, it would only work on a phone with Bit installed, could break with any app update, and would give no payment confirmation. | [I] |

**Personal account limits and duties (updated):**

| Item | Finding | Tag / source |
|---|---|---|
| Annual receiving cap | Up to ₪100,000 per calendar year (from 14/11/24). | [P] [bitpay.co.il](https://www.bitpay.co.il/he) |
| Fee | **0.8%** on receipts above ₪25,000 a year, from 1.5.26 ("מעבר לסף פעילות של 25,000 ₪"). This replaces the 0.6% in the older terms PDF used by the layout-gaps research. | [P] [bitpay.co.il](https://www.bitpay.co.il/he) |
| Tax invoice | "על מקבל התשלום באמצעות bit חלה החובה ... להפיק חשבונית מס כחוק" (whoever receives payment by Bit must issue a tax invoice/receipt as the law requires). | [P] [bitpay.co.il](https://www.bitpay.co.il/he) |
| Business use | At sign-up the user declares business or non-business use. | [P] Bit terms §2.3 (via layout gaps) |
| Discrepancy | Grow's article says a ₪50,000 annual cap applies to personal use, while Bit's site says ₪100,000. Check in the app. | [P] [Grow magazine](https://grow.business/magazine-bit/) vs [bitpay.co.il](https://www.bitpay.co.il/he) |

## 2. "bit לעסקים" through a payment company: yes

Bit business payments are sold by the partner companies, not by Bank Hapoalim directly. Grow describes it like this: "המערכת של בית העסק מייצרת קישור לתשלום באפליקציית bit הכולל סכום מוגדר מראש" (the business's system creates a link to pay in the Bit app with a preset amount), shared by SMS, QR, a "pay" button on a site, or API. A clearing fee applies, and the personal annual cap does not. **[P]** [Grow magazine, updated 2026-11-02](https://grow.business/magazine-bit/)

### Grow (formerly Meshulam): the best fit

| Item | Finding | Tag / source |
|---|---|---|
| Create a link with an amount from our server | Yes. `CreatePaymentLink` with `products[data][0][price]` as the "product amount". "All requests must be sent exclusively from your server's back end." | [P] [Grow API: create payment link](https://developers.grow.business/reference/create-payment-link) |
| Bit as a method | Yes: a payment-method field can be set to show Bit. | [P] same page |
| Payment confirmation | Yes. "GROW's server notifies your server", then the site calls `approveTransaction`. Webhooks list "Specific paymentLinks" with `"status": "שולם"`. Webhooks are switched on by Grow support. | [P] [the process](https://developers.grow.business/reference/the-process), [webhooks](https://developers.grow.business/docs/webhooks) |
| Links without code | Payment links can also be made by hand in the Grow dashboard ("סכום סגור" fixed or "סכום פתוח" open amount) and sent by WhatsApp, email or SMS. | [P] [Grow payment links](https://grow.business/payment-links/) |
| Receipts | "התשלום מתקבל מיידית בחשבון Grow וחשבונית דיגיטלית נשלחת אוטומטית ללקוח" (payment lands in the Grow account at once and a digital invoice is sent to the customer automatically). | [P] [Grow payment links](https://grow.business/payment-links/) |
| Eligibility | "מתאים לכל בעל עסק" (any business owner), after opening an account and approval of business details. Joining is "כפופה למתן אישור מחברות האשראי" (subject to the card companies' approval). *עוסק פטור* is not named explicitly. | [P] [payment links](https://grow.business/payment-links/), [fees](https://grow.business/fees/) |
| Sandbox | Yes, with test cards. **Bit has no sandbox**: Bit test payments "will be charged as real transactions". Live keys come only after Grow approves the integration. | [P] [testing environment](https://developers.grow.business/reference/testing-environment) |
| API access cost | Not published. "Please contact Grow support to obtain the necessary permissions." | [P] [create payment link](https://developers.grow.business/reference/create-payment-link) |
| Platform change | Grow is moving customers "בהדרגה למערכת החדשה" (gradually to a new system). The two sandbox hosts in the docs differ (`sandbox.meshulam.co.il`, `sandboxapi.grow.link`). | [P] [API page](https://grow.business/api-developers/) |

**Grow fees** **[P]** [grow.business/fees, updated 2026-11-10](https://grow.business/fees/):

| Plan | Monthly | Per transaction | Included per month | Extra |
|---|---|---|---|---|
| Grow Light | ₪29 (annual, ₪348 up front) | 1% | 20 transactions + 20 documents | ₪1 each |
| Grow | ₪59 annual / ₪69 monthly | 0.75% | 100 transactions + 100 documents | ₪0.5 each |

Both: no setup fee, Bit at the same rate as cards ("ללא תשלום נוסף לחברות האשראי/bit/PayBox"), no annual volume cap, minimum ₪0.5 per transaction, refund ₪6.90, chargeback ₪55, incoming bank transfer ₪1, payouts up to ₪15,000 a day. Whether the API and webhooks are included in Grow Light is not stated; ask Grow.

### Morning (Green Invoice) digital payments

Morning resells Grow's clearing ("שירותי הסליקה ניתנים באמצעות Grow") inside its invoicing app. **[P]** [Morning digital payments](https://www.greeninvoice.co.il/digital-payments/)

| Item | Finding | Tag / source |
|---|---|---|
| Payment links | Best plan and above. Fixed or open amount, shared by email, WhatsApp, QR or embedded in a site. Invoice issued automatically. | [P] [create payment link](https://www.greeninvoice.co.il/help-center/create-payment-link/), [open-amount link](https://www.greeninvoice.co.il/help-center/open-payment-link/) |
| Bit request on an invoice | An emailed invoice can carry a "pay with bit" button. | [P] [invoice with Bit button](https://www.greeninvoice.co.il/help-center/digital-payments-bit-request/) |
| Bit link in the app | Link valid 15 minutes from sending; Bit gives "9 minutes to complete the payment from the moment the link is opened". | [P] [app Bit link](https://www.greeninvoice.co.il/help-center/app-bit-link/) |
| API and webhooks | Listed for Best and above only. | [P] [pricing](https://www.greeninvoice.co.il/pricing/) |
| Cost | Best ₪45/month (annual) or ₪54 monthly; processing 1.4% + ₪1.2 per transaction; **Bit adds 0.3%**; ₪16.9 operational fee in months under ₪5,000 volume; payout on the 10th of the month. No free plan (one-month trial). | [P] [pricing](https://www.greeninvoice.co.il/pricing/), [fees and terms](https://www.greeninvoice.co.il/help-center/dp-terms/) |

Morning is worth it only if the owner wants Morning for bookkeeping anyway. As a payment link alone it costs more than Grow directly. **[I]**

### PayMe

PayMe offers Bit as an add-on to a PayMe clearing account: a link opened on the phone or a QR code, valid "9 minutes from sale creation", up to ₪5,000 per transaction and ₪20,000 a month, with "an additional fee ... provided before service activation". **[P]** [PayMe Bit article](https://help.payme.io/hc/en-us/articles/360013964399-Alternative-Payment-Method-Bit). Fees are not published, so it was not compared further.

## 3. Alternatives without a gateway

| Option | Amount link? | Notes | Tag / source |
|---|---|---|---|
| **PayBox for business** | No documented link with an amount. Requests are made in the app ("לוחצים על 'בקשה' ... מזינים סכום"). The page mentions a "לינק אישי" sent on WhatsApp but not its format or whether it carries an amount. | "זמין לעוסקים פטורים או מורשים בלבד" (registered dealers only). Free up to ₪100,000 a year on PayBox Plus. Money goes to the in-app balance first. No webhook. | [P] [PayBox business](https://www.payboxapp.com/business), [FAQ](https://www.payboxapp.com/faq) |
| **Pepper Pay** | — | Discontinued: "השירות לא קיים יותר" (the service no longer exists). | [S] [protocol.co.il](https://protocol.co.il/pepper-pay/) |
| **Bank transfer** | No | Account details on the confirmation page. Works everywhere but is slow, and the owner's account number would be public. | [I] |

## 4. Desktop vs mobile

| Flow | Mobile | Desktop |
|---|---|---|
| **Owner sends a Bit request (phase 1)** | Customer gets a push notification in Bit and approves. Nothing for the site to do. | Same: the request arrives on the customer's phone, so it works whatever device they ordered on. **[I]** |
| **Customer sends to the owner's number (fallback)** | Copy buttons for phone, amount and ref, then the customer opens Bit. | Show phone, amount and ref large and readable; the customer pays on their phone. **[I]** |
| **Grow payment link (later)** | Customer "starts in the browser, moves to Bit, and completes the payment in the app". The thank-you page may open in the default browser instead; Grow recommends "Open in a New Tab". | Grow's hosted page offers card payment on desktop. Grow's article says Bit on a website can go by SMS link to the customer's phone. Desktop Bit behaviour is not described in Grow's API docs, so test it before launch. | 

Sources for the Grow row: **[P]** [Bit redirect](https://developers.grow.business/reference/bit-redirect), [Grow magazine](https://grow.business/magazine-bit/).

## 5. Cost comparison for a small bakery

Example: 30 orders a month, ₪150 average, so ₪4,500 a month (₪54,000 a year). Prices before VAT. An *עוסק פטור* can't reclaim VAT, so add 18%. **[I]**, using the fee tables above.

| Route | Monthly cost (approx.) | Automatic "paid"? | Receipt issued? |
|---|---|---|---|
| Personal Bit, owner sends requests | ₪0 up to ₪25k/year, then 0.8% (about ₪19/month averaged over this example year) | No | No, owner must issue receipts separately |
| PayBox Plus (dealer) | ₪0 up to ₪100k/year | No | No |
| Grow Light | ₪29 + ₪45 (1%) + ₪10 (10 extra transactions) ≈ **₪84**, plus extra documents | Yes (webhook, if included in Light) | Yes |
| Grow | ₪59 + ₪34 (0.75%) ≈ **₪93** | Yes | Yes |
| Morning Best + digital payments | ₪45 + ₪77 (1.7% for Bit) + ₪36 (₪1.2 × 30) + ₪16.9 ≈ **₪175** | Yes (Best has webhooks) | Yes, plus full bookkeeping |

The personal account looks free, but it gives no confirmation, it needs a separate receipt for every payment, and the owner's private account carries the business. A ₪29–59 plan removes that manual work. **[I]**

## 6. What this means for the site

**Phase 1 (now, no gateway):** **[I]**

- Confirmation page and message: "We'll send you a Bit request for ₪X from <owner name>" plus "or send ₪X to 05X-XXXXXXX in Bit, with `T-1042` in the note". Copy buttons for phone, amount and ref. No "pay now" button.
- The amount always comes from the stored order on the server, never from a URL parameter.
- `/admin` settings: Bit phone and display name. Orders: a manual "paid" toggle with method and amount.
- Keep payment behind a small interface (for example `createPaymentRequest(order)` that returns either instructions or a URL), so Grow can replace it later without touching the pages.

**Later (business registered, ordering live):** **[I]**

- Server route creates a Grow payment link for the order (`CreatePaymentLink`, amount from the order) and redirects the customer to it.
- Webhook route checks the notification, calls `approveTransaction`, marks the order paid and stores the transaction id.
- Keys in environment variables, like the Firebase config.
- Test Bit with a real ₪1 payment, since there is no Bit sandbox.

## 7. Open questions

1. **Does Grow accept an *עוסק פטור*, and are the API and webhooks included in Grow Light?** Not stated. Ask Grow sales.
2. **Personal Bit cap:** ₪100k (Bit's site) or ₪50k (Grow's article)? Check in the app.
3. **PayBox "לינק אישי":** can it carry an amount? Check in the PayBox app.
4. **Bit on desktop via Grow:** SMS to the phone, QR, or card only? Test in the sandbox and with a real ₪1 payment.
5. **Which payment company:** Grow is the best documented. Cardcom, Upay and Gama are also on Bit's partner list but were not researched.

## Sources

**Bit**
- [bit for businesses](https://www.bitpay.co.il/he/bit-for-businesses) · [bitpay.co.il home (limits, fees, invoice duty)](https://www.bitpay.co.il/he) · [Bit terms PDF](https://static.bankhapoalim.co.il/portalserver/mobile/bit/v2/htmls/termPDF.pdf)

**Grow**
- [Grow: bit לעסקים (updated 2026-11-02)](https://grow.business/magazine-bit/) · [payment links (updated 2026-10-18)](https://grow.business/payment-links/) · [fees (updated 2026-11-10)](https://grow.business/fees/) · [API and developers](https://grow.business/api-developers/)
- Developer docs: [create payment link](https://developers.grow.business/reference/create-payment-link) · [the process](https://developers.grow.business/reference/the-process) · [Bit redirect](https://developers.grow.business/reference/bit-redirect) · [webhooks](https://developers.grow.business/docs/webhooks) · [testing environment](https://developers.grow.business/reference/testing-environment)

**Morning (Green Invoice)**
- [pricing](https://www.greeninvoice.co.il/pricing/) · [digital payments](https://www.greeninvoice.co.il/digital-payments/) · [fees and terms](https://www.greeninvoice.co.il/help-center/dp-terms/) · [create payment link](https://www.greeninvoice.co.il/help-center/create-payment-link/) · [open-amount link](https://www.greeninvoice.co.il/help-center/open-payment-link/) · [invoice with Bit button](https://www.greeninvoice.co.il/help-center/digital-payments-bit-request/) · [app Bit link](https://www.greeninvoice.co.il/help-center/app-bit-link/) · [exempt dealer](https://www.greeninvoice.co.il/exempt-dealer/)

**Others**
- [PayMe: Bit](https://help.payme.io/hc/en-us/articles/360013964399-Alternative-Payment-Method-Bit) · [PayBox business](https://www.payboxapp.com/business) · [PayBox FAQ](https://www.payboxapp.com/faq) · [protocol.co.il: Pepper Pay (secondary)](https://protocol.co.il/pepper-pay/) · [B4X forum: Bit payment request (secondary)](https://b4x.com/android/forum/threads/bit-israeli-ewallet-payment-request.166901) · [Shopify community, 2021 (secondary, stale)](https://community.shopify.com/t/can-i-integrate-bit-payment-solution-from-bank-hapoalim-in-israel/50409)
