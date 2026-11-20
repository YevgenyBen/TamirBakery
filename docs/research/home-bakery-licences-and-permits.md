# Licences, permits, tax and kashrut for a home bakery selling online in Israel

- **Research date:** 2026-11-20
- **Scope:** What a home bakery in Israel that has no licence or registration of any kind must do, and in what order, before it sells baked goods to the public through its own website. Payment is cash or Bit-style pay links straight to the owner. Delivery and pickup are both possible. Covers the municipal business licence, Ministry of Health food permits, tax registration (VAT, Income Tax, Bituach Leumi), invoices and receipts, kashrut claims, and what the website must and must not show.
- **Status:** This is research, not legal or tax advice. Section 11 lists the points that an Israeli lawyer, an accountant (*רואה חשבון* / *יועץ מס*) and a business-licensing consultant should confirm.

## How to read the evidence tags

Every claim carries one of these tags.

| Tag | Meaning |
|---|---|
| **[P]** | I read it in an official primary source directly: a gov.il PDF, a btl.gov.il consolidated law, a Knesset PDF, or an SII catalogue page. |
| **[P-copy]** | I read an official text (a Ministry document, a law translation) that a third party hosts. The source and host are named. |
| **[S]** | I found it only in a secondary source: Kol-Zchut, news sites, accountant, law-firm or consultant blogs. The URL is always given. |
| **[I]** | My inference from the sources. It is not stated in any of them. |

**Sources I could not fetch.** These were blocked, returned errors, or came back empty:

- **gov.il HTML service pages** all returned client errors. This includes the Ministry of Health food-manufacturing licence service, the Tax Authority's exempt-dealer, micro-business and allocation-number services, the kashrut enforcement unit page, and the business-licensing preliminary-opinion service. gov.il **PDF** files (`gov.il/BlobFolder/...`) did load.
- **Hebrew Wikisource** returned "url not found" for the Business Licensing Order, the Consumer Protection Law and the Kashrut Fraud Prohibition Law.
- **Nevo** (`nevo.co.il`) is blocked by robots.txt (known from earlier research on this project). Not retried.
- **Kol-Zchut** pages on *עסק זעיר* (micro business) and opening an income-tax file returned client errors. Other Kol-Zchut pages loaded.
- The gov.il PDF of the Kashrut Fraud Prohibition Law (`prohibition_of_raud_in_kashrut_law_1983_0.PDF`) returned a client error. I used the 1983 Knesset gazette text instead.
- The uniform specification for item 4.6ג (`18-07-2022_4.6c.pdf`) came back empty.
- Shell `curl` to gov.il and kolzchut.org.il was refused by the sandbox proxy.

Where this happened, I took the claim from another official text or from several secondary sources, and the tag says which.

---

## 1. TL;DR: what this bakery must do

1. **There is no legal "home kitchen" licence for selling food to the public in Israel.** I found no primary source that creates one. The Food Law requires a manufacturing licence to make food (§21), with exemptions only for dining establishments, institutional kitchens and in-store preparation (§§24 to 26) [P-copy]. Both licensing routes that fit a bakery need a **physically separate food-preparation area** that meets the Ministry of Health (MoH) sanitary specification [P]. An ordinary family kitchen does not meet that [I]. In 2021 the MoH told the press that preparing food at home and selling it to consumers "is not regulated by law" (*"אינה מוסדרת בחוק"*) and that its inspectors cannot enter homes [S].
2. **A business licence (*רישיון עסק*) from the municipality is needed before selling.** Making food to sell for eating elsewhere, including delivery, is **item 4.2ג** of the Business Licensing Order: *"הכנת מזון למכירתו לצריכה מחוץ למקום הכנתו, לרבות משלוח מזון"* [P]. A small bakery or patisserie that also sells to shops falls under **item 4.6ו** and needs an MoH manufacturing licence as well [P-copy]. The approving authorities are the **Ministry of Health** and **Fire and Rescue** (by affidavit, *תצהיר*). The **Police** are not an approving authority for these items [P].
3. **Realistic legal options are (a) a licensed rented or shared commercial kitchen, or (b) a separate, self-contained unit at home** with its own entrance, licensed under 4.2ג. Option (b) may also need a planning permit for a deviating use (*היתר לשימוש חורג*) [S]. Selling from the family kitchen without a licence is operating a licensable business without a licence. Enforcement is mostly complaint-driven, but the legal risk stays with the owner [S][I].
4. **Register with the Tax Authority before the first sale. This is cheap and can be done online now.** One online process opens the VAT and Income Tax files. Ticking a box also opens the Bituach Leumi (National Insurance) file [P]. The **exempt-dealer (*עוסק פטור*) ceiling for 2026 is NIS 122,833** a year (VAT Law §1, updated 1.1.2026) [P]. Food sellers are not on the list of professions barred from exempt-dealer status [S].
5. **Issue a receipt (*קבלה*) for every payment, including Bit, at the moment you receive the money** [S]. An exempt dealer may not issue a tax invoice (*חשבונית מס*) [S]. The *חשבונית ישראל* allocation number applies only to tax invoices above **NIS 5,000 before VAT** that a business buyer uses to deduct input VAT (VAT Law §38(א1)) [P]. It does not affect a small B2C bakery [I]. Use a receipt app on the Tax Authority's registered-software list [S][I].
6. **Do not use the word "כשר" (kosher) on the site, on packaging or in posts without a kashrut certificate.** The Kashrut Fraud Prohibition Law, 1983, §4(א) bars a producer from presenting a product as kosher "in advertising or in any other way" without a certificate [P]. The Supreme Court (Sept 2017) allowed a business without a certificate to give only a **truthful written description of its standards**, together with an **explicit statement that it has no kashrut certificate** [S]. A rabbinate certificate for a business inside a private home is refused in principle, with narrow exceptions [P]. **In July 2026 the Knesset cancelled the private-kashrut reform** (Amendment 5), so certificates come only from the rabbinate again [S].
7. **The website must name the seller.** It must show the owner's name, ID or business number, and an address in Israel. It must also show the main features of each product, the price and payment terms, delivery time and method, and the cancellation terms (Consumer Protection Law §4ב and §14ג) [P]. Perishable goods and goods made to order are excluded from the 14-day distance-selling cancellation right [P-copy].
8. **Until licences are in place, run the site as a portfolio or "coming soon" page with no ordering or prices** [I]. Turn on ordering only after the tax files exist and the business licence (or a temporary or expedited permit) is in hand.

---

## 2. Business licence (*רישיון עסק*) from the municipality

### 2.1 The law and the order

