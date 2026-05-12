# Testing Checklist - Click & Build Labs

Last updated: 2026-05-12  
Total registered tools: 124  
Static export output: `out/`

## 1. Setup

```bash
npm install
npm run dev
npm run build
```

After `npm run build`, confirm the static export exists in `out/`. Spot-check `out/index.html`, `out/tools/index.html`, `out/sitemap.xml`, and several `out/tools/[slug]/index.html` files.

## 2. Global Checklist

- [ ] Home page loads at `/`
- [ ] `/tools` lists all registered tools
- [ ] Category pages load: `/categories/dev`, `/categories/converter`, `/categories/calculators`, `/categories/generator`, `/categories/text`, `/categories/utility`, `/categories/image`
- [ ] Individual tool pages load at `/tools/[slug]`
- [ ] Header, footer, privacy, and terms links work
- [ ] Related tools link to existing slugs
- [ ] Search and category filtering work on `/tools`
- [ ] Dark mode is readable across pages and tool cards
- [ ] Responsive layouts work at 320px, 375px, 768px, 1024px, and 1440px
- [ ] Copy buttons copy the displayed result and show feedback
- [ ] Download buttons create files locally where applicable
- [ ] Empty inputs do not show `NaN`, `Infinity`, or broken UI
- [ ] Invalid inputs show a useful message or no result
- [ ] After changing inputs, press Calculate/Convert/Generate again and verify the output updates
- [ ] `/sitemap.xml` contains all tool URLs and valid category URLs
- [ ] `/robots.txt` allows crawling and references the sitemap
- [ ] SEO metadata is unique, honest, and not keyword-stuffed
- [ ] JSON-LD only describes visible page content; no fake reviews or aggregateRating

## 3. Checklist by Tool Type

### Converters

- [ ] Length, weight, area, volume, speed, time, data storage, angle, fuel consumption, color, Base64, roman numeral, and number-base converters return expected units
- [ ] Decimal and binary storage units are clearly labeled
- [ ] Temperature blocks impossible Kelvin values and values below absolute zero
- [ ] Results include enough precision for common use cases

### Calculators

- [ ] Percentage, discount, VAT, margin, ratio, unit rate, rule of three, average, age, date, tip, split bill, and price-per-unit calculators handle zero and empty fields
- [ ] Division by zero is blocked or explained
- [ ] Negative values are blocked where nonsensical
- [ ] Results include labels, not just raw numbers

### Finance

- [ ] Loan, simple interest, compound interest, savings goal, hourly-to-salary, salary-to-hourly, and profit/margin tools show estimates only
- [ ] Visible disclaimer: "Results are estimates for informational purposes only and are not financial advice."
- [ ] No claims of guaranteed return, exact payment, investment advice, tax advice, or approved loan calculation

### Health / BMI

- [ ] BMI uses `weight kg / height m^2`
- [ ] Height and weight must be greater than zero
- [ ] Visible disclaimer: "Results are for general informational purposes only and are not medical advice."
- [ ] No personalized medical recommendations

### Education / Math

- [ ] Grade, final grade, GPA, percentage grade, study time, reading speed, essay planner, scientific calculator, fraction calculator, equation solver, prime checker, unit circle, multiplication table, percentage error, and random-number style tools handle invalid inputs
- [ ] Academic tools explain that grading systems may vary
- [ ] Trig tools clearly mark undefined values such as `tan(90deg)`

### Engineering / Electrical / Solar

- [ ] Power/current/voltage supports DC/resistive, AC single-phase with power factor, and AC three-phase with power factor
- [ ] Energy consumption uses `kWh = kW x hours`
- [ ] Solar output uses panel watts, panel count, peak sun hours, and system efficiency
- [ ] Solar system size estimates PV array kW and panel count from daily kWh, peak sun hours, losses, and panel wattage
- [ ] Battery runtime uses `nominal Wh x DoD x efficiency / load W`
- [ ] Battery capacity uses `load W x hours / (DoD x efficiency)`
- [ ] Inverter sizing separates off-grid/backup, hybrid, grid-tie, and Motor/VFD note-only modes
- [ ] Voltage drop uses one-way length, copper/aluminum, cable area, system voltage, and DC/single-phase or three-phase circuit type
- [ ] Wire size tool is described as a basic voltage-drop estimate only
- [ ] Visible disclaimer: "Results are estimates for informational purposes only and are not professional engineering or electrical advice. Always follow local regulations and consult a qualified professional for real installations."
- [ ] No "certified", "code compliant", "safe wire size", "approved", "required cable", or "professional design" claims

### Image / Media

- [ ] Image files are processed locally with File API and Canvas
- [ ] Invalid files do not crash the tool
- [ ] Previews match selected files
- [ ] Downloads work for resized, compressed, favicon, placeholder, and Base64 tools
- [ ] Base64 tools warn or behave sensibly with long strings
- [ ] Image color picker maps preview coordinates to the original image size
- [ ] Visible copy may say: "Images are processed locally in your browser for this tool."

