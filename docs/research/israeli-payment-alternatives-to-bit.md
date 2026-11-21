# Israeli payment alternatives to Bit: wallets, gateways, PayPal and bank transfer

- **Research date:** 2026-11-21
- **Question:** What alternatives to Bit exist in Israel for taking customer payments, and what are their limits? For each: fees, personal vs business rules, a link with a preset amount (and order ref) by API with a webhook, transaction and annual limits, and fit for phase 1 (unregistered, no gateway) vs later (registered, ordering live).
- **Scope:** PayBox personal, Apple Pay and Google Pay, payment gateways and link providers (Cardcom, Tranzila, PayPlus, Hyp/EasyCount, Upay, iCount, Gama, EasyCard, Z-Credit, Isracard), PayPal Israel, bank transfer (regular, ZAHAV, Masav instant payments and request-to-pay), bank-app requests, and the payment-services law as far as it touches personal wallets. Builds on [Bit payment links](bit-payment-links.md), which already covers personal Bit, Bit for business, Grow, Morning, PayMe, PayBox business and Pepper Pay. Those findings are not repeated here.
- **Status:** research, not financial or legal advice. Prices exclude VAT unless stated.

## Short answer

**No alternative beats a manual request for phase 1, but PayBox is a real second option.** A personal PayBox account is free up to ₪50,000 a year received (Basic) or ₪100,000 (Plus), with no receiving fee today. Like personal Bit, it has no documented link with an amount and no confirmation to our server. Apple Pay and Google Pay can't be used to receive money person to person in Israel: they only work as buttons inside a gateway. PayPal works for a private person but costs 3.4% + ₪1.20 per payment and Israelis can't send each other "friends and family" payments. A bank transfer is the cheapest fallback but slow unless the customer pays an extra fee for a real-time (ZAHAV) transfer.

**Every gateway with a preset-amount link, API and webhook needs a registered business.** Of the ones that publish prices, Grow is still the cheapest for our volume. Upay (via SUMIT) and EasyCard are close on percentage but have other costs or gaps. Cardcom, Tranzila and PayPlus have good APIs but do not publish prices.

**Recommendation (consistent with the Bit file, with two additions):**

1. **Phase 1:** keep manual Bit requests as the main route. Offer **PayBox** as an equal second option for customers who don't use Bit, and **bank transfer** details only inside the private order confirmation, never on a public page. Watch the yearly totals: our example (₪54,000/year) is over the PayBox Basic cap, and Bit charges 0.8% above ₪25,000.
2. **Later:** **Grow** remains the first choice. New facts: Grow's payment links also take Apple Pay, Google Pay, PayBox and bank transfer, and a secondary source says Grow's FAQ accepts an *עוסק פטור*. If Grow refuses or the API is not included in Grow Light, ask **Cardcom** and **Hyp** for quotes: both have a documented API with an order reference and a server notification.

## How to read the evidence tags

