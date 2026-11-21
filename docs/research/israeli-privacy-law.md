# Israeli privacy law for a small home-bakery web store

- **Research date:** 2026-11-20
- **Scope:** What Israeli privacy law requires of a small home-bakery web store (Hebrew first, English second, guest checkout, Firebase/Firestore, cash or Bit, order notifications by email and WhatsApp), split into MANDATORY and ADVISABLE. Covers the Privacy Protection Law after Amendment 13, the 2017 Data Security Regulations, cross-border transfer rules, privacy notices, cookies and analytics, the anti-spam law, and the overlap with consumer-protection disclosure.
- **Status:** This is research, not legal advice. Section 11 lists the points where an Israeli lawyer who practises privacy law should make the final call.

## How to read the evidence tags

Every claim carries one of these tags.

| Tag | Meaning |
|---|---|
| **[P]** | I read it in an official primary source: a gov.il PDF from the Privacy Protection Authority (PPA, *הרשות להגנת הפרטיות*), a Knesset PDF, an official translation published by the PPA, a European Commission document, or first-party Google/Firebase documentation for the technical facts. |
| **[P-copy]** | I read an official text (a court ruling) hosted by a third party. |
| **[S]** | I could only find it in a secondary source: a law-firm update, Chambers, Baker McKenzie, the Library of Congress Global Legal Monitor, or Kol-Zchut. The URL is always given. |
| **[I]** | My inference from the sources, or something I know from memory and could not verify today. It is not stated in any source I read. |

**Sources I could not fetch, or could only read in part:**

- Nevo (`nevo.co.il`) is blocked by robots.txt. I did not try it.
- Hebrew Wikisource returned "not found" for the Privacy Protection Law and the Consumer Protection Law pages.
- Kol-Zchut's spam-law page returned a client error.
- Direct downloads from `fs.knesset.gov.il` with curl were refused by this session's proxy. WebFetch could read Knesset PDFs.
- **The official Amendment 13 text** (Sefer HaChukim 3287, hosted on gov.il) was readable only up to section 23כא. I could **not** read the Fifth Schedule (the fine amounts), section 23לא (fine reductions), or the commencement section. Those facts are tagged [S].
- The PPA's Hebrew copy of the 2001 Transfer Regulations came through as unreadable text, so the list of transfer grounds is tagged [S]. The PPA's two position papers on those regulations were readable and are tagged [P].
- The PPA's 2022 draft guidance on the duty to inform (*חובת יידוע*) was known only through a law-firm summary. I found no final version.

---

## 1. TL;DR: what this bakery store must do

1. **The Privacy Protection Law applies to you.** The customer orders in Firestore are a "database" (*מאגר מידע*) because they hold more than name, address and contact details (they also hold what people ordered). The owner is the "controller" (*בעל שליטה במאגר*). [P]
2. **You do not need to register the database, notify the PPA, or appoint a DPO.** Since Amendment 13 (in force 14 Aug 2025), registration applies only to public bodies and to data brokers holding data on more than 10,000 people. Notice to the PPA applies only above 100,000 people with special-sensitivity data. The DPO duty applies to public bodies, data brokers and large-scale monitoring or sensitive-data processors. None of these fit a home bakery. [P]
3. **You must give a collection notice (section 11) wherever you collect data.** It must state whether giving the data is required or voluntary and what happens if the customer refuses, the purpose, the controller's name and contact details, who receives the data and why, and the rights to see and correct it. Put a short notice next to the order form and link the full privacy policy. [P]
4. **Keep it an "individual-managed database" for security purposes.** If only the owner and at most two other people can access the data, and the database covers fewer than 10,000 people, the 2017 Data Security Regulations apply in their lightest form. That means a short written **database definitions document**, an access list, reasonable authentication, logging of security incidents, encrypted transport, secure system management, and an **annual check that you are not keeping more data than you need**. [P]
5. **Allergy notes are probably health data.** "Personal information relating to a person's state of health" is information of special sensitivity. An allergy note in free text most likely counts. [P for the definition, I for allergies] Do not ask for it as personal data. Offer allergen-free options as product choices instead, and tell customers not to put medical details in the notes field.
6. **Do not send marketing without opt-in.** Under the anti-spam law (Communications Law §30A), advertising by email, SMS, WhatsApp or automated calls needs prior express consent in writing. Each ad must start with the word "פרסומת" (in the email subject too), name the sender and give a way to refuse. A court can award up to NIS 1,000 per message without proof of damage. Order confirmations and status updates are not advertising, as long as they contain no promotion. [P]
7. **Choose the Firestore region on purpose.** `me-west1` (Tel Aviv) is available and cannot be changed later. Storing in Israel or the EU is the simplest position under the 2001 Transfer Regulations. Firebase Authentication runs only in the US and Google Analytics is a separate US service, so the policy should still disclose transfers abroad. [P]
8. **Cookies:** Israel has no cookie-specific statute. The PPA's February 2026 consent opinion prefers active opt-in for uses not needed to provide the service. Phase 1 should **use no analytics or marketing cookies at all**, so no banner is needed. If GA4 is added later, add an opt-in banner first. [P for the opinion, I for the recommendation]
9. **Exposure is real but small at this scale.** A court can award up to NIS 10,000 per breach of the database provisions without proof of damage (new §15א). It can award more for a privacy infringement under §29א. The PPA can now impose administrative fines, which are capped for micro businesses. The realistic risks are a demand letter over spam or a missing notice, or a data leak from open Firestore rules. [P/S]

---

## 2. Legal framework

