# Israeli web accessibility law for a small home-bakery web store

- **Research date:** 2026-11-20
- **Scope:** What Israeli law requires for accessibility on a small commercial web store (home bakery, Hebrew first with an English translation, selling to Israelis), split into MANDATORY and ADVISABLE.
- **Status:** This is research, not legal advice. Section 8 lists the points where an Israeli lawyer should make the final call.

## How to read the evidence tags

Every claim carries one of these tags.

| Tag | Meaning |
|---|---|
| **[P]** | I read it in an official primary source: a gov.il PDF, a Knesset PDF, an SII catalogue page, or a court document. |
| **[P-copy]** | I read it in an official text (Reshumot / Kovetz Takanot) that a third party hosts. The copy is a scanned PDF, OCR'd on the fly, so the wording may contain OCR errors. Other sources corroborate it. |
| **[S]** | I could only find it in a secondary source: Kol-Zchut, Access Israel, ISOC-IL, law-firm or vendor sites. The URL is always given. |
| **[I]** | My inference from the sources. It is not stated in any of them. |

**Sources I could not fetch.** These were blocked by robots rules or bot protection, or the page was cut off:

- Nevo (`nevo.co.il`) was blocked by robots.txt.
- gov.il HTML pages (the Commission's FAQ and guide pages) returned client errors. gov.il **PDF** files did load.
- Hebrew Wikisource's consolidated text of the regulations was cut off at regulation 35.
- The btl.gov.il consolidated PDFs of the Law and the Regulations were also cut off before the relevant sections.

Where this happened, the claim was taken from the gazette text or the Commission's own PDFs and checked against secondary sources. The tags say which.

---

## 1. TL;DR: what this bakery store must do

1. **The duty applies by default.** A web store that sells to the public is an "internet service" (*שירות אינטרנט*) under regulation 35 of the Service Accessibility Regulations. It must meet **Israeli Standard SI 5568 Part 1 at level AA** (*"ברמה AA"*, reg. 35א(א)) unless an exemption applies. [P-copy]
2. **Check the turnover exemption first.** An **exempt dealer (*עוסק פטור*)**, or a business whose average annual turnover over the last three tax years **does not exceed NIS 100,000**, is fully exempt (reg. 35ו(ז)). [P-copy]
   - The temporary **NIS 300,000** tier **expired on 26 Oct 2020** (reg. 35ו(ח)). [P-copy + S]
   - The **NIS 1,000,000** tier covers only sites that were **already running before 26 Oct 2017** (reg. 35ו(ט)). A new bakery site therefore cannot use it. [P-copy + S]
3. **The standard is WCAG 2.0, not 2.1 or 2.2.** The current SI 5568-1 is the **September 2023** edition, published in Reshumot (Y.P. 11720) on 22 Oct 2023. It is based on **WCAG 2.0**, with Israeli changes. It does not mention WCAG 2.1 or 2.2. [P] Building to WCAG 2.1/2.2 AA is advisable and covers the requirement.
4. **Publish an accessibility statement.** It must be prominent (*"במקום בולט"*). It must list the adjustments made and give a way to report problems or request adjustments. It must also name an accessibility coordinator, but only if the law requires one (reg. 35ה). [P-copy] Publish it even if you are exempt; see section 4.
5. **There is a notice-and-cure period.** A deviation from the standard counts as a breach only if you were notified and did not fix it within a reasonable time, **no later than 60 days**. In the meantime you must offer an alternative "as soon as possible" (reg. 35א(ד)). [P-copy] A 2024 district-court ruling dismissed website class actions that were filed without prior notice. [S]
6. **An overlay does not make the site compliant.** Accessibility widgets, toolbars and overlays (*סרגל/תוסף נגישות*) neither exempt you nor are required. Secondary sources quote the Commission's gov.il FAQ saying exactly this. I could not fetch the FAQ page itself. [S]
7. **The litigation exposure is real.** A breach is a civil tort (§19נא). A court may award up to **NIS 50,000, indexed to CPI from Feb 2005 (about NIS 69,200 in late 2023)**, without proof of damage. [P: Commission slides] Accessibility claims may also be brought as class actions (Class Actions Law, Second Schedule item 9), and class actions under that item may also include damages without proof of harm (§20(ה)). [P]

---

## 2. Legal framework: law, then regulations, then standard

| Layer | Instrument | What it does | Citation / link | Evidence |
|---|---|---|---|---|
| Statute | **Equal Rights for Persons with Disabilities Law, 5758-1998** (*חוק שוויון זכויות לאנשים עם מוגבלות*), Chapter ה1 (accessibility), added by Amendment 2 (2005, Sefer HaChukim 1995, p. 288) | Creates the right to accessibility of public services. §19ב: *"אדם עם מוגבלות זכאי לנגישות למקום ציבורי ולשירות ציבורי"* ("a person with a disability is entitled to accessibility of public places and public services"). §19ה defines public service (*שירות ציבורי*) as a service *"המיועד לכלל הציבור"* ("intended for the general public"). §19ו bars a person who provides a public service or supplies a product from discriminating on grounds of disability. | Consolidated text (truncated when fetched): https://www.btl.gov.il/Laws1/00_0041_000000.pdf ; Amendment 2 gazette: https://fs.knesset.gov.il//16/law/16_lsr_299916.pdf ; Commission English translation (amended to No. 11, 2012): https://www.gov.il/BlobFolder/legalinfo/equality_law/en/sitedocs_equal_rights_for_persons_with_disabilities_law.pdf | [P] |
| Enforcement sections of the Law | §19מב accessibility coordinator (*רכז נגישות*); §19מג accessibility order; §19מח penalties; **§19נא civil tort**; **§19נג standing of the Commission and organisations** | Civil, criminal and administrative remedies; see section 7. | Section titles confirmed from the English translation's table of contents. Its letters map to the Hebrew numbering: 19PP=19מב, 19QQ=19מג, 19VV=19מח, 19YY=19נא, 19AAA=19נג. Content of §19נא and §19נג confirmed by the Commission's 2023 training slides: https://www.gov.il/BlobFolder/reports/jurist_attorney_course/he/sitedocs_civil_enforcement_yoed.pdf | [P] |
| Regulations | **Equal Rights for Persons with Disabilities (Accessibility Adjustments for Service) Regulations, 5773-2013** (*תקנות ... (התאמות נגישות לשירות), התשע"ג-2013*), Part ג', **regulations 35–35ו (internet services)**. These were completely replaced by the **2017 amendment, Kovetz Takanot 7876, 26 Oct 2017**, in force the same day. | Defines internet service, the AA duty, exemptions, the accessibility statement, notice-and-cure, third-party content, apps and video. | Gazette (copy hosted by ISOC-IL): https://www.isoc.org.il/files/docs/Takanot_negishut_26_10_2017.pdf ; consolidated text (truncated): https://www.btl.gov.il/Laws1/02_0041_100100.pdf ; Wikisource (truncated): https://he.wikisource.org/wiki/תקנות_שוויון_זכויות_לאנשים_עם_מוגבלות_(התאמות_נגישות_לשירות) | [P-copy] |
| Later amendments | Wikisource's amendment tags show **reg. 35 last amended in 5778 (2017/18)**. The later 5782 (2022) amendments touch other regulations, such as queue exemptions. I found no amendment to regs. 35–35ו between 2018 and Nov 2026. | Nothing relevant to websites has changed since 2017. | Wikisource header tags; the Knesset committee protocol of 24 Jan 2022 (https://oknesset.org/meetings/2/1/2168729.html) concerns queue exemptions only. The Commission's 2025 annual report (published Aug 2026) lists no pending change to reg. 35: https://www.gov.il/BlobFolder/reports/annual_activity_reports/he/sitedocs_annual-activity-report-2025.pdf | [P]/[S]; see section 8 |
| Standard | **SI 5568 Part 1**, *"קווים מנחים לנגישות תכנים באינטרנט: נגישות אתרי אינטרנט"* (Web Content Accessibility Guidelines: Websites Accessibility), **edition 28/09/2023**. It replaces the May 2021 edition, was gazetted in Y.P. 11720 on 22/10/2023, and has **0 amendment sheets** as of today. | Hebrew adoption of **WCAG 2.0** with national deviations; see the next table. The regulations incorporate it as *"תקן נגישות אינטרנט"*, meaning SI 5568 *"כתיקונם מזמן לזמן"* ("as amended from time to time"). The **2023 edition is therefore the binding one.** | SII catalogue: https://www.sii.org.il/he/lobby/standardization/standard-page?id=6751 ; full text (free, gov.il): https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf | [P] |
| Standard (documents) | **SI 5568 Part 2**, *"נגישות מסמכים דיגיטליים"* (digital documents), 28/09/2023, Y.P. 11720 | Covers PDFs and other documents published online. Part 1 excludes documents. | https://www.sii.org.il/lobby/standardization/standard-page?id=6753 ; https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-2-september-2023.pdf | [P] |
| Class actions | **Class Actions Law, 5766-2006**: Second Schedule **item 9**, *"תביעה בעילה לפי פרקים ד', ה' או ה'1 לחוק שוויון זכויות לאנשים עם מוגבלות"* ("a claim on a cause of action under chapters ד, ה or ה1 of the Equal Rights for Persons with Disabilities Law"); §20(ה) | Allows accessibility class actions. Damages without proof of harm are barred in class actions *except* under item 9. | Law as enacted (S.H. 2054, 12.3.2006): https://fs.knesset.gov.il/16/law/16_lsr_299748.pdf ; item 9 and §20(ה) as quoted in a court filing: https://elyon1.court.gov.il/heb/tovanot_y/2101b.pdf ; Commission slides (above) | [P] |

### SI 5568-1 (2023) compared with WCAG 2.0: the Israeli national changes [P]

Source: https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf

| WCAG 2.0 criterion | WCAG level | SI 5568-1 level | Relevance to the bakery |
|---|---|---|---|
| 1.2.1 Audio-only and video-only (prerecorded), 1.2.2 Captions (prerecorded), 1.2.3 Audio description or media alternative | A | **AA** | Applies to any product or "how we bake" videos. See reg. 35ד below: under-NIS-5M businesses are outside the regulation's video duties. |
| 1.2.4 Captions (live), 1.2.5 Audio description (prerecorded) | AA | **AAA**, on specific request only | Not required at AA. |
| **2.4.10 Section headings** | AAA | **AA** (stricter than WCAG) | Product, cart and checkout pages need a real heading structure. |
| 3.1.2 Language of parts | AA | **Not applicable** | The appendix reasons that UTF-8 lets screen readers detect Hebrew. 3.1.1 *Language of page* still applies, so the English pages need `lang="en"`. [I] |
| Digital documents | n/a | Excluded from Part 1 and covered by Part 2 | Applies to PDF menus and price lists. |

The standard says the English WCAG text prevails where the Hebrew translation differs. It says nothing about WCAG 2.1 or 2.2. [P]

---

## 3. MANDATORY requirements: checklist

These apply **unless** the bakery falls within an exemption in section 4. "Reg." means the Service Accessibility Regulations as amended in 2017, via the gazette copy cited above. [P-copy]

| # | Requirement | Source | Notes for this site |
|---|---|---|---|
| M1 | Make the internet service accessible under SI 5568 at **level AA**. Apps and time-based media are carved out to 35ג and 35ד. Quote: *"חייב יספק ... התאמות נגישות ... ברמה AA"* ("an obligated party shall provide ... accessibility adjustments ... at level AA"). | Reg. 35א(א), [P-copy] https://www.isoc.org.il/files/docs/Takanot_negishut_26_10_2017.pdf ; SI 5568-1 (2023), [P] | Applies to the whole store: catalogue, product pages, cart, checkout, account and contact pages. The scope covers every page that delivers "information or a public service" (definition of *שירות אינטרנט*: *"שנועדו לספק למשתמש מידע או שירות ציבורי"*, "intended to provide the user with information or a public service"). |
| M2 | **Product images:** text alternatives (WCAG/SI 1.1.1, level A) | SI 5568-1 = WCAG 2.0 1.1.1 [P] | Each product photo needs meaningful Hebrew alt text, and English alt text on the English pages. Decorative images take empty `alt=""`. |
| M3 | **Forms (order, checkout, contact, delivery-slot picker):** labels and instructions (3.3.2), error identification (3.3.1), error suggestion (3.3.3, AA), error prevention for financial transactions (3.3.4, AA), name/role/value (4.1.2), info and relationships (1.3.1) | SI 5568-1 = WCAG 2.0 [P] | Checkout is a financial transaction, so 3.3.4 applies: the order must be reversible, checked, or confirmed before it is final. A custom date or time picker for pickup slots must work with the keyboard and a screen reader. |
| M4 | **Keyboard** (2.1.1, 2.1.2), **focus order** (2.4.3), **visible focus** (2.4.7, AA) | SI 5568-1 = WCAG 2.0 [P] | Cart drawers, quantity steppers, modals and the cookie banner must all work without a mouse and must not trap focus. |
| M5 | **Contrast** of 4.5:1 for text (1.4.3, AA); **resize text to 200%** (1.4.4, AA); text in place of images of text (1.4.5, AA) | SI 5568-1 = WCAG 2.0 [P] | Bakery brand palettes (pastels on cream) often fail 4.5:1. Prices and "sold out" labels must be real text. |
| M6 | **Headings and section headings** (2.4.6 AA; **2.4.10 raised to AA in Israel**); page titles (2.4.2); link purpose (2.4.4); multiple ways to find pages (2.4.5, AA) | SI 5568-1 national change [P] | Use proper heading levels on product, category and checkout steps. Give each page a descriptive `<title>`. |
| M7 | **Language of page** (3.1.1); language of parts (3.1.2) is waived in Israel | SI 5568-1 [P]; application to this site [I] | Hebrew pages: `lang="he" dir="rtl"`. English translation: `lang="en" dir="ltr"`. The standard does not mention RTL specifically. Correct `dir` and a sensible reading order are needed for 1.3.2 *Meaningful sequence*. [I] |
| M8 | **Video** with captions or alternatives (1.2.x) **only if** you are a public body or your **average turnover is above NIS 5 million** (reg. 35ד(א): *"חייב שהמחזור הממוצע שלו עולה על 5 מיליון שקלים"*, "an obligated party whose average turnover exceeds NIS 5 million") | Reg. 35ד [P-copy]; ISOC 2017 summary [S] | A small bakery is almost certainly below NIS 5M, so the video-specific duties do not apply. It is still advisable to give any information needed to buy, such as ingredients and allergens, as text. [I] |
| M9 | **Digital documents** (PDF menus, price lists, allergen sheets) created or uploaded on or after 26 Oct 2017 must be accessible under the standard (now SI 5568-2) | Reg. 35א(ג) [P-copy]; SI 5568-2 [P] | Simplest fix: publish menus and allergen information as HTML, not as PDFs or images. |
| M10 | **Accessibility statement**, published prominently (*"במקום בולט"*) on the site and in any app. Required contents are in section 6. | Reg. 35ה [P-copy]; content corroborated by Access Israel / ADN [S] | Link it from the footer of every page, in both Hebrew and English. |
| M11 | **Notice and cure:** after a notice of a deviation, fix it within a reasonable time, **≤ 60 days** (*"לא יאוחר מ-60 ימים מיום קבלת ההודעה"*, "no later than 60 days from receipt of the notice"). In the meantime provide alternative adjustments *"בהקדם האפשרי"* ("as soon as possible"). | Reg. 35א(ד) [P-copy] | Have a working accessibility contact channel (email plus phone or WhatsApp) and a process for taking orders by phone as an alternative. [I] |
| M12 | **Third-party content:** you are not responsible for content that third parties supply or upload, unless you edited or produced it. You **must provide accessible infrastructure**, for example a field for image descriptions. | Reg. 35ב [P-copy] | Customer reviews and photos are covered. Embedded payment pages and other third-party widgets are *not* clearly covered, so treat checkout as yours (see section 8). [I] |
| M13 | **Publish accessibility arrangements** through the provider's website, where one exists | Reg. 34(א)(4) [P: btl.gov.il consolidated text, partial] | Covered by the accessibility statement. |
| M14 | **Name an accessibility coordinator in the statement only if the law requires you to appoint one.** §19מב applies to businesses that employ **25 or more** employees (Chamber of Commerce [S]). | Reg. 35ה (*"if required by law"*) [P-copy]; §19מב title [P]; 25-employee threshold [S] https://chamber.org.il/serviceslobby/legal/1859/107972/ | A home bakery with fewer than 25 employees is very likely **not** required to appoint one. Still give an accessibility contact person; see A6. In *Ben Or v. Aviv* (2024) the court rejected coordinator-publication claims against small businesses that had no duty to appoint one. [S] |
| M15 | **Non-discrimination:** do not refuse service or treat a customer worse because of disability, for example by refusing a phone order from a blind customer | Law §19ו [P] | Applies **even when the turnover exemption from reg. 35 applies**. [I] |

---

## 4. Exemptions and thresholds

Turnover is defined in reg. 35. *"מחזור"* (turnover) is the dealer's turnover under the VAT Law, or an association's turnover, or otherwise income in a tax year. *"מחזור ממוצע"* (average turnover) is the average over the **three tax years before the test**, ignoring years with zero turnover. [P-copy / P: btl definitions]

| Tier | Text (gazette, OCR) | Status in Nov 2026 | Applies to this bakery? |
|---|---|---|---|
| **Exempt dealer, or average turnover ≤ NIS 100,000** (reg. 35ו(ז)) | *"חייב שהוא עוסק פטור כהגדרתו בסעיף 1 לחוק המע"מ"* ("an obligated party that is an exempt dealer as defined in section 1 of the VAT Law"), or average annual turnover *"אינו עולה על 100,000 שקלים חדשים"* ("does not exceed NIS 100,000"): *"פטור מביצוע התאמות נגישות לפי סימן זה"* ("exempt from making accessibility adjustments under this subchapter") | **In force**, with no end date. [P-copy; corroborated by ADN, Access Israel (3 Feb 2024), Kol-Zchut] | **Yes, if** the bakery is registered as an *עוסק פטור*, or its 3-year average turnover is ≤ NIS 100k. This is the most likely exemption for a home bakery. Confirm with your accountant. The exempt-dealer ceiling is set by the Tax Authority and changes from year to year. |
| **Average turnover ≤ NIS 300,000** (reg. 35ו(ח)) | Extends 35ו(ז) *"עד יום ח' בחשוון התשפ"א (26 באוקטובר 2020)"* ("until 8 Cheshvan 5781, 26 October 2020") | **Expired on 26 Oct 2020.** [P-copy; Access Israel 2024 [S]; Maariv and ISOC 2017 reports [S]] | **No.** Many vendor sites (Kol-Zchut, digitale.co.il Oct 2026) still describe a live 300k tier. That is wrong according to the gazette text. |
| **Average turnover ≤ NIS 1,000,000, for a site or app first operated before 26 Oct 2017** (reg. 35ו(ט)) | *"שהוא החל להפעיל לפני תחילתן של תקנות אלה"* ("that it began operating before these regulations came into force"). Conditions: contact methods for obtaining the service are published accessibly (*"דרכי ההתקשרות אתו מפורסמות"*, "the ways to contact it are published"). Valid for 3 years from the end of the last tax year tested, renewable every 3 years. | In force, but only for **pre-2017 sites**. [P-copy; Access Israel [S]] | **No**, assuming the store launched after Oct 2017. A redesign of an old site may raise the question of whether it is still the same site. See section 8. |
| Technological infeasibility (reg. 35ו(א)–(ג)) | Granted by an authorised accessibility officer on a professional opinion. Lasts 3 years, renewable once for 3 more; after that only the Commissioner can extend it. You must provide alternatives and disclose the exemption in the statement. | In force [P-copy] | Unlikely to be relevant. It is for specific components that cannot technically be made accessible. |
| Closed services (registered users only, ≤ 500 at a time) (reg. 35ו(ה)) | Exempt unless a person with a disability asks for the adjustments | In force [P-copy] | **No.** The store is open to the public. |
| Social-network infrastructure limits (reg. 35ו(ד)) | Content on a social network is exempt to the extent the platform does not allow adjustments | In force [P-copy] | Relevant only to Instagram or Facebook shop content, not to the web store. |
| Excessive burden (*נטל כבד מדי*): apply to the Commission | Under the Law (§19ט(ב)(2): *"ביצוע התאמת הנגישות יהווה נטל כבד מדי"*, "making the accessibility adjustment would be an excessive burden") | Application service exists: https://www.gov.il/he/service/application_for_exemption_internet_people_with_disabilities (page not fetchable) | A fallback if the bakery is above NIS 100k and full AA would be disproportionate. Requires an application and is not automatic. [P for §19ט; S for the service page] |

**Bottom line.** If the bakery is an *עוסק פטור*, or its 3-year average turnover is ≤ NIS 100,000, reg. 35's website duties do **not** apply. Above that, and with a site launched after Oct 2017, **full SI 5568-1 AA applies with no transition period**. Every deadline in reg. 35 passed by 2020–2022. [P-copy]

**Even when exempt:**

- The Law's general ban on discrimination (§19ו) still applies. [P]
- The 2017 amendment added reg. 34(ה): an obligated party *that is exempt* must publish the exemption and any alternative adjustments. [P-copy, OCR summary] It is unclear whether this covers the automatic turnover exemption; see section 8.
- The exemption is reassessed as turnover grows, because it is based on a rolling 3-year average. [I]

---

## 5. ADVISABLE (not strictly required, but lowers risk)

| # | Recommendation | Rationale | Source |
|---|---|---|---|
| A1 | **Build to WCAG 2.2 AA**, which is a superset of 2.0 AA, rather than the minimum of WCAG 2.0 AA | Meets SI 5568-1 with margin and covers mobile (target size, focus not obscured, accessible authentication on checkout and login). It also future-proofs the site if SI 5568 is updated. | SI 5568-1 (2023) is WCAG 2.0-based [P]; W3C note that WCAG 2.1 and 2.2 are backward compatible: https://www.w3.org/WAI/news/2024-12-12/wcag2updates/ [P, W3C] |
| A2 | **Do not rely on an overlay or toolbar widget.** If you add one, treat it as a convenience, never as compliance. | Secondary sources quote the Commission's FAQ: *"שילובם של סרגלים אלו אינו פוטר מחובת העמידה בכל דרישות התקנות והתקן"* ("adding these toolbars does not exempt you from meeting all the requirements of the regulations and the standard") and *"אין כל חובה להשתמש ב'סרגל נגישות'"* ("there is no obligation to use an 'accessibility toolbar'"). Neither the regulations nor SI 5568-1 (2023) mention toolbars. | FAQ quoted by ADN: https://adn-accesstime.com/סרגלי-נגישות-תוספי-נגישות/ (FAQ URL https://www.gov.il/he/Departments/faq/website_accessibility_faq, **not fetchable, [S] only**); also quoted (attributed to GOV.IL) at https://www.element-israel.com/blogs/בלוג-אלמנט-ישראל/אתר-נגיש [S]. Absence from the regulations and the standard: [P] |
| A3 | **Publish an accessibility statement even if exempt.** State the exemption, give a contact for requests, and describe the alternatives, such as phone or WhatsApp ordering. | Reg. 34(ה) may require publishing the exemption. Most website suits are filed over a missing or incomplete statement. A statement also gives you a documented channel for the notice-and-cure process under 35א(ד). | Reg. 34(ה), 35ו(ג) [P-copy]; Chamber of Commerce on suits over statements [S] |
| A4 | **Accessible checkout provider.** Choose a payment page, such as an Israeli hosted payment page or iframe, whose vendor states SI 5568 / WCAG AA conformance, and test it yourself. | Checkout is core to the service. Reg. 35ב's third-party-content carve-out is about content users upload, not about outsourced functionality. [I] | Reg. 35ב [P-copy]; reading [I] |
| A5 | **Allergen and ingredient information as HTML text** on each product, in Hebrew and English | Avoids the PDF duty (SI 5568-2), helps screen-reader users, and lowers the risk of discrimination claims. | Reg. 35א(ג) [P-copy]; SI 5568-2 [P] |
| A6 | **Name an accessibility contact person** with email and phone, and answer within days, not 60 | Not a legal requirement below 25 employees, but it shows good faith. Courts have treated a prior approach as the proper first step. | *Ben Or v. Aviv Investment House*, ת"צ 52621-07-23 (TA District, Judge O. Maor, Jan 2024): https://www.law.co.il/computer-law/2024/01/22/ben-or-v-aviv-investment-house-ltd/ [S summary]; ruling PDF (Haaretz-hosted): https://img.haarets.co.il/bs/0000018d-3261-d81e-abdf-3a6daf9b0000/67/dd/fcef5d884b8d942fcb7b8845e76c/52621-07-23.pdf (not read in full) |
| A7 | **Documented audit** (automated checks plus a manual screen-reader pass with NVDA or VoiceOver in Hebrew) before launch and after major changes. Keep the report. | Evidence of compliance if you receive a demand letter. The statement should say when the site was last checked. | Statement contents recommended by ISOC-IL (date tested, browsers, level): https://www.isoc.org.il/freedom-of-internet/accessibility/legal-aspects-accessibility [S] |
| A8 | **Caption any videos** with Hebrew captions, even though reg. 35ד does not bind businesses under NIS 5M | Low cost and good practice. SI 5568-1 lists 1.2.2 at AA for anyone who *is* bound. | Reg. 35ד(א) [P-copy]; SI 5568-1 [P] |
| A9 | **RTL and bilingual hygiene:** `dir="rtl"` and `lang="he"` on Hebrew pages; `lang="en"` and `dir="ltr"` on English pages; mirrored layout; direction marks (`<bdi>`) around mixed phone numbers, prices and SKUs; a language switcher with an accessible name | Supports 1.3.2, 3.1.1 and 4.1.2. Not explicitly addressed by the standard. | [I], based on SI 5568-1 / WCAG 2.0 [P] |
| A10 | **Monitor your turnover against the NIS 100k line** each tax year, and keep your accountant's confirmation on file | The exemption depends on a rolling 3-year average. Access Israel notes that no application is needed, but you should keep your records. | https://aisrael.org/?ArticleID=63031&CategoryID=1255 [S] |

---

## 6. Accessibility statement (*הצהרת נגישות*)

### Required contents (reg. 35ה) [P-copy, corroborated by S]

1. Placed *"במקום בולט"* (in a prominent place) on the website, and in any app.
2. Prepared according to the standard's guidance on accessibility statements (*"לפי הקווים המנחים שבתקן"*).
   - The 2023 SI 5568-1 text I read does **not** contain statement guidance (see section 8). In practice, follow the reg. 35ה list below.
3. **Information on the accessibility adjustments made.**
4. **The accessibility coordinator's details and how to contact them**, *if the law requires one to be appointed*.
5. **Contact details for reporting missing adjustments or requesting them**, including a notice under 35א(ד)(1).
6. If any exemption applies: **the exemption and the alternative adjustments** (reg. 35ו(ג) and 34(ה)).

**Recommended additions** [S, from ISOC-IL]:

- the conformance level and standard version
- the browsers and assistive technology used for testing
- the date the statement was written and last updated
- any parts of the site that are not accessible, with alternatives
- physical accessibility, which is not relevant to a home business with no walk-in premises [I]

### Hebrew template skeleton

```markdown
# הצהרת נגישות

עודכן לאחרונה: [DD/MM/YYYY]

## מחויבות לנגישות
[שם העסק] רואה חשיבות במתן שירות שוויוני לכלל הלקוחות, לרבות אנשים עם מוגבלות,
ופועלת להנגשת אתר האינטרנט בהתאם לחוק שוויון זכויות לאנשים עם מוגבלות, התשנ"ח-1998,
ולתקנות שוויון זכויות לאנשים עם מוגבלות (התאמות נגישות לשירות), התשע"ג-2013.

## רמת הנגישות באתר
האתר הונגש בהתאם לתקן הישראלי ת"י 5568 חלק 1 (ספטמבר 2023), המבוסס על הנחיות WCAG 2.0,
ברמה AA. [אם בוצע: האתר נבדק גם מול WCAG 2.2 ברמה AA.]

## התאמות הנגישות שבוצעו באתר
- ניווט מלא באמצעות המקלדת, ומיקוד (פוקוס) נראה לעין
- תמיכה בקוראי מסך; תיאור טקסטואלי (טקסט חלופי) לתמונות המוצרים
- מבנה כותרות היררכי בכל העמודים
- טפסי הזמנה ותשלום עם תוויות, הנחיות והודעות שגיאה נגישות
- ניגודיות צבעים תקינה ואפשרות הגדלת טקסט עד 200%
- מידע על רכיבים ואלרגנים כטקסט בעמוד המוצר
- גרסה בעברית (מימין לשמאל) וגרסה באנגלית (משמאל לימין) עם הגדרת שפה תקינה

## בדיקה
האתר נבדק בתאריך [DD/MM/YYYY] בדפדפנים [Chrome, Safari, Firefox] ובקוראי המסך [NVDA, VoiceOver].

## חלקים שאינם נגישים / חלופות
[פרטו רכיבים שטרם הונגשו, אם יש, וחלופה נגישה, למשל: "ניתן לבצע הזמנה טלפונית במספר ..."]
[אם חל פטור: "העסק פטור מביצוע התאמות נגישות באתר לפי תקנה 35ו(ז) לתקנות. חלופות: ..."]

## דרכי פנייה בנושא נגישות
נתקלתם בבעיית נגישות או זקוקים להתאמה? נשמח לסייע:
- איש קשר לנגישות: [שם]
  [רק אם חלה חובה כדין: "רכז/ת הנגישות: [שם]"]
- טלפון / וואטסאפ: [...]
- דוא"ל: [...]
נא לפרט את העמוד, תיאור הבעיה, הדפדפן וטכנולוגיה מסייעת (אם יש).
נטפל בפנייה בהקדם ולא יאוחר מ-60 ימים, ובינתיים נציע חלופה נגישה (למשל הזמנה טלפונית).

## הסדרי נגישות פיזיים
[לעסק ביתי ללא קבלת קהל: "העסק אינו מקבל קהל; איסוף הזמנות מתואם מראש..." / או פירוט הסדרים]
```

Publish an English mirror at `/en/accessibility` and link both versions from every footer. [I]

---

## 7. Enforcement and risk

| Track | What | Source | Evidence |
|---|---|---|---|
| **Civil tort** | §19נא(א): a breach of the chapter, or of regulations under it, *"הוא עוולה אזרחית"* ("is a civil tort"). §19נא(ב): the court may award **up to NIS 50,000 without proof of damage**, **linked to the CPI of Feb 2005**. The Commission put the indexed figure at **about NIS 69,200** in Sep/Oct 2023. The 2026 figure is higher, but I did not compute it. | Commission slides by Adv. Dr. Yoad Helbersberg, head of the Commission's civil claims team (2023): https://www.gov.il/BlobFolder/reports/jurist_attorney_course/he/sitedocs_civil_enforcement_yoed.pdf | [P] (Commission). §19נא numbering also given by Kol-Zchut and ziko.co.il [S] |
| **Who may sue** | The injured person; **the Commission** in its own name or on behalf of a person; **an organisation promoting the rights of people with disabilities**. A claim about a specific person needs that person's consent (§19נג). | Same Commission slides | [P] |
| **Class actions** | Class Actions Law 2006, Second Schedule **item 9**: claims under chapters ד, ה, ה1 of the Disability Law. §20(ה): *"לא יפסוק פיצויים בלא הוכחת נזק, למעט בתביעה כמפורט בפרט 9"* ("shall not award damages without proof of harm, except in a claim under item 9"). Accessibility class actions can therefore include damages without proof of harm. The Class Actions Law repealed the Disability Law's own class-action sections, §§19נד–19סד. | https://fs.knesset.gov.il/16/law/16_lsr_299748.pdf ; https://elyon1.court.gov.il/heb/tovanot_y/2101b.pdf | [P] |
| **Prior notice in practice** | Reg. 35א(ד): no breach unless you were notified and did not fix within ≤ 60 days. *Ben Or v. Aviv* (TA District, ת"צ 52621-07-23, Jan 2024) dismissed website class actions under regs. 35ה and 34 for lack of a prior approach: *"פנייה מוקדמת היא הפתרון הראוי, ההוגן והמועיל ביותר"* ("a prior approach is the proper, fairest and most useful solution"). It also rejected claims under reg. 91(ה) (coordinator details) against small businesses not required to appoint one. | Reg. [P-copy]; ruling [S] summary at law.co.il | Mixed |
| **Accessibility order and criminal** | The Commission may issue an **accessibility order** (§19מג). Breaching it is an offence (§19מח): a fine under Penal Law §61(a)(3), about NIS 75k, plus 5% per day of continued breach, doubled for corporations. | Section titles [P, English translation table of contents]. Amounts from ISOC-IL (https://www.isoc.org.il/freedom-of-internet/accessibility/legal-aspects-accessibility) and ziko.co.il [S]. Kol-Zchut's "NIS 150,000 / NIS 7,500 per day" appears to be the doubled corporate figure. | [S] for amounts |
| **Administrative financial sanctions (*עיצומים כספיים*)** | A newer administrative track. The Commission imposed 4 sanctions totalling NIS 176,352 in 2025, all on local authorities, mainly over schools. Sanction-reduction regulations for "accessibility" exist (5783-2023). Amounts are tiered by business size. The Knesset committee discussion (Amendment 23 bill, 2022) said small and micro businesses would get warnings only for an initial 2 years. I could not verify **whether and how sanctions apply to website breaches**. | 2025 annual report [P]: https://www.gov.il/BlobFolder/reports/annual_activity_reports/he/sitedocs_annual-activity-report-2025.pdf ; committee protocol [S, oknesset mirror]: https://oknesset.org/meetings/2/1/2169292.html ; regulation list [S]: Access Israel | Partly [P] |
| **Complaint to the Commission** | Anyone can complain about inaccessibility via gov.il | https://www.gov.il/he/service/complaint_discrimination_inaccessibility_people_with_disabilities (not fetchable) | [S] |

**Practical risk for this bakery** [I]:

- The realistic threat is a **lawyer's demand letter** citing a missing accessibility statement or WCAG failures, followed by a small-claims-style suit or a class-action threat.
- Exposure is **lowest** if you have all three of:
  1. a turnover exemption, documented by your accountant
  2. a published statement with a working contact channel
  3. evidence that you fix issues within 60 days

---

## 8. Open questions and ambiguities

**Consult an Israeli lawyer who practises accessibility or disability-rights law for a final determination.**

1. **Do the reg. 35 turnover tiers in force today match the 2017 gazette text?**
   - I verified the 2017 gazette text through an OCR'd copy, plus several corroborating secondary sources.
   - I could not fetch the current consolidated text from Nevo (robots-blocked) or read it in full on gov.il or Wikisource (truncated).
   - Wikisource's amendment tags suggest no change to reg. 35 after 2017/18. Confirm on Nevo or in the Reshumot index.
2. **Does reg. 34(ה) require an automatically exempt business to publish its exemption?**
   - The OCR summary says *"an obligated party that is exempt ... shall publish the exemption"*. I could not confirm whether that covers the automatic turnover exemption in 35ו(ז) or only granted exemptions.
   - Publishing a short statement anyway is cheap (A3).
3. **Accessibility-statement guidance in the standard.** Reg. 35ה says the statement follows *"הקווים המנחים שבתקן"* (the standard's guidelines). The 2023 SI 5568-1 text I read contains no statement guidance; earlier editions may have. Until this is clarified, the reg. 35ה list is the operative checklist.
4. **Hosted checkout and third-party widgets.** Reg. 35ב exempts third-party *content*. It is not clear that it covers an outsourced payment page or a delivery-booking widget that is part of your service. My reading is that it does not [I].
5. **Bilingual sites and 3.1.2.** SI 5568-1 waives *Language of parts* on the reasoning that UTF-8 detects Hebrew. It is unclear whether this extends to English passages inside Hebrew pages. Separate `/en` pages with `lang="en"` avoid the question [I].
6. **"Same site" after a redesign.** This matters only if the bakery's site predates Oct 2017 and the bakery relies on 35ו(ט).
7. **Indexed damages figure for 2026.** The Commission gave about NIS 69,200 in 2023. Today's CPI-adjusted figure was not verified.
8. **Overlays.** The Commission's FAQ statement is known only through secondary quotes; the gov.il page could not be fetched. No court ruling on overlays was found.
9. **Financial sanctions.** It is unclear whether, from what date, and at what amounts the administrative sanctions track applies to *website* violations by private small businesses.
10. **Exempt-dealer ceiling.** The VAT exempt-dealer threshold is updated yearly. Confirm the bakery's status with its accountant.
11. **Notice-and-cure in individual (non-class) suits.** Reg. 35א(ד) defines when a deviation counts as a breach, which should help in any suit. Its interaction with §19נא in individual suits has not been confirmed here.

---

## 9. Sources (all accessed 2026-11-20)

### Primary: legislation and gazette

- Equal Rights for Persons with Disabilities Law, consolidated (btl.gov.il; fetched, truncated after §19ט): https://www.btl.gov.il/Laws1/00_0041_000000.pdf
- Amendment No. 2, 5765-2005 (Sefer HaChukim 1995), Knesset: https://fs.knesset.gov.il//16/law/16_lsr_299916.pdf
- English translation of the Law (Commission; amended to No. 11, 2012; table of contents read, body truncated): https://www.gov.il/BlobFolder/legalinfo/equality_law/en/sitedocs_equal_rights_for_persons_with_disabilities_law.pdf
- Service Accessibility Regulations 2013, consolidated (btl.gov.il; truncated in reg. 35 definitions): https://www.btl.gov.il/Laws1/02_0041_100100.pdf
- Kovetz Takanot 7876, 26 Oct 2017: the reg. 35 amendment (gazette copy hosted by ISOC-IL; OCR): https://www.isoc.org.il/files/docs/Takanot_negishut_26_10_2017.pdf
- Hebrew Wikisource, Service Accessibility Regulations (amendment tags; truncated at reg. 35): https://he.wikisource.org/wiki/תקנות_שוויון_זכויות_לאנשים_עם_מוגבלות_(התאמות_נגישות_לשירות)
- Class Actions Law 5766-2006 (Sefer HaChukim 2054), Knesset: https://fs.knesset.gov.il/16/law/16_lsr_299748.pdf
- Nevo, Service Accessibility Regulations (**not fetchable, robots-blocked**): https://www.nevo.co.il/law_html/law01/500_865.htm
- Nevo, the Law (**not fetchable**): https://www.nevo.co.il/law_html/law01/p214m2_001.htm

### Primary: standards

- SI 5568-1 (Sep 2023), full text on gov.il: https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-1-september-2023.pdf
- SII catalogue page, SI 5568-1: https://www.sii.org.il/he/lobby/standardization/standard-page?id=6751
- SII catalogue page, SI 5568-2: https://www.sii.org.il/lobby/standardization/standard-page?id=6753
- SI 5568-2 (Sep 2023), full text on gov.il: https://www.gov.il/BlobFolder/legalinfo/israeli_accessibility_standards_pdf/he/sitedocs_si-5568-2-september-2023.pdf
- W3C, WCAG 2.1/2.2 editorial update (Dec 2024): https://www.w3.org/WAI/news/2024-12-12/wcag2updates/

### Primary: Commission and courts

- Commission, civil enforcement slides (Helbersberg, Sep/Oct 2023): https://www.gov.il/BlobFolder/reports/jurist_attorney_course/he/sitedocs_civil_enforcement_yoed.pdf
- Commission annual activity report 2025 (published Aug 2026): https://www.gov.il/BlobFolder/reports/annual_activity_reports/he/sitedocs_annual-activity-report-2025.pdf
- Court filing citing Class Actions Law item 9 and §20(ה) (ת"צ 16416-06-12): https://elyon1.court.gov.il/heb/tovanot_y/2101b.pdf
- gov.il service: excessive-burden exemption for websites (**not fetchable**): https://www.gov.il/he/service/application_for_exemption_internet_people_with_disabilities
- gov.il Commission FAQ on website accessibility (**not fetchable**): https://www.gov.il/he/Departments/faq/website_accessibility_faq
- gov.il complaint service (**not fetchable**): https://www.gov.il/he/service/complaint_discrimination_inaccessibility_people_with_disabilities
- Knesset Labor and Welfare Committee, 24 Jan 2022 protocol (oknesset mirror): https://oknesset.org/meetings/2/1/2168729.html
- Amendment 23 committee discussion (oknesset mirror): https://oknesset.org/meetings/2/1/2169292.html

### Secondary (used for corroboration, or where marked [S])

- Kol-Zchut, exemptions page: https://www.kolzchut.org.il/he/פטור_מחובת_הנגשה_לאתרי_אינטרנט_ואפליקציות
  - Note: it still describes a live 100k–300k tier, which contradicts the gazette.
- Kol-Zchut, website accessibility overview: https://www.kolzchut.org.il/he/הנגשת_אתרי_אינטרנט_ואפליקציות_לאנשים_עם_מוגבלות
- Access Israel, "Who is exempt" (3 Feb 2024): https://aisrael.org/?ArticleID=63031&CategoryID=1255
- Access Israel, reg. 35 article: https://www.aisrael.org/?CategoryID=2765&ArticleID=44360
- Access Israel, laws and standards list: https://aisrael.org/מידע-למנגיש/חוקים-ותקנות-ותקן-ישראלי-לנגישות/
- ADN, readable text of reg. 35: https://adn-accesstime.com/קריאה-נוחה-יותר-של-תקנה-35/
- ADN, toolbars and overlays (quotes the Commission FAQ): https://adn-accesstime.com/סרגלי-נגישות-תוספי-נגישות/
- Element Israel (quotes the gov.il toolbar statement): https://www.element-israel.com/blogs/בלוג-אלמנט-ישראל/אתר-נגיש
- ISOC-IL, legal aspects of web accessibility (c. 2016): https://www.isoc.org.il/freedom-of-internet/accessibility/legal-aspects-accessibility
- ISOC-IL news (15 Aug 2017): https://www.isoc.org.il/news/significant-easing-of-accessibility-regulations
- Maariv (5 Sep 2017): https://www.maariv.co.il/business/tech/article-598253
- Chamber of Commerce, business accessibility duties (14 Apr 2024): https://chamber.org.il/serviceslobby/legal/1859/107972/
- law.co.il, *Ben Or v. Aviv*, ת"צ 52621-07-23 (22 Jan 2024): https://www.law.co.il/computer-law/2024/01/22/ben-or-v-aviv-investment-house-ltd/
- ziko.co.il, penalties article (7 Feb 2026): https://www.ziko.co.il/blog/knashot-negishut-israel
- GitHub issue flagging the expired 300k tier (cites Wikisource): https://github.com/skills-il/security-compliance/issues/14
- digitale.co.il (Oct 2026). Cited only as an example of **incorrect** claims (WCAG 2.1, live 300k tier): https://digitale.co.il/he/חוק-הנגישות-לאתרים-בישראל-2026/