### Text Tools

- [ ] Word, character, case, cleaner, duplicate-line, sort-line, reverse, extract-email, extract-url, and frequency tools handle empty input
- [ ] Unicode and common punctuation behave reasonably
- [ ] Copy buttons copy the transformed output

### Developer Tools

- [ ] JSON tools show useful errors for invalid JSON
- [ ] JWT decoder says it decodes only, does not verify signatures, and warns against sensitive tokens
- [ ] Regex tester handles invalid patterns
- [ ] HTML/CSS/JS minifiers are described as basic minification, not production build replacements
- [ ] Hash generator labels SHA-1, SHA-256, and SHA-512 correctly
- [ ] CSV/JSON tools handle basic quoted CSV fields

## 4. Real Expected Cases

| Area | Case | Expected |
| --- | --- | --- |
| Length | `1 mi` to km | `1.609344 km` |
| Length | `1 in` to cm | `2.54 cm` |
| Weight | `1 kg` to lb | about `2.20462 lb` |
| Temperature | `0 C` to F/K | `32 F`, `273.15 K` |
| Temperature | `100 C` to F/K | `212 F`, `373.15 K` |
| Area | `1 acre` to m2 | about `4046.8564224 m2` |
| Volume | `1 US gallon` to L | about `3.78541 L` |
| Speed | `1 knot` to km/h | `1.852 km/h` |
| Storage | `1 GiB` to MiB | `1024 MiB` |
| Storage | `1 GB` to MB | `1000 MB` |
| Angle | `180 deg` to rad | about `3.14159` |
| Fuel | `1 L/100km` to mpg US | about `235.214 mpg US` |
| Percentage | `20% of 100` | `20` |
| Discount | `100` with `20%` off | final `80`, saved `20` |
| VAT | `100` with `21%` VAT | total `121`, tax `21` |
| Profit margin | cost `60`, sale `100` | profit `40`, margin `40%`, markup `66.67%` |
| Percentage change | `100 -> 120` | `+20%` |
| Rule of three | `2 is to 4 as 5 is to x` | `10` |
| Average | `1,2,3,4` | `2.5` |
| Split bill | `100 + 10% tip / 2` | `55` per person |
| Final grade | current `80`, desired `90`, final weight `50%` | need `100` |
| Percentage grade | `45/50` | `90%` |
| Fraction | `1/2 + 1/3` | `5/6` |
| Fraction | `2/3 x 3/4` | `1/2` |
| Equation | `2x + 4 = 10` | `x = 3` |
| Quadratic | `x^2 - 5x + 6 = 0` | `x = 2, 3` |
| Prime | `2`, `17`, `1`, `21` | true, true, false, false |
| Roman | `1994` | `MCMXCIV` |
| Trig | `sin 30deg`, `cos 60deg`, `tan 90deg` | `1/2`, `1/2`, undefined |
| P/V/I | `12V x 10A` | `120W` |
| Battery runtime | `1000Wh / 100W` before efficiency | `10h` |
| BMI | `70kg`, `1.75m` | about `22.86` |
| Hash | SHA-256 of `test` | starts with `9f86d081884c7d65` |

## Electrical & Solar Test Cases

| Tool | Case | Expected |
| --- | --- | --- |
| Power/current/voltage | DC mode, `V = 12V`, `I = 10A` | `P = 120W` |
| Energy consumption | `1000W` for `2h` | `2kWh` |
| Solar panel output | `400W` panel x `5` panels x `5` peak sun hours x `80%` efficiency | `8kWh/day` |
| Battery runtime | `1000Wh`, load `100W`, efficiency `100%`, DoD `100%` | `10h` |
| Battery runtime | `1000Wh`, load `100W`, efficiency `90%`, DoD `80%` | `7.2h` |
| Battery capacity | `100W` for `10h`, efficiency `90%`, DoD `80%` | required nominal Wh about `1388.9Wh` |
| Voltage drop | copper, `10A`, `20m` one-way, `2.5mm2`, `12V`, DC/single-phase | `Vdrop = 2.8V`, drop about `23.33%` |
| Wire size basic | same voltage drop case with max drop `3%` | should suggest a much larger cable than `2.5mm2` |
| Inverter size | continuous load `1000W`, margin `25%` | recommended continuous about `1250W` |
| Inverter size | `1000W` on `12V` with `90%` efficiency | battery-side DC current about `92.6A` |

## 5. Tester Notes

Some tools are intentionally approximate and should be tested as planning aids, not authoritative systems. This especially applies to engineering, electrical, solar, finance, BMI, and academic grading tools.

For every bug report, include:

```text
Tool:
Input:
Expected:
Actual:
Viewport:
Theme:
Severity:
```