| Layer | Instrument | What it does | Evidence |
|---|---|---|---|
| Statute | **Business Licensing Law, 5728-1968** (*חוק רישוי עסקים*) | A business listed in the Order needs a licence, a temporary permit (*היתר זמני*) or an expedited permit (*היתר מזורז*) (§4). The licence needs the approval of the relevant approving authorities (*נותני אישור*) (§6(א)). The Order can let an approval be given by owner's affidavit (§6(ג), §6א.3). | [P] MoI training material (Apr 2021) |
| Order | **Business Licensing Order (Businesses Requiring a Licence), 5773-2013** (*צו רישוי עסקים (עסקים טעוני רישוי)*), group 4: food | Lists the licensable food businesses, their purposes, affidavit options and licence validity. | [P] gov.il PDF of the Order (text extraction garbled; see note) |
| Uniform specification | **Uniform specification for item 4.2ג** (*מפרט אחיד*), Amendment 1, 2026 file | Sets every condition a 4.2ג business must meet, chapter by chapter, per authority. Chapter 3 is Health. Chapter 4 is a Fire and Rescue affidavit. Chapter 5 is Fire and Rescue requirements. | [P] |

**Which item covers a bakery?**

- **Item 4.2ג** (in group 4.2, *בית אוכל*, food establishment): *"הכנת מזון למכירתו לצריכה מחוץ למקום הכנתו, לרבות משלוח מזון ולמעט הסעדה"* ("preparing food for sale for consumption away from where it was prepared, including food delivery, excluding catering") [P]. The licence is valid for 10 years. An affidavit route applies up to 500 m² [P, garbled extraction; confirm]. Selling cakes and pastries direct to consumers for pickup or delivery fits this item best [I].
- **Item 4.6ו**: processing of food from animal or plant raw materials below the large-plant thresholds [P]. An MoH guideline of **28 May 2019** on "flexibility in requirements for small bakeries and patisseries" puts "boutique" bakeries and patisseries (bread, cakes, cream and mousse cakes, chocolate) under **item 4.6ו with a manufacturing licence** [P-copy, hosted by a licensing consultant]. That guideline assumes mainly on-site sale, with off-site sale capped at 30% of maximum output [P-copy].
- **Item 4.6ה** is catering (*הסעדה*), which is not relevant here [P].
- **Item 4.6ד** is transport and distribution of food. Its uniform specification has special conditions for carrying bread, cakes and pastries [P]. A bakery that delivers its own products under 4.2ג is covered by 4.2ג, which expressly includes delivery [P]. A licensing consultant says a delivery-only company also needs 4.2ג [S].

Note: the gov.il PDF of the Order is a Nevo-generated copy, and the plus-sign columns came out scrambled. Item numbers and wording are reliable. Exact affidavit thresholds per column should be checked against the official text [P].

### 2.2 Does a home-based business need one?

- **Yes, if the activity is a licensable item.** The Order lists activities, not premises types. Nothing in the Order or the 4.2ג specification exempts a home [P][I].
- The 4.2ג specification requires the food-preparation area to be **"physically separated from other spaces"** (*"תהיה מופרדת באופן פיזי מחללים אחרים"*, §3.10.3). It requires a hand-wash sink of at least 35×35 cm in the kitchen (§3.14.1), separation of raw, clean and ready-to-eat food (§3.14.5(4)), and cold holding at 0 to 5 °C for chilled ready-to-eat food [P]. In a shared residential building, the business's sewage and ventilation must be separate from the residents' (§§3.7.20, 3.7.21, 3.10.4) [P]. A family kitchen that is also used for household cooking cannot meet "physically separated" [I].
- The specification also bars on-site seating (§3.11.3(3)). It caps food supplied to other businesses at 30% of weekly output, and only against advance orders (§3.11.3(5)) [P]. That fits a direct-to-consumer bakery.
- **Planning.** If the zoning plan allows only residential use, a business that customers visit may need a permit for a deviating use (*היתר לשימוש חורג*) from the local planning committee. Courts decide case by case, and pickup traffic counts against you [S: Kol-Zchut]. The business licence itself is separate from the planning permit [S].

### 2.3 Fast tracks

- There is no track called "self-licensing" (*רישוי עצמי*) in the Law text I read [P]. The legal fast tracks are:
  - **Approval by affidavit** (*תצהיר*, §6(ג)). For 4.2ג, the Fire and Rescue chapter of the specification is an affidavit [P].
  - **Expedited permit** (*היתר מזורז*, §6א.1). The authority must answer within 21 days on Track A, or 14 days on Track B (Track B adds a 49-day review period for approving authorities). The permit issues within 5 days of the affidavit [P].
  - **Licence on affidavit** (§6א.3). It issues within 5 days of receiving the affidavit [P].
- **An expedited permit is refused** if the business is already operating without a licence when it applies, among other grounds (§6א.2(א)(1)) [P]. **Do not start selling before applying.**
- A **preliminary opinion** (*חוות דעת מקדמית*, §6ה) can be requested before investing in premises [P: section title only; S: gov.il service page title in search results].

### 2.4 Approving authorities for 4.2ג

| Authority | Role | Evidence |
|---|---|---|
| Ministry of Health (district office) | Sanitary conditions, chapter 3 of the specification | [P] |
| Fire and Rescue Authority | Affidavit (ch. 4) plus requirements (ch. 5) | [P] |
| Police | Not an approving authority for 4.2ג (only for items with alcohol or large venues) | [P][I] |
| Local authority itself | Licensing authority; planning and other approvals (accessibility, etc.) | [P][S] |

### 2.5 Recent change: food-business licensing reform (July 2026)

- The MoH announced a reform of food-establishment licensing in March 2025 [S]. Health Minister Chaim Katz signed amended business-licensing sanitary regulations in July 2026 [S: Calcalist 20 Jul 2026]. A consultant gives 29 July 2026 as the effective date [S].
- The reform removes the minimum overall area, cuts minimum kitchen sizes (8 m² for a canteen of up to 30 seats), drops minimum ceiling height and separate changing rooms, allows toilets outside the business, allows digital records, and creates a "micro-restaurant" category for ready-to-serve food with no preparation beyond plating or heating [S].
- **None of the reports mentions home kitchens or item 4.2ג.** The reform makes a small rented unit cheaper. It does not legalise the family kitchen [S][I].
- I could not fetch the signed regulations themselves. The 4.2ג specification file on gov.il is a 2026 version ("Amendment 1"). Its chapter 3 has applied to new businesses since 1 June 2021 [P].

### 2.6 MANDATORY vs ADVISABLE

| MANDATORY | ADVISABLE |
|---|---|
| Business licence (or temporary or expedited permit) under item 4.2ג, or 4.6ו if selling to shops, **before** selling [P] | Ask for a preliminary opinion before renting or building [P] |
| Premises that meet the 4.2ג uniform specification, including a physically separate preparation area [P] | Use a licensing consultant for the plans (§6ב requires plans by an authorised professional) [P] |
| Planning permit for deviating use if the zoning requires it [S] | Tell the building's residents and check the condominium bylaws [S][I] |

---

## 3. Ministry of Health food permits

### 3.1 The law

