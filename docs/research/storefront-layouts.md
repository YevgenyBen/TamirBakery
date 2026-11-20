# Storefront layouts for a home bakery selling made-to-order goods

Research for **Tamir Bakery**: a Hebrew-first (RTL) web store with English as a second language, Israeli market. Researched 2026-11-20.

How to read the citations: each claim links to the source that owns it. Claims marked **[secondary]** rest on a secondary or summarising source, either because the primary text could not be retrieved (for example, Nevo and justice.gov.il block automated fetching) or because no primary source exists. Claims marked **[judgement]** are design inferences, not findings.

---

## TL;DR: recommendations

1. **Use an order-request flow, not a full cart, for custom cakes. Use a normal cart for fixed items.** Custom orders are a guided form on the product page: size, flavour, inscription, reference photo, date, pickup or delivery. It ends in "Send order request", and you confirm by WhatsApp or SMS before the customer pays or leaves a deposit. Fixed-price items (cookies, standard cakes) can use add-to-cart with guest checkout. Keep WhatsApp as a visible secondary channel. **[judgement, built on the evidence in §3]**
2. **Above the fold on mobile:** logo and language switch, one real photo of the product, a one-line value proposition with your lead time ("עוגות בהזמנה אישית · הזמנה עד 3 ימים מראש"), and a primary CTA ("להזמנת עוגה") next to a WhatsApp CTA. Do not use an auto-rotating carousel.
3. **Always show a price.** Show "from ₪X" plus example prices for common configurations. Never show "price on request" alone.
4. **Show trust signals that are real:** the baker's photo and story, photos of real orders, reviews, and clear pickup, delivery and cancellation rules. Only use the word "kosher" (כשר) if you hold a Rabbinate kashrut certificate.
5. **Israeli legal items that affect layout:** a footer with business details (name, ID or business number, address) and cancellation terms; an accessibility statement link in the header or footer. If you are a small exempt business you may not strictly need IS 5568 / WCAG 2.0 AA, but build to that level anyway. Offer Bit and credit card at payment.

### Recommended page map

```
/ (Home)                     /en/ mirrors everything in LTR
├── /cakes  (custom cakes: category + "how ordering works")
│   └── /cakes/[slug]        product + configurator → order request
├── /shop   (fixed-price items: cookies, pastries, standard cakes)
│   └── /shop/[slug]         product → add to cart
├── /cart → /checkout        guest by default
├── /order-request/thanks    "we'll confirm within X hours on WhatsApp"
├── /about                   the baker, kitchen, kashrut/allergen stance
├── /faq                     lead times, pickup, delivery area, allergens, cancellation
├── /contact                 WhatsApp, phone, pickup address/area, hours
├── /policies                terms, cancellation (ביטול עסקה), privacy, shipping/pickup
└── /accessibility           הצהרת נגישות (accessibility statement)
```

### Homepage section order (mobile, top to bottom)

