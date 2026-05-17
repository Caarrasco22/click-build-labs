# Future Tools Roadmap

> **Internal planning document — do not treat as a public roadmap.**

This document lists candidate tools planned for future batches. None of the tools listed here are currently published, registered in the ClickBuildLabs registry, or accessible via public URLs. They will be implemented and reviewed one block at a time, following the project conventions already established.

---

## Block 1 — SEO / Static Site Advanced

Extends the SEO/Cloudflare/Static Site block that is already live (Cloudflare Pages Redirects Generator, Cloudflare Pages Headers Generator, Robots.txt Generator, Sitemap.xml Generator, Meta Title & Description Preview).

### Candidate tools

| # | Tool | Deterministic? | Notes |
|---|------|----------------|-------|
| 1 | Open Graph Preview Tool | Yes (preview only) | Approximate preview; must say it may differ from platform renderings |
| 2 | HTML Meta Tags Generator | Yes | Generates `<meta>` tags from inputs; tag template, not SEO advice |
| 3 | Canonical URL Checker | Yes | Parses and normalises a canonical URL; simple comparison tool |
| 4 | Hreflang Tag Generator | Yes | Generates `<link rel="alternate" hreflang="…">` from language/URL pairs |
| 5 | UTM Builder | Yes | Builds UTM-parameterised URLs; similar pattern to Query String Builder |
| 6 | URL Slug Generator | Already implemented | — |
| 7 | Noindex/Nofollow Meta Tag Generator | Yes | Generates `<meta name="robots">` tags; copy-ready snippets |
| 8 | Twitter/X Card Preview Tool | Yes (preview only) | Approximate card preview; must note platform variations |
| 9 | Redirect Chain Planner | Yes | Visual/textual planner for redirect sequences; deterministic path mapping |
| 10 | Static Site Launch Checklist | Yes | Interactive checklist with copyable summary; opinionated but factual |

### Notes

- Prioritise deterministic tools.
- Do not promise guaranteed SEO results.
- Previews must clearly state they are approximate.
- Keep visual and copy style consistent with the tools already live in this category.

### Recommended priority (first 5)

1. Open Graph Preview Tool
2. HTML Meta Tags Generator
3. Canonical URL Checker
4. Hreflang Tag Generator
5. UTM Builder

---

## Block 2 — 3D Printing / Maker

Practical calculators for filament-based and resin 3D printing workflows.

### Candidate tools

| # | Tool | Deterministic? | Notes |
|---|------|----------------|-------|
| 1 | Filament Grams to Meters Calculator | Yes | Converts weight to length using filament density and diameter |
| 2 | Filament Meters to Grams Calculator | Yes | Inverse of the above |
| 3 | 3D Print Scale Calculator | Yes | Scales model dimensions by a percentage factor |
| 4 | Filament Spool Usage Calculator | Estimate | Estimates remaining filament from spool weight; requires initial full-spool weight |
| 5 | Nozzle Flow Rate Calculator | Estimate | Estimates volumetric flow from nozzle diameter, layer height, and speed |
| 6 | 3D Printing Cost Calculator | Estimate | Estimates material cost from filament price, weight used, and electricity |
| 7 | Print Time Cost Calculator | Estimate | Estimates total cost from print time, electricity rate, and material cost |
| 8 | Resin Printing Cost Calculator | Estimate | Similar to filament cost but for resin printers |
| 9 | Layer Height Calculator | Yes | Shows layer lines and times for different layer heights |
| 10 | Wall Thickness Calculator | Yes | Calculates number of perimeters for a target wall thickness |

### Notes

- Clearly separate deterministic calculators from estimation tools.
- Cost tools must use visible disclaimers (e.g. "This is an estimate based on the values you enter. Actual costs depend on printer calibration, material batch, electricity rates, and other factors.").
- Avoid claims of absolute precision.
- Prioritise simple inputs and copy-ready results.
- Keep a practical maker-oriented tone.

### Recommended priority (first 5)

1. Filament Grams to Meters Calculator
2. Filament Meters to Grams Calculator
3. 3D Print Scale Calculator
4. Filament Spool Usage Calculator
5. Nozzle Flow Rate Calculator

---

## Block 3 — PC / Display / Data Calculators

Clean, math-based calculators for monitors, data transfer, storage, and basic PC planning.

### Candidate tools

