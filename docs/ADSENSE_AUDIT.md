# Implementation and audit findings — 20 September 2026

## Confirmed findings and fixes

- Next.js App Router with static export and Cloudflare Pages, identified from repository instructions, configuration and README. The initial working tree was clean, at commit `7587a2e`.
- The deployed privacy page still denied persistent storage while referring to possible ads/analytics. `next-themes` actually persists the `theme` key in localStorage. The replacement describes local tool processing separately from hosting, preferences and optional advertising. It no longer claims there is nothing to secure or that all network processing stays on the device.
- No active ad/analytics/CMP code, publisher ID or source ads.txt was present. Production ads.txt returned 404; production robots.txt returned 200 and allowed crawling except `/api/`. The owner later supplied the real publisher meta tag, now configured centrally. Verification works without advertising.
- GitHub links in the header, footer and homepage pointed to GitHub's homepage. The footer suggestion link was `#`. They now lead to the real repository/issue tracker or the new contact page. The existing maintainer name was retained; no email, company identity or private address was invented.
- Dormant ad components rendered reserved-space placeholders if used. They now render no inventory, and the tool page has no ad wrappers. The single optional AdSense tag uses Next's root-layout script deduplication.
- UUID v1/v7 code emitted invalid groups/variant bits, used Math.random and generated initial random content during server/client rendering. Replaced with the uuid library's RFC implementations and explicit generation after interaction. Documented timestamp disclosure and uniqueness limits.
- Markdown inserted unsanitized HTML. Marked plus a restrictive DOMPurify allowlist now supports actual code blocks/lists and removes active HTML and images. The test payload containing image/event/script markup and a javascript link neither executes nor makes external requests.
- The regex JavaScript minifier corrupted strings such as `https://example.com/a`. It now loads Terser on demand, parses syntax without executing the input, preserves important license comments and reports invalid syntax. Removed the unsupported claim that basic regex output was safe for production.
- The percentage calculator's Change % mode used the new value as the denominator and reversed the subtraction. It now computes `(new - old) / old`; the 100 → 120 case returns 20%.
- Temperature conversion allowed below-absolute-zero Celsius when converting to Fahrenheit. The converted Celsius value is now checked for every output unit.
- Slug casing options used stale state and did not preserve case when lowercase was unchecked. Output is now derived from current inputs/options.
- Mobile checks identified horizontal overflow on the homepage and Base64, JSON and password controls. Wrapping and mobile padding adjustments fix those cases while retaining desktop layout.
- Direct category-filter URLs triggered a React hydration error because initial server/client filter state differed. The filter now reads Next.js search parameters within a Suspense boundary, preserving the server-rendered tools list and query URLs.
- The theme control wrote a preference but Tailwind used the system media query instead of the selected theme class. Dark variants now follow the existing next-themes class; the toggle icons render consistently during hydration and the system default is respected.
- Removed a structured-data interaction count whose value was the string `Unknown`, and the unsupported `Any` browser-requirement claim. Existing canonical URLs and all 124 tool slugs are retained. Sitemap adds contact.
- A Windows Next.js export defect produced nested segment files while the browser requested dot-separated names. The build finalizer adds the matching flat files; this fixes observed prefetch/navigation 404s. See upstream [issue #92339](https://github.com/vercel/next.js/issues/92339).
- Next.js and eslint-config-next updated from 16.2.6 to 16.3.5 after the dependency audit reported vulnerabilities. Compatible transitive updates were applied without `--force`; npm audit reported zero vulnerabilities afterwards. This does not imply the former static deployment exposed every server-only advisory.

## Verification scope

- Full build including TypeScript and static export: successful.
- 137 sitemap pages: existing HTML, H1, canonical and internal targets; no coming-soon tool placeholders. 142 unique internal link targets checked.
- Unit regressions: disabled/missing/invalid publisher configuration, activation guards, preservation/idempotence of ads.txt, UUID structure/time, and syntax-sensitive JavaScript minification.
- Browser interactions: UUID v1/v4/v7, Unicode Base64 encode/decode and invalid input, JSON format/invalid input, password generation, hostile Markdown, JavaScript minification/invalid input, temperature and absolute-zero validation, SHA-256, image resize/download, percentage change, slug options, word count and color conversion.
- Responsive sample: home, tools, developer category, privacy/about/terms/contact and twelve tool pages at 320, 375, 768 and 1440 px. Final run passed with zero console/page errors, zero horizontal overflows, zero external requests and no cookies in the disabled-ad build. Query/category filtering, mobile navigation and dark-theme persistence after reload passed. Desktop and mobile captures were visually inspected.
- Existing lint warnings remain in unrelated components (unused variables/imports and plain image elements); no lint errors remain after the test script's ESM conversion. This is not a claim of exhaustive functional testing of all 124 tools.

## Still dependent on the owner/account

- Private contact resolved in the follow-up: the owner confirmed `clickandbuild.info@gmail.com`, now added to Contact and Privacy with an explanation of email processing. The owner also reports using default Cloudflare dashboard statistics only. Applicable operator/privacy disclosures remain subject to the actual circumstances; the dashboard has not been inspected.
- Publish/configure Google's certified CMP and test consent, refusal, partial choices and revocation. No real CMP consent result has been claimed from an inactive build.
- Inspect Cloudflare account/WAF settings and any services injected outside the repository. Only code and sampled public responses were available.
- Deploy the reviewed changes separately, verify the published meta tag/ads.txt and then request review in AdSense. Neither operation was performed here. No approval outcome is promised.

See [ADSENSE_SETUP.md](ADSENSE_SETUP.md) for exact configuration steps and official Google sources.