| Tag | Meaning |
|---|---|
| **[P]** | Read on the provider's own site, docs, terms or app-store listing, or on a Bank of Israel page. |
| **[S]** | Secondary source (comparison site, news, a partner's help centre, third-party docs). |
| **[I]** | My inference. Not stated in a source. |

**Sources I could not read:**

- Cardcom's fee article (`cardcom.solutions/עמלת-סליקה-לעסקים/`) and its exempt-dealer blog post both returned "המאמר לא נמצא" (article not found). Cardcom's API help centre (`cardcomapi.zendesk.com`) returned a client error. Cardcom API fields below come from a third-party summary, tagged [S].
- Hebrew Wikisource returned "url not found" for both payment laws. I used the Bank of Israel's hosted text of the 2019 law and a law firm's summary of the 2023 law.
- `financa.co.il` (PayBox limits) loaded without its article body.
- iCount's Israeli pricing (`icount.co.il`) was not reachable; `icount.net/plans` shows US dollar prices only.
- Upay's merchant pricing was not found. `upaycard.co.il` is Upay's consumer prepaid card, not clearing. I used SUMIT's help article on Upay clearing [S].
- No own-site pricing was found for EasyCard, Z-Credit, Pelecard, Max or Gama. EasyCard and Z-Credit figures come from comparison sites [S].
- Bank Hapoalim's fee PDF extracted with an unclear table layout for ZAHAV fees. Leumi's request-to-pay page gives no limits or fees.
- Nothing was tested in any app.

---

## 1. Corrections and updates to the Bit file

| Item | Finding | Tag / source |
|---|---|---|
| Personal Bit annual cap (open question 2) | ₪100,000 a year received, "including money collected through groups". This matches Bit's site; Grow's ₪50,000 looks out of date. | [S] [Bizportal, 16 Aug 2026](https://www.bizportal.co.il/financialconsumerism/news/article/20038919) |
| Bit sending limits (customer side) | ₪7,000 a day, ₪8,300 a month, ₪1,000 in the first 24 hours; balance up to ₪20,000. Large catering orders could hit the daily limit. | [S] same article |
| Business income | "תשלום שהתקבל תמורת שיעור, תספורת או עוגה הוא תקבול עסקי" (a payment received for a lesson, haircut or cake is business income), whatever the app's fee threshold. | [S] same article |
| Grow accepts *עוסק פטור* (open question 1) | A comparison site that checked 81 provider pages says Grow's FAQ answers yes. I could not see that FAQ on Grow's pages. | [S] [Arbiter, 6 Nov 2026](https://arbiter.co.il/credit-card-clearing-comparison) |
| Grow payment-link methods | "כרטיסי אשראי, Apple Pay, Google Pay, bit, PayBox והעברה בנקאית בקליק" (cards, Apple Pay, Google Pay, Bit, PayBox and one-click bank transfer). No separate fee for wallets on the fee page. | [P] [Grow payment links](https://grow.business/payment-links/), [Grow fees](https://grow.business/fees/) |
| Pepper Pay | Nothing new found. Still discontinued. | [I] |
| Fee threshold can change | The Bank of Israel let Bit and PayBox charge only above ₪25,000 a year at first; from early 2027 they may ask to change the threshold. | [S] [Calcalist, 27 Jun 2024](https://www.calcalist.co.il/investing/article/sjbxwryia) |

## 2. PayBox personal account

| Item | Finding | Tag / source |
|---|---|---|
| Tracks | Basic (automatic on download) and Plus (needs a free PayBox credit card). | [S] [Gadgety, 22 Oct 2025](https://www.gadgety.co.il/352191/paybox-new-model/) |
| Annual receiving | Basic "עד 50,000 ₪", Plus "עד 100,000 ₪". FAQ: "במסלול Basic אפשר לקבל עד 50,000 ש"ח בשנה ללא עמלות" (Basic can receive up to ₪50,000 a year with no fees). | [P] [PayBox terms, in force 01.11.2026](https://www.payboxapp.com/tos), [FAQ](https://www.payboxapp.com/faq) |
| Per payment and monthly | "עד 4,000 ₪ לפעולה בודדת" (₪4,000 per transaction); ₪10,000 a month sent; ₪1,000 a month from a non-PayBox card on Basic. | [P] [terms](https://www.payboxapp.com/tos) |
| Balance | Up to ₪50,000 at any moment (terms). Older news said ₪20,000; the terms are newer. | [P] [terms](https://www.payboxapp.com/tos) |
| Fees | "כיום אנחנו לא גובים עמלות על השירותים שלנו" (today we charge no fees), with the right to start. Payout to the bank: next business day for Sunday to Wednesday instructions. | [P] [terms](https://www.payboxapp.com/tos) |
| Confirmation | A transfer completes only when the recipient confirms; unconfirmed after 72 hours, it returns to the sender. | [P] [terms](https://www.payboxapp.com/tos) |
| Business use | The terms summary has no clause on business use ("שימוש עסקי", "עוסק" not found). PayBox business is "לעוסקים פטורים או מורשים בלבד". News: businesses that reach the Basic cap "יידרשו לעבור למסלול Plus" (will need to move to Plus). | [P] [terms](https://www.payboxapp.com/tos), [business](https://www.payboxapp.com/business); [S] [mako, 21 Oct 2025](https://www.mako.co.il/finances-news/Article-3a2f2532b660a91027.htm) |
| Link with amount | None documented. "Box קבוצה" collects from PayBox users only. No API, no webhook. | [P] [terms](https://www.payboxapp.com/tos) |

**Fit:** phase 1 yes, as a second option next to Bit. It is free for longer than Bit (no 0.8% fee above ₪25,000), but our example year (₪54,000) needs Plus. Later: no, it gives no confirmation. **[I]**

## 3. Apple Pay and Google Pay

| Item | Finding | Tag / source |
|---|---|---|
| Apple Cash (person to person) | "live in the United States ... Only available in the 50 United States, the District of Columbia, and Puerto Rico." Not in Israel. | [P] [Apple: set up Apple Cash](https://support.apple.com/en-us/HT207886) |
| Apple Pay in Israel | Launched May 2021 for paying with Israeli cards. | [S] [MacRumors](https://www.macrumors.com/2021/05/05/apple-pay-launches-in-israel/) |
| Google Pay | Israel is listed for "Pay online or in apps". Sending money: "You can use Google Pay to send money in India and Singapore" only. | [P] [Google Pay countries](https://support.google.com/googlepay/answer/12429287?hl=en) |
| Which gateways offer them | Grow, Hyp, PayPlus, Tranzila, Cardcom (inside the hosted page), Morning; most comparison rows list Apple Pay as supported with no separate price. Morning shows no Apple/Google Pay surcharge (only Bit +0.3%). | [P] pages in §4; [S] [systemcompare](https://systemcompare.co.il/best/payments/) |

**Fit:** neither is usable in phase 1. Later, they come free with the gateway; on a phone they are often the fastest checkout. **[I]**

## 4. Payment gateways and link providers

All of these clear on behalf of a business. Morning's guide says a business "חייב להיות מחובר לספק סליקה" (must be connected to a clearing provider) to take cards, and describes exempt dealers using one. None offers clearing to a private person with no business file. **[P]** [Morning: exempt-dealer clearing](https://www.greeninvoice.co.il/magazine/exempt-dealer-credit-clearing/); **[I]** for the last point.

### 4.1 Summary table

| Provider | Monthly | Per transaction | Link with amount (manual / API) | Order ref + server notice | Bit / Apple Pay / Google Pay | *עוסק פטור* | Tag / source |
|---|---|---|---|---|---|---|---|
| **Cardcom** | Not published. "No subscription for payment-only clients" (systemcompare). Refund fee ₪7.90 | ~1.2% (blog figure) | Yes / yes: "בקשת תשלום" by WhatsApp, SMS, email, QR "ללא עלות נוספת"; API `LowProfile/Create` with `Amount` | `ReturnValue` + `WebHookUrl`; test terminal `1000` | Bit (`UrlToBit`), PayPal, Apple/Google Pay in the hosted page | "Partial" (systemcompare) | [P] [payment request](https://www.cardcom.solutions/payment-request/), [Swagger](https://secure.cardcom.solutions/swagger/index.html?url=/swagger/v11/swagger.json); [S] [API summary](https://skillselion.com/skills/skills-il/tax-and-finance/cardcom-payment-gateway), [Arbiter](https://arbiter.co.il/credit-card-clearing-comparison), [QUASA](https://quasa.io/he/media/payplus-av-cardcom-htst-hmkhyr-qvbt-yvtr-mhmlh-hmpvrsmt) |
| **Tranzila** | Not published. From ₪29 (mobile), ₪39 (virtual terminal) per comparison | Not published | Yes ("דרישת תשלום" by email/SMS) / REST API v2 | Webhooks mentioned, no detail | Bit, Apple Pay, Google Pay | "פתרונות יחודיים עבור סליקת אשראי לעוסק פטור" (dedicated exempt-dealer solutions) | [P] [merchant account](https://www.tranzila.com/חשבון-סליקה/), [llms.txt](https://www.tranzila.com/llms.txt); [S] [systemcompare](https://systemcompare.co.il/best/payments/) |
| **PayPlus** | Not published (invoices from ₪19) | Not published | Yes / `PaymentPages/GenerateLink` with `amount` | `more_info` (up to 19 chars back) + `refURL_callback`; sandbox `restapidev.payplus.co.il` | "Bit / Apple Pay / Google Pay / Multi Pass" | "Partial" (systemcompare) | [P] [payment links](https://payplus.co.il/en/payment-links), [API FAQ](https://www.payplus.co.il/faq/%D7%A1%D7%9C%D7%99%D7%A7%D7%94-%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98%D7%99%D7%AA/%D7%97%D7%99%D7%91%D7%95%D7%A8-%D7%95%D7%94%D7%A8%D7%A9%D7%90%D7%95%D7%AA-API/How-to-Make-a-Request-to-a-Payment-Page-Using-an-API); [S] [systemcompare](https://systemcompare.co.il/best/payments/) |
| **Hyp** (YaadPay, CreditGuard, EasyCount) | "פרדס" (Pardes) ₪79 with clearing, unlimited documents; setup and clearing % "calculated separately". Lower plans are invoices only (₪21-49) | Not published | Yes / yes: "מגדירים סכום, מזינים את מספר הטלפון של הלקוח" (set the amount, enter the customer's phone), "in Hyp's system or via API" | Not stated on the pages read | "Apple Pay, Google Pay, ביט" | "Suitable" (systemcompare) | [P] [payment link, mod. 1 Jul 2026](https://hyp.co.il/payment-link/), [pricing, mod. 17 Jun 2026](https://hyp.co.il/digital-invoice-pricing/); [S] [systemcompare](https://systemcompare.co.il/best/payments/) |
| **Upay** (via SUMIT) | No monthly fee listed (SUMIT's own subscription not checked) | **1.1%**; next-day payout 1.4%; **Bit 1.6%**; foreign cards 4.2% | Through SUMIT | Not checked | Bit yes; Apple Pay not listed | Exempt-dealer registration is an accepted document | [S] [SUMIT help, 19 Aug 2026](https://intercom.help/sumit/he/articles/5832995-%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA-%D7%9C%D7%A1%D7%9C%D7%99%D7%A7%D7%AA-%D7%90%D7%A9%D7%A8%D7%90%D7%99-%D7%A2%D7%9D-upay) |
| **EasyCard** (איזיקארד) | ₪0, or ₪35 savings plan | ₪1 + 1.4%, or 1.2% on savings plan | Not checked | Not checked | Bit included, Apple Pay | Not stated | [S] [Arbiter](https://arbiter.co.il/credit-card-clearing-comparison) |
| **Z-Credit** | App ₪19.90; "Free" plan with no opening fee | From 1% (promotion) | Not checked | Not checked | Bit, Apple Pay | "Suitable" | [S] [Arbiter](https://arbiter.co.il/credit-card-clearing-comparison), [systemcompare](https://systemcompare.co.il/best/payments/) |
| **iCount** | Invoicing from $5/month; card processing "$10 plus fees"; API included | Not published | Not checked | Not checked | Not stated | Not stated | [P] [icount.net/plans](https://www.icount.net/plans/) (US site) |
| **Gama** (GamaPay, Phoenix Gama) | App is free; fees not shown | Not shown | Requests by SMS or WhatsApp | Not stated | Bit | Not stated | [P] [App Store](https://apps.apple.com/us/app/id1565942289) |
| **Isracard direct merchant** | ₪109 minimum monthly; ₪450 joining fee for online merchants | Per agreement | No link product on the fee page | n/a | n/a | Not stated | [P] [Isracard fee schedule, from 1 Nov 2024](https://business.isracard.co.il/link/986f6504c520477faace4c8b764d7b5b.aspx) |

### 4.2 Notes per provider

- **Cardcom** is the best documented after Grow: one call creates a hosted page with the amount, our order id in `ReturnValue`, and a `WebHookUrl` that Cardcom calls when the payment completes. It also returns a direct Bit URL. Prices need a quote. **[S]** for the field names, **[P]** that the Swagger API exists.
- **Hyp** now covers the older YaadPay and CreditGuard gateways **[S]** (plugin names and docs in search results) and EasyCount: the EasyCount WooCommerce plugin says it runs "via Hyp-EasyCount" and costs ₪299 setup + ₪59 a month plus VAT for that plugin. **[P]** [EasyCount readme](https://cdn.jsdelivr.net/wp/ezcount/trunk/readme.txt). The Pardes plan is ₪79 before any clearing percentage, so Hyp costs more than Grow at our volume unless its rate is very low. **[I]**
- **Upay** has the lowest published card rate (1.1%), but Bit costs 1.6% and the SUMIT subscription comes on top. Bank payouts start only after an identity meeting. **[S]**
- **Isracard direct** shows why small sellers use a facilitator: ₪109 a month minimum plus ₪450 joining before any commission. Isracard 360 (a link and remote-payment platform) exists but its 2023 article gives no price ("השירות כרוך בתשלום"). **[P]** fee schedule; **[S]** [mako sponsored, Jun 2023](https://www.mako.co.il/finances-special/small_business_solutions/Article-37593ea2a658881026.htm)
- **Max, iPay, Pelecard:** no small-business payment-link pricing found. Pelecard: no monthly fee, "from 0.7%" per site. **[S]** [Arbiter](https://arbiter.co.il/credit-card-clearing-comparison)

**Fit:** none of these in phase 1 (all need a business file). Later: Grow, then Cardcom or Hyp on quote. **[I]**

## 5. PayPal Israel

| Item | Finding | Tag / source |
|---|---|---|
| Personal account selling goods | Allowed, but "עליכם לשלם את העמלות הרלוונטיות בגין קבלת התשלום" (you must pay the applicable fees for receiving the payment); if you mainly sell, "כדאי לשקול להשתמש בחשבון עסקי" (consider a business account). | [P] [PayPal IL user agreement](https://www.paypal.com/il/webapps/mpp/ua/useragreement-full) |
| Friends and family | "תשלומים אישיים לבני משפחה וחברים אינם זמינים בישראל" (personal payments to family and friends are not available in Israel). So every domestic payment is commercial. | [P] same |
| Fee to receive (domestic) | **3.40% + ₪1.20** (4.01% + ₪1.42 with VAT). | [P] [merchant fees, updated 13 Oct 2026](https://www.paypal.com/il/webapps/mpp/merchant-fees) |
| Withdrawal | Free to an Israeli bank from ₪1,000; ₪8 below that; ₪22 to a card. ILS only. | [P] [consumer fees, updated 13 Oct 2026](https://www.paypal.com/il/webapps/mpp/paypal-fees) |
| Link with amount | `PayPal.Me/<name>/<amount>`, for example "/25", with an optional currency code ("/25AUD"). "Open to all account types". No order ref in the link. | [P] [What is PayPal.Me](https://www.paypal.com/us/cshelp/article/what-is-paypalme-help432) |
| API and webhook | PayPal's global REST APIs (orders, webhooks, sandbox) were not checked for Israel. | [I] |

**Fit:** phase 1 technically possible without a business file, but at ₪189 a month for our example it is the most expensive option, and most Israeli customers will not have PayPal. Later: only for customers abroad. **[I]**

## 6. Bank transfer and bank request-to-pay

| Item | Finding | Tag / source |
|---|---|---|
| Regular transfer, payer fee | ₪1.75 per transfer to another account in the app or site (regulated); ₪5.30 at a teller (Hapoalim, from 01/07/2026). Receiving: no fee listed. | [P] [Hapoalim fee schedule](https://www.bankhapoalim.co.il/sites/default/files/media/PDFS/Taarifon/united_july26.pdf) |
| Regular transfer, timing | Leumi: to Leumi accounts during the business day; "בבנקים אחרים בסוף יום העסקים" (to other banks at the end of the business day). | [P] [Leumi business transfers](https://www.leumi.co.il/Articles/42439) |
| ZAHAV (real-time) | Final within minutes; "אינו מוגבל לא בסכום מינימום ולא בסכום מקסימום" (no minimum or maximum). Business days 7:45-18:45, Fridays to 14:00. Hapoalim fee about ₪4.80 up to ₪1 million (table layout unclear). | [P] [BoI ZAHAV](https://www.boi.org.il/roles/paymentsystems/zahav/), [Hapoalim fees](https://www.bankhapoalim.co.il/sites/default/files/media/PDFS/Taarifon/united_july26.pdf) |
| Masav instant payments + request-to-pay | The BoI principles paper (updated 12/08/2026) says request-to-pay is for payments "בין יחידים, עסקים וממשלה" and "בקרוב מאוד יהפוך להיות חלק משגרת התשלומים" (will very soon be part of daily payments). No date, limits or fees. The payee's bank must vet each payee and needs the Supervisor's approval. | [P] [BoI R2P paper](https://boi.org.il/roles/supervisionregulation/payment-systems-oversight/חדשנות-בתשלומים/תשלומים-מיידים/מסמך-עקרונות-ליישום-בקשת-תשלום-r2p-בתשלומים-המידיים-של-מסב/), [BoI letter, 30 Apr 2025](https://www.boi.org.il/media/sdbas4ub/202509.pdf) |
| Bank app request today | Leumi's "בקשות תשלום וזיכויים מיידים": the customer approves a request in the Leumi app and "הכסף יועבר מיידית". Requests come "רק מבתי עסק/גופים שצורפו" (only from businesses that have joined). Shekels only. | [P] [Leumi immediate payments](https://www.leumi.co.il/he/Immediate-Payments) |
| Fee reform | From July 2027 (optional from Oct 2026) a "ניהול חשבון תשלום" fee: up to ₪10 for 100 actions a month, including "העברות בזמן אמת של עד 1 מיליון ש"ח". Applies to small businesses too. | [P] [BoI determination, 21 Jun 2026](https://www.boi.org.il/media/m4whhvkl/202616.pdf), [press release](https://boi.org.il/publications/pressreleases/21-06-2026/) |
| Link with amount | No bank offers a public link with an amount for a private payee. A request needs the bank to enrol the business first. | [I] from the rows above |
| Privacy | Publishing the account number exposes the owner's name, bank and branch. A direct debit still needs the account holder's own authorisation at their bank, so the main risk is spam and scam attempts. Show the details only in the customer's own confirmation message. | [I] |

**Fit:** phase 1, as a fallback for large or catering orders (Bit is capped at ₪7,000 a day for the payer). Later: Grow's "העברה בנקאית בקליק" covers it with confirmation. When Masav request-to-pay reaches small businesses, it may become the cheapest confirmed route; re-check in 2027. **[I]**

## 7. Regulatory context

| Point | Finding | Tag / source |
|---|---|---|
| Two laws | The Payment Services Law, 2019 (*חוק שירותי תשלום, התשע"ט-2019*) governs provider and user. The 2023 law (*חוק הסדרת העיסוק בשירותי תשלום וייזום תשלום, התשפ"ג-2023*) licenses non-bank payment companies. For payment companies the regulator is "רשות ניירות ערך" (the Israel Securities Authority). | [P] [2019 law, BoI copy, version 1.10.2024](https://www.boi.org.il/media/45chgare/173.pdf); [S] [Shibolet summary](https://www.shibolet.com/%D7%9E%D7%94%D7%93%D7%95%D7%A8%D7%94-%D7%9E%D7%99%D7%95%D7%97%D7%93%D7%AA-%D7%94%D7%95%D7%A8%D7%90%D7%95%D7%AA-%D7%94%D7%A8%D7%A9%D7%95%D7%AA-%D7%9C%D7%A0%D7%99%D7%99%D7%A8%D7%95%D7%AA/) |
| Licensing falls on the provider | Licences are for whoever moves the money (payment companies, initiators, marketplaces that take part in the flow). A bakery that only receives money needs no payment licence. | [S] Shibolet; [I] |
| Business payment account | The 2019 law's "business payment account" covers a corporation's account, accounts the provider designates as business, and accounts the Consumer Protection Commissioner finds to have business activity. So a wallet may reclassify a personal account that is used for sales. | [P] [2019 law](https://www.boi.org.il/media/45chgare/173.pdf); [I] for the consequence |
| Using a personal wallet for sales | No law found that forbids it. The limits come from each wallet's terms (Bit's business-use declaration, PayBox's caps) and from tax law. | [I] |
| Receipt duty | Unchanged from [licences research §5](home-bakery-licences-and-permits.md#5-invoices-receipts-and-bookkeeping): a receipt for every payment, whatever the method. Gateways like Grow and Cardcom issue it automatically. | [P] [Cardcom payment request](https://www.cardcom.solutions/payment-request/), Bit file |

## 8. Cost comparison for a small bakery

Same example as the Bit file: 30 orders a month, ₪150 average, ₪4,500 a month (₪54,000 a year). Before VAT; an *עוסק פטור* pays VAT on top and can't reclaim it. **[I]**, using the tables above.

| Route | Monthly cost (approx.) | Automatic "paid"? | Receipt issued? | Needs business file? |
|---|---|---|---|---|
| Personal Bit (from Bit file) | ₪0 to ₪25k/year, then 0.8% (about ₪19/month averaged) | No | No | No |
| **PayBox personal** | ₪0 (Basic to ₪50k/year; this example needs Plus) | No | No | No |
| Bank transfer | ₪0 for us; customer pays about ₪1.75 | No | No | No |
| PayPal personal | 3.4% (₪153) + ₪1.20 × 30 (₪36) ≈ **₪189** | Not checked | No | No |
| Grow Light (from Bit file) | ≈ **₪84** | Yes | Yes | Yes |
| Grow (from Bit file) | ≈ **₪93** | Yes | Yes | Yes |
| EasyCard, no plan | ₪1 × 30 + 1.4% (₪63) ≈ **₪93** [S prices] | Not checked | Not checked | Yes |
| EasyCard savings plan | ₪35 + 1.2% (₪54) ≈ **₪89** [S prices] | Not checked | Not checked | Yes |
| Upay via SUMIT | 1.1% ≈ ₪50 if all card; 1.6% ≈ ₪72 if all Bit; plus SUMIT subscription | Not checked | Through SUMIT | Yes |
| Hyp Pardes | ₪79 + clearing % (not published); at 1% ≈ **₪124** | Not checked | Yes | Yes |
| Morning Best (from Bit file) | ≈ **₪175** | Yes | Yes | Yes |
| Cardcom, Tranzila, PayPlus | Not published; ask for quotes | Yes (documented) | Cardcom, Tranzila: yes | Yes |

Grow and EasyCard are close on cost, but Grow is the only cheap option whose API, webhook and receipt are documented on its own site. **[I]**

## 9. What this means for the site

**Phase 1 (now, no gateway):** **[I]**

- Confirmation message offers: "We'll send you a Bit request", "or PayBox to 05X-XXXXXXX", "or bank transfer" (account details in this message only). Copy buttons for amount and order ref.
- `/admin`: payment method on the manual "paid" toggle gets a PayBox and a bank-transfer value next to Bit and cash.
- A simple yearly total per method in `/admin`, so the owner sees when Bit passes ₪25k or PayBox Basic nears ₪50k.

**Later:** Grow as planned in the Bit file. Keep the payment interface (`createPaymentRequest(order)`) generic: Cardcom (`ReturnValue`, `WebHookUrl`) and PayPlus (`more_info`, `refURL_callback`) fit the same shape if Grow falls through. **[I]**

## 10. Open questions

1. **PayBox and business use:** do PayBox's full terms (not the summary page) restrict receiving payment for goods on a personal account? Ask PayBox support.
2. **Grow and *עוסק פטור*:** confirm directly with Grow (still only [S]), and whether Grow Light includes the API.
3. **Cardcom, Hyp, PayPlus, Tranzila quotes:** monthly fee and rate for about ₪4,500 a month, with Bit and API.
4. **SUMIT's own subscription** when used with Upay clearing.
5. **Masav request-to-pay:** when will banks offer it to small businesses, at what fee?
6. **ZAHAV fee:** confirm Hapoalim's direct-channel price (₪4.80 or ₪5.30).

## Sources

**Wallets and Apple/Google**
- [PayBox terms (01.11.2026)](https://www.payboxapp.com/tos) · [PayBox FAQ](https://www.payboxapp.com/faq) · [PayBox business](https://www.payboxapp.com/business) · [Gadgety: PayBox tracks (secondary)](https://www.gadgety.co.il/352191/paybox-new-model/) · [mako: PayBox tracks (secondary)](https://www.mako.co.il/finances-news/Article-3a2f2532b660a91027.htm) · [Bizportal: Bit limits, Aug 2026 (secondary)](https://www.bizportal.co.il/financialconsumerism/news/article/20038919) · [Calcalist: Bit/PayBox fees, 2024 (secondary)](https://www.calcalist.co.il/investing/article/sjbxwryia)
- [Apple: set up Apple Cash](https://support.apple.com/en-us/HT207886) · [Google Pay countries](https://support.google.com/googlepay/answer/12429287?hl=en) · [MacRumors: Apple Pay in Israel (secondary)](https://www.macrumors.com/2021/05/05/apple-pay-launches-in-israel/)

**Gateways**
- [Grow payment links](https://grow.business/payment-links/) · [Grow fees](https://grow.business/fees/)
- [Cardcom home](https://www.cardcom.solutions/) · [Cardcom payment request](https://www.cardcom.solutions/payment-request/) · [Cardcom Swagger](https://secure.cardcom.solutions/swagger/index.html?url=/swagger/v11/swagger.json) · [Cardcom API summary (secondary)](https://skillselion.com/skills/skills-il/tax-and-finance/cardcom-payment-gateway)
- [Tranzila merchant account](https://www.tranzila.com/חשבון-סליקה/) · [Tranzila llms.txt](https://www.tranzila.com/llms.txt)
- [PayPlus payment links](https://payplus.co.il/en/payment-links) · [PayPlus Apple Pay](https://payplus.co.il/en/apple-pay) · [PayPlus API FAQ](https://www.payplus.co.il/faq/%D7%A1%D7%9C%D7%99%D7%A7%D7%94-%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98%D7%99%D7%AA/%D7%97%D7%99%D7%91%D7%95%D7%A8-%D7%95%D7%94%D7%A8%D7%A9%D7%90%D7%95%D7%AA-API/How-to-Make-a-Request-to-a-Payment-Page-Using-an-API) · [PayPlus GenerateLink](https://docs.payplus.co.il/reference/generate-paymetpage)
- [Hyp payment link](https://hyp.co.il/payment-link/) · [Hyp pricing](https://hyp.co.il/digital-invoice-pricing/) · [Hyp about](https://hyp.co.il/about-hyp/) · [Hyp Pay docs](https://developers.hyp.co.il/pay) · [EasyCount plugin readme](https://cdn.jsdelivr.net/wp/ezcount/trunk/readme.txt)
- [SUMIT: Upay clearing (secondary)](https://intercom.help/sumit/he/articles/5832995-%D7%94%D7%A6%D7%98%D7%A8%D7%A4%D7%95%D7%AA-%D7%9C%D7%A1%D7%9C%D7%99%D7%A7%D7%AA-%D7%90%D7%A9%D7%A8%D7%90%D7%99-%D7%A2%D7%9D-upay) · [iCount plans](https://www.icount.net/plans/) · [GamaPay app](https://apps.apple.com/us/app/id1565942289) · [Isracard merchant fees](https://business.isracard.co.il/link/986f6504c520477faace4c8b764d7b5b.aspx) · [Morning: exempt-dealer clearing](https://www.greeninvoice.co.il/magazine/exempt-dealer-credit-clearing/) · [Morning clearing plans](https://www.greeninvoice.co.il/clearing/compare/ecommerce)
- Comparisons (secondary): [Arbiter, 6 Nov 2026](https://arbiter.co.il/credit-card-clearing-comparison) · [systemcompare, 12 Oct 2026](https://systemcompare.co.il/best/payments/) · [QUASA, 22 Oct 2026](https://quasa.io/he/media/payplus-av-cardcom-htst-hmkhyr-qvbt-yvtr-mhmlh-hmpvrsmt) · [mako: Isracard 360, 2023](https://www.mako.co.il/finances-special/small_business_solutions/Article-37593ea2a658881026.htm)

**PayPal**
- [IL user agreement](https://www.paypal.com/il/webapps/mpp/ua/useragreement-full) · [IL merchant fees](https://www.paypal.com/il/webapps/mpp/merchant-fees) · [IL consumer fees](https://www.paypal.com/il/webapps/mpp/paypal-fees) · [What is PayPal.Me](https://www.paypal.com/us/cshelp/article/what-is-paypalme-help432)

**Banks and Bank of Israel**
- [BoI ZAHAV](https://www.boi.org.il/roles/paymentsystems/zahav/) · [BoI R2P principles](https://boi.org.il/roles/supervisionregulation/payment-systems-oversight/חדשנות-בתשלומים/תשלומים-מיידים/מסמך-עקרונות-ליישום-בקשת-תשלום-r2p-בתשלומים-המידיים-של-מסב/) · [BoI letter on P2R, 2025](https://www.boi.org.il/media/sdbas4ub/202509.pdf) · [BoI R2P readiness, 2022](https://www.boi.org.il/media/h2aadu3f/היערכות-לקבלת-בקשות-לתשלום-r2p.pdf) · [BoI fee determination, 2026](https://www.boi.org.il/media/m4whhvkl/202616.pdf) · [BoI fee press release](https://boi.org.il/publications/pressreleases/21-06-2026/) · [BoI fees info](https://boi.org.il/information/fees/)
- [Hapoalim fee schedule, Jul 2026](https://www.bankhapoalim.co.il/sites/default/files/media/PDFS/Taarifon/united_july26.pdf) · [Leumi immediate payments](https://www.leumi.co.il/he/Immediate-Payments) · [Leumi business transfers](https://www.leumi.co.il/Articles/42439)

**Law**
- [Payment Services Law 2019, BoI copy](https://www.boi.org.il/media/45chgare/173.pdf) · [Shibolet: ISA directives for payment companies (secondary)](https://www.shibolet.com/%D7%9E%D7%94%D7%93%D7%95%D7%A8%D7%94-%D7%9E%D7%99%D7%95%D7%97%D7%93%D7%AA-%D7%94%D7%95%D7%A8%D7%90%D7%95%D7%AA-%D7%94%D7%A8%D7%A9%D7%95%D7%AA-%D7%9C%D7%A0%D7%99%D7%99%D7%A8%D7%95%D7%AA/)
