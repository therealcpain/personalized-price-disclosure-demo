# Personalized Price Disclosure Card

**Paste merchant type + what checkout / UI said (+ view date) → one shareable card:**  
giant **n/3 disclosure** badge · **days-until-Sep-25** chip · **“specially selected ≠ enough”** strip when that chip is chosen · FTC proposed three-part checklist (personalized · basis · data types) · calm ftc.gov + regulations.gov pointer.

Brand on the surface: **Personalized Price Disclosure Card** only.

Not a price scraper. Not a VPN “beat the algorithm” tool. **Not legal advice.** Proposed Enforcement Policy Statement literacy only — **not a final rule**. User-pasted chips only — zero merchant scrape. Never invents a user’s “true” price or alleges a named merchant violated Section 5.

## Hypothesis

Shoppers see different hotel / delivery / rideshare prices across devices and cannot tell whether the UI disclosed personalization. Flip that fog into a **disclosure-honest share card** from their own chips + the Sep 25 2026 comment cliff — without scraping merchants. Success = completes + shares in the two weeks before Sep 25.

## How to test (local)

```bash
cd kb/mde/personalized-price-disclosure
npm run build          # copies assets → dist/
npm run verify         # countdown + checklist score + seed checks
# either open the file:
open index.html        # or dist/index.html
# or serve:
npm start              # http://localhost:4242
```

Manual checklist:

1. Open the page → click **Hotel · specially selected · 0/3** → giant **0/3** badge, specially-selected ≠ enough strip, Sep 25 countdown, proposed/not-final footer.
2. Click **Food delivery · no disclosure · 0/3** → 0/3 · all triad items unchecked.
3. Click **Rideshare · personalized · 1/3** → 1/3 · only “price is personalized” checked.
4. Click **Retail · full triad · 3/3** → 3/3 · all three checked.
5. Click **Grocery · unsure · comment cliff** → ?/3 · DUE TODAY (Sep 25 view date).
6. Paste your own merchant + disclosure + view date → **Show disclosure card**.
7. Missing view date → honest status (no invented days left).
8. **Copy summary** → clipboard has score + countdown + FTC cites.
9. **Share link** → `#p=` restores the card.
10. **Export PNG** → dark checklist card with **n/3** + days-left + **PROPOSED / not a final rule** text on the face (not color-only).
11. Surface brand is **Personalized Price Disclosure Card** only (no Conglomerate / personal names).

### GitHub Pages

This folder is static-ready. Point Pages at `/` of a dedicated repo (or `/docs` after copying `dist/`), with `index.html` at the site root. Relative paths (`styles.css`, `app.js`) work on project pages.

```bash
npm run build   # optional artifact in dist/
```

Do **not** create the public repo or post from this build step — Steward handles Pages + distro. Distro stays product-linked only (e.g. r/privacy, r/personalfinance, r/Flights hotel/rideshare threads in the Sep 15–25 brand-account window). **No sock accounts.** No fake FTC complaint stories.

## Seed cohort (MVP)

Labeled teaching receipts — not live merchant scrapes. Never invent a user’s “true” price or a Section 5 allegation.

| Chip | View date | Teaching point |
|------|-----------|----------------|
| Hotel · specially selected · 0/3 | 2026-09-13 | “Specially selected” alone · incomplete strip |
| Food delivery · no disclosure · 0/3 | 2026-09-13 | Zero disclosure |
| Rideshare · personalized · 1/3 | 2026-09-13 | Personalized without basis / data types |
| Retail · full triad · 3/3 | 2026-09-13 | Full proposed checklist |
| Grocery · unsure · comment cliff | 2026-09-25 | Unsure · DUE TODAY |

## Checklist logic (public FTC proposed framing)

| Chip | Score | Notes |
|------|-------|-------|
| No disclosure | **0/3** | All triad items unchecked |
| “Specially selected” only | **0/3** | Explicit incomplete strip — FTC: alone likely misleading |
| “Personalized” without basis / data | **1/3** | Element 1 only |
| Full triad | **3/3** | Personalized + basis + data types (your chip) |
| Unsure | **?/3** | We will not invent marks |

| Calendar | Framing |
|----------|---------|
| Proposal | **Aug 19 2026** proposed Enforcement Policy Statement |
| Comment deadline | **Sep 25 2026** (extended Sep 3 2026) |
| Status | **Proposed — not a final rule** (always on card + PNG) |
| True price / Section 5 | **Never invented** for a named merchant |
| Comment path | ftc.gov + regulations.gov · scams → ReportFraud.ftc.gov |
| Hard avoid | VPN / “beat personalized pricing” affiliate funnels |

## Ads pathway (ad-only free utility — do not spend yet)

| Path | Notes |
|------|--------|
| **Revenue (primary)** | **AdSense / display under the card + “what is personalized pricing disclosure?” explainer** (not inside the PNG). Inventory spikes Sep 15–Sep 26. Justified when sessions cover hosting. Free card forever — **no paywall**, no Gumroad. |
| **Brand-safe** | Informational proposed-policy literacy + public FTC cites. **Not** legal advice or enforcement prediction. Ads **not** inside PNG. **Hard avoid** VPN / affiliate “beat personalized pricing” funnels. Point only to ftc.gov comment path + ReportFraud.ftc.gov for scams. |
| **Sponsorship (later)** | Optional nonprofit consumer-rights sponsorship only if brand-safe. |
| **Acquisition (gated)** | Google “FTC personalized pricing comment deadline” / “personalized pricing disclosure” + Reddit promo week of Sep 15. Creative = “Paste what checkout said — does it clear the FTC’s 3-part checklist?”. Max CPA abort ~$0.30–0.50 without a completed share. Debit/cash only. **Spend only after one organic privacy-thread test.** |
| **UTM** | Example: `?utm_source=reddit&utm_medium=organic&utm_campaign=personalized_price_disclosure_mvp` |
| **Tracking** | Card gens + share clicks (GoatCounter path when Pages is live). |
| **Abort sketch** | Pause paid if CPA exceeds band without share / “comment window closes in X days” replies. |

**No spend from this ready_for_pages step.** Ads are the monetization path (**ad-only OK**).

## Product constraints

- Single static site (no backend).
- **Chips only from user paste** (or labeled seeds). Never invent a “true” price or Section 5 allegation.
- Brand: **Personalized Price Disclosure Card** only on surface.
- Score badge, days-left, and specially-selected strip text-labeled (not color-only). **Proposed / not final** always on share PNG.
- Share = URL hash + PNG + copy summary.
- No merchant login. No price scrape. No VPN funnel. No sock “sue Amazon for your price” farms.

## Files

| Path | Role |
|------|------|
| `index.html` | App shell (GitHub Pages entry) |
| `app.js` | Checklist score, Sep 25 countdown, seeds, card, share hash, PNG |
| `styles.css` | Personalized Price Disclosure Card UI (Honest Chart pattern) |
| `scripts/build.js` | `npm run build` → `dist/` |
| `scripts/verify.js` | `npm run verify` — countdown + score checks |
| `package.json` | build / start / preview / verify scripts |

## Opportunity

Internal card: `opp_consumer_personalized_price_disclosure` (consumer / pricing honesty).  
Experiment stub: `institutions/mde/experiments/exp_personalized_price_disclosure.md`.