| Layer | Instrument | What it does for this site | Citation / link | Evidence |
|---|---|---|---|---|
| Statute | **Privacy Protection Law, 5741-1981** (*חוק הגנת הפרטיות*) | Part A: privacy infringement (§2), a civil tort and, if wilful, a crime. Part B: databases (definitions §7, registration §8–8א, notice §11, access §13, correction §14, security §17, DPO §17ב1). | Consolidated committee drafts (unofficial, 2024): https://fs.knesset.gov.il/25/law/25_ls_bk_4704176.pdf | [P] (unofficial consolidated text) |
| Amendment | **Privacy Protection Law (Amendment No. 13), 5784-2024** | Rewrote the definitions ("personal information", "processing", "controller", "holder", "information of special sensitivity"). Cut registration to two categories. Added the DPO duty, PPA enforcement powers and administrative fines, and damages without proof of harm (§15א). Passed 5 Aug 2024 and published in **Sefer HaChukim 3287, p. 1430, on 14 Aug 2024**. | gov.il copy of the gazette: https://www.gov.il/BlobFolder/reports/13_amendment/he/%D7%AA%D7%99%D7%A7%D7%95%D7%9F%2013%20-%20%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%91%D7%A1%D7%A4%D7%A8%20%D7%94%D7%97%D7%95%D7%A7%D7%99%D7%9D.pdf | [P] (read up to §23כא) |
| Commencement | Amendment 13 in force **14 Aug 2025**, one year after publication | All duties below are live now. | Library of Congress: https://www.loc.gov/item/global-legal-monitor/2025-11-17/israel-amendment-to-privacy-protection-law-goes-into-effect/ ; NBLaw guide: https://www.nblaw.com/SpecialProjects/Privacy/Amendment13.pdf | [S] (the commencement section itself was not readable) |
| Regulations | **Privacy Protection (Data Security) Regulations, 5777-2017** (*תקנות אבטחת מידע*) | Security levels (individual-managed, basic, medium, high) and the duties at each level. In force since May 2018. | PPA English translation (not binding; Hebrew prevails): https://www.gov.il/BlobFolder/legalinfo/data_security_regulation/en/5777%E2%80%932017.pdf | [P] |
| Regulations | **Privacy Protection (Transfer of Data to Databases Abroad) Regulations, 5761-2001** (*תקנות העברת מידע אל מאגרי מידע שמחוץ לגבולות המדינה*) | When personal data may leave Israel (cloud hosting, email providers, Meta/WhatsApp). | PPA opinion on reg. 2(4): https://www.gov.il/BlobFolder/publicsharing/regulation_2_4/he/regulation%202%284%29.pdf ; PPA opinion on reg. 3 (13 Oct 2024): https://www.gov.il/BlobFolder/reports/takana3/he/regulation3.pdf | [P] for the opinions; [S] for the full list of grounds |
| Regulations | **Privacy Protection (Provisions Regarding Information Transferred to Israel from the EEA) Regulations, 5783-2023** | Extra duties only for personal data **received from the EEA**, not for data the customer gives you directly. | Described in the PPA reg. 2(4) opinion above | [P]; not relevant to this site [I] |
| PPA guidance | **Opinion on consent** (*גילוי דעת בנושא הסכמה בדיני הגנת הפרטיות*), **25 Feb 2026**, final | How the PPA reads "consent". It prefers opt-in for non-essential uses and treats §11 as the minimum disclosure. | https://www.gov.il/BlobFolder/legalinfo/consent-2026/he/cpncent-2025.pdf | [P] |
| PPA guidance | Controller-duties explainer (*InfoDuties*), undated | A plain-Hebrew list of controller duties after Amendment 13. | https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf | [P] (undated) |
| Statute | **Communications (Telecommunications and Broadcasting) Law, 5742-1982, §30A** (the "spam law", *חוק הספאם*), added by Amendment 40 (Sefer HaChukim 2153, 1 Jun 2008, in force six months later) | Marketing messages by email, SMS, fax and automated dialling. | https://fs.knesset.gov.il//17/law/17_lsr_299991.pdf | [P] (as enacted in 2008; later amendments not checked) |
| Statute | **Consumer Protection Law, 5741-1981, §14ג** (distance selling) | Seller identity disclosures. These touch the owner's own personal data. | Kol-Zchut: https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק | [S] |

### Key definitions after Amendment 13 [P]

Quoted from the Sefer HaChukim 3287 text:

- **"מידע אישי" (personal information):** *"נתון הנוגע לאדם מזוהה או לאדם הניתן לזיהוי"* ("data relating to an identified or identifiable person"). A person counts as identifiable if they can be identified "with reasonable effort" (*"במאמץ סביר"*). Name, phone, email, address and IP address all qualify. [P; IP address I]
- **"מאגר מידע" (database):** *"אוסף פרטי מידע אישי המעובד באמצעי דיגיטלי"* ("a collection of personal data items processed by digital means"), with two exceptions:
  1. *"אוסף לשימוש אישי שאינו למטרות עסק"* ("a collection for personal use that is not for business purposes").
  2. A collection holding **only name, address and contact details of 100,000 people or fewer**, which does not by itself reveal other personal information, *"ובלבד שלבעל האוסף ... אין אוסף אחר הכולל פרטי מידע אחרים לגבי אותם בני אדם"* ("provided that the owner of the collection ... has no other collection containing other data about the same people").

  **What this means for the bakery:** the orders collection holds what each customer ordered, so it is a database. A separate newsletter list does not escape the definition either, because the same people appear in the orders. [I]
- **"בעל שליטה במאגר מידע" (controller):** *"מי שקובע, לבדו או יחד עם אחר, את מטרות עיבוד המידע"* ("whoever determines, alone or together with another, the purposes of processing the data"). This is the bakery owner.
- **"מחזיק" (holder, roughly a processor):** *"גורם חיצוני לבעל השליטה במאגר המידע המעבד בעבורו מידע"* ("a party external to the controller that processes data on its behalf"). This covers Google/Firebase, the email provider, and the developer while the data sits in the developer's own Firebase project. [P for the definition, I for who fits it]
- **"עיבוד" (processing):** *"כל פעולה שמבוצעת על מידע אישי, לרבות קבלתו, איסופו, אחסונו, העתקתו, עיון בו..."* ("any operation performed on personal data, including receiving, collecting, storing, copying or viewing it..."). The definition continues with disclosure, transfer and granting access.
- **"מידע בעל רגישות מיוחדת" (information of special sensitivity):** 11 listed categories, plus any the Minister adds. The relevant item is *"מידע אישי המתייחס למצב בריאותו של אדם, ובכלל זה מידע רפואי"* ("personal information relating to a person's state of health, including medical information"). The list also covers:
  - family and intimate life, and sexual orientation
  - genetic data and biometric identifiers
  - origin, criminal record, political opinions and religious beliefs
  - personality assessments
  - location and traffic data
  - **salary and financial activity**
  - information subject to a statutory duty of confidentiality

**Does an allergy note count?** "My daughter has a severe nut allergy" is information relating to a person's state of health. It is very likely information of special sensitivity [I]. "Without nuts" chosen as a product option, with no statement about anyone's health, is much weaker evidence of a health condition [I]. The Data Security Regulations also list *"a person's consumption habits that may denote"* sensitive information as a medium-level category (First Schedule item 1(3)(i)) [P]. Repeated gluten-free orders could therefore be argued to reveal coeliac disease [I]. At this scale the practical answer is data minimisation (section 4). The legal answer is in section 11.

---

## 3. MANDATORY requirements: checklist

"PPL" means the Privacy Protection Law as amended by Amendment 13. "DSR" means the Data Security Regulations 2017, PPA English translation.