| # | Tool | Deterministic? | Notes |
|---|------|----------------|-------|
| 1 | Monitor PPI Calculator | Yes | PPI from resolution and diagonal size |
| 2 | Refresh Rate Frame Time Calculator | Yes | Frame time in ms from Hz |
| 3 | Screen Resolution Aspect Ratio Calculator | Yes | Simplifies width:height to standard ratios |
| 4 | Download Time Calculator | Estimate | Estimates download time from file size and speed; useful for planning |
| 5 | Data Transfer Time Calculator | Estimate | Similar to download time but for local transfers |
| 6 | Storage Space Calculator | Yes | Adds up file sizes; converts between units |
| 7 | RAM Speed Latency Calculator | Yes | CAS latency from frequency and CL value |
| 8 | PC Power Consumption Calculator | Estimate | Estimates wattage from component selection; must use disclaimer |
| 9 | PSU Wattage Estimate Calculator | Estimate | Estimates PSU capacity from component list; marked as planning estimate |
| 10 | GPU Power Connector Checker | Yes | Checks if a given PSU has the required connectors (static reference data) |

### Notes

- Avoid Bottleneck Calculator and FPS Calculator for now — they are inherently speculative and risk credibility.
- Prioritise tools with clear mathematical formulas.
- Power consumption and PSU tools must be marked as estimates.
- Do not use invented or scraped component databases.
- Do not promise guaranteed compatibility.

### Recommended priority (first 5)

1. Monitor PPI Calculator
2. Refresh Rate Frame Time Calculator
3. Screen Resolution Aspect Ratio Calculator
4. Download Time Calculator
5. Data Transfer Time Calculator

---

## Quality Rules Before Publishing Any Tool

Every tool published on ClickBuildLabs must meet these rules:

1. **Clear source of truth** — Every tool must have a clear formula, rule, or reference. No guesswork tools.
2. **Input validation** — Every tool must validate user input and show useful error messages when data is missing or invalid.
3. **Empty/error states** — Every tool must provide a clear state when no input has been entered yet, and when validation fails.
4. **No external APIs (by default)** — Tools must work without external API calls unless explicitly approved for a specific reason.
5. **Responsive** — Every tool must work on mobile and desktop.
6. **Existing patterns** — Every tool must use the existing ClickBuildLabs layout, registry pattern, and component conventions.
7. **SEO metadata** — Every public tool must include title, description, keywords, Open Graph, canonical URL, and JSON-LD structured data.
8. **Honest copy** — Use verbs like "generate", "preview", "create", "copy-ready", "based on your inputs". Avoid "perfect", "guaranteed", "instant solution", "best results".
9. **Estimates must say so** — Any tool whose output depends on assumptions or variable factors must clearly call itself an estimate (e.g. "This is an estimate for planning purposes. Real results may differ.").
10. **No fake claims** — No tool should claim guaranteed SEO results, exact revenue, exact FPS, exact bottleneck analysis, exact PSU requirements, medical/legal/financial advice, or professional certification.
11. **Minimal dependencies** — Avoid adding new npm packages unless strictly necessary.
12. **Build and lint** — Before publishing a block, run `npm run lint` and `npm run build`, and manually test each route.

---

## Not For Now

These tool ideas are explicitly excluded for the time being:

| Tool | Reason |
|------|--------|
| Bottleneck Calculator | Inherently speculative; no reliable offline formula |
| FPS / Gaming Performance Calculator | Requires game-specific benchmarks; misleading without real data |
| TikTok Earnings Calculator | Requires external platform data; high risk of fake claims |
| YouTube Revenue Calculator | Same as above; RPM fluctuates too much for a static tool |
| AI Detector | Unreliable by nature; many false positives/negatives |
| Plagiarism Checker | Requires external databases and web crawling |
| Password Strength Checker | Can give false confidence; password managers are better tools |
| Tax Calculator | Legal/financial risk; requires jurisdiction-specific data |
| Health Calculator (BMI is already live as a simple estimate) | Risk of medical interpretation; BMI is noted as not medical advice |
| Legal Calculator | Legal risk; no tool can replace professional legal advice |
| Investment Calculator | Financial risk; compound interest is already live with clear disclaimers |

**Reasoning:** These tools tend to be unreliable in a fully client-side context, require external data sources, carry risk of misleading claims, or do not yet align with the trust level we want to build with ClickBuildLabs users.

---

*Last updated: May 2026*