| # | Section | Why | Evidence |
|---|---------|-----|----------|
| 1 | Header: logo · visible links (Cakes, Shop, About, Contact, 4 or fewer) · language switch · cart | Hidden navigation hurts discoverability. Show the links when there are 4 or fewer. | [NN/g, hamburger menus](https://www.nngroup.com/articles/hamburger-menus/) |
| 2 | Hero: one static photo of a real cake, a value proposition with the lead time, and two CTAs (Order a cake / WhatsApp) | 57% of viewing time is above the fold. Prefer a static hero to a carousel. | [NN/g, scrolling & attention](https://www.nngroup.com/articles/scrolling-and-attention/); [NN/g, carousels](https://www.nngroup.com/articles/designing-effective-carousels/) |
| 3 | Category tiles: Birthday · Bar/Bat Mitzvah · Shabbat/holiday · Cookies & pastries | Help users choose a well-defined scope from the homepage. | [Baymard homepage UX](https://baymard.com/research-articles/ecommerce-homepage-ux) |
| 4 | "How ordering works" in 3–4 steps (choose → personalise → pick date → we confirm → pickup/delivery), with the lead time stated | Disclose delivery windows and process up front. **[partly judgement]** | [NN/g, trustworthy design](https://www.nngroup.com/articles/trustworthy-design/) |
| 5 | Featured or popular cakes, each with a "from ₪" price | Show prices for common scenarios. | [NN/g, show prices for common scenarios](https://www.nngroup.com/articles/show-prices-for-common-scenarios/) |
| 6 | About the baker: a real photo and 2–3 sentences, linking to /about | Real people and authentic imagery build trust. | [NN/g, About Us](https://www.nngroup.com/articles/about-us-information-on-websites/) |
| 7 | Reviews and testimonials, with customer photos where possible, plus links to Google or Facebook reviews | Users trust third-party sources over company-controlled content. | [NN/g, trustworthy design](https://www.nngroup.com/articles/trustworthy-design/) |
| 8 | Pickup and delivery area, hours, and a WhatsApp/phone contact block | Contact info should be easy to find. | [NN/g, About Us](https://www.nngroup.com/articles/about-us-information-on-websites/) |
| 9 | Footer: business details, policies, cancellation terms, accessibility statement, language switch | Israeli law (see §7) | §7 |

---

## 1. Homepage structure

- **Above the fold still gets most attention, but people do scroll.** In NN/g's 2018 eyetracking study, 57% of viewing time was above the fold and about 74% was within the first two screenfuls. Put the value proposition and the main CTA in the first screen, and avoid "false floors" that hide the content below. [NN/g, Scrolling and Attention (2018)](https://www.nngroup.com/articles/scrolling-and-attention/)
- **Skip the auto-rotating carousel.** Only 36% of Baymard-benchmarked sites use one, and about 75% of those implement it badly. Static content sections plus featured categories perform as well and are simpler to run. [Baymard, Homepage UX](https://baymard.com/research-articles/ecommerce-homepage-ux) NN/g likewise recommends a static hero, at most 5 frames if you do use a carousel, and no auto-forwarding on mobile. [NN/g, Carousels](https://www.nngroup.com/articles/designing-effective-carousels/)
- **Help visitors pick a scope.** 62% of sites fail to help users reach a well-defined category from the homepage. Feature popular categories directly. Baymard notes that wizards suit gift-buying, which describes much of the custom-cake demand. [Baymard, Homepage UX](https://baymard.com/research-articles/ecommerce-homepage-ux)
- **Use real, bespoke imagery.** Baymard's guideline "Invest in Bespoke Imagery" ties good photography to first impressions. [Baymard](https://baymard.com/research-articles/ecommerce-homepage-ux) NN/g found users see through stock photos and prefer photos of real staff and products. [NN/g, About Us](https://www.nngroup.com/articles/about-us-information-on-websites/)
- **Don't show pop-ups or overlays on arrival.** 59% of sites show ad-like content, and overlays drew the strongest negative reactions. The same applies to language and country overlays: auto-select instead. [Baymard, Homepage UX](https://baymard.com/research-articles/ecommerce-homepage-ux)
- **Add a tagline and a short "about" on the homepage.** NN/g structures About content at four levels, starting with a homepage tagline that says what the company does. [NN/g, About Us](https://www.nngroup.com/articles/about-us-information-on-websites/)
- **Search is optional at this catalogue size. [judgement]** Baymard's "make search obvious" guideline (22% of sites fail it) targets large catalogues. With fewer than about 30 products, visible categories matter more. [Baymard](https://baymard.com/research-articles/ecommerce-homepage-ux)

## 2. Product listing and product detail pages for custom items

### Listing pages
- On mobile, show one card per product, not one per flavour or size. Baymard: "Combine product variations into one list item" (42% of sites don't). [Baymard, Mobile UX best practices](https://baymard.com/blog/mobile-ux-ecommerce)
- Put a "from ₪X" price and the lead time on each card ("זמן הכנה: 3 ימים"). **[judgement, following NN/g on upfront disclosure](https://www.nngroup.com/articles/trustworthy-design/)**

### Product page: option pickers
- **Use buttons or chips for size, not drop-downs.** 57% of sites still use drop-downs, which hide options. [Baymard, Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux) Show size as the number of servings ("12–15 מנות") plus diameter. Users judge size from images: 42% try to, and 37% of sites provide no in-scale image. Include a photo with a knife, a hand or a plate for scale. [Baymard, Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux)
- **Input types:** platform docs show the standard building blocks are a text field (short inscription), a text area (longer message), a date picker, and a file uploader (reference photo), each of which can be marked *required*. Order the inputs so details come first. [Ecwid help: text, calendar, file uploader](https://support.ecwid.com/hc/en-us/articles/8751424680988); [Wix: customer message box](https://support.wix.com/en/article/adding-a-customer-message-box-to-your-wix-stores-product-page)
- **Inscription field [judgement]:** show a character limit and live counter, give the input `dir="auto"` so Hebrew and English both render correctly ([W3C](https://www.w3.org/International/questions/qa-html-dir.en.html)), and preview the text on a cake image if feasible. Baymard found gift senders value seeing what the final item and message will look like. [Baymard, Gifting flow](https://baymard.com/research-articles/gifting-flow)
- **Gifting:** 80% of sites hide gift options on the product page. Add "this is a gift" and "message card" options there. [Baymard, Gifting flow](https://baymard.com/research-articles/gifting-flow)

### Price display for variable or quote-based items
- **Show representative prices** ("1 kg chocolate cake, 20 servings: ₪180") rather than "price on request" or a complex calculator. NN/g found simple example-price tables beat calculators, and listed missing prices as a top design mistake. [NN/g, Show Prices for Common Scenarios](https://www.nngroup.com/articles/show-prices-for-common-scenarios/) If a detailed quote needs a long form, show clearly labelled price ranges. [NN/g, Trustworthy design](https://www.nngroup.com/articles/trustworthy-design/)
- **Update a running total as options change, and show the delivery fee near the buy button.** 67% of sites don't estimate total cost near the "Buy" button. [Baymard, Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux) Unexpected extra costs are the top abandonment reason, at 40% (later Baymard figures say 48%). [Baymard, Checkout flow](https://baymard.com/blog/checkout-flow-ux-optimization); [Baymard, Store pickup](https://baymard.com/research-articles/store-pickup-as-shipping-option)
- Israeli law requires the total price to be shown before the transaction. [CPFTA consumer bulletin (gov.il PDF)](https://www.gov.il/BlobFolder/generalpage/cpfta_bulletin_in_languages/he/docs_%D7%A2%D7%9C%D7%95%D7%9F%20%D7%A6%D7%A8%D7%9B%D7%A0%D7%95%D7%AA%20%D7%A0%D7%91%D7%95%D7%A0%D7%94%20%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf)

### Lead time, date and pickup/delivery selection
- **Show actual dates, not "3–5 days".** 41% of sites show no delivery date. Users misread speed ranges, and windows wider than 5–7 days cause hesitation. [Baymard, Delivery date vs speed](https://baymard.com/blog/shipping-speed-vs-delivery-date) The 2026 checkout best practices add a live order-cutoff countdown, which 83% of sites lack. [Baymard, Checkout UX 2026](https://baymard.com/blog/current-state-of-checkout-ux)
- **Use a calendar picker for near-term dates and disable dates you can't fulfil.** NN/g recommends calendar pickers for dates close to today, disabling impossible dates, and labelling "today". [NN/g, Date input](https://www.nngroup.com/articles/date-input/) For Tamir, disable dates inside the lead time, closed days, and Shabbat/holidays if relevant. The he-IL locale data starts the week on Sunday with a Friday–Saturday weekend: CLDR `weekInfo` = `{firstDay: 7, weekend: [5,6]}`, checked via `Intl.Locale('he-IL')` in Node 22. **[primary data: Unicode CLDR via ICU]**
- **Put pickup and delivery in one selector, with times.** 50% of sites omit some fulfilment options from the selector. Users assumed pickup would be available the same day unless told otherwise. [Baymard, Store pickup as a shipping option](https://baymard.com/research-articles/store-pickup-as-shipping-option) Shopify's native pickup shows a "usually ready in" processing time at checkout. A calendar date and slot picker needs an app. [Shopify Help: local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup)
- **Slow delivery drives abandonment** (20–22% in Baymard surveys), so state the earliest available date prominently. [Baymard, Store pickup](https://baymard.com/research-articles/store-pickup-as-shipping-option)

### Allergen and kashrut info
- **Allergens:** put a short allergen line on every product page ("מכיל: גלוטן, ביצים, חלב. עלול להכיל: אגוזים") with a link to the full policy in the FAQ. **[weak evidence: best practice. No primary Israeli rule for unpackaged, made-to-order food was found; see Open questions]**
- **Kashrut:** under the Kashrut Fraud Prohibition Law, 1983, a food business may not present itself as kosher in writing without a kashrut certificate, and producers may not present a product as kosher "in advertising or in any other way" without one. [Knesset, Law text (PDF)](https://fs.knesset.gov.il/10/law/10_lsr_209742.pdf) A 2021 court ruling held that certificate-styled "alternative supervision" wording also counts as fraud. [Israel Hayom [secondary]](https://www.israelhayom.co.il/article/841605) A 2017 High Court ruling reportedly allows a factual description of practices as long as the word "kosher" isn't used. [Kipa [secondary]](https://www.kipa.co.il/חדשות/בגצ-מסעדה-תוכל-להציג-את-הקפדתה-בנושא-הכשרות-כל-עוד-לא-תשתמש-/) **Layout consequence:** design a kashrut slot (badge plus certificate image on /about and in the product-page details) that shows *only* when a certificate exists. Otherwise show a neutral, factual "ingredients & kitchen" note, and get legal review of the wording.

## 3. Ordering flow

### Cart+checkout vs order request vs WhatsApp

| Option | Strengths | Weaknesses | Evidence |
|---|---|---|---|
| **Cart + checkout** | Familiar. Instant payment. Suits fixed items. | Custom cakes need a feasibility check (date, design). Forcing payment before confirmation risks refunds. | Baymard checkout research below |
| **Order-request form** (configure, then "send request", then confirm, then pay) | Captures structured specs. The baker approves before payment. Matches made-to-order reality. | Extra step. Must state the response time. **No primary UX research found for this pattern in B2C food** | [judgement] |
| **WhatsApp** (`wa.me` link with a prefilled message) | Nearly universal in Israel: 98% use it, 95% daily, per ISOC-IL figures reported by Globes **[secondary]**. Conversational and supports photos. | Unstructured. Specs get lost. Phone number is required. | [Globes](https://en.globes.co.il/en/article-globes-ranks-whatsapp-as-israels-top-2024-brand-1001484162); [WhatsApp click-to-chat](https://whatsapp.com/faq/en/general/26000030) |

**Recommendation [judgement]:** a hybrid.
- Fixed items go through cart and checkout.
- Custom cakes go through the product-page configurator and an order request. The confirmation page and message say "נאשר בוואטסאפ תוך X שעות". After confirmation, send a payment link (Bit or card) for a deposit or full payment.
- Every product page and the header get a **WhatsApp button that prefills the configured options** using `https://wa.me/972XXXXXXXXX?text=<urlencoded summary>` (international format, no `+` or leading zero). [WhatsApp FAQ](https://whatsapp.com/faq/en/general/26000030) This keeps WhatsApp's familiarity without losing the structured data.

### Guest checkout and form minimisation
- **Guest checkout is the default and is visually prominent.** 18–24% of US shoppers abandoned because they were forced to create an account, and 47–62% of sites don't make guest the most prominent option (figures differ by survey year). [Baymard, Guest checkout prominence (2023)](https://baymard.com/blog/make-guest-checkout-prominent); [Baymard, Checkout flow](https://baymard.com/blog/checkout-flow-ux-optimization) Offer account creation only on the confirmation page. 56% of sites don't do this. [Baymard, Checkout UX 2026](https://baymard.com/blog/current-state-of-checkout-ux)
- **Use few fields.** The average checkout has 19.9 form elements, and an optimised one can have 12. [Baymard, Checkout flow](https://baymard.com/blog/checkout-flow-ux-optimization) For a pickup order: name, phone, email, date and slot, notes. Add address fields only when "delivery" is chosen.
- **Explain why you need a phone number.** 68% of respondents are reluctant to give one, and 47% of sites don't explain the reason. A bakery has a genuine reason ("to confirm details on WhatsApp"), so state it next to the field. [Baymard, Checkout UX 2026](https://baymard.com/blog/current-state-of-checkout-ux)
- **Mark both required and optional fields.** 32% of participants missed a required field when only optional fields were marked. [Baymard, Checkout UX 2026](https://baymard.com/blog/current-state-of-checkout-ux) Put labels above fields, not inside them. [Baymard, Mobile checkout forms (2015)](https://baymard.com/research-articles/mobile-ecommerce-checkout-forms)
- **Keep the process short.** 17% abandon because checkout is too long or complex. [Baymard, Checkout UX 2026](https://baymard.com/blog/current-state-of-checkout-ux)

### Payment methods
- **Offer local methods.** 9–11% of shoppers abandon when their preferred payment option is missing. Use radio buttons or tabs rather than a drop-down, consider preselecting the most common method, and label the button with the next step ("המשך לתשלום ב-Bit"). [Baymard, Payment method selection](https://baymard.com/research-articles/payment-method-selection)
- **Israel:** cards dominate (about 70% of purchases in 2022), and P2P apps are widespread: about 55% used payment apps in 2023. [Stripe guide [secondary]](https://stripe.com/resources/more/payments-in-israel) The Bank of Israel's June 2023 survey found 42% of payment-app value is person-to-business, with lower app preference among Haredi and Arab populations, so card must always be available. [Bank of Israel press release](https://boi.org.il/en/communication-and-publications/press-releases/bank-of-israel-publishes-a-survey-of-means-of-payment-preferences-in-israel/)
- **Bit online:** available through PSPs, for example Isracard/PayMe via Wix. ILS only. No installments. Transactions expire after about 10 minutes. [Wix Help: Bit](https://support.wix.com/ko/article/connecting-bit-provided-by-isracard-powered-by-payme-as-a-payment-method); [PayMe Help: Bit](https://help.payme.io/hc/en-us/articles/360013964399-Alternative-Payment-Method-Bit)
- **Credit-card installments (תשלומים):** expected for larger purchases in Israel, but **no primary data source was found**. Offering them on event cakes above a threshold is optional. **[weak evidence]**

## 4. Trust signals for a small home business

- **About the maker:** a real photo, a short story, the location or area, and how to reach a real person through several channels. NN/g found authenticity and multiple contact routes signal openness, while stock photos and walls of text hurt. [NN/g, About Us (2019)](https://www.nngroup.com/articles/about-us-information-on-websites/)
- **NN/g's four credibility factors** are design quality (no typos or broken links), upfront disclosure (costs, policies, delivery windows), comprehensive and current content (show the process and people, not just results), and connection to the rest of the web (link to third-party reviews and social profiles). [NN/g, Trustworthiness in Web Design (2016)](https://www.nngroup.com/articles/trustworthy-design/) For a bakery, show photos *of baking*, not only finished cakes.
- **Reviews:** users suspect company-hosted testimonials are filtered. Link to Google or Facebook reviews too. [NN/g, About Us](https://www.nngroup.com/articles/about-us-information-on-websites/) Let shoppers browse reviewer-submitted photos (57–63% of sites don't), and reply to negative reviews (89% don't). [Baymard, Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux) Small review counts can backfire, so wait until you have enough. [NN/g, Social Proof](https://www.nngroup.com/articles/social-proof-ux/)
- **Policies near the decision:** 60% of users look for the return policy on the product page, and 44% of sites don't link it there. For a bakery, this is the cancellation and change policy. [Baymard, Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux)
- **Licensing and kashrut:** show certificates only if they exist (see §2). Whether a home kitchen needs a Ministry of Health food-production licence to sell is an open question (see below).

## 5. Mobile-first layout

- **Navigation:** with 4 or fewer top-level links, show them rather than hiding them behind a hamburger. Hidden navigation reduced discoverability by more than 20%. [NN/g, Hamburger menus (2016)](https://www.nngroup.com/articles/hamburger-menus/) A tab or nav bar suits up to about 5 items. [NN/g, Mobile navigation patterns](https://www.nngroup.com/articles/mobile-navigation-patterns/)
- **Primary CTA in the first screen,** with no auto-forwarding carousel on mobile. [NN/g, Carousels](https://www.nngroup.com/articles/designing-effective-carousels/)
- **Forms:** use one column, labels above fields, the correct input types (`tel`, `email`, `date`), and adaptive error messages (93% of sites don't use them). [Baymard, Mobile UX](https://baymard.com/blog/mobile-ux-ecommerce); [Baymard, Mobile forms](https://baymard.com/research-articles/mobile-ecommerce-checkout-forms) The on-screen keyboard can cover about 70% of the screen, so keep each step short.
- **Touch targets:** at least 24×24 CSS px, per WCAG 2.2 SC 2.5.8 (AA). This is not legally required in Israel, which references WCAG 2.0, but it is cheap to meet. [W3C, Understanding 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **Sticky bottom bar on product pages [judgement]:** live total plus "Order" or "Send request" plus a WhatsApp icon.

## 6. RTL and bilingual (Hebrew/English) layout

### Direction and markup
- Set `<html lang="he" dir="rtl">` for Hebrew and `<html lang="en" dir="ltr">` for English. Set direction in markup, not CSS, and declare `lang` separately from `dir`. [W3C, Structural markup and RTL](https://www.w3.org/International/questions/qa-html-dir.en.html)
- Use CSS logical properties (`margin-inline-start`, `text-align: start`) so one stylesheet mirrors itself. Prefer longhands, because logical shorthand support was flagged as incomplete. [W3C](https://www.w3.org/International/questions/qa-html-dir.en.html); [W3C, Hebrew Gap Analysis](https://www.w3.org/TR/hebr-gap/)
- Give form inputs `dir="auto"`, and `dirname` if you need the direction server-side, for inscriptions and names. [W3C](https://www.w3.org/International/questions/qa-html-dir.en.html)
- For inline mixed text, wrap English names, phone numbers and prices in `<span dir="ltr" lang="en">`. Use `<bdi>` for runtime values such as customer names in an order summary. Use the Unicode isolates (RLI, LRI, PDI, FSI) in `title` and `alt` where markup is impossible. [W3C, Inline markup and bidi](https://w3.org/International/articles/inline-bidi-markup/index.en.html)

### What to mirror
| Mirror | Don't mirror |
|---|---|
| Overall layout, nav order, back/next arrows, carousel direction, progress steps ("how ordering works" 1→4 runs right-to-left), sliders, rating-star fill | Logos, photos and illustrations, checkmarks, clocks, media playback controls, phone and card numbers (digit order), real-world objects, handed tools such as the search magnifier |

Sources: [Apple HIG, Right to left](https://developer.apple.com/design/human-interface-guidelines/right-to-left.md); [Material Design, Bidirectionality](https://m1.material.io/usability/bidirectionality.html)

- **Numerals:** Hebrew uses Western Arabic digits. Never reverse the digits within a number. Do reverse the order of numerals in a progress or rating sequence. [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/right-to-left.md)
- **Currency and dates:** use `Intl` with `he-IL` rather than hand-formatting. It yields `‏1,234.50 ‏₪` (number then symbol, with RLM marks) and `20.11.2026`. `en-IL` yields `₪1,234.50` and `20/11/2026`. **[primary data: Unicode CLDR via ICU in Node 22]**
- **Paragraph alignment:** align each paragraph to its own language, and keep list alignment consistent. [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/right-to-left.md)

### Language switcher
- Make it visible in the header, not only in the footer. Label options with the language's own name ("English" / "עברית"), not just a flag. Remember the choice. NN/g recommends the top-right corner for LTR sites. [NN/g, Language switching (2022)](https://www.nngroup.com/articles/language-switching-ecommerce/) **[judgement]** In RTL the "end" corner is top-left, so place it at the inline-end of the header in both languages, which keeps it mirrored and consistent. Auto-select from the browser language, but never with an overlay. [Baymard](https://baymard.com/research-articles/ecommerce-homepage-ux)
- Keep switching languages separate from currency and shipping. Everything stays ₪ and Israel-only. [NN/g](https://www.nngroup.com/articles/language-switching-ecommerce/)

### Fonts and typography
- Choose a family with matched Hebrew and Latin. Heebo's Hebrew is drawn by Oded Ezer and its Latin extends Roboto. [Google Fonts: Heebo](https://fonts.google.com/specimen/Heebo) Assistant, Rubik and Frank Ruhl Libre (serif, for a "crafted" feel) also cover both scripts. [Google Fonts](https://fonts.google.com/specimen/Assistant)
- Hebrew has no capitals and looks small next to uppercase Latin, so bump the Hebrew size by about 2pt where they sit together. [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/right-to-left.md)
- Avoid `letter-spacing` on right-aligned or justified Hebrew, and type real Unicode quote marks instead of using `<q>`. [W3C, Hebrew Gap Analysis](https://www.w3.org/TR/hebr-gap/)

## 7. Israel-specific requirements that affect layout

> Not legal advice. The primary regulation text on Nevo and justice.gov.il could not be fetched (robots-blocked). Items marked [secondary] should be confirmed with a lawyer or accessibility consultant.

### Accessibility (Equal Rights for Persons with Disabilities law and Service Accessibility Regulations 2013, reg. 35)
- **Standard:** websites providing a public service must conform to the Israeli standard. The W3C policy register records "WCAG 2.0 Level AA is required" for Israel. [W3C WAI, Israel policy](https://www.w3.org/wai/policies/israel) Reg. 35 (unofficial English translation) requires level AA for non-public bodies, subject to burden provisions. [UN DESA-hosted translation of the 2013 Regulations](https://social.desa.un.org/sites/default/files/migrated/15/2019/11/Israel_Service-Accessibility-Adjustments.pdf) IS 5568 is based on WCAG 2.0. Part 2, on documents, explicitly adopts WCAG 2.0 (2008). [IS 5568-2, gov.il PDF](https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-2-september-2023.pdf)
- **Accessibility statement (הצהרת נגישות):** must describe how the site was made accessible, how to use it, what isn't accessible and the alternatives, and how to contact the business about accessibility. [Kol-Zchut [secondary]](https://www.kolzchut.org.il/he/הנגשת_אתרי_אינטרנט_ואפליקציות_לאנשים_עם_מוגבלות) Access Israel adds the accessibility coordinator's contact details. [Access Israel [secondary]](https://aisrael.org/%D7%9E%D7%99%D7%93%D7%A2-%D7%9C%D7%9E%D7%A0%D7%92%D7%99%D7%A9/%D7%9E%D7%93%D7%A8%D7%99%D7%9B%D7%99-%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%9C%D7%94%D7%A0%D7%92%D7%A9%D7%AA-%D7%90%D7%AA%D7%A8-%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98-3/) The original reg. 35 requires a notice "in a prominent place on the site". [UN DESA translation](https://social.desa.un.org/sites/default/files/migrated/15/2019/11/Israel_Service-Accessibility-Adjustments.pdf) **Layout:** link to `/accessibility` from the global footer, plus a visible header link, which is the common Israeli practice.
- **Small-business exemptions [secondary]:** an exempt dealer (עוסק פטור) or a business with turnover under ₪100k is fully exempt. ₪100k–300k is exempt, renewable every 3 years. ₪300k–1M is exempt only for sites that existed before 26.10.2017, so **a new site in this band must be accessible**. [Kol-Zchut, exemptions](https://www.kolzchut.org.il/he/פטור_מחובת_הנגשה_לאתרי_אינטרנט_ואפליקציות) Even an exempt business should publish accessible contact methods. **Recommendation:** build to WCAG 2.0 AA regardless. Most of it costs nothing at design time, and the business may grow.
- **Enforcement [secondary]:** up to ₪50,000 in civil damages without proof of harm, plus class actions. [Kol-Zchut](https://www.kolzchut.org.il/he/הנגשת_אתרי_אינטרנט_ואפליקציות_לאנשים_עם_מוגבלות)
- **WCAG 2.0 AA items that most shape this design:** 1.1.1 alt text on cake photos; 1.4.3 contrast 4.5:1 (watch pastel palettes); 3.1.1 and 3.1.2 language of page and of parts (`lang="en"` on English snippets inside Hebrew pages); 3.3.1 and 3.3.2 labels and error identification on the order form; 2.4.4 link purpose. [WCAG 2.0](https://www.w3.org/TR/WCAG20/)

### Consumer Protection Law: distance sales (עסקת מכר מרחוק)
- **Disclose before the sale:** seller name, ID or business number, and address; main product features; price and payment terms; delivery timing and method; how long the offer is valid; warranty; and the cancellation right. Show the total price before the transaction. [CPFTA bulletin (gov.il)](https://www.gov.il/BlobFolder/generalpage/cpfta_bulletin_in_languages/he/docs_%D7%A2%D7%9C%D7%95%D7%9F%20%D7%A6%D7%A8%D7%9B%D7%A0%D7%95%D7%AA%20%D7%A0%D7%91%D7%95%D7%A0%D7%94%20%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf); [Kol-Zchut [secondary]](https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק)
- **Written confirmation** in Hebrew or the marketing language, by delivery at the latest. It must include how to cancel and the producer's name, so the order confirmation email or message needs these fields. [Kol-Zchut [secondary]](https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק)
- **Cancellation:** the general rule is 14 days, with a fee of 5% or ₪100, whichever is lower. **Perishable food (מוצרים פסידים) is excluded.** Made-to-order goods (מוצרים בהזמנה אישית) are excluded, but per the CPFTA bulletin the consumer may cancel within 3 days, or later only if production hasn't started. [CPFTA bulletin](https://www.gov.il/BlobFolder/generalpage/cpfta_bulletin_in_languages/he/docs_%D7%A2%D7%9C%D7%95%D7%9F%20%D7%A6%D7%A8%D7%9B%D7%A0%D7%95%D7%AA%20%D7%A0%D7%91%D7%95%D7%A0%D7%94%20%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf) **Layout:** write a bakery-specific cancellation and change policy (for example, "free changes until X days before"). Link it from the product page near the CTA, from checkout, and from the footer.
- **Cancellation info on the homepage [secondary]:** where the seller has a website, cancellation terms must appear on the homepage, with an online cancellation option next to them if deals are made online. [Kol-Zchut](https://www.kolzchut.org.il/he/ביטול_עסקת_מכר_מרחוק) **Layout:** add a footer link "ביטול עסקה" that opens a simple cancellation form, alongside business details (name, business number, address or pickup area, phone, email).

---

## Sources

**UX research**
- Baymard: [Homepage UX](https://baymard.com/research-articles/ecommerce-homepage-ux) · [Product page UX](https://baymard.com/research-articles/current-state-ecommerce-product-page-ux) · [Checkout flow optimisation](https://baymard.com/blog/checkout-flow-ux-optimization) · [Checkout UX best practices 2026](https://baymard.com/blog/current-state-of-checkout-ux) · [Guest checkout prominence](https://baymard.com/blog/make-guest-checkout-prominent) · [Delivery date vs speed](https://baymard.com/blog/shipping-speed-vs-delivery-date) · [Store pickup as shipping option](https://baymard.com/research-articles/store-pickup-as-shipping-option) · [Payment method selection](https://baymard.com/research-articles/payment-method-selection) · [Gifting flow](https://baymard.com/research-articles/gifting-flow) · [Mobile UX best practices](https://baymard.com/blog/mobile-ux-ecommerce) · [Mobile checkout forms (2015)](https://baymard.com/research-articles/mobile-ecommerce-checkout-forms)
- NN/g: [Scrolling and attention](https://www.nngroup.com/articles/scrolling-and-attention/) · [Carousels](https://www.nngroup.com/articles/designing-effective-carousels/) · [About Us](https://www.nngroup.com/articles/about-us-information-on-websites/) · [Trustworthy design](https://www.nngroup.com/articles/trustworthy-design/) · [Social proof](https://www.nngroup.com/articles/social-proof-ux/) · [Show prices for common scenarios](https://www.nngroup.com/articles/show-prices-for-common-scenarios/) · [Hamburger menus](https://www.nngroup.com/articles/hamburger-menus/) · [Mobile navigation patterns](https://www.nngroup.com/articles/mobile-navigation-patterns/) · [Date input](https://www.nngroup.com/articles/date-input/) · [Language switching](https://www.nngroup.com/articles/language-switching-ecommerce/)

**Internationalisation and accessibility standards**
- W3C: [Structural markup & RTL](https://www.w3.org/International/questions/qa-html-dir.en.html) · [Inline bidi markup](https://w3.org/International/articles/inline-bidi-markup/index.en.html) · [Hebrew Gap Analysis](https://www.w3.org/TR/hebr-gap/) · [WCAG 2.0](https://www.w3.org/TR/WCAG20/) · [WCAG 2.2 SC 2.5.8](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) · [WAI policy: Israel](https://www.w3.org/wai/policies/israel)
- [Apple HIG: Right to left](https://developer.apple.com/design/human-interface-guidelines/right-to-left.md) · [Material Design: Bidirectionality](https://m1.material.io/usability/bidirectionality.html)

**Platform docs**
- [Shopify: local pickup](https://help.shopify.com/manual/shipping/setting-up-and-managing-your-shipping/local-methods/local-pickup) · [Ecwid: text/calendar/file inputs](https://support.ecwid.com/hc/en-us/articles/8751424680988) · [Wix: customer message box](https://support.wix.com/en/article/adding-a-customer-message-box-to-your-wix-stores-product-page) · [Wix: Bit via PayMe](https://support.wix.com/ko/article/connecting-bit-provided-by-isracard-powered-by-payme-as-a-payment-method) · [PayMe: Bit](https://help.payme.io/hc/en-us/articles/360013964399-Alternative-Payment-Method-Bit) · [WhatsApp click-to-chat](https://whatsapp.com/faq/en/general/26000030) · [Google Fonts: Heebo](https://fonts.google.com/specimen/Heebo)

**Israeli government and legal**
- [CPFTA consumer bulletin (gov.il PDF)](https://www.gov.il/BlobFolder/generalpage/cpfta_bulletin_in_languages/he/docs_%D7%A2%D7%9C%D7%95%D7%9F%20%D7%A6%D7%A8%D7%9B%D7%A0%D7%95%D7%AA%20%D7%A0%D7%91%D7%95%D7%A0%D7%94%20%D7%A2%D7%91%D7%A8%D7%99%D7%AA.pdf) · [Kashrut Fraud Prohibition Law 1983 (Knesset PDF)](https://fs.knesset.gov.il/10/law/10_lsr_209742.pdf) · [IS 5568-2 (gov.il PDF)](https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-2-september-2023.pdf) · [Service Accessibility Regulations 2013, unofficial English translation (UN DESA)](https://social.desa.un.org/sites/default/files/migrated/15/2019/11/Israel_Service-Accessibility-Adjustments.pdf) · [Bank of Israel payment preferences survey](https://boi.org.il/en/communication-and-publications/press-releases/bank-of-israel-publishes-a-survey-of-means-of-payment-preferences-in-israel/)

**Secondary**
- Kol-Zchut: [Website accessibility](https://www.kolzchut.org.il/he/הנגשת_אתרי_אינטרנט_ואפליקציות_לאנשים_עם_מוגבלות) · [Accessibility exemptions](https://www.kolzchut.org.il/he/פטור_מחובת_הנגשה_לאתרי_אינטרנט_ואפליקציות) · [Distance sale](https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק) · [Cancelling a distance sale](https://www.kolzchut.org.il/he/ביטול_עסקת_מכר_מרחוק)
- [Access Israel: website accessibility guide](https://aisrael.org/%D7%9E%D7%99%D7%93%D7%A2-%D7%9C%D7%9E%D7%A0%D7%92%D7%99%D7%A9/%D7%9E%D7%93%D7%A8%D7%99%D7%9B%D7%99-%D7%A0%D7%92%D7%99%D7%A9%D7%95%D7%AA/%D7%94%D7%9E%D7%93%D7%A8%D7%99%D7%9A-%D7%9C%D7%94%D7%A0%D7%92%D7%A9%D7%AA-%D7%90%D7%AA%D7%A8-%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98-3/) · [Globes on WhatsApp usage](https://en.globes.co.il/en/article-globes-ranks-whatsapp-as-israels-top-2024-brand-1001484162) · [Stripe: payments in Israel](https://stripe.com/resources/more/payments-in-israel) · [Israel Hayom on kashrut fraud ruling](https://www.israelhayom.co.il/article/841605) · [Kipa on 2017 High Court kashrut ruling](https://www.kipa.co.il/חדשות/בגצ-מסעדה-תוכל-להציג-את-הקפדתה-בנושא-הכשרות-כל-עוד-לא-תשתמש-/)

---

## Open questions and weak evidence

1. **Order-request vs cart for custom food:** no primary UX research (Baymard or NN/g) was found that compares quote or request flows against immediate checkout for B2C made-to-order goods. The hybrid recommendation is a judgement. Validate it with a few real customers, or by tracking request-to-paid conversion.
2. **WhatsApp ordering:** the reach figures (98% use, 95% daily) come from Globes citing ISOC-IL, not the ISOC-IL report itself. No research measures conversion of WhatsApp ordering against web forms.
3. **Reg. 35 exact text:** the 2017 amendment (statement contents, turnover tiers) was not retrieved from a primary source, because Nevo and justice.gov.il are robots-blocked and the Knesset `.doc` was unreachable. The thresholds and statement contents rely on Kol-Zchut and Access Israel. Also check whether IS 5568 Part 1 has moved beyond WCAG 2.0. Part 2 (2023) still references WCAG 2.0.
4. **Which turnover tier applies to Tamir:** this determines whether accessibility is legally required or only recommended. The owner needs to confirm their dealer status (עוסק פטור / מורשה) and turnover.
5. **Made-to-order cancellation:** the CPFTA bulletin describes a 3-day / "production not started" window for made-to-order goods, and a separate exclusion for perishable food. How these interact for a custom cake (both perishable and made-to-order) should be checked against the Consumer Protection (Cancellation of Transaction) Regulations 2010 and section 14C of the Consumer Protection Law, with a lawyer.
6. **VAT-inclusive pricing:** the CPFTA bulletin requires the total price to be shown. The specific VAT-inclusion rule (section 17B) wasn't verified. It is moot if the business is an exempt dealer, since no VAT is charged.
7. **Home-kitchen food licensing:** whether a home bakery needs a Ministry of Health food-production licence or a municipal business licence to sell online was not verified. The gov.il service pages failed to load. This affects what "licensing" trust badge, if any, can be shown.
8. **Allergen disclosure:** no Israeli rule was confirmed for allergen disclosure on unpackaged, made-to-order food sold online. The recommendation is best practice only.
9. **Kashrut wording without a certificate:** the scope of the 2017 High Court ruling and any later legislative changes come from news coverage only. Get legal review before writing any kashrut-adjacent copy.
10. **Credit-card installments:** these are widely assumed to be expected in Israel, but no primary data was found on how often they are used for small purchases.
11. **Baymard figures differ between articles** (guest checkout: 18% vs 24% abandonment, 47% vs 62% of sites; extra costs: 40% vs 48%) because of different survey years. Directionally consistent, but don't quote a single number as definitive.