- **Public Health Protection (Food) Law, 5776-2015** (*חוק הגנה על בריאות הציבור (מזון)*). §21(a): *"A person shall not manufacture food, unless he has a valid manufacturing license for the food manufacturing site"* [P-copy: English translation hosted by FAO].
- "Manufacturing" (§2) includes preparation, processing, packaging and labelling, whether or not the food is sold [P-copy]. "Sale" expressly includes sale **online** [P-copy].
- **Exemptions from the manufacturing licence** [P-copy]:
  - §24: preparation **at the consumer sales site** needs a permit (*היתר*), not a licence.
  - §25: a **dining establishment** (*בית אוכל*) needs no manufacturing licence if no more than 30% of the food, on average per week, goes to other businesses. §25(b) defines a dining establishment as a business where food is prepared and served "generally intended to be eaten at the place of business and near the time of its preparation".
  - §26: institutional kitchens.
  - §27: the Minister may set further exemptions by regulation, with Knesset committee approval.
- **No small-producer or home-production exemption appears in the law** [P-copy]. I found no regulation under §27 creating one [I; not exhaustive].
- A manufacturing licence is normally valid for 2 years, renewable for 3 to 5 (§31) [P-copy].

### 3.2 Which route fits this bakery

| Route | When | What it needs | Evidence |
|---|---|---|---|
| **4.2ג business licence, no manufacturing licence** | Sells direct to consumers, for pickup or delivery; at most 30% to other businesses | Business licence with MoH sanitary approval per the 4.2ג specification | [P] for the specification. Treating 4.2ג under the §25 exemption is my inference [I], based on the identical 30% cap and on 4.2ג sitting inside the *בית אוכל* group. |
| **4.6ו plus MoH manufacturing licence (small bakery track)** | Makes packaged goods for shops or cafés, or sells mainly wholesale | Sanitary plan (*תוכנית סניטרית*) to the district health office, inspection, licence fee. The 2019 small-bakery flexibilities: one undivided 25 to 30 m² production room including flour store; time separation instead of space separation; up to 5 employees; up to 200 loaves or 200 kg of product a day; pasteurised milk and eggs only, no fresh eggs | [P] MoH 2011 manufacturer-licence guide; [P-copy] MoH guideline 28 May 2019 |

The MoH 2011 guide puts the steps in this order: apply to the local authority for a business licence, then check planning, then submit the sanitary plan, then get a no-objection, then build, then inspection, then the licence application and fee. **The local authority must agree to issue the business licence before the manufacturing licence is granted** [P].

### 3.3 Can food be legally produced in a residential home kitchen for sale?

- **Not in an ordinary family kitchen, on the sources I could read.** No primary source creates a home-kitchen route [P][I].
- In 2021 the MoH told Kipa that home preparation for sale is "not regulated by law" and that it cannot inspect private homes. It said enforcement against unlicensed businesses lies with the local authority. Tel Aviv said it acts only on complaints [S].
- Several consultants advertise a "home manufacturer licence" (*רישיון יצרן ביתי*) for low-risk baked goods, jams and sweets, with animal products restricted [S]. **None cites an MoH document for it,** and the sites contradict each other on who issues it [S]. Treat this as unverified.
- **Product risk matters for the premises, not for the legal need for a licence.** The 4.2ג specification separates "high-risk food" (*מזון עם פוטנציאל סיכון גבוה*), which needs temperature control, from low-risk food. It gives "dry cookies" as an example of low-risk food (§§3.2.33, 3.2.34) [P]. Cream, mousse and dairy cakes are high-risk and need cold holding at 0 to 5 °C. The 2019 small-bakery guideline may require a separate mixer or a cooled area for cream and mousse work [P-copy].

### 3.4 Selling home-made food online or through social media

- The Food Law's definition of "sale" covers online offers and advertising [P-copy]. Advertising unlicensed food online is therefore "sale" under the law [I].
- I found no current MoH statement aimed specifically at social-media sellers. The gov.il food-service pages could not be fetched.

### 3.5 MANDATORY vs ADVISABLE

| MANDATORY | ADVISABLE |
|---|---|
| Either the 4.2ג route (business licence with MoH approval) or a manufacturing licence plus 4.6ו [P] | Start with items that keep at room temperature (cookies, dry cakes, breads) to reduce cold-chain requirements [P][I] |
| Pasteurised eggs and milk if on the small-bakery track [P-copy] | Food-safety training and a simple HACCP-style plan; the 2025 to 2026 reform rewards this [S] |
| Cold holding at 0 to 5 °C for cream and dairy items [P] | Product liability insurance [S] |

---

## 4. Tax registration

### 4.1 Exempt dealer vs licensed dealer

| | *עוסק פטור* (exempt dealer) | *עוסק מורשה* (licensed dealer) |
|---|---|---|
| Who | An individual whose annual turnover does not exceed **NIS 122,833** (2026) [P] | Anyone above the ceiling, any company, or a listed profession [P][S] |
| Charges VAT | No [P: VAT Law §31(3)] | Yes |
| Documents issued | Receipt (*קבלה*); may issue a transaction invoice (*חשבונית עסקה*) as a payment demand; **may not issue a tax invoice** [S] | Tax invoice, or tax invoice-receipt (*חשבונית מס-קבלה*) [P] |
| VAT reporting | An annual turnover declaration [S] | Periodic VAT returns [P] |

- **2026 ceiling.** The consolidated VAT Law on btl.gov.il defines an exempt dealer as one whose turnover *"אינו עולה על 122,833 שקלים חדשים"*. It was updated in Y.P. 14736, in force **1.1.2026** [P]. It was NIS 120,000 in 2024 and 2025 [S].
- **Excluded professions.** The VAT (Registration) Regulations, reg. 13, list who must be a licensed dealer regardless of turnover. The list covers lawyers, accountants, engineers, architects, doctors, dentists, vets, agents, driving schools, private kindergartens, companies and others [S: Kol-Zchut]. **Food producers and sellers are not on the list** [S]. A bakery may be an exempt dealer while under the ceiling.
- **Accessibility link.** An exempt dealer is also fully exempt from the website-accessibility regulations (reg. 35ו(ז)). See `israeli-web-accessibility-law.md` [P-copy].

### 4.2 Micro business (*בעל עסק זעיר*): an Income Tax track since 2024

- This is an Income Tax status for individuals whose turnover is under the same ceiling (NIS 122,833 in 2026). It applies to exempt and licensed dealers alike [S: Bizportal, Oct 2026].
- It allows a flat **30% deduction** for expenses instead of actual expenses. In most cases it also removes the annual return, the capital declaration and advance payments [S: Chamber of Commerce, on Finance Committee approval of 4 Nov 2024].
- It is barred for owners with employees, owners without proper books, and a few other cases [S].
- A Dec 2025 amendment to the Income Tax (Exemption from Filing a Return) Regulations, under §134א of the Ordinance, adjusted the definition and filing dates [P-copy: regulation text hosted by Capitax].
- It is worth asking the accountant about. Ingredient and packaging costs can exceed 30% of turnover in a bakery, so the flat deduction may lose [I].

### 4.3 Bituach Leumi (National Insurance)

