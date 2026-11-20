# Local SEO and marketing for a home bakery web store in Israel

- **Research date:** 2026-11-20
- **Scope:** Cheap, low-effort ways to get found and get orders: Google Business Profile, technical SEO in Next.js for a Hebrew-first (RTL) site with an English `/en/` mirror, Search Console and Bing, Hebrew keywords, social and WhatsApp channels, free Israeli directories, reviews, and the Israeli legal limits on marketing messages and endorsements. Phase 1 is "quick and dirty", so the priority is free and fast.
- **Status:** Research, not legal advice. Section 11 lists what is still unverified. Nothing here invents search volumes.

## How to read the evidence tags

| Tag | Meaning |
|---|---|
| **[P]** | I read it in a primary source: Google, Next.js, Meta, Apple, Microsoft or W3C documentation, schema.org, or a Knesset / gov.il document. |
| **[S]** | Only found in a secondary source (news, Chamber of Commerce, law-firm or vendor page), or I could only see the page title. The URL is given. |
| **[I]** | My inference or recommendation. Not stated in any source. |

**Sources I could not fetch.** These were blocked by robots rules, bot protection, the egress proxy, or render only with JavaScript:

- **WhatsApp Help Center** (`faq.whatsapp.com`): all pages, including "How to use click to chat", "How to create short links", "Business features", "How to create a link to your WhatsApp from your Google Business Profile" and "How to create and send a marketing message". Robots file unreachable; direct fetch refused by the proxy.
- **Instagram Help Center** (`help.instagram.com`): professional-account pages and "Set up a shop on Facebook and Instagram" return only metadata (JavaScript-rendered).
- **Meta Business Help Center** (`facebook.com/business/help/...`): "Commerce Eligibility Requirements" is robots-blocked.
- **Bing Places help** (`bing.com/forbusiness/help/...`): JavaScript-rendered, no content returned.
- **Easy** (`easy.co.il`): every page returned a client error, and the proxy refused direct access.
- **Kol-Zchut** spam-law page: client error.
- **Google Trends** explore pages and Google autocomplete: robots-blocked or refused by the proxy, so I could not pull any Hebrew query data.
- **Meta "Upcoming pricing updates for ... service and utility messages"** page: client error. The main WhatsApp pricing page did load and covers the same change.

---

## 1. TL;DR