| # | Requirement | Source | What to build for this site |
|---|---|---|---|
| M1 | **No registration, no PPA notice, no DPO.** Registration (§8א(א)(1)) applies only where (a) the database's main purpose is supplying data to others for payment or as a business, including direct mailing, and it covers *"יותר מ־10,000 בני אדם"* ("more than 10,000 people"); or (b) the controller is a public body. Notice to the PPA (§8א(ב)) applies to an unregistered database holding special-sensitivity data on more than 100,000 people, within 30 days. The DPO duty (§17ב1(א)) covers public bodies, data brokers above 10,000 people, large-scale systematic monitoring, and large-scale processing of special-sensitivity data (banks, insurers, hospitals, HMOs). | PPL as amended [P]; LOC summary [S] | Nothing to build. Record the reasoning in the database definitions document (M5). |
| M2 | **Purpose limitation.** *"לא יעבד אדם מידע אישי במאגר מידע אלא למטרת המאגר שנקבעה לו כדין"* ("no person shall process personal data in a database except for the database's lawfully set purpose") (§8(ב)). Using data for another purpose is also a privacy infringement under §2(9). | PPL §8(ב) [P]; InfoDuties [P] | Order data is used to fulfil and deliver orders and to contact the customer about that order. **Do not reuse it for marketing** without separate opt-in (M9). |
| M3 | **Collection notice (§11).** When you ask a person for personal data for a database, the request must come with a notice stating: (1) whether there is a legal duty to provide the data or it is voluntary, *"ומהי תוצאת אי־ההסכמה"* ("and what the result of not agreeing is"); (2) the purpose; (2א) *"שמו של בעל השליטה במאגר המידע, ודרכי ההתקשרות עימו"* ("the controller's name and contact details"); (3) to whom the data will be given and why; (4) *"קיומן של זכות עיון במידע האישי לפי סעיף 13 ושל זכות לבקש תיקון של המידע האישי לפי סעיף 14"* ("the existence of the right to inspect the personal data under section 13 and the right to request its correction under section 14"). | Amendment 13 §8 (amending PPL §11) [P] | A short Hebrew notice **directly above the order button**, plus a link to `/privacy` (wording in section 4). Also put one on any contact or custom-cake request form. Amendment 13 itself added (2א) and (4). |
| M4 | **Access and correction rights.** People may see their data (§13) in Hebrew, Arabic or English, and ask for correction or deletion of data that is wrong, incomplete, unclear or out of date (§14). | InfoDuties [P]; amendment text [P] | Publish an email or WhatsApp contact for requests. The admin page should be able to find all orders by phone or email and edit or delete them. Response deadlines come from the 1981 Inspection Regulations, which I did not read; I remember them as 30 days [I]. |
| M5 | **Database definitions document** (DSR reg. 2), which also applies to individual-managed databases. It must cover: what data is collected and how it is used; purposes; data types; **transfers abroad** (purpose, country, recipient); processing by a holder; the main security risks and how they are handled; and the names of the database manager, the holder, and the security officer if one exists. Check by 31 Dec each year whether it needs an update (reg. 2(b)), and review each year whether you hold more data than the purposes need (reg. 2(c)). | DSR reg. 2, reg. 21 [P] | A one-to-two-page Markdown document kept outside the public repo, or in a private `docs/privacy/` folder. Add a yearly calendar reminder to review it and delete old orders. |
| M6 | **Stay in the "individual-managed" tier, or comply with "basic".** "Database managed by an individual" means a database managed by an individual, or by a corporation that person owns, which only that person and **at most two other authorised users** can use. Three kinds of database are excluded: one whose main purpose is collecting data to transfer to third parties; *"A database which contains information about 10,000 or more persons"*; and one held under a professional confidentiality duty. For that tier, **only DSR regs. 1, 2, 6(a), 9(a), 11(a), 12–14 and 20 apply** (reg. 21). A processor that is not an individual (Google) is not an "authorised user" of the controller. | DSR reg. 1, reg. 21 [P] | Keep the Firebase project, the Google accounts with access and the `/admin` users to **the owner plus at most two people**, the developer included. If more people ever need access, the database becomes **basic**, or **medium** if it holds health data and has more than 10 authorised users (First Schedule item 2). Basic adds access-control lists, a written security procedure, an outsourcing contract (reg. 15) and backups (reg. 17). |
| M7 | **Physical and logical security for the individual-managed tier:** keep systems in a secure place (reg. 6(a)); take appropriate measures so only listed authorised users can use the database (reg. 9(a)); manage systems properly, separate them from other systems where reasonable, and keep software updated (reg. 13); do not connect to the internet without safeguards, and **encrypt data in transit over public networks** (reg. 14(a)–(b)); add extra identification checks for remote access (reg. 14(c)); restrict copying to portable devices, or encrypt it (reg. 12). | DSR [P] | **Firestore security rules that deny all client reads of orders.** Write orders from a server action using the Admin SDK, or allow `create` only with schema validation. Admin access through Firebase Auth with an allow-list of UIDs or a custom claim. **2-step verification on every Google account with project access.** HTTPS only, which App Hosting provides. Do not export order spreadsheets to personal laptops or phones; if you must, use an encrypted device. Keep dependencies updated. |
| M8 | **Document security incidents** (reg. 11(a)): record any event that raises concern about data integrity, unauthorised use or use beyond authorisation, using automatic records where possible. Reporting a "severe security incident" to the PPA (reg. 11(d)) applies at medium and high level, not to individual-managed databases. | DSR reg. 11, reg. 21 [P]; Chambers on reporting [S] | A plain incident log (date, what happened, what was done). Leave Google Cloud Admin Activity audit logs on; they are on by default [I]. If customer data leaks, take legal advice: notifying customers is still prudent [I]. |
| M9 | **No advertising messages without prior express consent** (spam law §30A(ב)). The "existing customer" exception (§30A(ג)) requires all three of these: the customer gave their details during a purchase or negotiation **and was told they would be used for advertising**; they were offered a chance to refuse and did not; and the ad is for similar products. | Communications Law §30A [P] | No marketing in phase 1. If you add it later: an unticked opt-in checkbox, a stored consent record (timestamp, wording, channel), and refusal handling (section 6). |
| M10 | **Advertising content rules** (§30A(ה)). The word *"פרסומת"* must appear at the start of the message, and **for email also in the subject line**. The message must give the advertiser's name, address and contact details, and state the right to refuse at any time. Refusal must be free of charge and possible *"בכתב או בדרך שבה שוגר דבר הפרסומת, לפי בחירת הנמען"* ("in writing or in the way the advertisement was sent, at the recipient's choice") (§30A(ד)). | §30A [P] | Templates for any marketing email or WhatsApp broadcast (section 6). |
| M11 | **Confidentiality** (§16): the controller, holder and their staff must keep personal data confidential. | InfoDuties [P] | Do not share order details beyond what delivery needs. Do not post customer names or phones in WhatsApp groups. |
| M12 | **Transfers abroad must have a lawful basis** (Transfer Regulations reg. 1–2), and the recipient must give a written undertaking about onward transfer (reg. 3). See section 7. | PPA opinions [P]; ground list [S] | Choose the Firestore region (section 7). Keep a record of the providers and their data processing terms. |

---

## 4. ADVISABLE (not strictly required, but lowers risk)