- Notify Bituach Leumi as soon as you start working as self-employed [P].
- **If no tax file exists yet,** open VAT and Income Tax in **one digital process on the Tax Authority website** and tick the Bituach Leumi option. The request is forwarded automatically. This applies to exempt dealers too [P]. If a tax file already exists, file **form 6101** online [P].
- **2026 figures:** the minimum income base for a self-employed person is NIS 3,442 a month. The minimum monthly advance is **NIS 265**. The reduced rate applies up to NIS 7,703 a month [P: BTL circular 1502, 7 Jan 2026].
- **Definition.** Bituach Leumi treats you as self-employed if you work at least 20 hours a week on average, or earn at least 50% of the average wage, or work about 12 hours a week and earn at least 15% of the average wage [S: Kol-Zchut]. If the owner also has a salaried job, the classification and the minimum contribution need checking [I].

### 4.4 Steps and order

1. Open the tax files online on the Tax Authority site: exempt dealer, Income Tax, and tick Bituach Leumi [P][S]. Kol-Zchut lists a lease if the business is in rented premises, and email forms 821 and 5329 as an alternative [S].
2. Choose whether to join the micro-business track [S].
3. Install a receipt app (see section 5) before the first payment [I].

### 4.5 Cash rules

- The Law for Reducing the Use of Cash, 2018, limits cash in business transactions. A 2026 Income Tax circular (06/2026, in force 1.4.2026) uses NIS 6,000 as the key figure for cheques [P]. A bakery's orders will be far below the cash limits, but large event orders paid in cash should be checked [I].

### 4.6 MANDATORY vs ADVISABLE

| MANDATORY | ADVISABLE |
|---|---|
| Open the VAT and Income Tax files **before** the first sale [S] | Use an accountant for the first year [I] |
| Register with Bituach Leumi from the start of work [P] | Separate bank account and Bit account for the business [I] |
| Switch to licensed dealer if turnover passes NIS 122,833 [P] | Monitor turnover monthly against the ceiling [I] |

---

## 5. Invoices, receipts and bookkeeping

### 5.1 What each status issues

- **Exempt dealer:** a **receipt** (*קבלה*) "immediately on receiving payment" (*"מייד עם קבלת התמורה"*) [S: Kol-Zchut]. No tax invoice [S].
- **Licensed dealer:** a tax invoice (*חשבונית מס*) or tax invoice-receipt. Mandatory fields include name, address, the words "*חשבונית מס*" and "*עוסק מורשה*", the VAT number, and the VAT amount and rate (VAT Bookkeeping Regulations, reg. 9א(א)) [P].
- **Consumer Protection Law §4ב** separately requires the dealer's name and ID number on every order form, offer, contract, credit-card slip or tax invoice given to a consumer [P].

### 5.2 *חשבונית ישראל* (allocation numbers)

- **Legal basis:** VAT Law §38(א1). A business buyer may not deduct input VAT on a tax invoice above **NIS 5,000 before VAT** unless it carries an allocation number (*מספר הקצאה*). This is a transitional provision in force **1.1.2024 to 31.12.2028** [P].
- **Timeline:** NIS 25,000 (May 2024), then 20,000 (Jan 2025), then 10,000 (1.1.2026), then **5,000 (1.6.2026, current)**. No lower figure for 2027 had been published by Oct 2026 [S].
- **Applies to:** tax invoices between dealers. **Sales to private consumers and VAT-exempt invoices are outside the mechanism** [S]. One accountant blog says the reform covers private customers too, but it cites no law, and §38(א1) is about the buyer's input-VAT deduction [S][P].
- **For this bakery:** an exempt dealer issues no tax invoices, so the allocation number does not apply. As a licensed dealer selling to consumers it also would not apply. It would only matter for an order above NIS 5,000 from a business customer (for example a large office order) [I].

### 5.3 Bookkeeping (*ניהול ספרים*), in brief

- An exempt dealer must keep, at minimum, **receipt vouchers or a daily takings book** (*שוברי קבלה או ספר פדיון יומי*) plus a **file of external documents** (*תיק תיעוד חוץ*): supplier invoices and expense receipts (Bookkeeping Instructions §2א) [S].
- An exempt dealer must keep books for Income Tax unless the assessing officer exempts it in writing [S].
- Keep books and documents for **7 years** [S].
- Record every amount received immediately, whatever the method (cash, cheque, card, transfer) [S].

### 5.4 Digital receipts and Bit

- Digital receipts from an app are normal practice. Computerised bookkeeping must use software registered with the Tax Authority (the Tax Authority runs a register of such software and a lookup service) [S: gov.il service titles in search results; pages not fetchable]. Mainstream Israeli receipt apps are registered [S][I].
- **Bit implications** [I]:
  - A Bit payment is a payment received. Issue the receipt when the Bit transfer arrives, with "Bit" as the payment method.
  - Keep the Bit statement as supporting evidence.
  - Money arriving in a private Bit or bank account is still business income.
  - Check the bank's terms on using a personal Bit account for business. Bit and banks offer business variants.
  - The site should not tell the customer "payment is complete" until the owner has confirmed the transfer, because the receipt is tied to receiving the money.

---

## 6. Kashrut claims

### 6.1 The law

**Kashrut Fraud Prohibition Law, 5743-1983** (*חוק איסור הונאה בכשרות*), as enacted [P: Knesset gazette text]:

- §2: only the **Chief Rabbinate Council** (or a rabbi it authorises) or the **local rabbi where the business or production site is** may grant a kashrut certificate (*תעודת הכשר*).
- §3(א): *"בעל בית אוכל לא יציג בכתב את בית האוכל ככשר, אלא אם כן ניתנה לו תעודת הכשר"* (the owner of a food establishment shall not present it in writing as kosher without a certificate).
- **§4(א), the key section for a bakery:** *"יצרן של מצרך לא יציין על מצרך שייצר או על אריזתו כי הוא כשר ולא יציגו ככשר בפרסום או בדרך אחרת, אלא אם כן ניתנה לו תעודת הכשר"* (a producer shall not state on a product or its packaging that it is kosher, or present it as kosher **in advertising or in any other way**, without a certificate). A website and social-media posts are advertising [I].
- §5: a seller shall not sell non-kosher food while presenting it in writing as kosher.
- §6: a defence applies if the seller used, in good faith, an ingredient that holds a certificate.
- **Penalties:** the 1983 text gives up to **one year's imprisonment** [P]. The law is also enforced by **administrative fines** issued by the Chief Rabbinate's kashrut-fraud unit, and in 2021 the Rabbinate itself prosecuted a business [S]. I could not find the current fine amounts.

### 6.2 What wording is allowed without a certificate

