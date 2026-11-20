# Tamir Bakery: design system

The visual style for the site and `/admin`. Hebrew first (RTL), English second, phone first, accessible to SI 5568 level AA (WCAG 2.0 AA).

- **Status:** draft for review, 2026-11-20
- **Applies to:** the Next.js app and the [client preview mockup](mockups/tamir-bakery-preview.html), which already uses these tokens.
- **Sources:** the `ui-ux-pro-max` skill database (product, color, style, typography, Google Fonts and UX rules; see [§11](#11-where-this-came-from)), plus our own research in [storefront-layouts.md](research/storefront-layouts.md) and [israeli-web-accessibility-law.md](research/israeli-web-accessibility-law.md).

---

## 1. Direction in one paragraph

**Warm, homemade, honest.** The site should feel like a clean kitchen counter in daylight: cream and flour tones, crust-brown actions, one berry accent, and lots of real photos. It is calm and readable, not trendy. Depth is soft (light shadows, rounded corners), never glossy. The photos carry the appetite; the interface stays quiet around them.

The skill's database matches a *Bakery/Cafe* product to a "warm brown + cream + appetizing accents" palette and a hero-led, conversion-focused page. For the look, it suggests two styles that both mirror fully in RTL: *Nature Distilled* (earthy, artisan, "handmade warmth") and *Soft UI Evolution* (soft depth with measured contrast and visible focus). We combine the two. We left out its other bakery suggestions, *Vibrant & Block-based* and *Claymorphism*: they are too loud for a one-person home bakery, and claymorphism tends to fail contrast.

**Avoid:** pastel-on-cream text (the most common way bakery sites fail contrast), stock photos, auto-rotating carousels, emoji as icons, script or handwriting fonts for anything people must read, and gradients or glassmorphism on controls.

---

## 2. Colour

All values are CSS custom properties on `:root`, with a dark theme under `prefers-color-scheme: dark` and an explicit `[data-theme]` override. Components use only the semantic names below, never raw hex.

### Light theme

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#FBF6EE` | Page background (cream) |
| `--surface` | `#FFFFFF` | Cards, header, footer, inputs |
| `--sunk` | `#F3EADC` | Wells, neutral chips, notes (flour) |
| `--fg` | `#2E1F16` | Body text, headings (dark cocoa) |
| `--muted` | `#6B5646` | Secondary text, captions |
| `--line` | `#E3D3BE` | Dividers and card borders (decorative) |
| `--field` | `#9A8470` | Input, checkbox and toggle borders (3:1 on white) |
| `--primary` | `#92400E` | Primary buttons, links, focus ring (crust brown) |
| `--on-primary` | `#FFFFFF` | Text on primary |
| `--primary-soft` | `#F8E6D2` | Selected chip, active nav, step numbers |
| `--berry` | `#A3264F` | One accent: "new" badges, small highlights. Not for buttons |
| `--berry-soft` | `#F9E3EA` | Background for berry badges |
| `--leaf` / `--leaf-soft` | `#476328` / `#E6EED8` | Success, available, paid |
| `--warn` / `--warn-soft` | `#855400` / `#FBEFD3` | Notices, lead-time warnings, unpaid |
| `--bad` / `--bad-soft` | `#A12A1C` / `#FBE3DE` | Errors, closed, sold out |

### Dark theme

| Token | Hex | Token | Hex |
|---|---|---|---|
| `--bg` | `#1A1310` | `--primary` | `#F2A65E` (caramel) |
| `--surface` | `#241B16` | `--on-primary` | `#2A1406` |
| `--sunk` | `#2E241D` | `--primary-soft` | `#45291A` |
| `--fg` | `#F6ECE1` | `--berry` / `--berry-soft` | `#F08DAD` / `#4A2230` |
| `--muted` | `#CDB9A6` | `--leaf` / `--leaf-soft` | `#AFCF8A` / `#2C3A20` |
| `--line` | `#46382D` | `--warn` / `--warn-soft` | `#F0C46A` / `#3D2F12` |
| `--field` | `#8C7765` | `--bad` / `--bad-soft` | `#F59C8E` / `#47201A` |

### Contrast, checked

Every text pairing was measured with the WCAG 2.0 formula. The lowest text pair is 5.6:1, so all clear the 4.5:1 AA minimum.

| Pair | Light | Dark |
|---|---|---|
| `--fg` on `--bg` | 14.8 | 15.7 |
| `--muted` on `--sunk` (worst muted case) | 5.8 | 8.0 |
| `--on-primary` on `--primary` (buttons) | 7.1 | 8.7 |
| `--primary` on `--bg` (links) | 6.6 | 9.1 |
| `--berry` on `--berry-soft` | 5.8 | 5.8 |
| `--leaf` on `--leaf-soft` | 5.7 | 7.0 |
| `--warn` on `--warn-soft` | 5.6 | 7.9 |
| `--bad` on `--bad-soft` | 6.0 | 6.7 |
| `--field` on `--surface` (non-text) | 3.6 | 4.0 |

`--line` is decorative only (card edges, dividers). Anything a user must see to operate, such as an input edge, uses `--field`. WCAG 2.0 doesn't require 3:1 for UI borders, but WCAG 2.1 does, and it costs nothing now.

### Colour rules

- **One action colour.** `--primary` means "you can press this". Berry is decoration and status, never a button.
- **Never colour alone.** Every status pill, error and "sold out" state carries a word, and an icon where it helps (SC 1.4.1). For example: "אזל", not just a red card edge.
- **Prices and labels are real text,** never baked into images (SC 1.4.5).
- If the owner later picks a brand colour, swap `--primary` and `--primary-soft` and re-run the contrast check. Nothing else should need to change.

---

## 3. Typography

| Role | Family | Weights | Why |
|---|---|---|---|
| Headings, brand, prices on the hero | **Frank Ruhl Libre** (serif) | 500, 700 | A classic Israeli serif with matched Hebrew and Latin. It gives the "crafted" feel the storefront research asked for, and its variable weight axis (300–900) means one file. |
| Body, UI, forms, `/admin` | **Heebo** (sans) | 400, 500, 700 | Hebrew drawn by Oded Ezer, Latin from Roboto, variable 100–900. It is the most used Hebrew family on Google Fonts in the skill's data and reads well at small sizes on phones. |
| Fallbacks | `"Assistant", "Segoe UI", Arial, sans-serif` and `Georgia, serif` | | Assistant and Arial both have Hebrew, so the page doesn't jump to a font without Hebrew. |

Load both from Google Fonts with `display=swap`, or self-host them with `next/font/google` (subsets `hebrew` and `latin`) in the app.

The skill's only stock Hebrew pairing is Noto Sans Hebrew on its own. It is a safe fallback, but it has no Latin of its own and feels more neutral than we want.

### Scale (rem, base 16px in both languages)

| Token | Size | Line height | Use |
|---|---|---|---|
| `--t-xs` | 0.875 (14px) | 1.45 | Chips, captions, footer. **Never smaller.** |
| `--t-sm` | 0.9375 (15px) | 1.5 | Secondary UI text, helper text |
| `--t-base` | 1 (16px) | 1.6 | Body, inputs, buttons |
| `--t-lg` | 1.125 (18px) | 1.55 | Lead paragraphs, card titles |
| `--t-h3` | 1.25 (20px) | 1.3 | Section sub-heads |
| `--t-h2` | clamp(1.5rem, 1.2rem + 1.2vw, 1.875rem) | 1.25 | Section titles |
| `--t-h1` | clamp(1.875rem, 1.4rem + 2vw, 2.5rem) | 1.15 | Page titles, hero |

### Hebrew type rules

- **No italics.** Hebrew has no true italic, and browsers fake one by slanting the letters. Use weight 500/700 for emphasis.
- **No `text-transform: uppercase` and no letter-spacing on Hebrew.** Hebrew has no case, and spaced-out Hebrew falls apart. For English, sentence case only.
- **Line length:** about 60–70 characters (`max-width: 62ch`) for body text.
- **Numbers:** `font-variant-numeric: tabular-nums` for prices, totals, order refs and dates. Prices go through `Intl.NumberFormat('he-IL' | 'en-IL', {style:'currency', currency:'ILS'})`, never string concatenation.
- **Mixed direction:** wrap phone numbers, order refs, emails and Latin brand names in `<bdi>` or `dir="ltr"` inside Hebrew text.
- **English snippets inside a Hebrew page** get `lang="en"`.
- Headings use `text-wrap: balance` to avoid a single orphan word.

---

## 4. Spacing, layout and shape

**Spacing scale (4px base):** `--s-1` 4 · `--s-2` 8 · `--s-3` 12 · `--s-4` 16 · `--s-5` 24 · `--s-6` 32 · `--s-7` 48 · `--s-8` 64. This is the skill's "standard" density, a notch toward roomy, which suits a shop window more than a dashboard.

| Rule | Value |
|---|---|
| Page gutter | 16px on phones (plus safe-area insets), 24px from 760px |
| Content width | `max-width: 44rem` single column on phones and small tablets; `64rem` from 900px |
| Gap between page sections | 40px phone, 56px desktop |
| Gap inside a card or form group | 12–16px |
| Breakpoints | 760px (two columns: hero, product page, about), 900px (wider container). Check at 375, 768, 1024 and 1440 |
| Product grid | `repeat(auto-fill, minmax(15rem, 1fr))`: one column on phones, two to four on desktop |

**Radius:** `--r-sm` 8px (inputs inside admin rows, small buttons) · `--r-md` 12px (inputs, option tiles, FAQ) · `--r-lg` 16px (cards, photos, panels) · `--r-pill` 999px (buttons, chips, nav pills).

**Shadow (light only):** `--shadow-1: 0 1px 2px rgb(46 31 22 / .06), 0 4px 14px rgb(46 31 22 / .06)` on cards and the sticky header; `--shadow-2: 0 2px 4px rgb(46 31 22 / .08), 0 12px 32px rgb(46 31 22 / .10)` for the toast and any dialog. In dark mode, use borders, not shadows.

**Layout rules:** logical properties only (`margin-inline-start`, `padding-inline`, `inset-inline-end`, `text-align: start`), so one stylesheet mirrors itself. `dir` and `lang` are set on `<html>`, never with CSS. No horizontal page scroll at 320px; only filter and nav pill rows may scroll sideways. Never disable zoom.

---

## 5. Components

Each component lists its states. A component isn't done until all of its states exist on a phone and on a desktop.

### Buttons

| Variant | Look | Use |
|---|---|---|
| Primary | `--primary` fill, `--on-primary` text, pill, weight 500 | One per view: "להוספה לסל", "שליחת הזמנה", "לחנות" |
| Secondary | `--surface` fill, 1px `--field` border, `--fg` text | Second action: WhatsApp, "חזרה" |
| Quiet / link | Text in `--primary`, underlined with a 3px offset | Inline actions, footer |
| Danger (admin only) | `--bad` text, secondary shape | Delete or cancel order, always with a confirm step |

- **Size:** minimum 44px tall on all public pages (the skill's 44pt touch rule; WCAG 2.2's floor is 24px). In dense `/admin` rows, 36px is the floor, with at least 8px between targets.
- **States:** hover darkens by about 8% (`color-mix(in srgb, var(--primary) 92%, black)`) over 150ms; pressed shifts down 1px; disabled is `opacity: .5`, `cursor: not-allowed` and has a visible reason next to it ("אזל מהמלאי"); loading keeps the width, shows a spinner and sets `aria-busy="true"`.
- A button with only an icon needs an `aria-label` in the current language.

### Focus

`outline: 3px solid var(--primary); outline-offset: 2px` on `:focus-visible` everywhere. Never remove it. On `--primary` fills, the ring sits outside the button against the page background, so it stays visible.

### Header and navigation

- Sticky, `--surface`, bottom border `--line`, `--shadow-1` once the page scrolls.
- Row 1: brand (mark + name) at inline-start; language switch ("English" / "עברית", the language's own name, no flag) and the cart pill at inline-end.
- Row 2: up to 4 visible text links as pills (`/`, `/store`, `/about`, the accessibility statement as a small underlined link at inline-end). No hamburger while there are 4 or fewer links. The active link is `--primary-soft` with `--primary` text and `aria-current="page"`.
- Store status banner under the header: `--warn-soft` for "orders open from …", `--bad-soft` for closed. Always text, never only colour.

### Cards (product)

- `--surface`, 1px `--line`, `--r-lg`, `--shadow-1`. Photo on top at 4:3 (16:9 is acceptable in a dense grid), with the radius only on the outer card.
- Content order: name (Frank Ruhl Libre 500, `--t-lg`) → short description (`--muted`) → chips (lead time, pickup/delivery, allergens) → price (Heebo 700, tabular) and the action in the footer row.
- The whole card is a link to the product page; the add button inside it is a separate control. Hover: title turns `--primary`, and the photo zooms to 1.03 over 250ms (skipped under reduced motion).
- **Sold out:** a "אזל" chip in `--bad-soft`, the photo at 60% saturation, the add button disabled with its reason, plus a "שאלו בוואטסאפ" link.

### Chips and status pills

Pill shape, `--t-xs`, weight 500, 2px × 10px padding, always with text:

| Meaning | Colours |
|---|---|
| Neutral info (lead time, category) | `--sunk` / `--muted` |
| Available, paid, ready, done | `--leaf-soft` / `--leaf` |
| Needs attention, unpaid, awaiting confirmation | `--warn-soft` / `--warn` |
| New order, "new" product | `--berry-soft` / `--berry` |
| Sold out, closed, declined | `--bad-soft` / `--bad` |

Filter chips (the store categories) are buttons with `aria-pressed`. Selected: `--fg` fill with `--bg` text.

### Size and option pickers

Buttons, not drop-downs (per the storefront research). Each tile shows servings and diameter ("12–15 מנות · 22 ס״מ"). Selected: 2px `--primary` border with `--primary-soft` fill and `aria-pressed="true"`, so the state is a border and a fill, not colour alone.

### Forms

- A visible label above every field, never a placeholder used as a label. Helper text under the label in `--muted`; the section 11 privacy collection notice sits above the submit button.
- Inputs: `--surface`, 1px `--field` border, `--r-md`, 44px minimum height, 16px text (prevents iOS zoom on focus).
- Errors: `aria-invalid="true"`, a 2px `--bad` border, and a message right under the field in `--bad` with an error icon and text ("נא לבחור תאריך"). On submit, focus moves to the first invalid field.
- Required fields are marked with the word "חובה", not only an asterisk.
- Dates: native `<input type="date">` in phase 1. Closed dates are blocked with a written reason.

### Photos and the gallery

- Real photos only: warm natural light, a neutral surface, one scale cue (a hand, a knife or a plate). No stock and no heavy filters.
- Ratios: 4:3 for cards and product pages, 5:4 for the hero, 1:1 for the gallery grid. Always set `aspect-ratio` and `width`/`height` to reserve space (CLS < 0.1). Lazy-load everything below the fold, serve WebP or AVIF through `next/image`.
- Every photo has Hebrew and English alt text written by the owner in `/admin` (SC 1.1.1). Decorative images get `alt=""`.
- Placeholders while photos don't exist: a warm diagonal gradient in the cream–caramel range with a caption naming the photo needed (as in the mockup).

### Steps ("how ordering works")

A row of 3–4 tiles numbered with `--primary-soft` circles. They read right-to-left in Hebrew and left-to-right in English because they follow DOM order, so no special CSS is needed.

### Footer

`--surface`, top border, `--t-xs` to `--t-sm` in `--muted`, links in `--fg`, underlined. Holds business details (name, area, עוסק status), policies, accessibility statement, WhatsApp and Instagram.

### Toast

Centred at the bottom above the safe-area inset, `--fg` fill with `--bg` text, pill, `--shadow-2`, `role="status"` and `aria-live="polite"`. It disappears after 4 seconds and never holds the only copy of important information.

### `/admin`

Same tokens, denser. The chrome is inverted (`--fg` background, `--bg` text) so the owner always knows they are in admin. Rows instead of cards, 36px controls, status pills from the table above, and destructive actions behind a confirm step. It must be fully usable on a phone: one column, with controls wrapping into a grid of at least 9rem columns.

---

## 6. Icons

- One outline icon family: **Phosphor** (regular weight, 20px in body text, 24px in the header), as the skill recommends, with Heroicons outline only as a fallback. Inline SVG, `currentColor`.
- **No emoji as icons.**
- An icon next to visible text gets `aria-hidden="true"`. An icon on its own needs an accessible name on its control.
- **Mirror in RTL:** arrows, chevrons, back/next, "send" and progress. **Don't mirror:** the WhatsApp logo, the cart, clocks, checkmarks, the search magnifier, phone and card numbers, and logos and photos. Use `[dir="rtl"] .icon-flip { transform: scaleX(-1) }` only on the icons that should mirror.

---

## 7. Motion

Subtle, the skill's motion dial at 2 of 10. Motion should confirm what happened, never decorate.

| What | Duration | Easing |
|---|---|---|
| Hover and colour changes | 150ms | `ease-out` |
| Pressed, chips toggling | 100ms | `ease-out` |
| Toast in / out | 200ms / 150ms | `ease-out` / `ease-in` |
| Card photo zoom on hover | 250ms | `ease-out` |
| Accordion (FAQ) open | 200ms | `ease-out` |

- Animate only `transform` and `opacity`.
- Wrap all motion in `@media (prefers-reduced-motion: no-preference)`. With reduced motion, show the end state at once.
- No auto-playing carousels, no parallax, no scroll-triggered reveals in phase 1. This matches the research and means we don't need GSAP.

---

## 8. Tone of voice

**Warm, direct, honest. Write like the baker talking at the counter.**

### Hebrew

- **Gender-neutral plural** for calls to action and instructions: "הזמינו", "בחרו גודל", "כתבו לנו". It is the norm on Israeli sites and avoids choosing a gender.
- Nouns for buttons where it reads naturally: "הוספה לסל", "שליחת הזמנה", "לחנות".
- Short sentences, everyday words. Use "עוגה בהזמנה אישית", not "מוצר מותאם".
- Be concrete about time and money up front: "הזמנה עד 3 ימים מראש", "איסוף מ…", "משלוח ₪25".
- **Kashrut:** never "כשר" or anything that looks like a certificate without a Rabbinate certificate (PLAN open question 8). Without one, describe ingredients and the kitchen factually.
- **Errors** say what to do, not what went wrong: "נא לבחור תאריך איסוף", not "שגיאה בטופס".
- Marketing messages are labelled "פרסומת" and sent only with prior consent (see the local SEO research).

### English

- A faithful, friendly translation, not a different voice. Sentence case. "Order a cake", "Add to cart", "Message us on WhatsApp".
- Keep Hebrew names of baked goods where there's no good English word, with a short gloss: "Rugelach (small rolled pastries)".

### Words we use and avoid

| Use | Avoid |
|---|---|
| עוגה, עוגיות, מאפים | מוצרים (except in `/admin`) |
| הזמנה, איסוף, משלוח | עגלת קניות (use "סל") |
| "אזל" + "שאלו בוואטסאפ" | "לא זמין" with no next step |
| Real reviews with names (with permission) | "הכי טעים בארץ", superlatives we can't prove |

---

## 9. Accessibility checklist (design side)

Taken from the skill's priority 1–2 rules and our accessibility research. Each item maps to SI 5568 / WCAG 2.0 AA unless marked.

- [ ] Text contrast 4.5:1, large text 3:1 (SC 1.4.3): **met by the token pairs in §2**
- [ ] Information not by colour alone (1.4.1): every status has a word
- [ ] Text resizes to 200% without loss (1.4.4): rem units, no fixed heights on text containers
- [ ] Visible focus on everything (2.4.7), with focus order that follows the RTL visual order (2.4.3)
- [ ] Skip link to the main content (2.4.1)
- [ ] Labels and instructions on every input; errors identified in text (3.3.1, 3.3.2)
- [ ] `lang` and `dir` on `<html>` (3.1.1)
- [ ] Alt text in both languages on every product and gallery photo (1.1.1)
- [ ] Touch targets 44px on public pages, 36px minimum in admin (skill rule; WCAG 2.2 2.5.8 is 24px)
- [ ] `prefers-reduced-motion` respected (skill rule)
- [ ] Accessibility statement linked from the header and footer (Israeli regulation 35)

---

## 10. Tokens as CSS

Copy this into the app's global stylesheet. The mockup uses the same names.

```css
:root{
  --bg:#FBF6EE; --surface:#FFFFFF; --sunk:#F3EADC;
  --fg:#2E1F16; --muted:#6B5646; --line:#E3D3BE; --field:#9A8470;
  --primary:#92400E; --on-primary:#FFFFFF; --primary-soft:#F8E6D2;
  --berry:#A3264F; --berry-soft:#F9E3EA;
  --leaf:#476328; --leaf-soft:#E6EED8;
  --warn:#855400; --warn-soft:#FBEFD3;
  --bad:#A12A1C; --bad-soft:#FBE3DE;

  --f-display:"Frank Ruhl Libre",Georgia,serif;
  --f-body:"Heebo","Assistant","Segoe UI",Arial,sans-serif;
  --t-xs:.875rem; --t-sm:.9375rem; --t-base:1rem; --t-lg:1.125rem; --t-h3:1.25rem;
  --t-h2:clamp(1.5rem,1.2rem + 1.2vw,1.875rem);
  --t-h1:clamp(1.875rem,1.4rem + 2vw,2.5rem);

  --s-1:4px; --s-2:8px; --s-3:12px; --s-4:16px; --s-5:24px; --s-6:32px; --s-7:48px; --s-8:64px;
  --r-sm:8px; --r-md:12px; --r-lg:16px; --r-pill:999px;
  --shadow-1:0 1px 2px rgb(46 31 22/.06),0 4px 14px rgb(46 31 22/.06);
  --shadow-2:0 2px 4px rgb(46 31 22/.08),0 12px 32px rgb(46 31 22/.10);
  --dur-fast:150ms; --dur-base:200ms; --dur-slow:250ms;
}
@media (prefers-color-scheme:dark){:root:not([data-theme="light"]){
  --bg:#1A1310; --surface:#241B16; --sunk:#2E241D;
  --fg:#F6ECE1; --muted:#CDB9A6; --line:#46382D; --field:#8C7765;
  --primary:#F2A65E; --on-primary:#2A1406; --primary-soft:#45291A;
  --berry:#F08DAD; --berry-soft:#4A2230;
  --leaf:#AFCF8A; --leaf-soft:#2C3A20;
  --warn:#F0C46A; --warn-soft:#3D2F12;
  --bad:#F59C8E; --bad-soft:#47201A;
  --shadow-1:none; --shadow-2:0 2px 8px rgb(0 0 0/.4);
  color-scheme:dark;
}}
/* Repeat the dark block under :root[data-theme="dark"] for a manual switch. */
```

Google Fonts link for the mockup or a plain page:

```html
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@500;700&family=Heebo:wght@400;500;700&display=swap">
```

In Next.js, prefer `next/font/google` with `subsets: ['hebrew','latin']` so the fonts are self-hosted and don't need a third-party request (which also simplifies the privacy notice).

---

## 11. Where this came from

Queries run against the `ui-ux-pro-max` skill (v2.15.0) database on 2026-11-20:

| Query | Result we used |
|---|---|
| `--design-system "home bakery cake shop warm artisanal ecommerce"` | Off target (a green "Minimalism & Swiss" SaaS palette and Nunito Sans, which has no Hebrew). **Not used**, except its dial settings and pre-delivery checklist. |
| `"bakery cafe food" --domain product --rtl` | *Bakery/Cafe*: warm brown + cream + appetizing accents; hero-centric + conversion; `rtl_level: full` |
| `"bakery cafe warm" --domain color` | Bakery palette: primary `#92400E`, cream background, brown text. We kept the primary and softened the background from `#FEF3C7` (too yellow) to `#FBF6EE`. |
| `"warm organic handmade" --domain style --rtl` | *Nature Distilled* (terracotta, sand, olive, "handmade warmth"; `rtl_level: full`). Its olive became `--leaf`. |
| `"soft ui evolution" --domain style --rtl` | Soft shadows, 8–12px radius, 200–300ms motion, measured contrast, visible focus |
| `"hebrew" --domain typography` | Noto Sans Hebrew (kept as a fallback only) |
| `--domain google-fonts` for Heebo, Frank Ruhl Libre, Assistant, Suez One | Hebrew and Latin subsets and variable axes confirmed |
| `--domain ux`: touch target, colour only, reduced motion | The rules in §5, §7 and §9 |
| `--domain icons`: accessible icon button | Phosphor outline, `aria-hidden` on decorative icons |

The berry accent comes from the first version of the mockup. Every contrast figure in §2 was computed with the WCAG 2.0 relative-luminance formula, not taken from the database.

### Changes from the first mockup

- Accent moved from raspberry (`#A3264F`) to crust brown (`#92400E`). Raspberry stays as the small "berry" accent.
- Background warmed from pink-white to cream; text from brown-grey to cocoa.
- Headings changed from Suez One (one weight) to Frank Ruhl Libre (variable). Suez One is still a good option for the logo wordmark if the owner prefers a bolder look.
- Added a dedicated `--field` border colour so inputs meet 3:1.
- Buttons on public pages are 44px tall; the smallest text is 14px.