| # | Recommendation | Rationale | Source |
|---|---|---|---|
| A1 | **Data minimisation in the order form.** Collect only name, phone, delivery address (only when delivery is chosen), order items, and the date or time slot. Make email optional. **Do not have an "allergies" field.** Model dietary needs as **product options**, such as "ללא אגוזים" ("nut-free") or "ללא גלוטן" ("gluten-free"), not as a statement about a person. Show a hint under the notes field: *"נא לא לכלול מידע רפואי או רגיש"* ("please do not include medical or sensitive information"). | Keeps the database away from special-sensitivity data, keeps it individual-managed or basic, and fits the yearly minimisation review (reg. 2(c)). | DSR reg. 2(c), First Schedule [P]; design [I] |
| A2 | **Retention schedule.** Delete or anonymise customer PII on completed orders after a fixed period, for example 24 months. Keep only what bookkeeping needs. | No Israeli statute sets a retention period for order data. Reg. 2(c) requires the yearly excess-data review. Tax bookkeeping rules may require keeping sales records for about 7 years [I, verify with the accountant]. | [P] reg. 2(c); [I] period |
| A3 | **Firestore shape.** Keep `orders/{id}` (items, totals, status, slot, `customerRef`) separate from `customers/{id}` or embedded PII. Then a scheduled Cloud Function can null out `name`, `phone`, `address` and `notes` after N months while keeping sales totals. Never store PII in document IDs, URLs or Storage paths. | Makes A2 and access and deletion requests (M4) easy. | [I] |
| A4 | **Security rules and App Check.** Default `allow read, write: if false`. Orders are created only server-side, or by a `create` rule with strict field validation and no `read`. Admin reads require `request.auth.token.admin == true`. Enable App Check to cut spam submissions. Write unit tests for the rules with the emulator. | Open Firestore rules are the most likely leak, and a leak is what produces PPA attention and lawsuits. | [I] |
| A5 | **Owner notifications carry the minimum.** Email or WhatsApp to the owner: "new order #1234, pickup 21/11, 3 items, link to /admin". Leave out the customer's full address and notes. Customer confirmations should contain only order details, no promotion. | Notification content passes through Gmail, Meta and email providers abroad. Less data in transit means less exposure. Keeping promotion out keeps them outside §30A. | [I]; spam test [S] |
| A6 | **Do not host real customer data in the developer's personal Firebase project.** Create the owner's project (on the owner's billing) **before** taking real orders. If the developer must keep access, list them as one of the two extra authorised users, and have a short written note that they act only on the owner's instructions and keep the data confidential. | The developer's project makes the developer a "holder", which complicates the individual-managed tier. | Holder definition [P]; DSR reg. 15 for basic [P]; application [I] |
| A7 | **A privacy policy page in Hebrew and English** (section 8), linked from the footer and from every form. | §11 must be met at the point of collection. The PPA's consent opinion warns that terms and privacy policies that are *"מסורבלת, ארוכה וקשה להבנה"* ("convoluted, long and hard to understand") or not reasonably accessible may fail informed consent (para. 19), and that relying only on a policy, without highlighting the key points, may not be enough (para. 21). | Consent opinion [P] |
| A8 | **Consent records.** Store a `consents` subdocument with the wording version, timestamp, channel and IP for any optional consent (marketing, analytics). | The consent opinion puts the burden of proving valid consent on the organisation, especially where consent is doubtful (pre-ticked boxes, inferred consent). | Consent opinion [P]; Pearl Cohen [S] |
| A9 | **Data processing terms with providers.** Keep links to, or PDFs of, the Firebase/Google Cloud data processing terms, the email provider's DPA and the WhatsApp Business terms. | Supports the reg. 3 written undertaking and the database definitions document. | Firebase privacy page [P]; application [I] |
| A10 | **Owner's identity disclosure.** The distance-selling rules require the seller's name, ID or company number and address. For a home business that publishes the owner's ID number and home address, so decide early with the lawyer what to show (section 9). | Consumer Protection Law §14ג | Kol-Zchut [S] |
| A11 | **Separate photo uploads.** If customers upload reference photos for custom cakes, store them in a private Storage path, delete them after the order, and avoid photos of people. | Photos of people are personal data, and children's photos invite extra scrutiny. | [I] |

---

## 5. Cookies and analytics

**Israeli law.** The Privacy Protection Law does not expressly regulate cookies. Online identifiers such as cookies, IP addresses and advertising IDs may be personal data, which brings in the notice and consent rules (Chambers 2026, §4.1) [S]. I found **no Israeli statute or regulation that requires a cookie banner** [S, I].

**What the PPA says.** The PPA's final **Opinion on Consent (25 Feb 2026)** does not mention cookies by name [P]. Its general rules apply:

- **Continued browsing.** Continuing to browse after the required information is shown is generally treated as implied consent (para. 42): *"המשך 'גלישת' משתמש באתר אינטרנט, לאחר שהוצג בפניו המידע הנדרש..."* ("a user's continued 'browsing' of a website, after the required information was shown to them..."). [P]
- **Silence.** *"שתיקתו של אדם, או העדר מחאה מצדו לאיסוף או שימוש במידע הנוגע אליו"* ("a person's silence, or their lack of protest at the collection or use of information about them") cannot by itself show valid consent (para. 44). [P]
- **Uses beyond the service.** Profiling based on tracking, for purposes not connected to the transaction, needs **active (opt-in) consent** (para. 48). So does direct marketing not connected to the purpose of the transaction (para. 49). Consent to separate, non-essential clauses should be obtained separately (para. 50). [P]
- **Withdrawal.** Consent can be withdrawn, and accepting a withdrawal request means stopping the processing (paras. 52, 56). [P]
- **Earlier PPA view.** A 2021 PPA recommendation, in a report on advanced payment methods, favoured cookie opt-in (Chambers 2026) [S].

**EU visitors (GDPR and ePrivacy).**

- Israel has an EU adequacy decision (2011/61/EU, 31 Jan 2011). The Commission reconfirmed it on 15 Jan 2024 (COM(2024) 7) [P]. That decision concerns transfers *to* Israel. It does not by itself make the GDPR apply to you.
- The GDPR applies to a non-EU business only if it targets people in the EU or monitors their behaviour (Art. 3(2)) [I, from memory]. A Hebrew-first store that delivers locally is very unlikely to "target" EU residents [I].
- If you later run analytics on EU visitors, assume an ePrivacy-style opt-in is expected for non-essential cookies [I].

**Recommendation for phase 1** [I]:

1. **Use no analytics, advertising or social-pixel scripts.** Use only strictly necessary cookies: the Firebase Auth session for `/admin`, and a cart in `localStorage`. Then no banner is needed. State in the policy that the site uses only essential cookies or storage.
2. If you want traffic numbers, use **server-side or cookieless metrics** (Cloud Run/App Hosting request logs with a short retention, or a privacy-first analytics tool that sets no cookies), and still mention it in the policy.
3. If GA4 or Firebase Analytics is added later:
   - Show an **opt-in banner** with "Accept" and "Reject" given equal weight, and load the script only after acceptance. Use Google Consent Mode set to "denied" by default.
   - Store the choice and offer a "cookie settings" link in the footer so people can withdraw.
   - List the transfer to Google (US) in the policy.
   - Never use a pre-ticked box. The consent opinion treats those as suspect [S, Pearl Cohen summary of the opinion].

---

## 6. Marketing, notifications and WhatsApp

### What §30A covers [P]

Source: Amendment 40 to the Communications Law, Sefer HaChukim 2153 (2008): https://fs.knesset.gov.il//17/law/17_lsr_299991.pdf

- **"דבר פרסומת" (advertisement):** *"מסר המופץ באופן מסחרי, שמטרתו לעודד רכישת מוצר או שירות או לעודד הוצאת כספים בדרך אחרת"* ("a message distributed commercially whose purpose is to encourage buying a product or service, or to encourage spending money in another way").
- **Channels:** fax, automatic dialling system, **"הודעה אלקטרונית"** (*"מסר בזק מקודד המועבר ברשת האינטרנט..."*, "an encoded telecommunications message sent over the internet...", meaning email and internet messaging) and **"הודעת מסר קצר"** (SMS).
- **Consent:** *"הסכמה מפורשת מראש של הנמען, בכתב, לרבות בהודעה אלקטרונית או בשיחה מוקלטת"* ("the recipient's prior express consent, in writing, including by electronic message or a recorded call").
- **Damages:** *"פיצויים שאינם תלויים בנזק ... בסכום שלא יעלה על 1,000 שקלים חדשים בשל כל דבר פרסומת"* ("damages not dependent on harm ... of up to NIS 1,000 for each advertisement"), where the ad was sent knowingly (§30A(י)). There is also a criminal fine (§30A(ו)).

**WhatsApp.** A WhatsApp message travels over the internet, so it fits the "electronic message" definition [I]. In *Wagner v. Albert* (Small Claims, Hadera, ת"ק 36150-07-25, 2 Feb 2026), a WhatsApp advertisement sent to numbers taken from WhatsApp groups was held to be *"דבר פרסומת כהגדרתו בחוק התקשורת"* ("an advertisement as defined in the Communications Law"). The court awarded NIS 250 [P-copy: https://www.law.co.il/media/computer-law/vagner3.pdf]. Small-claims courts often award well below the NIS 1,000 cap. In *Raz HaMeushar v. Singer* (ת"ק 82635-12-24, 21 Aug 2025), the court gave NIS 50 per email because the plaintiff acted in bad faith [P-copy: https://www.law.co.il/media/computer-law/raz48.pdf].

### Transactional messages compared with advertising

The test courts apply is the message's **main purpose**. A service message, such as "your policy is expiring", that carries an incidental offer may still be a service message (*Cohen Halala v. AIG*, 2014). Messages whose purpose includes exposing people to products can be advertisements (*Glasberg v. Psagot*, 2017). Courts have become stricter over time [S: https://barlaw.co.il/advertising-message-or-informational-content-how-israeli-courts-interpret-the-spam-law/].

| Message | Advertising? | What to do |
|---|---|---|
| New-order alert to the owner (email or WhatsApp) | No. The owner is the business itself. [I] | Minimal content (A5). |
| Order confirmation, payment instructions (Bit request or number), pickup or delivery time, "your cake is ready" | No, if it contains **only** order information [S test, I application] | **Do not add** "10% off next order", new-product teasers or holiday promos to these messages. |
| Holiday menu announcement, new products, discount code, "we're back from vacation, order now" | **Yes** | Needs opt-in (or the existing-customer exception, M9), "פרסומת" at the start, sender details and a refusal route. |
| Holiday greeting with the logo and no offer | Grey zone. Some rulings treated greetings as ads [S] | Treat it as advertising. |
| Click-to-chat (a `wa.me` link with prefilled order text) | The **customer** sends it, so it is not your advertisement [I] | Disclose in the notice that ordering via WhatsApp passes the details through WhatsApp (Meta). |

### Opt-in checkbox wording (unticked by default)

> ☐ אני מאשר/ת לקבל מ[שם העסק] דברי פרסומת ועדכונים על מוצרים ומבצעים בוואטסאפ, ב-SMS ובדוא"ל. ניתן לבטל בכל עת בהודעת "הסר" או בפנייה אלינו.

("I agree to receive advertisements and updates about products and offers from [business name] by WhatsApp, SMS and email. You can cancel at any time by replying 'הסר' (remove) or by contacting us.")

Keep it **separate** from any "I agree to the terms" box. The consent opinion requires separate, active consent for marketing unrelated to the transaction (para. 49) [P].

### Advertising message template

- **Email subject:** `פרסומת: תפריט חג חדש ב[שם העסק]` ("Advertisement: new holiday menu at [business name]")
- **First line of the WhatsApp or SMS text:** `פרסומת` ("Advertisement")
- **Footer:**

> [שם העסק], [כתובת], [טלפון], [דוא"ל]. ניתן להסיר את עצמך מרשימת הדיוור בכל עת: השב/י "הסר" להודעה זו או שלח/י בקשה ל-[דוא"ל].

("[Business name], [address], [phone], [email]. You can remove yourself from the mailing list at any time: reply 'הסר' (remove) to this message or send a request to [email].")

A 2020 Central District Court ruling, as reported, held that requiring a click on a link as the **only** way to unsubscribe does not comply [S: https://ebnlaw.co.il/media-center/court-ruling-refusal-receive-advertisement]. Always accept a plain reply.

**Implementation:** keep a `suppression` list keyed by phone or email, and check it before any send. Honour refusals at once. The PPA can also fine a failure to honour a direct-marketing opt-out (NIS 15,000 per violation, according to Chambers) [S].

**Direct-mailing provisions (§17ו–17י of the PPL)** apply where a mailing targets people by personal characteristics drawn from a database. I did not read the post-Amendment-13 text of these sections [I]. Simple "all opted-in customers" broadcasts with the §30A content above are the low-risk path.

---

## 7. Cross-border transfer and Firebase

### The rule

- **Regulation 1** of the 2001 Transfer Regulations bars a transfer abroad unless the destination's law gives protection no lower than Israeli law.
- **Regulation 2** lists alternative grounds:
  - the data subject's consent;
  - transfer to a corporation the Israeli owner controls;
  - **reg. 2(4):** the recipient undertakes by contract to meet the conditions that apply to an Israeli database, *"בשינויים המחויבים"* ("with the necessary changes");
  - public safety or a requirement of law;
  - **reg. 2(8):** a country that is party to **Convention 108**, or a country that *"המקבלת מידע ממדינות החברות בקהיליה האירופית, לפי אותם תנאי קבלה"* ("receives information from EU member states under the same conditions of receipt").

  [Baker McKenzie, reviewed 24 Jan 2025: S; the reg. 2(8)(2) wording is quoted in the PPA reg. 3 opinion: P]
- **Regulation 3:** the owner must secure *"בהתחייבות בכתב של מקבל המידע"* ("by a written undertaking from the recipient") that the recipient protects the data and *"שהמידע לא יועבר לכל אדם זולתו"* ("that the data will not be passed to anyone else"). Under the PPA's **13 Oct 2024** opinion, onward transfer (such as sub-processors) is lawful if the Israeli owner gives **written consent** and the transfer would be lawful inside Israel [P].

### The PPA's position on EU, UK and US destinations

- **EU and UK.** EU member states are treated as adequate, and the UK is permitted as a Convention 108 party (PPA statements of 1 Jul 2020) [S, Baker McKenzie].
- **US.** On 29 Sep 2020, after *Schrems II*, the PPA said the "EU conditions" ground in reg. 2(8) **can no longer be used for US organisations**. I found no PPA opinion on the EU-US Data Privacy Framework [S, Baker McKenzie]. US transfers therefore rest on consent (reg. 2(1)) or on a contract (reg. 2(4)).
- **What a reg. 2(4) contract must contain** (PPA reg. 2(4) opinion) [P]:
  - purpose limitation
  - access and correction rights
  - confidentiality
  - a commitment to the 2017 Data Security Regulations, **or** ISO/IEC 27001 certification plus PPA Directive 3/2018
  - an onward-transfer undertaking under reg. 3

### Firebase facts [P, first-party docs]

- **Firestore** can be created in **`me-west1` (Tel Aviv)**, in EU regions such as `europe-west1`–`west12`, or in the `eur3` multi-region. *"Once you provision a database instance, you cannot change its location setting."* (https://firebase.google.com/docs/firestore/locations)
- **Firebase Authentication** *"is run only from US data centers."* Firestore, Storage, Functions and Hosting may otherwise *"process and store your data anywhere Google or its agents maintain facilities"*. You can set a location for some services. Google acts as a processor under the Firebase Data Processing and Security Terms or the Cloud Data Processing Addendum. Google Analytics is a separate service with its own terms. (https://firebase.google.com/support/privacy)

### Recommendation [I]

1. **Create Firestore and Storage in `me-west1` (Tel Aviv).** Customer data then rests in Israel, which removes most of the transfer question for the main data store. `europe-west*` is the next best choice (EU, Convention 108). Avoid US regions for customer data.
2. **Use Firebase Auth only for the owner and the admin accounts.** It is US-only, but it would then hold only admin emails, not customer data. Guest checkout needs no customer accounts.
3. For the remaining US or global processing (Google support access, the email provider, Meta/WhatsApp, and Analytics if added later), rely on:
   - the providers' data processing terms, which serve as the reg. 2(4)/reg. 3 contract; and
   - disclosure in the privacy notice. Agreeing to the notice gives some consent (reg. 2(1)) support, but consent should not be the only ground.

   List each provider and country in the database definitions document (reg. 2(a)(4)).
4. Whether Google's standard terms satisfy reg. 2(4) as the PPA reads it is a **lawyer question** (section 11). It is common market practice for small Israeli businesses to rely on them [I].

---

## 8. Privacy policy (*מדיניות פרטיות*)

### What it must contain

Israeli law has no statute titled "privacy policy". The legal hook is the **§11 collection notice** (M3), together with **§13/§14** rights, the transfer rules (section 7) and §30A for marketing. The PPA's consent opinion treats §11 compliance as *"דרישת המינימום"* ("the minimum requirement") and says informed consent may need more, presented clearly (paras. 23, 25) [P]. A PPA draft on the duty to inform (2022) went further: storage, who has access, and data-subject rights, in clear and simple language suited to the audience, possibly with graphic symbols [S, AYR summary; I found no final version].

**Language.** No source I read requires the notice to be in Hebrew specifically [I]. The consent opinion's focus on understandability means a Hebrew-first audience should get it in Hebrew [I]. §13 access is given in Hebrew, Arabic or English (InfoDuties) [P]. Publish Hebrew at `/privacy` and English at `/en/privacy`. Say which version governs; that should be the Hebrew one [I].

### Short notice next to the order button (M3)

> הפרטים שתמסרו (שם, טלפון, כתובת למשלוח ופרטי ההזמנה) נדרשים לצורך טיפול בהזמנה, תיאום איסוף או משלוח ויצירת קשר בנוגע להזמנה. אינכם חייבים על פי חוק למסור אותם, אך בלעדיהם לא נוכל לטפל בהזמנה. בעל/ת השליטה במידע: [שם], [טלפון/דוא"ל]. המידע נשמר אצל ספקי ענן (Google) ועשוי לעבור דרך WhatsApp ושירות דוא"ל, ולא יימסר לאחרים אלא לצורך ביצוע ההזמנה. זכותכם לעיין במידע ולבקש לתקנו. פרטים ב[מדיניות הפרטיות](/privacy).

("The details you give (name, phone, delivery address and order details) are needed to handle your order, arrange pickup or delivery, and contact you about the order. You are not legally required to give them, but without them we cannot handle your order. Data controller: [name], [phone/email]. The data is stored with cloud providers (Google) and may pass through WhatsApp and an email service. It will not be given to others except to carry out the order. You have the right to see the data and ask to correct it. Details in the [privacy policy](/privacy).")

### Hebrew template skeleton

```markdown
# מדיניות פרטיות

עודכן לאחרונה: [DD/MM/YYYY]

## מי אנחנו
[שם העסק] מופעל על ידי [שם בעל/ת העסק], [עוסק פטור/מורשה מס' ...].
בעל/ת השליטה במאגר המידע: [שם]. ליצירת קשר בנושאי פרטיות: [דוא"ל], [טלפון/וואטסאפ].

## איזה מידע אנחנו אוספים
- בעת הזמנה: שם, מספר טלפון, כתובת למשלוח (רק אם בחרתם משלוח), דוא"ל (רשות), פרטי ההזמנה, מועד איסוף/משלוח והערות.
- נא לא לכלול בהערות מידע רפואי או רגיש. לבקשות כמו "ללא אגוזים" השתמשו באפשרויות המוצר.
- [אם רלוונטי: תמונות השראה שהעליתם לעוגה בהזמנה אישית.]
- מידע טכני: האתר משתמש רק בעוגיות/אחסון הכרחיים לתפעול (סל קניות, כניסת מנהל). [אם יתווסף: כלי סטטיסטיקה, רק בהסכמתכם.]

## האם חובה למסור את המידע
אין חובה חוקית למסור את המידע. ללא שם, טלפון ופרטי ההזמנה לא נוכל לטפל בהזמנה.

## למה אנחנו משתמשים במידע
טיפול בהזמנה, תיאום איסוף או משלוח, תשלום (מזומן/Bit), יצירת קשר בנוגע להזמנה, ועמידה בחובות על פי דין (למשל רישום הנהלת חשבונות).
לא נשלח לכם פרסומות אלא אם הסכמתם לכך במפורש.

## למי המידע מועבר
- ספקי שירות שמעבדים את המידע בשבילנו בלבד: Google Firebase / Google Cloud (אחסון האתר ומסד הנתונים, [אזור: תל אביב]), [ספק הדוא"ל], WhatsApp (Meta) להודעות.
- [שליח/חברת משלוחים: שם, טלפון וכתובת בלבד, אם בחרתם משלוח.]
- רשויות, אם נידרש לכך על פי דין.
איננו מוכרים מידע אישי.

## העברת מידע אל מחוץ לישראל
חלק מהספקים פועלים מחוץ לישראל (למשל בארה"ב ובאירופה). אנו מסתמכים על תנאי עיבוד הנתונים של הספקים ופועלים בהתאם לתקנות הגנת הפרטיות (העברת מידע אל מאגרי מידע שמחוץ לגבולות המדינה), התשס"א-2001.

## כמה זמן נשמור את המידע
פרטים מזהים בהזמנות שהושלמו יימחקו או יוסתרו לאחר [24] חודשים, למעט מה שנדרש לשמור על פי דין.

## אבטחת מידע
הגישה למידע מוגבלת ל[בעל/ת העסק ועד שני מורשים נוספים], בהצפנה בתעבורה ובאימות דו-שלבי. אין אבטחה מושלמת; אם יתרחש אירוע אבטחה נפעל בהתאם לדין.

## דיוור ופרסומות
נשלח פרסומות רק אם סימנתם הסכמה. כל פרסומת תסומן במילה "פרסומת". ניתן להסיר את עצמכם בכל עת: השיבו "הסר" או פנו אלינו.

## עוגיות (Cookies)
[גרסה 1: האתר משתמש רק בעוגיות ובאחסון מקומי הכרחיים לתפעולו.]
[גרסה 2: בנוסף, בהסכמתכם בלבד, אנו משתמשים ב-Google Analytics. ניתן לשנות את הבחירה ב"הגדרות עוגיות".]

## הזכויות שלכם
זכות לעיין במידע עליכם (סעיף 13 לחוק הגנת הפרטיות) ולבקש לתקן או למחוק מידע שאינו נכון, שלם, ברור או מעודכן (סעיף 14).
בקשות: [דוא"ל/וואטסאפ]. נשיב תוך [30] ימים.

## שינויים במדיניות
נעדכן כאן ונציין את תאריך העדכון.
```

---

## 9. Consumer Protection Law overlap (brief)

- **Disclosures in a distance sale (§14ג).** The seller must disclose its name, **ID or company number**, address, the main features of the product, the price, delivery terms, and the cancellation right. A written confirmation must follow no later than delivery [S, Kol-Zchut].
  - For a sole trader this means the owner's own ID number and address [I].
  - Whether a home address must appear on the site, or a business or postal address is enough, is for the lawyer (section 11).
  - The privacy policy itself does not need the ID number [I].
- **Cancellation.** Perishable goods are, as I recall, excluded from the cancellation right [I; not verified]. This does not affect privacy, but it belongs on the same "terms" page.
- **Contact details.** The privacy contact and the consumer contact can be the same email or WhatsApp number [I].

---

## 10. Enforcement and risk

| Track | What | Source | Evidence |
|---|---|---|---|
| **Damages without proof of harm, database provisions (new §15א)** | A court may award *"בסכום שלא יעלה על 10,000 שקלים חדשים"* ("an amount not exceeding NIS 10,000") for breaches of the database chapters. These include missing notice, refusing access, and failing to correct. Some heads require a prior demand: 90 days for registration and 30 days for certain disclosure failures. | Amendment 13 text [P]; prior-demand periods: NBLaw [S]; LOC [S] | [P]/[S] |
| **Damages without proof of harm, privacy infringement (§29א)** | For a §2 privacy infringement, such as using information for another purpose or a breach of confidentiality: up to NIS 50,000 without proof of harm, and up to NIS 100,000 in aggravated cases. | NBLaw (50,000) [S]; Chambers 2026 (100,000) [S] | [S] |
| **Administrative fines (PPA)** | New under Amendment 13. Database-size breaches are charged per person: NIS 2 per person for ordinary data and NIS 4 for sensitive data, with minimums of NIS 20,000 and NIS 40,000. Registration failures: NIS 150,000. Each data-subject-rights breach: NIS 15,000. **Micro businesses (turnover up to NIS 4M) have caps of NIS 20,000 or 50,000 depending on the breach type**; small businesses (NIS 4–10M) have caps of 40,000 or 100,000. Any fine is cut to 5% of turnover if it would exceed that. Breaches of the security regulations for an individual-managed or basic database: about NIS 1,000–2,000 per provision, some only after a warning. Repeat breaches double the fine, and continuing breaches add 1% per day. | NBLaw Aug 2025 guide [S]; Chambers 2026 [S]. The Fifth Schedule itself was **not readable**. | [S] |
| **Spam** | Up to NIS 1,000 per ad without proof of harm, plus a criminal fine. Small-claims awards are often lower (NIS 50–250 in the 2025–2026 rulings above). Class actions are possible. | §30A [P]; rulings [P-copy] | [P] |
| **Criminal** | Wilful privacy infringement or breach of confidentiality (§16): up to 5 years. Some database offences: up to 1 year, and Amendment 13 added 3-year offences, for example obstructing the PPA. | InfoDuties [P]; Baker McKenzie [S] | Mixed |
| **Limitation period** | Civil privacy claims now have 7 years instead of 2, for causes of action arising after 14 Aug 2025. | LOC [S] | [S] |
| **Early PPA enforcement** | A NIS 70,000 fine against HOT Telecommunication Systems. | Chambers 2026 [S] | [S] |

**Practical risk for this bakery** [I]:

- **Highest:** sending a "new holiday menu" WhatsApp to past customers without opt-in or without the word "פרסומת". This is the classic small-claims or class-action trigger.
- **Second:** a data leak from permissive Firestore rules or a shared admin password.
- **Third:** a demand letter over a missing collection notice or privacy policy (§15א).
- **Low:** a PPA administrative fine. The PPA's stated focus is on larger bodies, and micro-business caps apply.

---

## 11. Open questions for a lawyer

**Consult an Israeli lawyer who practises privacy and consumer law for a final determination.**

1. **Allergy and dietary data.** Does a free-text note such as "child allergic to nuts" make the order database one with "information of special sensitivity", and does it change anything for an individual-managed database? Is the "product option" approach (A1) enough to keep dietary preferences out of health data?
2. **Individual-managed status.** Does a developer with Firebase project access count as one of the "two other authorised users"? Does running the data for a while in the developer's personal Firebase project make the developer a "holder", and does that need a written agreement?
3. **Transfers to the US.** Are Google's Firebase/Cloud data processing terms, Meta's WhatsApp terms and the email provider's DPA enough for reg. 2(4) and reg. 3 as the PPA reads them? Or should the privacy notice also seek consent (reg. 2(1))? Has the PPA said anything about the EU-US Data Privacy Framework since 2023?
4. **Fine amounts.** Confirm the Fifth Schedule amounts, the micro-business caps and section 23לא from the official text. I could only read them in law-firm summaries.
5. **Existing-customer exception.** Can the bakery send holiday-menu messages to past customers under §30A(ג) if the order form told them about advertising and offered refusal? Or is a separate opt-in still advisable given the PPA's Feb 2026 consent opinion?
6. **Current text of §30A.** I read the 2008 text as enacted. Have there been later amendments, for example on refusal mechanisms or WhatsApp?
7. **Seller identity disclosure (§14ג).** Must a home business publish the owner's ID number and home address on the site, or is a business or postal address enough?
8. **Retention.** How long must an exempt dealer keep order and receipt records for tax purposes, and can customer names and phone numbers be removed from older records?
9. **Access and correction deadlines.** Confirm the response times under the 1981 Inspection Regulations after Amendment 13.
10. **Direct-mailing sections (§17ו–17י).** Do they apply to a simple broadcast to all opted-in customers, and what must each message state?
11. **Duty-to-inform guidance.** Has the PPA finalised its 2022 draft on §11 notices? If so, does it require anything beyond the template in section 8 (layered notice, icons, placement)?

---

## 12. Sources (all accessed 2026-11-20)

### Primary: legislation and gazette

- Privacy Protection Law (Amendment No. 13), 5784-2024, Sefer HaChukim 3287, 14 Aug 2024 (gov.il copy; readable to §23כא): https://www.gov.il/BlobFolder/reports/13_amendment/he/%D7%AA%D7%99%D7%A7%D7%95%D7%9F%2013%20-%20%D7%A4%D7%A8%D7%A1%D7%95%D7%9D%20%D7%91%D7%A1%D7%A4%D7%A8%20%D7%94%D7%97%D7%95%D7%A7%D7%99%D7%9D.pdf
- Same gazette, second gov.il copy (also truncated): https://www.gov.il/BlobFolder/legalinfo/standards_law/he/laws_standards-law_law3287.pdf
- Amendment 13 bill for second and third reading, 24 Jul 2024 (Knesset; truncated): https://fs.knesset.gov.il/25/law/25_ls2_4715568.pdf
- Unofficial consolidated Privacy Protection Law, committee drafts (Knesset, 2 Apr 2024 and 21 Jul 2024): https://fs.knesset.gov.il/25/law/25_ls_bk_4300009.pdf ; https://fs.knesset.gov.il/25/law/25_ls_bk_4704176.pdf
- Privacy Protection (Data Security) Regulations, 5777-2017, PPA English translation: https://www.gov.il/BlobFolder/legalinfo/data_security_regulation/en/5777%E2%80%932017.pdf
- Transfer Regulations 2001, PPA Hebrew copy (**unreadable when fetched**): https://www.gov.il/BlobFolder/news/post_schrems_update/he/TakanotHul.pdf
- Communications Law Amendment No. 40 (§30A), Sefer HaChukim 2153, 2008 (Knesset): https://fs.knesset.gov.il//17/law/17_lsr_299991.pdf
- Hebrew Wikisource, Privacy Protection Law (**not fetchable**): https://he.wikisource.org/wiki/חוק_הגנת_הפרטיות
- Hebrew Wikisource, Consumer Protection Law (**not fetchable**): https://he.wikisource.org/wiki/%D7%97%D7%95%D7%A7_%D7%94%D7%92%D7%A0%D7%AA_%D7%94%D7%A6%D7%A8%D7%9B%D7%9F

### Primary: Privacy Protection Authority

- Opinion on consent (final, 25 Feb 2026): https://www.gov.il/BlobFolder/legalinfo/consent-2026/he/cpncent-2025.pdf
- Opinion on reg. 2(4) of the Transfer Regulations (undated, after 2023): https://www.gov.il/BlobFolder/publicsharing/regulation_2_4/he/regulation%202%284%29.pdf
- Opinion on reg. 3 of the Transfer Regulations (13 Oct 2024): https://www.gov.il/BlobFolder/reports/takana3/he/regulation3.pdf
- Controller duties explainer (undated): https://www.gov.il/BlobFolder/generalpage/manager_duties/he/InfoDuties_new.pdf
- gov.il service page, notice duty to the PPA (HTML, not fetched): https://www.gov.il/he/service/notice-obligation

### Primary: courts (hosted by law.co.il)

- *Wagner v. Albert*, ת"ק 36150-07-25 (Small Claims, Hadera, 2 Feb 2026), WhatsApp advertisement: https://www.law.co.il/media/computer-law/vagner3.pdf
- *Raz HaMeushar v. Singer*, ת"ק 82635-12-24 (Small Claims, Tel Aviv, 21 Aug 2025): https://www.law.co.il/media/computer-law/raz48.pdf

### Primary: EU and Google/Firebase (technical and adequacy facts)

- European Commission, first review of adequacy decisions, COM(2024) 7, 15 Jan 2024: https://commission.europa.eu/system/files/2024-01/JUST_template_comingsoon_Report%20on%20the%20first%20review%20of%20the%20functioning.pdf
- Firestore locations: https://firebase.google.com/docs/firestore/locations
- Privacy and security in Firebase: https://firebase.google.com/support/privacy

### Secondary (used for corroboration, or where marked [S])

- Library of Congress Global Legal Monitor, "Israel: Amendment to Privacy Protection Law Goes into Effect" (17 Nov 2025): https://www.loc.gov/item/global-legal-monitor/2025-11-17/israel-amendment-to-privacy-protection-law-goes-into-effect/
- Naschitz Brandes Amir, Amendment 13 guide (Aug 2025): https://www.nblaw.com/SpecialProjects/Privacy/Amendment13.pdf
- Chambers, Data Protection & Privacy 2026: Israel (Or-Hof Law): https://chambers.com/practice-guides/guides/data-protection-privacy-2026/israel/law-and-practice
- Baker McKenzie, Israel: international data transfer (reviewed 24 Jan 2025): https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/emea/israel/topics/international-data-transfer
- Baker McKenzie, Israel: regulators, enforcement and penalties (reviewed 24 Jan 2025): https://resourcehub.bakermckenzie.com/en/resources/global-data-and-cyber-handbook/emea/israel/topics/regulators-enforcement-priorities-and-penalties
- Pearl Cohen, PPA position paper on valid consent (1 Mar 2026): https://www.pearlcohen.com/israeli-privacy-regulator-issues-position-paper-on-valid-consent/
- Gornitzky, PPA guidance on obtaining consent (8 Mar 2026): https://www.gornitzky.com/israeli-privacy-protection-authority-publishes-new-guidance-on-obtaining-consent/
- Pearl Cohen, PPA on reg. 2(4) (27 Apr 2026): https://www.pearlcohen.com/israeli-privacy-regulator-clarifies-requirements-for-cross-border-data-transfers/
- Pearl Cohen, PPA on reg. 3 (29 Oct 2024): https://www.pearlcohen.com/israeli-privacy-protection-authority-issues-guidelines-on-data-transfers
- Barnea Jaffa Lande, advertising compared with informational messages under the spam law: https://barlaw.co.il/advertising-message-or-informational-content-how-israeli-courts-interpret-the-spam-law/
- EBN Law, Central District Court on refusal mechanisms (Oct 2020): https://ebnlaw.co.il/media-center/court-ruling-refusal-receive-advertisement
- AYR, PPA draft on the duty to inform (2022): https://www.ayr.co.il/wp-content/uploads/2022/06/עדכון-לקוחות-פרסום-טיוטה-להערות-הציבור-בנושא-חובת-יידוע-במסגרת-איסוף-ושימוש-במידע-אישי.pdf
- Bizportal, *Glasberg v. Labor Party* (political SMS, 8 May 2025): https://www.bizportal.co.il/takdin/news/article/20016683
- Kol-Zchut, distance sale: https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק
- Kol-Zchut, spam-law compensation (**not fetchable**): https://www.kolzchut.org.il/he/פיצוי_בגין_משלוח_דברי_פרסומת_ללא_הסכמה_של_הנמען_(חוק_הספאם)