- **The Supreme Court further hearing, 12 Sept 2017 (דנג"ץ 5026/16, Gini v. Chief Rabbinate; majority 5 to 2):** a food business without a certificate may not make any kashrut representation (*"אסור לבית אוכל שאינו מחזיק בתעודת הכשר להציג כל מצג כשרותי"*). It may give a **truthful written statement of the standards it keeps and how they are supervised**, provided it **states explicitly that it has no kashrut certificate** [S: Kipa, Globes; case number per IDI].
- The ruling was about restaurants (§3). Whether the same latitude applies to a **producer** under §4 is not confirmed [I].
- **Practical wording** [I]:

| Avoid | Lower risk (with "no kashrut certificate" stated next to it) |
|---|---|
| *כשר*, *מוצרים כשרים*, *כשר חלבי*, *כשר פרווה*, a kashrut logo or stamp | *"לעסק אין תעודת כשרות"* ("the business has no kashrut certificate") |
| *"כשר למהדרין"*, *"בהשגחה"* | *"כל חומרי הגלם בעלי תעודת כשרות"* ("all raw materials carry kashrut certification"), if true |
| | *"חלבי"* / *"פרווה"* / *"ללא בשר"* as plain ingredient facts, without the word *כשר* |

Note: even "dairy" and "pareve" can be read as kashrut claims. A lawyer should approve the final wording [I].

### 6.3 Can a home bakery get a rabbinate certificate?

- The Chief Rabbinate's **"Procedure of considerations for granting kashrut to a business in a private home"** (*נוהל שיקולים למתן הכשר לעסק בבית פרטי*) says a business inside a private home should **not** be certified in principle [P].
- The local rabbi may consider it only if the business is:
  - on a separate floor; or
  - on the same floor but fully separated, with its own entrance and no shared door, window or passage; or
  - in a separate structure in the yard.

  It must also meet all of these: the supervisor has free access at all times, the production area is locked, the supervisor is present during all production, household and business utensils are never shared, no unsupervised goods enter the area, and the owner signs the conditions [P].
- The procedure also flags production **without the required licences** as a problem [P]. So a licence comes first in practice [I].

### 6.4 Recent changes

- **Kahana reform:** a 2021 Arrangements Law amendment, in force January 2023. It opened certification to licensed private bodies and to rabbis outside their towns. It was never really implemented: the minister issued six-monthly orders keeping the old system, and the High Court issued an absolute order in Nov 2025 [S: IDI, June 2026].
- **Amendment No. 5, passed 14/15 July 2026 (46 to 41):** cancels the reform. Certificates are again issued only by the Chief Rabbinate Council, local rabbis in their own area, and the military rabbinate. Supervisors are employed by religious councils or local authorities, not by the business [S: Israel Hayom, Maariv, Walla, i24]. I did not find the Sefer HaChukim text or the commencement date.
- **Private bodies such as Tzohar or Hashgacha Pratit cannot issue a "kashrut certificate" under the law** [S]. A business may still describe, truthfully, a private supervision arrangement under the 2017 ruling, with the "no certificate" statement [S][I].

---

## 7. What the website may and must show

### 7.1 Seller identity and distance-selling disclosure (MANDATORY)

- **§4ב Consumer Protection Law** (added 2004): the dealer must give its **name and ID number** on order forms and correspondence to a specific consumer, on offers to contract, on contracts and on payment slips or tax invoices [P].
  - "Name", for an individual, means first and last name [P].
  - "ID number" is defined by reference to the Companies Law [P]. For a sole trader it is the Israeli ID number, which is also the exempt-dealer number [I].
- **§14ג(א), distance selling** (*עסקת מכר מרחוק*). Before the sale, the dealer must disclose at least [P-copy: 1998 gazette, OCR; S: Kol-Zchut for the current list]:
  1. name, ID or business number, and address in Israel (and abroad, if any);
  2. the main characteristics of the product;
  3. the price and the possible payment terms;
  4. the date and manner of delivery;
  5. how long the offer is valid;
  6. warranty details;
  7. the consumer's cancellation rights.
- **§14ג(ב):** the dealer must give a written document in Hebrew (or the marketing language) by delivery at the latest. It repeats the details above and adds the manufacturer and country of manufacture [P-copy][S]. An order-confirmation email can carry this [I].
- **§14ג(ג) and (ד):** the consumer may cancel within 14 days. This **does not apply to perishable goods (*טובין פסידים*)** or to **goods made specially for the consumer** [P-copy]. Fresh cakes are both. The site must still **state** that cancellation is not available and why, because the cancellation terms are part of the required disclosure [I].

### 7.2 Food information (labelling and allergens)

- **Prepacked food** follows the official standard **SI 1145** (*סימון מזון ארוז מראש*), mandatory (*רשמי*), from 1982 with amendment sheets [P].
- **EU Regulation 1169/2011** (food information to consumers) was adopted into Israeli law under §3א of the Food Law. The MoH published a labelling guide (v2, 29 June 2025) [P].
  - **Mandatory from 1 January 2028**, with early adoption allowed [S].
  - Allergens (the 14 EU groups) must be **highlighted in the ingredient list** [P][S].
  - Israel adds a mandatory fava-bean warning: *"מכיל פול – אינו מיועד לסובלים מחוסר באנזים G6PD"* [S].
  - **For non-prepacked (bulk) food, the allergen requirement is postponed in Israel to 1 January 2032** [P].
- **Online sale.** Since 1 October 2020 the Consumer Protection Authority has enforced showing the nutritional labelling details of prepacked products in online shops [S]. Under EU 1169/2011 Article 14, the mandatory food information must be available before a distance purchase. Whether and when Israel applies that article is not confirmed [I].
- **For this bakery** [I]:
  - Cakes boxed to order and sold direct are probably "non-prepacked" in the EU sense.
  - Even so, listing ingredients and the main allergens (gluten/wheat, eggs, milk, nuts, sesame, soy) for every product is **advisable now** and close to mandatory by 2028.
  - Add a cross-contact note ("may contain nuts / sesame") where the same kitchen handles them. The MoH guide expects producers to assess "may contain" labelling [P].
  - **Health and nutrition claims** ("healthy", "sugar-free", "gluten-free") are regulated (Food Law §13). Do not use them without checking [P-copy].

### 7.3 Licence numbers

- I found no rule that a website must show a business-licence number [I].
- The 4.2ג and 4.6ד specifications require the licence to be **displayed at the premises** (§2.6) [P].
- Showing a licence or kashrut certificate number on the site is advisable once you have one [I].

### 7.4 What not to claim until licensed

- No *כשר* or kashrut symbols (§4 Kashrut Fraud Law) [P].
- Do not say "licensed", "approved by the Ministry of Health" or *"בפיקוח משרד הבריאות"* ("under MoH supervision") until true [I]. False statements in a consumer offer are also misleading under the Consumer Protection Law [I].
- Avoid health claims [P-copy].

---

## 8. Recommended path from zero

| # | Step | Who | Cost / time (official where known) | Evidence |
|---|---|---|---|---|
| 0 | Launch the site as a **portfolio / "coming soon"** page: no prices, no cart, no "order now", no kashrut words | Owner / dev | Free, now | [I] |
| 1 | **Decide the premises:** rent a licensed commercial or shared kitchen, or convert a self-contained unit with its own entrance | Owner | Biggest cost item. The July 2026 reform lowered minimum sizes | [S][I] |
| 2 | **Ask the municipality's business-licensing department** which item applies (4.2ג vs 4.6ו). Request a **preliminary opinion**. Ask the planning department whether a deviating-use permit is needed | Owner / consultant | Statutory timelines apply after a full application (section 2.3) | [P][S] |
| 3 | **Open the tax files online:** exempt dealer, Income Tax, and tick Bituach Leumi. Decide on the micro-business track | Owner / accountant | Free online. Bituach Leumi minimum advance about NIS 265 a month | [P][S] |
| 4 | Set up a **receipt app** and a business Bit or bank account | Owner | Low monthly fee | [I] |
| 5 | **Fit out** the premises to the 4.2ג specification (separate prep area, hand-wash sink, cold holding). Prepare the **Fire and Rescue affidavit**. On the manufacturing track, submit a **sanitary plan** to the district health office | Owner / consultant | Fees: not found in primary sources | [P] |
| 6 | **Apply for the business licence**, or an expedited permit or licence on affidavit where offered. **Do not trade before applying**, or the expedited route is barred | Owner | Expedited permit answer in 21 days (Track A); permit within 5 days of affidavit | [P] |
| 7 | **Manufacturing licence** from the MoH, only if on the 4.6ו track | Owner | Licence valid 2 years; fee exists, amount not found | [P][P-copy] |
| 8 | **Optional: kashrut certificate** from the local rabbinate, if the premises meet the separation rules | Owner | Rabbinate fees per religious-council tariffs | [P] |
| 9 | **Turn on ordering** on the site, with full seller identity, product info and allergens, and correct kashrut wording | Dev | | [P][I] |
| 10 | **Ongoing:** receipt for every payment; keep documents 7 years; watch the NIS 122,833 ceiling; annual exempt-dealer declaration | Owner / accountant | | [P][S] |

**Order logic.** Tax registration (step 3) is independent and quick, so do it early. The MoH 2011 guide puts the municipal application first and the MoH manufacturing licence last [P]. The expedited permit is refused to a business already trading without a licence [P]. So selling should start only after step 6.

---

## 9. Implications for the website

**Footer (every page), MANDATORY once selling** [P]:
- Owner's full name, or the business name plus the owner's full name.
- ID or exempt-dealer number (*עוסק פטור מס'*).
- Address in Israel (the pickup address, or a postal address).
- Phone and email.

**Store and product pages:**
- MANDATORY [P]: price, and whether VAT applies. Exempt dealers charge none, so show the final price.
- MANDATORY [P]: main characteristics (size, weight, number of servings), delivery and pickup times and method, and how long the offer is valid.
- ADVISABLE now, near-MANDATORY by 2028 [I]: ingredients, allergens highlighted, and a "may contain" note.
- No *כשר* wording (see 6.2). Optional statement: *"לעסק אין תעודת כשרות"*, plus truthful ingredient facts.

**Terms page** (*תקנון*):
- Cancellation policy, stating that perishable and made-to-order goods cannot be cancelled under §14ג(ד) [P-copy].
- Delivery terms, payment methods (cash, Bit), when an order counts as paid, and the warranty or complaints process [P][S].

**Order confirmation email or WhatsApp:** this serves as the §14ג(ב) written document. It holds seller details, items, price, payment terms, delivery date and the cancellation statement [I].

**Fields the /admin needs** [I]:
- Per product: ingredients (HE/EN), an allergen checklist (the 14 EU groups plus fava), "may contain", storage instructions (refrigerate yes/no), shelf life, weight or size, and a made-to-order flag.
- Site settings: legal business name, owner name, ID or dealer number, dealer type (exempt or licensed, for the price and VAT text), address, business licence number (optional), kashrut status (none / certificate number plus issuer), and an "ordering enabled" switch so the site can run in portfolio mode.
- Per order: payment method, payment received timestamp, and receipt number. This links each order to a receipt from the receipt app.

**About page:** the story is fine. Avoid *"מטבח ביתי"* ("home kitchen") marketing if the licence is for separate premises. Never write *"כשר"* or *"באישור משרד הבריאות"* ("approved by the Ministry of Health") unless true [I].

---

## 10. Changes in 2025 to 2026 that matter here

| Change | Date | Effect | Evidence |
|---|---|---|---|
| Exempt-dealer ceiling raised to NIS 122,833 | 1.1.2026 | Higher headroom; also the micro-business ceiling | [P] |
| Allocation-number threshold down to NIS 5,000 | 1.6.2026 | B2B tax invoices only | [P] for the law text; [S] for the timeline |
| Food-establishment licensing reform signed | July 2026 | Smaller premises allowed; nothing for home kitchens | [S] |
| EU food-information rules adopted; allergen highlighting | Mandatory 1.1.2028; bulk-food allergens 1.1.2032 | Plan allergen data now | [P][S] |
| Kashrut Fraud Law Amendment 5 cancels the private-kashrut reform | Passed July 2026 | Only the rabbinate certifies | [S] |
| Bituach Leumi 2026 minimums | 1.1.2026 | NIS 265 minimum monthly advance | [P] |
| Cash-law circular 06/2026 | 1.4.2026 | Cheque and cash limits; not material for small orders | [P] |

---

## 11. Open questions and ambiguities

**For a business-licensing consultant or the municipality:**
1. **4.2ג or 4.6ו?** For a direct-to-consumer bakery with delivery, does the municipality and district health office classify it as 4.2ג (no manufacturing licence) or as 4.6ו (manufacturing licence)? My reading that 4.2ג sits under the §25 exemption is an inference.
2. **Is there any MoH route for a home unit?** Is there a route for a self-contained unit at home, and does the local planning committee require a deviating-use permit for pickup traffic?
3. **What does the July 2026 reform change in practice?** Get the signed regulations' official name, gazette number and commencement date, and check whether they change anything for 4.2ג.
4. **Fees.** Business-licence fees, MoH manufacturing-licence fees and inspection costs were not found in primary sources.
5. **Affidavit thresholds.** The exact per-column marks for 4.2ג in the Order need checking, because the gov.il PDF extraction was garbled.

**For an accountant:**
6. Is the micro-business track better than actual expenses for a bakery with high ingredient costs?
7. If the owner also has a salaried job: Bituach Leumi classification and minimum contributions.
8. Which receipt app to use, and is it on the registered-software list? Business Bit vs personal Bit, and bank terms.
9. When must the exempt-dealer annual declaration be filed, and how is the move to licensed dealer handled mid-year?

**For a lawyer:**
10. Does the 2017 "truthful description" latitude extend to producers under §4 of the Kashrut Fraud Law? What are the current administrative-fine amounts? What are the commencement date and final text of Amendment 5 (2026)?
11. Final wording of the cancellation clause for perishable, made-to-order goods under the current §14ג (I read the 1998 text plus Kol-Zchut, not the current consolidated text), and the cancellation regulations of 2010.
12. Does EU 1169/2011 Article 14 (distance-selling information) apply in Israel, and from when? Are boxed-to-order cakes "prepacked" for SI 1145 purposes?
13. Can the owner show a business ID or a P.O. box instead of a home address, for privacy?
14. Liability exposure if the owner sells before licensing, including insurance cover.

---

## 12. Sources (all accessed 2026-11-20)

### Primary: business licensing

- Business Licensing Order 5773-2013, gov.il PDF (Nevo-generated copy; text extraction garbled): https://www.gov.il/BlobFolder/dynamiccollectorresultitem/legislation-011/he/info-page_legislation_legislation-1--011.pdf
- Uniform specification, item 4.2ג (2026 file, Amendment 1): https://www.gov.il/BlobFolder/generalpage/uniform-spec-04-02c/he/04_2026_uniform-spec-04-02c-2026-clean.pdf
- Uniform specification, item 4.6ד (food transport): https://www.gov.il/BlobFolder/guide/reform-update1/he/home_main_business-licensing_reform_23-05-21-04-06-04.pdf
- Uniform specification, item 4.6ג (**fetched empty**): https://www.gov.il/BlobFolder/generalpage/uniform-spec-04-06c/he/18-07-2022_4.6c.pdf
- Ministry of Interior, business-licensing training material (Business Licensing Law text, Apr 2021): https://www.gov.il/BlobFolder/generalpage/business-licensing-reform/he/home_main_business-licensing_training-materials-014.pdf
- gov.il preliminary-opinion service (**not fetchable**): https://www.gov.il/en/service/business-license-review

### Primary: Ministry of Health and food law

- Public Health Protection (Food) Law 2015, English translation hosted by FAO [P-copy]: https://www.fao.org/fileadmin/user_upload/gmfp/docs/Israeli%20public%20health%20protection%202015.pdf
- MoH, Guide to obtaining a manufacturer licence (14 Feb 2011): https://www.gov.il/BlobFolder/reports/manufacturer-license/he/files_publications_MISC_Manufacturer_License.pdf
- MoH National Food Service, guideline on flexibility for small bakeries and patisseries (28 May 2019), hosted by a consultant [P-copy]: https://avivbarishuy.co.il/ab-forms/AB-form-Pastrie_takanot.pdf
- MoH, allergen labelling guide under EU 1169/2011 (v2, 29 June 2025): https://www.gov.il/BlobFolder/generalpage/allergens-guidance/he/files_publications_units_food_control_services_allergens-guidance.pdf
- SII catalogue page, SI 1145 Labelling of prepackaged food: https://www.sii.org.il/he/lobby/standardization/standard-page?id=4178
- MoH food-manufacturing licence service (**not fetchable**): https://www.gov.il/en/service/license-food-production
- Knesset Health Committee draft (alcoholic beverages; checked, not relevant): https://fs.knesset.gov.il/25/Committees/25_cs_sl_5201896.pdf

### Primary: tax and National Insurance

- VAT Law, consolidated (btl.gov.il; to Amendment 67, 31.3.2026): https://www.btl.gov.il/Laws1/00_0022_000000.pdf
- VAT (Bookkeeping) Regulations 1976, consolidated (btl.gov.il): https://www.btl.gov.il/Laws1/02_0022_100006.pdf
- Income Tax circular 06/2026 (cash law, cheques): https://www.gov.il/BlobFolder/policy/inst-06-2026/he/IncomeTax_inst-06-2026.pdf
- Bituach Leumi, how to register as self-employed: https://www.btl.gov.il/Insurance/National%20Insurance/type_list/Self_Employed/Pages/howtoregister.aspx
- Bituach Leumi circular 1502 (7 Jan 2026), 2026 self-employed contributions: https://www.btl.gov.il/Insurance/HozrimBituah/Hozrim/_%d7%9e%d7%a7%d7%93%d7%9e%d7%95%d7%aa_%d7%95%d7%93%d7%9e%d7%99_%d7%91%d7%99%d7%98%d7%95%d7%97_%d7%9c%d7%a2%d7%a6%d7%9e%d7%90%d7%99%d7%9d_2026__.pdf
- Income Tax (Exemption from Filing a Return) (Amendment) Regulations 5786-2025, hosted by Capitax [P-copy]: https://www.capitax.co.il/Attachments/22122023.pdf
- Tax Authority services (**not fetchable**): https://www.gov.il/he/service/request-open-exempt-dealer-via-internet ; https://www.gov.il/he/service/request-transfer-to-micro-business-owner ; https://www.gov.il/he/service/request-assignment-number-for-tax-invoice

### Primary: kashrut

- Kashrut Fraud Prohibition Law 5743-1983, as enacted (Knesset): https://fs.knesset.gov.il/10/law/10_lsr_209742.pdf
- Chief Rabbinate, Procedure for kashrut of a business in a private home: https://www.gov.il/BlobFolder/policy/nohalk4/he/%D7%A0%D7%95%D7%94%D7%9C%20%D7%A9%D7%99%D7%A7%D7%95%D7%9C%D7%99%D7%9D%20%D7%9C%D7%9E%D7%AA%D7%9F%20%D7%94%D7%9B%D7%A9%D7%A8%20%D7%9C%D7%A2%D7%A1%D7%A7%20%D7%91%D7%91%D7%99%D7%AA%20%D7%A4%D7%A8%D7%98%D7%99%20(1).pdf
- Kashrut Fraud Law PDF on gov.il (**not fetchable**): https://www.gov.il/BlobFolder/legalinfo/rols_and_regulations/he/prohibition_of_raud_in_kashrut_law_1983_0.PDF
- Kashrut market bill 2023 (private bill, checked, not enacted): https://fs.knesset.gov.il/25/law/25_lst_1841860.pdf

### Primary: consumer protection

- Consumer Protection Law, Amendment 14 (2004), adds §4ב and the definitions: https://fs.knesset.gov.il/16/law/16_lsr_299730.pdf
- Consumer Protection Law, Amendment 7 (1998), enacts §14ג (OCR) [P-copy]: https://fs.knesset.gov.il/14/law/14_lsr_211534.pdf
- Consumer Protection Law, Amendment 23 (2008), cross-reference only: https://fs.knesset.gov.il/17/law/17_lsr_300809.pdf

### Secondary

- Kipa, "Buying home food? Think again" (31 Jan 2021), MoH quote: https://www.kipa.co.il/אוכל/1105858-%D7%A7%D7%95%D7%A0%D7%99%D7%9D-%D7%90%D7%95%D7%9B%D7%9C-%D7%91%D7%99%D7%AA%D7%99-%D7%9B%D7%93%D7%90%D7%99-%D7%A9%D7%AA%D7%97%D7%A9%D7%91%D7%95-%D7%A2%D7%9C-%D7%96%D7%94-%D7%A9%D7%95%D7%91/
- Calcalist, food licensing reform in force (20 Jul 2026): https://www.calcalist.co.il/local_news/article/hycqsyjeme
- Klinger consultancy, 2026 food-establishment reform: https://www.klinger-building-permit-licensing.com/en/%D7%94%D7%A8%D7%A4%D7%95%D7%A8%D7%9E%D7%94-%D7%91%D7%A8%D7%99%D7%A9%D7%95%D7%99-%D7%91%D7%AA%D7%99-%D7%90%D7%95%D7%9B%D7%9C-2026-%D7%94%D7%A7%D7%9C%D7%95%D7%AA-%D7%97%D7%93%D7%A9
- Israel Hayom, MoH reform announcement (23 Mar 2025): https://www.israelhayom.co.il/health/article/17599288
- Food Safety News, Israel plans changes to food licensing (Nov 2024): https://www.foodsafetynews.com/2024/11/israel-plans-changes-to-food-licensing-rules/
- Tribune India / TPS, reform (24 Mar 2025): https://www.tribuneindia.com/news/world/israel-food-business-licensing-reform-to-allow-regulatory-relief
- buslic.co.il, food delivery and item 4.2ג: https://www.buslic.co.il/2019/02/05/mishloach_mazon/
- abiz.co.il, manufacturer licence for bakeries: https://abiz.co.il/%D7%A8%D7%99%D7%A9%D7%99%D7%95%D7%9F_%D7%99%D7%A6%D7%A8%D7%9F/%D7%A8%D7%99%D7%A9%D7%99%D7%95%D7%9F-%D7%99%D7%A6%D7%A8%D7%9F-%D7%9C%D7%9E%D7%90%D7%A4%D7%99%D7%95%D7%AA-%D7%95%D7%A7%D7%95%D7%A0%D7%93%D7%99%D7%98%D7%95%D7%A8%D7%99%D7%95%D7%AA/
- Aviv Barishuy, home business licence: https://avivbarishuy.co.il/business-at-home/
- Aviv Barishuy, "home manufacturer licence" (unverified claims): https://avivbarishuy.co.il/%D7%A8%D7%99%D7%A9%D7%99%D7%95%D7%9F-%D7%99%D7%A6%D7%A8%D7%9F-%D7%91%D7%99%D7%AA%D7%99/
- Aviv Barishuy, manufacturer licence: https://avivbarishuy.co.il/%D7%A8%D7%99%D7%A9%D7%99%D7%95%D7%9F-%D7%99%D7%A6%D7%A8%D7%9F-%D7%91%D7%AA%D7%97%D7%95%D7%9D-%D7%94%D7%9E%D7%96%D7%95%D7%9F/
- bizsuccess.co.il, home food business (8 Jun 2026): https://bizsuccess.co.il/%D7%94%D7%90%D7%9D-%D7%99%D7%A9-%D7%9E%D7%A7%D7%A8%D7%99%D7%9D-%D7%A9%D7%9E%D7%95%D7%AA%D7%A8-%D7%9C%D7%A2%D7%A9%D7%95%D7%AA-%D7%A2%D7%A1%D7%A7-%D7%9C%D7%9E%D7%96%D7%95%D7%9F-%D7%9E%D7%94%D7%91%D7%99/
- Kol-Zchut, running a business in a shared building: https://www.kolzchut.org.il/he/ניהול_עסק_בבית_משותף
- Kol-Zchut, exempt dealer: https://www.kolzchut.org.il/he/%D7%A2%D7%95%D7%A1%D7%A7_%D7%A4%D7%98%D7%95%D7%A8
- Kol-Zchut, business bookkeeping: https://www.kolzchut.org.il/he/ניהול_ספרי_החשבונות_של_העסק
- Kol-Zchut, self-employed under National Insurance: https://www.kolzchut.org.il/he/עובד_עצמאי_(לפי_הגדרת_המוסד_לביטוח_לאומי)
- Kol-Zchut, distance selling: https://www.kolzchut.org.il/he/עסקת_מכר_מרחוק
- Kol-Zchut, micro business (**not fetchable**): https://www.kolzchut.org.il/he/%D7%A2%D7%A1%D7%A7_%D7%96%D7%A2%D7%99%D7%A8
- Bizportal, exempt dealer and micro business 2026 (19 Oct 2026): https://www.bizportal.co.il/guides/news/article/20045314
- Green Invoice (Morning), exempt-dealer ceiling: https://www.greeninvoice.co.il/magazine/תקרת-עוסק-פטור/
- Green Invoice (Morning), Israel invoice requirements from 1.6.26: https://www.greeninvoice.co.il/israel-invoice/
- Gil Halevi Gold CPA, 2026 ceiling (14 Jan 2026): https://www.gmcpa.co.il/2026/01/14/%D7%A2%D7%93%D7%9B%D7%95%D7%9F-%D7%AA%D7%A7%D7%A8%D7%AA-%D7%A2%D7%95%D7%A1%D7%A7-%D7%A4%D7%98%D7%95%D7%A8-%D7%9C%D7%A9%D7%A0%D7%AA-2026-%D7%9E%D7%94-%D7%96%D7%94-%D7%90%D7%95%D7%9E%D7%A8/
- Baker Tilly, invoice reform 2026: https://bakertilly.co.il/blog-invoices-2026
- Horizon Group, allocation number timeline: https://horizon.org.il/cfo-outsource/allocation-number-invoice-2026/
- BSH CPA, exempt-dealer bookkeeping: https://www.bshcpa.co.il/עוסק-פטור-הוראות-ניהול-ספרים/
- Chamber of Commerce, Finance Committee approves micro-business regulations (Nov 2024): https://www.chamber.org.il/serviceslobby/finance/1427/154113/
- Chamber of Commerce, online nutrition-labelling enforcement (Jun 2020): https://www.chamber.org.il/sectors/1187/1197/13651/13653/105514/
- Israel Hayom, labelling from 2028 (28 Oct 2025): https://www.israelhayom.co.il/business/consumers/article/19118233
- Maariv, allergen labelling (27 Oct 2025): https://www.maariv.co.il/news/health/article-1245520
- Maariv, kashrut law passed (15 Jul 2026): https://www.maariv.co.il/news/politics/article-1344687
- Israel Hayom, kashrut reform cancelled 46 to 41 (14 Jul 2026): https://www.israelhayom.co.il/news/politics/article/20983795
- IDI opinion on the 2026 kashrut amendment (2 Jun 2026): https://www.idi.org.il/media/31130/opinion-of-idi-on-amendment-to-the-kashrut-law-june-2026.pdf
- Kipa, Supreme Court kashrut ruling (12 Sep 2017): https://www.kipa.co.il/חדשות/בגצ-מסעדה-תוכל-להציג-את-הקפדתה-בנושא-הכשרות-כל-עוד-לא-תשתמש-/
- Globes, Supreme Court eases business kashrut rules (13 Sep 2017): https://en.globes.co.il/en/article-supreme-court-eases-business-kashrut-rules-1001205022
- Toledano, partial text of בג"ץ 6494/14: https://www.toledano.co.il/בגץ-6494-14-שי-גיני-נגד-הרבנות-הראשית/
- Israel Hayom, alternative kashrut certificate fined (Jan 2021): https://www.israelhayom.co.il/article/841605
