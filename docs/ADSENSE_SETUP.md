# AdSense preparation — 20 September 2026

## Current state

This is a Next.js App Router site exported to static files in `out/` and hosted on Cloudflare Pages. The existing 124 tool URLs are retained. No deployment or Google account review has been performed by this task.

The real publisher ID supplied by the owner is centralized in `lib/adsense.mjs`. It is public, not a secret. The default build emits the `google-adsense-account` meta tag and creates `out/ads.txt`. Advertising scripts, manual ad units and the CMP are **disabled** by default. No sample publisher IDs or empty ad placeholders are published.

`ADSENSE_PUBLISHER_ID` is an optional build-time override; an explicitly empty value disables verification. `ADSENSE_ENABLED` and `ADSENSE_CMP_READY` both default to false. Copy `.env.example` to `.env.local` for local configuration, or use Cloudflare Pages build variables. Rebuild after changing them: this is a static site, not a runtime environment-variable integration.

`npm run build` runs the sitemap generator, Next.js export and `scripts/finalize-adsense.mjs`. The finalizer copies any existing `public/ads.txt` records unchanged and appends the configured Google record only if it is not already present. Keep other authorized sellers in `public/ads.txt`; do not edit `out/ads.txt` manually. Every finalization starts from the source file, preventing stale generated IDs after a configuration change. Do not configure Cloudflare to run `next build` alone because that omits finalization.