1. **Do the Google Business Profile (GBP) first.** It is free [P], and for "near me" searches it matters more than anything on the site. A home bakery without a sign should be a **service-area business**: hide the home address and list up to 20 delivery areas [P]. That works cleanly only if the owner **delivers**. Pickup-only from a home with no sign is a grey zone; see section 2.1 [I].
2. **Primary category: "Bakery"** (or "Cake shop" if most orders are custom cakes). Add few extra categories. The name must be the real-world name only: no "עוגות בהזמנה" in the name, and no Hebrew+English double name [P].
3. **Verification will probably be a video recording.** Google recommends it where offered. For a home-based business it shows the street signs nearby, the equipment and products, and proof that you run it [P]. A business licence is one proof option, not the only one [P].
4. **Code work is small and mostly before launch.** It has five parts:
   - a `SITE_URL` env var feeding `metadataBase`;
   - `noindex` on the temporary `*.hosted.app` URL;
   - `lang`/`dir` on `<html>`;
   - per-page Hebrew and English titles and descriptions, with `canonical` and `he`/`en`/`x-default` alternates;
   - `sitemap.ts`, `robots.ts`, an Open Graph image under 600 KB (WhatsApp's limit) [P], and Product/Offer JSON-LD on fixed-price items.
5. **Once the domain exists:** verify it in Search Console (free, DNS record) [P], submit the sitemap, import it into Bing Webmaster Tools (free, one click) [P], and link the site from the GBP.
6. **WhatsApp Business app (free) is the main sales channel.** It gives you a catalogue, quick replies, greeting and away messages, and labels [P]. Put `wa.me` click-to-chat links with a prefilled Hebrew message on every product page [S]. **Do not use the WhatsApp Business Platform (API) in phase 1.** Since 1 Oct 2026, service messages beyond 1,000 a month are charged, and template messages are always charged [P].
7. **Instagram plus a Facebook page** for photos. Instagram Shopping is not worth the setup in phase 1 [I].
8. **Free directories worth five minutes each:** Apple Business (Apple Maps), Bing Places (imports from GBP), b144 (Bezeq) and Dapei Zahav (d.co.il). Each one confirmed a free listing on its own site [P]. Easy could not be verified.
9. **Reviews:** share the official GBP review link or QR code [P]. **Never** give a discount or gift for a review, and never ask only happy customers. Both break Google policy [P], and an incentive for a *positive* review is also a misleading practice under Israeli consumer law [P].
10. **Anti-spam law (§30A):** any promotional WhatsApp, SMS or email needs **prior explicit consent**. The word **"פרסומת"** must start the message, and each message needs a free, easy way to opt out. Statutory damages are up to **NIS 1,000 per message** [P]. Order confirmations are not advertising [I].

---

## 2. Google Business Profile (פרופיל עסק בגוגל)

### 2.1 Eligibility for a home bakery with no shopfront

| Point | What Google says | Tag |
|---|---|---|
| Who is eligible | A business that "either has a physical location that customers can visit, or travels to customers where they are". A virtual office or a mailbox-only address is not eligible. | [P] [guidelines](https://support.google.com/business/answer/3038177?hl=en) |
| Home-based = hide the address | "If you're a service-area business, you should hide your business address". Google's example is a plumber working from home: "clear the address from your Business Profile." | [P] [guidelines](https://support.google.com/business/answer/3038177?hl=en) |
| Definition of service-area business (SAB) | "A business that visits or delivers to customers directly but doesn't serve customers at their business address." | [P] [service areas](https://support.google.com/business/answer/9157481?hl=en) |
| No sign means no storefront | "A business without permanent on-site signage isn't eligible as a storefront and should be listed as a service-area business." | [P] [service areas](https://support.google.com/business/answer/9157481?hl=en) |
| Service area limits | Up to **20** areas (cities, postcodes). No radius. The whole area should be within about **2 hours' drive** of the base. | [P] [service areas](https://support.google.com/business/answer/9157481?hl=en) |
| Hiding is only for SABs | "You should only choose to not show your address if your business is a service-area business." | [P] [address](https://support.google.com/business/answer/2853879?hl=en) |
| Cost | "Yes, creating a Business Profile and listing your business on Google is free." | [P] [business.google.com](https://business.google.com/en-all/business-profile/) |

**What this means for us [I]:**

- **If the owner delivers,** even only locally, list the bakery as a SAB. Hide the address and list the towns and neighbourhoods served. This is the clean case.
- **If it is pickup-only from home,** the profile is in a grey zone. There is no sign, so it is not a storefront. There is no delivery, so it is not a SAB either. Offering local delivery, even for a fee, removes the ambiguity.
- **Hiding the home address is better for privacy anyway.** Give the pickup address privately on WhatsApp after the order is confirmed.
- **Get the business-licence research done first.** A public Google listing makes an unlicensed food business very visible. See PLAN.md, "Business licence and food permits".

### 2.2 Name and categories

- **Name:** it must match the real-world name used on the site, signage and stationery. Google forbids adding taglines, service descriptions, locations, phone numbers or URLs, and forbids "repeating the same business name in multiple scripts or languages" ("Kafiex / カフィエクス" is not allowed) [P] [guidelines](https://support.google.com/business/answer/3038177?hl=en).
  - Wrong: "תמיר – עוגות בהזמנה ברמת גן | Tamir Cakes".
  - Right: the bakery's actual name in the form the site uses [I].
- **Categories:** pick the most specific primary category "that best describes your business". Add "a few" additional ones, never one per product. "Bakery" appears in Google's own example [P] [categories](https://support.google.com/business/answer/7249669?hl=en). Up to 9 additional categories are allowed [P] [edit profile](https://support.google.com/business/answer/3039617?hl=en). Categories describe what the business **is**, "not ... solely as keywords" [P] [guidelines](https://support.google.com/business/answer/3038177?hl=en).
- **Suggestion [I]:** primary "Bakery" (מאפייה). Add "Cake shop" (חנות עוגות) if Google offers it in the picker, and possibly "Pastry shop". You can't create categories, so check the live list. Changing a category may trigger re-verification [P] [categories](https://support.google.com/business/answer/7249669?hl=en).

### 2.3 Verification in Israel

- Google decides which methods you see: "depend on your business type, public info, region, or business hours" [P] [verify](https://support.google.com/business/answer/7107242?hl=en).
- **Possible methods:**
  - phone or SMS;
  - email;
  - live video call, during business hours only;
  - **video recording**, which is recommended if offered;
  - postcard, which is not offered to everyone.
- Reviews take up to 5 business days [P] [verify](https://support.google.com/business/answer/7107242?hl=en).
- **Video recording for a service-area or home business** [P] [video](https://support.google.com/business/answer/14271705?hl=en):
  - **Location:** film "street signs, nearby landmarks" around the home. Don't film empty land.
  - **Equipment and products:** "Show the professional tools, equipment, or products you use for work", such as the oven, mixers, packaging and finished cakes.
  - **Proof of management:** film yourself doing the work, or show a business permit, invoice or utility bill in the business name.
  - **Rules:** one continuous, unedited video of at least 30 seconds, recorded live in the GBP app. No other people's faces and no sensitive information.
- **No licence yet [I]:** filming the baking process, branded boxes or labels, and an invoice or receipt in the business name should cover "proof of management" without a permit.
- **Instant verification [P]:** some profiles verify instantly through Search Console website verification [verify](https://support.google.com/business/answer/7107242?hl=en). That only becomes possible after the domain exists.

### 2.4 What to fill in

| Field | Notes | Tag |
|---|---|---|
| Description | Up to **750 characters**. No URLs or HTML. Describe the business, not promotions or prices. Write it in Hebrew. | [P] [edit](https://support.google.com/business/answer/3039617?hl=en) |
| Hours | Regular customer-facing hours plus special hours for holidays. Google says businesses "that operate only by appointment" shouldn't give hours. | [P] [guidelines](https://support.google.com/business/answer/3038177?hl=en) |
| Phone and chat | Primary number plus up to 2 more. A WhatsApp click-to-chat link can be added "in select regions". Google does not list the regions, so check whether Israel shows the option. | [P] [chat](https://support.google.com/business/answer/15013580?hl=en) |
| Website, social links | Full URL. One link each for Facebook, Instagram, TikTok and others. | [P] [edit](https://support.google.com/business/answer/3039617?hl=en) |
| Menu / products | The menu editor is for food and drink businesses. The **Products** section is limited to the US, Canada, UK and Ireland, so it is not available in Israel. | [P] [edit](https://support.google.com/business/answer/3039617?hl=en) |
| Photos | JPG/PNG, 10 KB–5 MB, 720×720 px recommended. "At least three" product photos. No heavy filters or AI. Photos show only after verification. | [P] [photo tips](https://support.google.com/business/answer/6123536?hl=en) |
| Posts | Updates, Offers and Events. Posts older than 6 months are archived unless dated. Posts stay "Pending" until the profile is verified. A phone number in a post may get it rejected. | [P] [posts](https://support.google.com/business/answer/7342169?hl=en-GB) |

**What helps ranking:** local results are "mainly based on relevance, distance, and popularity". A complete profile, verification, hours, replies to reviews and photos all help. "There's no way to request or pay for a better local ranking." [P] [ranking](https://support.google.com/business/answer/7091?hl=en)

**Cadence [I]:** one post and two or three new photos per holiday season (ראש השנה, חנוכה, ט"ו בשבט, פורים, פסח, שבועות). This is where seasonal Hebrew searches happen.

---

## 3. Technical SEO in Next.js (Hebrew default, English at `/en/`)

All Next.js references are from the current docs; generateMetadata was updated 2026-11-18.

### 3.1 What to build

| # | Item | How | Source |
|---|---|---|---|
| T1 | **Base URL from an env var** | Set `metadataBase: new URL(process.env.SITE_URL)` in the root layout. Relative URLs in canonical, alternates and OG are then resolved against it. "Using a relative path in a URL-based `metadata` field without configuring a `metadataBase` will cause a build error." On App Hosting, set `SITE_URL` in `apphosting.yaml` (`env:` → `variable`/`value`, `availability: [BUILD, RUNTIME]`). Use `apphosting.<env>.yaml` for per-environment values. | [P] [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) · [App Hosting config](https://firebase.google.com/docs/app-hosting/configure) |
| T2 | **`lang` and `dir` on `<html>`** | `<html lang="he" dir="rtl">` for Hebrew and `<html lang="en" dir="ltr">` under `/en/`. W3C: for RTL pages "add `dir="rtl"` to the `html` tag" and "Do not use CSS to apply base direction". The Next.js i18n guide puts the root layout under `app/[lang]/` and renders `<html lang={lang}>`. Google says it does **not** use `lang` to detect language. Still set it, because SI 5568 / WCAG 3.1.1 needs it (see the accessibility research). | [P] [W3C](https://www.w3.org/International/questions/qa-html-dir) · [Next i18n](https://nextjs.org/docs/app/guides/internationalization) · [Google](https://developers.google.com/search/docs/specialty/international/localized-versions) |
| T3 | **Hebrew at `/` without a prefix** | The Next.js guide's proxy example **redirects** visitors by `Accept-Language`. **Don't do that here.** Google: "Avoid automatically redirecting users from one language version of a site to a different language version". Googlebot "sends HTTP requests without setting `Accept-Language`". Instead, **rewrite** un-prefixed paths to the internal `he` segment, and show a visible "English" link. | [P] [Next i18n](https://nextjs.org/docs/app/guides/internationalization) · [Google multi-regional](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites) · rewrite approach [I] |
| T4 | **Titles and descriptions** | `title: { template: '%s \| <name>', default: '<name>' }` in each language's layout, plus a `description` per page. Google: titles should be descriptive, concise and unique per page, with no keyword stuffing and short branding at the start or end. | [P] [generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) · [title links](https://developers.google.com/search/docs/appearance/title-link) |
| T5 | **Canonical + hreflang** | `alternates: { canonical: '/store', languages: { he: '/store', en: '/en/store', 'x-default': '/store' } }`. The `x-default` value is "used when no other language/region matches the user's browser setting", so point it at Hebrew. Each version must list itself and the other version, or "the tags will be ignored". Canonical stays in the same language. Use `he`, not the legacy `iw` [I]: Google requires ISO 639-1 and doesn't mention `iw`. | [P] [Next alternates](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) · [hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) · [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) |
| T6 | **`app/sitemap.ts`** | Return every Hebrew URL with `alternates.languages` for `he` and `en` (supported since v14.2), built from `SITE_URL` and the Firestore product list. HTML hreflang tags and sitemap hreflang are equivalent to Google, so one is enough. Doing both is harmless. | [P] [sitemap](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap) · [hreflang](https://developers.google.com/search/docs/specialty/international/localized-versions) |
| T7 | **`app/robots.ts`** | `rules: { userAgent: '*', allow: '/', disallow: '/admin' }`, `sitemap: SITE_URL + '/sitemap.xml'`. | [P] [robots](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots) |
| T8 | **Open Graph image** (WhatsApp, Facebook previews) | Put `app/[lang]/opengraph-image.jpg` plus `opengraph-image.alt.txt` in place. Product pages set `openGraph.images` to the product photo. **WhatsApp:** needs `og:title`, `og:description` (about 80 characters is enough), `og:url` and an absolute `og:image`. The image must be **under 600 KB**, at least 300 px wide, with an aspect ratio of 4:1 or less, and the `<head>` must be in the first 300 KB of HTML. **Facebook:** at least 1200×630, close to 1.91:1, up to 8 MB. Use the Sharing Debugger to refresh its cache. **Target: 1200×630 JPEG under 600 KB.** A page that sets `openGraph` replaces the parent's whole `openGraph` object, so share image fields through a constant. | [P] [WhatsApp link previews](https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/) · [Facebook images](https://developers.facebook.com/docs/sharing/webmasters/images) · [Next OG](https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image) · [merging](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) |
| T9 | **No generated Hebrew OG text in phase 1** | `next/og` uses Satori. Its RTL support is partial: "Lines with inline elements in them are aligned, but their content isn't reordered yet". Bidi embeddings are "not supported yet". You would also have to bundle a Hebrew font. Use real photos instead. | [P] [Satori README](https://github.com/vercel/satori) · decision [I] |
| T10 | **`og:locale`** | Set `he_IL` on Hebrew pages and `en_US` (or `en_IL`) on English pages. Add `og:locale:alternate` for the other. | [P] [ogp.me](https://ogp.me/) |
| T11 | **Slugs** | Use English or transliterated ASCII slugs, e.g. `/store/chocolate-birthday-cake`, with hyphens. Google does accept non-ASCII words ("Use words in your audience's language in the URL (and, if applicable, transliterated words)") as long as they are percent-encoded. **Recommendation [I]:** ASCII. A Hebrew slug copied into WhatsApp often shows as a long `%D7%...` string, and one ASCII slug can serve both languages. | [P] [URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure) |

### 3.2 Structured data (JSON-LD)

**How to add it:** use a plain `<script type="application/ld+json">` in the page. Escape it with `JSON.stringify(jsonLd).replace(/</g, '\\u003c')`, which the Next.js guide gives as its XSS precaution. `schema-dts` can type it [P] [Next JSON-LD](https://nextjs.org/docs/app/guides/json-ld). Validate with the Rich Results Test.

**What Google supports.** The current gallery lists 25 features. The relevant ones are **Local business, Organization, Product, Review snippet and Breadcrumb**. FAQ and HowTo are not in the list [P] [gallery](https://developers.google.com/search/docs/appearance/structured-data/search-gallery).

| Type | Where | Rules | Value for us |
|---|---|---|---|
| `Bakery` | Home or contact page | schema.org path: LocalBusiness → FoodEstablishment → Bakery. Inherits `areaServed`, `priceRange`, `paymentAccepted`, `currenciesAccepted`, `hasMenu`, `servesCuisine` [P] [schema.org](https://schema.org/Bakery). **Google requires `name` and `address`** for local-business markup and recommends `telephone`, `url`, `openingHoursSpecification`, `priceRange` (under 100 characters) and `geo` [P] [Google LB](https://developers.google.com/search/docs/appearance/structured-data/local-business). | **Low** [I]. With a hidden street address you can give only a city-level `PostalAddress` (`addressLocality`, `addressCountry: "IL"`), which may not meet Google's requirement. The GBP drives the local panel anyway. Add it for completeness, with the city plus `areaServed`. |
| `Organization` | Root layout | Gallery feature. Use `name`, `url`, `logo` and `sameAs` (Instagram, Facebook). | Medium: helps the logo and name show correctly [I]. |
| `Product` + `Offer` | Fixed-price item pages | **Merchant listings** are for "pages where customers can purchase products from you". They require `name`, `image` and `offers`, and the Offer needs `price` (**greater than zero**) and `priceCurrency` (`ILS`). They need a single `Offer`, **not** `AggregateOffer`, and "Product rich results only support pages that focus on a single product". `availability` is recommended. Shipping and return details are recommended [P] [product](https://developers.google.com/search/docs/appearance/structured-data/product) · [merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing). | Medium for fixed items. **For custom cakes ("from ₪X")** a single fixed price doesn't fit merchant listings. Use `Product` without `offers`, or skip the markup [I]. |
| `BreadcrumbList` | Product pages | Gallery feature. | Low. Optional. |

### 3.3 Before the domain exists

| Problem | What to do | Tag |
|---|---|---|
| The temporary URL is `backend-id--project-id.<region>.hosted.app`. If Google indexes it, it competes with the real domain later. | **Keep it out of the index.** Set `robots: { index: false, follow: false }` in metadata (and/or an `X-Robots-Tag: noindex` header) when an env flag such as `ALLOW_INDEXING` is not `"true"`. **Do not also block it in robots.txt**: "the page or resource must not be blocked by a robots.txt file", or Google never sees the `noindex`. | [P] [App Hosting default domain](https://firebase.google.com/docs/app-hosting/get-started) · [noindex](https://developers.google.com/search/docs/crawling-indexing/block-indexing) |
| Canonical, hreflang, OG and sitemap URLs all need the final origin. | All of them come from `SITE_URL`. Nothing hardcodes a domain, which matches PLAN.md. At domain switch, change one env var and set `ALLOW_INDEXING=true`. | [I] |
| Search Console needs a verified property. | A Domain property needs a DNS record, so wait for the domain. A URL-prefix property can use an HTML `<meta name="google-site-verification">` tag. Next.js emits it from `metadata.verification.google`, so read it from an env var too. | [P] [SC verify](https://support.google.com/webmasters/answer/9008080?hl=en) · [Next verification](https://nextjs.org/docs/app/api-reference/functions/generate-metadata) |
| After the custom domain is connected, the `hosted.app` URL may still serve. The docs I read say nothing about disabling or redirecting it. | Keep `noindex` on any request whose `Host` is not the canonical host, or 301-redirect it in the proxy. The canonical tag pointing at the real domain is also a strong signal. | [P] [custom domain](https://firebase.google.com/docs/app-hosting/custom-domain) · [canonical](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls) · approach [I] |

---

## 4. Google Search Console and Bing Webmaster Tools (once the domain exists)

| Step | Detail | Tag |
|---|---|---|
| Search Console is free | "Google Search Console is a free service offered by Google". | [P] [about](https://support.google.com/webmasters/answer/9128668?hl=en) |
| Add a **Domain property** | It covers all subdomains and both http and https. Verification is by **DNS record only**. Keep the record, or verification is lost. | [P] [add property](https://support.google.com/webmasters/answer/34592?hl=en) · [verify](https://support.google.com/webmasters/answer/9008080?hl=en) |
| Submit `https://<domain>/sitemap.xml` | Use the Sitemaps report. Then check Page indexing for errors. | [I] |
| Use the Performance report as the free keyword tool | It shows the actual Hebrew queries that bring impressions and clicks. This is the only free source of real query data for the site. | [I] |
| Bing Webmaster Tools | Free. Add the site by **importing from Google Search Console** ("you can import your verified ownership directly"), or by XML file, meta tag or DNS TXT. Submit the sitemap. IndexNow is optional. | [P] [Bing blog 2025](https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/) |
| IndexNow (optional) | It notifies Bing, Yandex, Naver, Seznam, Yep and Amazon. Google is **not** listed. Skip it in phase 1. | [P] [IndexNow FAQ](https://www.indexnow.org/faq) · skip [I] |
| Link the GBP to the site | Add the website URL in the GBP. | [P] [edit](https://support.google.com/business/answer/3039617?hl=en) |

Effort: about 30 minutes in total. Most of it is waiting for DNS [I].

---

## 5. Hebrew keywords and URLs

### 5.1 No volumes here, by design

I could not fetch Google Trends or autocomplete from this environment. I have no verified Hebrew search volumes, so I give none. Use these free methods instead:

| Method | How | Caveats | Tag |
|---|---|---|---|
| **Google Trends**, geo Israel | Set Explore → country "Israel" (`geo=IL`), compare up to 5 terms, and look at "related queries". | Values are **relative 0–100, normalised** to time and place, not volumes. Low-volume terms show as **0**. Trends does **not** merge "misspellings, spelling variations, synonyms, plural, or singular versions". Combine variants with `+`, e.g. `עוגת יום הולדת + עוגת יומולדת`. | [P] [Trends FAQ](https://support.google.com/trends/answer/4365533?hl=en) · [terms vs topics](https://support.google.com/trends/answer/4359550?hl=en) |
| **Google Ads Keyword Planner** | Free to use without running ads, but "you must complete your account setup by entering your billing information". Set location to Israel and language to Hebrew, then use "Discover new keywords" or "Get search volume". | Volumes are rounded monthly averages that include close variants. Very low-volume terms may return no data. The Ads help I read does not say whether you can finish setup without creating a campaign. | [P] [Keyword Planner](https://support.google.com/google-ads/answer/7337243?hl=en) · [forecasts](https://support.google.com/google-ads/answer/3022575?hl=en) · [refine](https://support.google.com/google-ads/answer/6325025?hl=en) |
| **Search Console Performance** (after launch) | Shows the real queries and impressions for this site. | Only queries where the site already appears. | [I] |
| **Look at the results page** | Search each term from an Israeli phone. Note the autocomplete, "People also search for" and which competitors show in the map pack. | Manual, but free and fast. | [I] |

### 5.2 Candidate Hebrew terms to test (unverified, for the method above) [I]

- **Core:** עוגות בהזמנה · עוגה בהזמנה אישית · עוגות מעוצבות · עוגת יום הולדת · עוגות יום הולדת לילדים · מאפייה ביתית · קונדיטוריה ביתית · עוגות ביתיות
- **Occasions:** עוגת בר מצווה / בת מצווה · עוגת חתונה · עוגת אירוסין · מגש עוגיות · עוגות לשבת · עוגת גבינה לשבועות · משלוח עוגות
- **Styles:** עוגת בנטו · עוגת מספר · עוגת קרם · עוגת בצק סוכר. Use only the ones the owner actually makes.
- **Dietary:** ללא גלוטן / טבעוני / ללא סוכר. Use them **only if true and safe**. Allergen claims carry real risk; see the business-licence research.
- **Location modifiers:** append the owner's city and nearby towns and neighbourhoods, e.g. "עוגות בהזמנה ב<עיר>". Use the same towns as the GBP service areas.
- **Spelling variants to check in Trends with `+`:**
  - full and defective spelling (כתיב מלא / חסר): מאפייה / מאפיה;
  - יום הולדת / יומולדת;
  - singular and plural: עוגה / עוגות, עוגת;
  - with and without ה־.
- **Where to use them [I]:** put the main variant in the page title and H1, and work the others naturally into body text and FAQs. Don't stuff the GBP name.

### 5.3 Hebrew in URLs

Google allows Hebrew words in URL paths when they are percent-encoded. It suggests audience-language or transliterated words and hyphens between words [P] [URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure). Recommendation: ASCII slugs, with the Hebrew keywords in titles, H1s and text (see T11) [I].

---

## 6. Social and messaging channels

| Channel | Cost | What to use | Tag |
|---|---|---|---|
| **WhatsApp Business app** | "free-to-download" | Business profile, **catalogue** (products customers can browse and share), **quick replies**, **greeting and away messages**, and **labels** to track order status (e.g. "חדש", "שולם", "נאסף"). | [P] [WA vs WA Business](https://whatsappbusiness.com/resources/resource-library/whatsapp-vs-whatsapp-business/) · [features](https://whatsappbusiness.com/resources/resource-library/small-business-use-whatsapp-business-app/) |
| **Click-to-chat links** | Free | `https://wa.me/972XXXXXXXXX?text=<URL-encoded Hebrew>`: international format, no `+`, no leading 0. The text is prefilled, e.g. "היי, אשמח להזמין את <מוצר> לתאריך ...". Meta's API docs also describe editable `wa.me/message/<code>` short links and QR codes (prefill up to 140 characters). They are managed in Business Manager or the API; I could not confirm them for the app. | wa.me format [S] (WhatsApp FAQ not fetchable) · short links [P] [Meta QR/short links](https://developers.facebook.com/documentation/business-messaging/whatsapp/qr-codes) |
| **WhatsApp Business Platform (API)** | **Paid** | Per-message pricing by category and country, and Israel has its own rate. Service messages were free until 30 Sep 2026. **From 1 Oct 2026 there is 1,000 free service messages a month per number, then they are charged.** Template messages (marketing, utility, authentication) are charged per delivered message. A Click-to-WhatsApp ad opens a 7-day free window. **Not needed in phase 1** [I]. For automatic order alerts to the owner, the plan's email channel is free [I]. | [P] [WA pricing](https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing) |
| **Instagram professional account** | Free [I] | Switch to a Business or Creator account for a contact button and insights. Post real cakes, Reels of the process, and highlights for "איך מזמינים", "מחירים" and "ביקורות". Put the site and `wa.me` link in the bio. | Help pages not fetchable [S] [Instagram help](https://help.instagram.com/138925576505882/) |
| **Instagram / Facebook Shopping** | Free to list, but needs a catalogue, a domain and eligibility | Launched in Israel in Oct 2020 [S] [Ynet](https://www.ynetnews.com/business/article/rkZcBr3Pv). Current eligibility rules are on a robots-blocked page. Product tags show only "in the countries for which you have prices in your catalog" [P] [Meta dev](https://developers.facebook.com/documentation/ads-commerce/catalog/localized-catalog-ig). **Skip in phase 1** [I]: WhatsApp plus the site covers it. | [S]/[P]/[I] |
| **Facebook page** | Free [I] | Needed for Instagram–Facebook linking and local groups. Low effort: mirror the Instagram posts. Post in local neighbourhood groups only where the group rules allow it. | [I] |
| **TikTok** | Free [I] | Optional. Only if the owner enjoys making short videos; reuse the Instagram Reels. | [I] |

**What's cheapest and most effective [I]:** (1) GBP with photos and reviews; (2) WhatsApp Business, linked from everywhere; (3) Instagram for visual proof; (4) the site as the catalogue and order form. Paid ads are not needed for a home bakery in phase 1.

---

## 7. Free local directories and listings in Israel

| Listing | Free? | Notes | Tag |
|---|---|---|---|
| **Google Business Profile** | Yes | Section 2. Also feeds Google Maps. | [P] |
| **Apple Business** (formerly Apple Business Connect) → Apple Maps place card | Yes | Apple Business replaced Business Connect in 2026. The core is free in 200+ countries, and existing place cards migrated. Israel is listed for "Brand and Location Management", with the footnote that it "aren't available in all countries and regions". I did not confirm service-area or hidden-address support. | [P] [Apple newsroom](https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/) · [availability](https://support.apple.com/guide/business/feature-availability-axmef1c47twq/web) |
| **Bing Places for Business** | Yes ("a free online platform") | You can import from GBP. The API has `HideAddress` and `ServiceAreas` fields, but service areas are documented for the US, UK, Canada and Australia. A Microsoft Q&A thread reports a service-area business imported from Google with a misplaced fallback location. Check after import. | [P] [Bing blog](https://blogs.bing.com/search/2025/10/Introducing-the-New-Bing-Places-for-Business-Built-for-Business-Owners,-Powered-by-Research/) · [API PDF](https://cdn.bingplaces.com/tpshared/BingPlaces_API_Latest.pdf) · [S] [Q&A](https://learn.microsoft.com/en-us/answers/questions/5985512/service-area-business-synced-from-google-has-no-ad) |
| **b144** (Bezeq) | Yes: "רישום עצמי **חינם** לעסקים" | Bezeq's directory. | [P] [b144 about](https://www.b144.co.il/about/) |
| **Dapei Zahav** (d.co.il, Zap Group) | Yes: "הוסף עסק בחינם" | Add form: https://www.d.co.il/LandingPage/AddBusiness/. Paid "עסק זהב" upsells exist. | [P] [d.co.il](https://www.d.co.il/) |
| **Easy** (easy.co.il) | **Unverified** | Site not reachable from here. Secondary results suggest a business sign-up. Check by hand. | [S] |
| **Waze** | Free to suggest a place | Waze places are added from the app and reviewed by volunteer editors. There is a separate "residential place" path. Waze ads in Israel now run on Google Ads, and ad pins pull data from Google Places. For a home business with a hidden address, **skip Waze** [I]; the GBP covers Google's side. | [P] [Waze help](https://support.google.com/waze/answer/6262592?hl=en) · [Waze Israel ads](https://www.waze.com/discuss/t/waze/397731) |
| **Zap** (price comparison) | Not relevant | Zap compares retail products. Its relevant directory is Dapei Zahav (above). | [I] |

**Consistency [I]:** use exactly the same name, phone, website and service area everywhere. Mismatched listings confuse both customers and search engines.

---

## 8. Reviews

- **Get the link:** in the GBP on a computer, open **Read reviews → Get more reviews**. Copy the link or save the QR code; QR codes can only be generated on desktop. Google suggests sending it by email, WhatsApp or a Facebook post [P] [review link](https://support.google.com/business/answer/16816815?hl=en).
- **Where to put it [I]:**
  - a quick-reply template in WhatsApp Business, sent one or two days after pickup;
  - a small printed card or QR sticker on the cake box;
  - a "השאירו ביקורת בגוגל" link in the site footer and on the order-thanks page.
- **Forbidden by Google** [P] [prohibited content](https://support.google.com/contributionpolicy/answer/7400114?hl=en) · [tips](https://support.google.com/business/answer/3474122?hl=en) · [incentivized](https://support.google.com/contributionpolicy/answer/16597558?hl=en-GB):
  - "Offering incentives, like free or discounted goods or services, in exchange for customers to post reviews" ("strictly prohibited");
  - incentives to change or remove a review;
  - "selectively solicit positive reviews from customers", which is review gating;
  - "Discourage or prohibit negative reviews";
  - reviews from family, staff or the owner (conflict of interest).
- **Israeli law agrees.** The Consumer Protection Commissioner's position of 25 July 2021 covers three points [P] [gov.il PDF](https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_bikorutjuly2021/he/docs_hanhaiut_memone_%D7%92%D7%99%D7%9C%D7%95%20%D7%93%D7%A2%D7%AA%20%D7%91%D7%A2%D7%A0%D7%99%D7%99%D7%9F%20%D7%97%D7%95%D7%95%D7%AA%20%D7%93%D7%A2%D7%AA%20%D7%93%D7%99%D7%A8%D7%95%D7%92%D7%99%D7%9D%20%D7%95%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA%20%D7%91%D7%A8%D7%A9%D7%AA%20%D7%94%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98.pdf):
  - Promising a reward for a positive review is "התנהגות פסולה".
  - On your own site, hiding, editing or diluting reviews is a misleading act ("מעשה מטעה").
  - A paid or incentivised review is advertising and must be disclosed "בצורה ברורה בסמוך לפרסום חוות הדעת".
- **Reply to every review**, briefly and personally. Don't promote in replies, and never share a reviewer's private details [P] [tips](https://support.google.com/business/answer/3474122?hl=en).
- **Reviews shown on the site [I]:** if the site shows testimonials, show them honestly with dates, not only the best ones. Don't mark them up with `AggregateRating`: Google's local-business markup reserves review markup for sites that review *other* businesses [P] [Google LB](https://developers.google.com/search/docs/appearance/structured-data/local-business).

---

## 9. Legal guardrails for marketing in Israel

### 9.1 Anti-spam law: Communications Law (Bezeq and Broadcasts), §30A (*חוק הספאם*)

Source: Amendment No. 40, 5768-2008, as gazetted. It passed on 27 May 2008 and took effect six months after publication [P] [Knesset PDF](https://fs.knesset.gov.il//17/law/17_lsr_299991.pdf).

| Rule | Text / effect | Tag |
|---|---|---|
| What counts as an ad (*דבר פרסומת*) | "מסר המופץ באופן מסחרי, שמטרתו לעודד רכישת מוצר או שירות או לעודד הוצאת כספים בדרך אחרת" (a commercially distributed message meant to encourage buying a product or service, or spending money in another way). | [P] |
| Consent first | No ad by fax, automatic dialler, electronic message or SMS "בלא קבלת הסכמה מפורשת מראש של הנמען, בכתב, לרבות בהודעה אלקטרונית או בשיחה מוקלטת" (without the recipient's prior explicit consent in writing, including an electronic message or a recorded call). | [P] |
| WhatsApp is covered | The Chamber of Commerce lists "הודעת ווטסאפ, מסנג'ר וכדומה" alongside SMS and email. | [S] [Chamber 2020](https://www.chamber.org.il/serviceslobby/legal/74023/115485/) |
| Existing-customer exception (30א(ג)) | No consent is needed only if all three conditions hold. (1) The customer gave their details during a purchase or purchase negotiation **and** was told they would be used for ads. (2) They were given a chance to refuse and did not. (3) The ad is for similar products. | [P] |
| The word "פרסומת" | "המילה "פרסומת" תופיע בתחילת דבר הפרסומת". For email it goes in the subject line. | [P] |
| Opt-out | Recipients can refuse at any time. Refusing must be free, except for the cost of sending the refusal. Every ad must say how to refuse, in a simple and reasonable way. Email ads need a working refusal link. | [P] |
| Damages | Up to **NIS 1,000 per ad**, without proof of harm, where the sender acted knowingly. | [P] |
| Courts enforce it | The Supreme Court (Dec 2018) told lower courts to award meaningful, deterrent damages, even when a claim is filed with help from a claims company. | [S] [Globes](https://www.globes.co.il/news/article.aspx?did=1001264492) |

**What it means for this bakery [I]:**

- **Not ads:** order confirmations, "your cake is ready", payment links for an order the customer placed, and replies to a customer's own question. These are transactional, not *דבר פרסומת*.
- **Ads:** "חנוכה is coming, order sufganiyot", holiday menus and discount offers are ads. Send them **only** to people who opted in. Start with "פרסומת", and end with an opt-out line such as "להסרה השיבו 'הסר'".
- **On the site:** an **unticked** checkbox at checkout, "אני מאשר/ת לקבל עדכונים ומבצעים ב-WhatsApp/SMS/מייל". Store the consent text, the time and the channel in Firestore. An `unsubscribed` flag must stop all marketing sends.
- **Holiday posts on Instagram, Facebook or the GBP are not §30A messages.** They are public posts, not messages sent to a recipient.
- **Privacy:** storing consent and contact data overlaps the pending privacy-law research (Amendment 13).

### 9.2 Influencers and paid posts

- **Legal basis:** the Consumer Protection Law, 1981. §2 bans misleading acts, and §2(ג) applies this to advertising. §7(א)(1) makes liable whoever caused an ad to be published, not only the business it was published for [P] [Commissioner 2021](https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_bikorutjuly2021/he/docs_hanhaiut_memone_%D7%92%D7%99%D7%9C%D7%95%20%D7%93%D7%A2%D7%AA%20%D7%91%D7%A2%D7%A0%D7%99%D7%99%D7%9F%20%D7%97%D7%95%D7%95%D7%AA%20%D7%93%D7%A2%D7%AA%20%D7%93%D7%99%D7%A8%D7%95%D7%92%D7%99%D7%9D%20%D7%95%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA%20%D7%91%D7%A8%D7%A9%D7%AA%20%D7%94%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98.pdf).
- **Gifts count as payment.** If you give a free cake to an Instagram mum or a food blogger for a post, the post is an ad. The commercial link must be disclosed clearly, next to the content. The same position says this applies to bloggers and influencers [P] (same PDF).
- **Suggested wording.** The Consumer Protection Authority's 2020 study recommends the word "**פרסומת**" plus the commercial party's name. In its tests that wording was recognised better than "בשיתוף" or "תוכן ממומן" [P] [CPFTA study](https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_advertising2020/he/docs_dalia_covert_advertising.pdf).
- **Practical rule [I]:** any gifted or paid collaboration post should start with "פרסומת – <שם המאפייה>", or use Instagram's paid-partnership label as well.

### 9.3 Kashrut and other claims

- **Don't write "כשר"** anywhere without a kashrut certificate. That covers the GBP description, Instagram bio, product pages and hashtags. The Kashrut Fraud Prohibition Law, 1983 bans presenting a product as kosher "in advertising or in any other way" without one. Details are in [storefront-layouts.md](storefront-layouts.md) (Israeli legal items) and PLAN.md open question 8.
- **Kashrut attributes:** don't pick kashrut-related GBP attributes or categories either [I].
- **Health claims:** the same caution applies to "ללא גלוטן" and "ללא סוכר" until the business-licence and food-labelling research is done [I].

---

## 10. Prioritised action list

Effort is rough. "Free" means no cash cost.

### 10.1 Code work for Yevgeny

| When | Task | Effort | Cost |
|---|---|---|---|
| Before launch | `SITE_URL`, `ALLOW_INDEXING` and `GOOGLE_SITE_VERIFICATION` env vars in `apphosting.yaml`. Set `metadataBase` from `SITE_URL` (T1). | 30 min | Free |
| Before launch | `noindex` (meta and/or `X-Robots-Tag`) unless `ALLOW_INDEXING=true`. Don't disallow in robots.txt (3.3). | 30 min | Free |
| Before launch | `app/[lang]` root layout with `<html lang dir>` (`he`/`rtl`, `en`/`ltr`). Hebrew served at `/` via rewrite, English at `/en/`. No `Accept-Language` redirect; add a visible language link (T2, T3). | 1–2 h, if not already in the skeleton | Free |
| Before launch | Title template, then a Hebrew and English `title` and `description` for every page, using Hebrew keywords from 5.2 (T4). | 1–2 h, plus the owner's copy | Free |
| Before launch | `alternates.canonical` and `alternates.languages` {`he`, `en`, `x-default`→Hebrew} on every page. Build them in one helper from the path (T5). | 1 h | Free |
| Before launch | `sitemap.ts`: static pages plus Firestore products, with language alternates. `robots.ts` with the sitemap URL and `/admin` disallowed (T6, T7). | 1 h | Free |
| Before launch | Default `opengraph-image.jpg`: 1200×630, **under 600 KB**, with alt text. Product pages use the product photo. Set `og:locale`. Test in Facebook's Sharing Debugger and by sending a link on WhatsApp (T8–T10). | 1 h | Free |
| Before launch | ASCII product slugs (T11). | Part of the data model | Free |
| Before launch | JSON-LD: `Organization` (logo, `sameAs`) in the layout; `Product`+`Offer` (ILS, price > 0) on fixed-price items; `Product` without an offer, or nothing, on custom cakes; optional city-level `Bakery` (3.2). Validate with the Rich Results Test. | 2 h | Free |
| Before launch | `wa.me` click-to-chat buttons with a prefilled, URL-encoded Hebrew message per product, using the owner's number from settings (section 6). | 30 min | Free |
| Before launch | Marketing consent: an unticked checkbox, with consent text, time and channel stored in Firestore, an `unsubscribed` flag, and an admin export of opted-in contacts only (9.1). | 1–2 h | Free |
| At launch | Set `SITE_URL` to the domain and `ALLOW_INDEXING=true`. Noindex or redirect the `hosted.app` host. Add the Search Console DNS record, or the meta tag via env (3.3, 4). | 30 min, plus DNS wait | Free (domain itself is paid) |
| At launch | "Leave a Google review" link (the owner's GBP link from settings) on the order-thanks page and in the footer (8). | 15 min | Free |

### 10.2 Owner tasks

| When | Task | Effort | Cost |
|---|---|---|---|
| Before launch | Decide whether to deliver (even locally), so the GBP is a clean service-area business (2.1). | Decision | Free |
| Before launch | Install **WhatsApp Business** on the business number. Set the profile, catalogue (start with 5–10 items), quick replies (prices, lead time, pickup info, review request), greeting and away messages, and order-status labels. | 1–2 h | Free |
| Before launch | Instagram professional account and a Facebook page. Add 9–12 good photos, a bio with the `wa.me` link, and highlights for ordering, prices and reviews. | 1–2 h | Free |
| Before launch | Take 20–30 well-lit photos of real products. They feed the site, the GBP (at least 3 product photos) and Instagram. | Half a day | Free |
| Before launch | Write the 750-character Hebrew GBP description and short page descriptions. Keep them factual; no "כשר" unless certified. | 1 h | Free |
| Before launch (any time) | **Create the GBP.** Real name only, category Bakery, address hidden, service areas, hours, phone, WhatsApp, social links. Complete verification (probably video) (2.1–2.4). | 1 h, plus up to 5 business days of review | Free |
| At launch | Add the website URL to the GBP, Instagram and Facebook. | 10 min | Free |
| At launch | Bing Places (import from GBP), Apple Business place card, b144, Dapei Zahav. Check Easy by hand. Use identical name, phone, site and area everywhere (7). | 1 h total | Free |
| At launch | Bing Webmaster Tools: import from Search Console and submit the sitemap. Yevgeny can do this instead (4). | 10 min | Free |
| Ongoing | Ask every happy, and every unhappy, customer for a review with the official link. No incentives. Reply to every review (8). | 2 min per order | Free |
| Ongoing | One GBP post plus Instagram posts per holiday or season. Add new photos monthly. | 30 min a month | Free |
| Ongoing | Promotional WhatsApp/SMS/email **only** to opted-in customers. Start with "פרסומת", add an opt-out, and remove anyone who opts out at once (9.1). | — | Free |
| Ongoing | Monthly: check Search Console queries (the real Hebrew keywords) and GBP insights, then adjust titles and descriptions. | 20 min a month | Free |
| Optional | Keyword Planner check, which needs billing details on file (5.1). | 30 min | Free if no campaign runs |

---

## 11. Open questions and things not verified

1. **Whether Israel gets GBP chat (WhatsApp link) and which verification methods it offers.** Google says both vary by region. The owner will see this when creating the profile.
2. **Pickup-only eligibility.** Google's text covers storefronts (with a sign) and SABs (that travel or deliver). A home with no sign and pickup only fits neither cleanly. This is my reading [I].
3. **Exact `wa.me` syntax and Business-app short links.** The WhatsApp FAQ was unreachable. The format given is widely used [S]; test it on a phone.
4. **Instagram Shopping eligibility in Israel today.** It launched in 2020 [S]; the current requirements page is robots-blocked.
5. **Paid "marketing messages" inside the WhatsApp Business app.** A WhatsApp FAQ page with that title exists, but I could not read it. Don't assume broadcasts are free at any scale.
6. **Easy (easy.co.il) free listing:** not verified.
7. **Next.js `alternates.languages` with `'x-default'`.** Google's hreflang rules are clear, but I did not read the Next.js `Languages` type itself. Check that TypeScript accepts the `'x-default'` key, or add it via `other`.
8. **Whether `hosted.app` keeps serving after a custom domain is connected.** The docs I read are silent, so handle it in code (3.3).
9. **§30A and WhatsApp.** The statute lists "electronic message" and SMS; that WhatsApp is covered comes from a Chamber of Commerce summary [S]. In practice treat WhatsApp as covered.
10. **No search volumes are given anywhere in this file.** Use the methods in 5.1.

---

## 12. Sources (all accessed 2026-11-20)

### Google Business Profile and Maps policy

- Guidelines for representing your business on Google: https://support.google.com/business/answer/3038177?hl=en
- Manage your business address: https://support.google.com/business/answer/2853879?hl=en
- Manage your service areas: https://support.google.com/business/answer/9157481?hl=en
- Verify your business on Google: https://support.google.com/business/answer/7107242?hl=en
- Verify your business with a video recording: https://support.google.com/business/answer/14271705?hl=en
- Manage your business category: https://support.google.com/business/answer/7249669?hl=en
- Edit your Business Profile: https://support.google.com/business/answer/3039617?hl=en
- Tips for business-specific photos: https://support.google.com/business/answer/6123536?hl=en
- Create and manage posts: https://support.google.com/business/answer/7342169?hl=en-GB
- Chat with customers from your Business Profile: https://support.google.com/business/answer/15013580?hl=en
- Tips to improve local ranking: https://support.google.com/business/answer/7091?hl=en
- Create a Google link or QR code to request reviews: https://support.google.com/business/answer/16816815?hl=en
- Tips to get more reviews: https://support.google.com/business/answer/3474122?hl=en
- Maps UGC policy, prohibited and restricted content: https://support.google.com/contributionpolicy/answer/7400114?hl=en
- Incentivized or biased reviews: https://support.google.com/contributionpolicy/answer/16597558?hl=en-GB
- Business Profile product page (free): https://business.google.com/en-all/business-profile/

### Google Search Central and Search Console

- Do I need SEO?: https://developers.google.com/search/docs/fundamentals/do-i-need-seo
- Localized versions (hreflang): https://developers.google.com/search/docs/specialty/international/localized-versions
- Managing multi-regional and multilingual sites: https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites
- URL structure: https://developers.google.com/search/docs/crawling-indexing/url-structure
- Block indexing with noindex: https://developers.google.com/search/docs/crawling-indexing/block-indexing
- Consolidate duplicate URLs (canonical): https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Title links: https://developers.google.com/search/docs/appearance/title-link
- Structured data search gallery: https://developers.google.com/search/docs/appearance/structured-data/search-gallery
- Local business structured data: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Product structured data: https://developers.google.com/search/docs/appearance/structured-data/product
- Merchant listing structured data: https://developers.google.com/search/docs/appearance/structured-data/merchant-listing
- Search Console, about: https://support.google.com/webmasters/answer/9128668?hl=en
- Search Console, add a property: https://support.google.com/webmasters/answer/34592?hl=en
- Search Console, verify ownership: https://support.google.com/webmasters/answer/9008080?hl=en

### Keyword tools

- Google Trends FAQ: https://support.google.com/trends/answer/4365533?hl=en
- Google Trends, search terms vs topics: https://support.google.com/trends/answer/4359550?hl=en
- Use Keyword Planner: https://support.google.com/google-ads/answer/7337243?hl=en
- About Keyword Planner forecasts: https://support.google.com/google-ads/answer/3022575?hl=en
- Refine keywords in Keyword Planner: https://support.google.com/google-ads/answer/6325025?hl=en

### Next.js, Firebase, web standards

- generateMetadata / Metadata fields: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
- sitemap.xml: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap
- robots.txt: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
- opengraph-image and twitter-image: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/opengraph-image
- JSON-LD guide: https://nextjs.org/docs/app/guides/json-ld
- Internationalization guide: https://nextjs.org/docs/app/guides/internationalization
- Satori README (RTL limits of `next/og`): https://github.com/vercel/satori
- Firebase App Hosting, get started (default `hosted.app` domain): https://firebase.google.com/docs/app-hosting/get-started
- Firebase App Hosting, connect a custom domain: https://firebase.google.com/docs/app-hosting/custom-domain
- Firebase App Hosting, configure (env vars): https://firebase.google.com/docs/app-hosting/configure
- W3C, structural markup and RTL text in HTML: https://www.w3.org/International/questions/qa-html-dir
- schema.org Bakery: https://schema.org/Bakery
- Open Graph protocol: https://ogp.me/

### Bing, IndexNow, Apple, Waze, Israeli directories

- Bing Webmaster blog, getting started (2025): https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/
- Bing Places, new version (Oct 2025): https://blogs.bing.com/search/2025/10/Introducing-the-New-Bing-Places-for-Business-Built-for-Business-Owners,-Powered-by-Research/
- Bing Places API PDF (HideAddress, ServiceAreas): https://cdn.bingplaces.com/tpshared/BingPlaces_API_Latest.pdf
- Microsoft Q&A, service-area business sync issue [S]: https://learn.microsoft.com/en-us/answers/questions/5985512/service-area-business-synced-from-google-has-no-ad
- IndexNow FAQ: https://www.indexnow.org/faq
- Apple newsroom, Apple Business (Mar 2026): https://www.apple.com/newsroom/2026/03/introducing-apple-business-a-new-all-in-one-platform-for-businesses-of-all-sizes/
- Apple Business feature availability: https://support.apple.com/guide/business/feature-availability-axmef1c47twq/web
- Waze Help, add a place: https://support.google.com/waze/answer/6262592?hl=en
- Waze Discuss, Waze ads in Israel (Jan 2026): https://www.waze.com/discuss/t/waze/397731
- b144 about page: https://www.b144.co.il/about/
- Dapei Zahav home page and add-business form: https://www.d.co.il/ · https://www.d.co.il/LandingPage/AddBusiness/

### Meta (WhatsApp, Facebook, Instagram)

- WhatsApp Business Platform pricing: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing
- WhatsApp QR codes and short links: https://developers.facebook.com/documentation/business-messaging/whatsapp/qr-codes
- WhatsApp link previews: https://developers.facebook.com/documentation/business-messaging/whatsapp/link-previews/
- WhatsApp vs WhatsApp Business: https://whatsappbusiness.com/resources/resource-library/whatsapp-vs-whatsapp-business/
- WhatsApp Business app tools: https://whatsappbusiness.com/resources/resource-library/small-business-use-whatsapp-business-app/
- Facebook sharing, images: https://developers.facebook.com/docs/sharing/webmasters/images
- Meta, localized catalog for Instagram product tagging: https://developers.facebook.com/documentation/ads-commerce/catalog/localized-catalog-ig
- Ynet, Instagram Shopping in Israel (Oct 2020) [S]: https://www.ynetnews.com/business/article/rkZcBr3Pv

### Israeli law and regulators

- Communications Law Amendment No. 40 (§30A), Sefer HaChukim 2008: https://fs.knesset.gov.il//17/law/17_lsr_299991.pdf
- Chamber of Commerce, "חוק הספאם – רענון נהלים" (Nov 2020) [S]: https://www.chamber.org.il/serviceslobby/legal/74023/115485/
- Globes, Supreme Court on spam damages (Dec 2018) [S]: https://www.globes.co.il/news/article.aspx?did=1001264492
- Consumer Protection Commissioner, position on online reviews and ratings (25 Jul 2021): https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_bikorutjuly2021/he/docs_hanhaiut_memone_%D7%92%D7%99%D7%9C%D7%95%20%D7%93%D7%A2%D7%AA%20%D7%91%D7%A2%D7%A0%D7%99%D7%99%D7%9F%20%D7%97%D7%95%D7%95%D7%AA%20%D7%93%D7%A2%D7%AA%20%D7%93%D7%99%D7%A8%D7%95%D7%92%D7%99%D7%9D%20%D7%95%D7%91%D7%99%D7%A7%D7%95%D7%A8%D7%95%D7%AA%20%D7%91%D7%A8%D7%A9%D7%AA%20%D7%94%D7%90%D7%99%D7%A0%D7%98%D7%A8%D7%A0%D7%98.pdf
- Consumer Protection Commissioner, draft directive (Jan 2021): https://www.gov.il/BlobFolder/news/cpfta_internetopinion2021/he/docs_draft_supervisor_guide.pdf
- Chamber of Commerce on the final 2021 position [S]: https://www.chamber.org.il/serviceslobby/legal/1857/124267/
- Consumer Protection Authority, advertorial disclosure study (Oct 2020): https://www.gov.il/BlobFolder/dynamiccollectorresultitem/cpfta_advertising2020/he/docs_dalia_covert_advertising.pdf
- Kashrut Fraud Prohibition Law, 1983 (via storefront research): https://fs.knesset.gov.il/10/law/10_lsr_209742.pdf

### Could not fetch (listed for follow-up)

- WhatsApp FAQ, click to chat: https://faq.whatsapp.com/5913398998672934
- WhatsApp FAQ, short links: https://faq.whatsapp.com/502291734918768/
- WhatsApp FAQ, link from Google Business Profile: https://faq.whatsapp.com/712818078160617
- WhatsApp FAQ, business features: https://faq.whatsapp.com/825930685527017
- WhatsApp FAQ, marketing messages: https://faq.whatsapp.com/652901706468344
- Instagram, about professional accounts: https://help.instagram.com/138925576505882/
- Instagram, set up a shop: https://help.instagram.com/1187859655048322/
- Meta, commerce eligibility requirements: https://www.facebook.com/business/help/2347002662267537
- Bing Places, businesses without a physical store: https://www.bing.com/forbusiness/help/businessesWithoutPhysicalStore
- Bing Places, sync Google Business Profile: https://www.bing.com/forbusiness/help/syncGoogleBusinessProfile
- Easy, business sign-up: https://easy.co.il/biz/kidum-lp/
- Kol-Zchut, spam law: https://www.kolzchut.org.il/he/פיצוי_בגין_משלוח_דברי_פרסומת_ללא_הסכמה_של_הנמען_(חוק_הספאם)
- Google Trends explore (geo=IL): https://trends.google.com/trends/explore?geo=IL
- Meta, upcoming pricing for non-template messages: https://developers.facebook.com/documentation/business-messaging/whatsapp/pricing/non-template-messages.md