The finalizer also normalizes the segment-cache filenames affected by [Next.js Windows export issue #92339](https://github.com/vercel/next.js/issues/92339). It preserves the original files and creates the dot-separated names that the client requests. On exports that already have correct flat names it makes no changes. This avoids 404s during client navigation without altering routes or hosting rules.

## Owner actions before requesting review

1. Review the legal-information items below. The owner has confirmed the private contact email, which is now published on Contact and Privacy; GitHub remains the public feedback channel.
2. When ready, deploy the reviewed changes through your normal Cloudflare Pages process, using `npm run build` and output directory `out`. This task does not deploy them. Keep both advertising flags false.
3. Check the **published** homepage source for the real meta tag. Open `https://clickbuildlabs.com/ads.txt` and confirm a 200 plain-text response containing the correct Google seller row. Check the published privacy, contact and terms pages. The live site still had the previous policy and no ads.txt when audited.
4. In AdSense, open **Sites**, select `clickbuildlabs.com`, or **+ New site** if it is not yet listed. Select **Meta tag** as the verification method, confirm the tag is installed and select **Verify**. This method does not require loading the advertising script. Do not remove and re-add an existing site unnecessarily.
5. Check that Cloudflare protection does not challenge or block `Mediapartners-Google` or `Google-Display-Ads-Bot`. Repository robots.txt allows the website; dashboard/WAF rules were not available to inspect.
6. Resolve any account-specific tasks or policy notices shown by AdSense. Request review only when the published site and the remaining owner information are ready. Approval is Google's decision; indexation and passing these checks do not guarantee it.

## Google's certified CMP: account configuration

Use **Privacy & messaging → European regulations → Create** (or **Manage → Create message**). Select this site. Set the privacy URL to `https://clickbuildlabs.com/privacy/`, default language to English, and enable **Do not consent** along with consent and manage-options choices. Review the configured purposes, vendors and their privacy links; the code does not invent or maintain a vendor list. Ensure coverage includes the EEA, UK and Switzerland. Publish the message. If Google offers automatic CMP setup after requesting review, select Google's CMP and then inspect these settings rather than assuming the defaults are appropriate.

Keep **Ads → By site → Auto ads** OFF during setup and verification. Do not create manual ad units yet. Exclude legal/contact pages from automatic advertising when later configuring placements; assess spacing around tool inputs, copy buttons and download controls.

After the CMP is published and ready for validation, a later build can set `ADSENSE_CMP_READY=true` and `ADSENSE_ENABLED=true` to load the single root-layout AdSense tag. This is an operator confirmation, **not** a programmatic check of the Google account. Test with Auto ads still OFF and no manual units. Google may limit CMP delivery before site approval; if the message cannot be tested, keep advertising disabled and record the outstanding test. The current delivery leaves both flags false.

`next/script` in the root layout handles one script instance across Next.js navigation. The footer and privacy page gain a **Privacy and cookie settings** control only in the enabled build, using Google's `googlefc.callbackQueue.push(googlefc.showRevocationMessage)` API. If Google's API is unavailable it shows a message instead of fabricating consent. Google's own revocation control is also managed by Google. No custom consent cookie, localStorage acceptance flag, or non-personalized-ad bypass is implemented.

There is no Google Analytics integration. Do not enable consent mode for analytics merely to prepare AdSense. If analytics is added later, inventory its actual tags, configure the applicable defaults and consent signals, and update the policy. Non-personalized ads may still use cookies/storage; declining personalization is not the same as consent to storage.

## Real CMP acceptance test — pending account setup

Use the published domain or a properly configured preview, with no ad blocker and a fresh browser profile in each applicable region. Never click your own ads. Record Network, Cookies/localStorage, consent choices and console results:

| Scenario | Check |
| --- | --- |
| Fresh visit, no choice | CMP is visible; no personalized ads before valid consent; inspect storage and requests, not just whether an ad is visible. CMP bootstrap network calls are expected. |
| Do not consent | Tool inputs still work. Inspect TCF purposes/vendor signals and resulting storage/requests; verify the account's limited-ad settings. Do not interpret limited ads or the absence of ads as proof of compliance. |
| Consent/manage options | Correct selected purposes and vendors; test partial choices as well as full consent. |
| Change preferences | Footer control reopens Google's message. Revoke the earlier choice, inspect signals and subsequent requests, reload and verify persistence. |
| Internal navigation/reload | One AdSense script, no duplicate messages/units, consent persists, preferences remain accessible. |
| Blocked CMP/failed script | No uncaught errors or broken tools. Confirm the account does not serve ads without valid signals; otherwise disable advertising. |
| Mobile | Message choices and revocation control usable at 320–375 px; no overlay blocks the tool after dismissal. |

The repository tests verify the inactive state and configuration guards. They **do not** establish that a real Google CMP accepted, rejected or revoked consent. Those tests require the account configuration, regional delivery and a real browser session, none of which are inferred from code or mocked consent signals.

## Owner information still required (not a public page)

- Resolved: the owner confirmed `clickandbuild.info@gmail.com`, now published on Contact and Privacy. GitHub issues remain public and must not be used for sensitive requests.
- Confirm the legal operator identity (the existing About page says Pablo Carrasco), whether a business is the operator, and which address/registration/tax information must be disclosed for its actual situation. Do not publish private details solely because this checklist exists; determine the applicable disclosures.
- The owner reports using only the default Cloudflare dashboard statistics, with no additional analytics enabled manually. The policy now describes these statistics separately from tool inputs. Actual account settings, recipients, retention and any jurisdiction-specific privacy information still need review; this confirmation is not an inspection of the Cloudflare dashboard.

Update Contact, About, Privacy and Terms consistently if additional operator information is needed. The confirmed contact is incorporated, but missing legal information is not claimed to be resolved.

## Verification commands

```sh
npm ci
npm run build
npm run lint
npm run test:readiness
npm run check:export
npm run test:browser
npm audit
```

Browser tests use headless Microsoft Edge by default. Set `BROWSER_CHANNEL=chrome` to use installed Chrome or `BROWSER_CHANNEL=chromium` after installing Playwright Chromium. `SCREENSHOT_DIR` optionally saves inspection images. Tests start a loopback static server, exercise local tools and close it afterwards. They never publish or call your AdSense account. `npm start` is the pre-existing Next server command; production is the static `out/` folder, not that server.

## Official references consulted

- [Connect/verify a site, including meta tags](https://support.google.com/adsense/answer/12169212?hl=en)
- [Page quality and navigation](https://support.google.com/adsense/answer/7299563?hl=en)
- [Required privacy policy disclosures](https://support.google.com/adsense/answer/1348695?hl=en)
- [ads.txt guide](https://support.google.com/adsense/answer/12171612?hl=en)
- [Google-certified CMP requirements](https://support.google.com/adsense/answer/13554116?hl=en)
- [Create a European regulations message](https://support.google.com/adsense/answer/10960768?hl=en)
- [Consent revocation link API](https://support.google.com/adsense/answer/10959060?hl=en)
- [Consent mode settings](https://support.google.com/adsense/answer/16053245?hl=en)

Google's CMP certification covers its certification criteria; it is not a legal-compliance guarantee for the publisher.
