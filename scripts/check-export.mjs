import { readFile, stat } from 'node:fs/promises';
import assert from 'node:assert/strict';
import { resolve, join } from 'node:path';
import nextEnv from '@next/env';
import { getAdSenseConfig } from '../lib/adsense.mjs';

nextEnv.loadEnvConfig(process.cwd());
const config = getAdSenseConfig();
const root = resolve('out');
const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => new URL(m[1]));
const broken = [];
const checked = new Set();
for (const url of urls) {
  const html = await readFile(join(root, url.pathname, 'index.html'), 'utf8');
  assert.ok(html.includes(`rel="canonical" href="${url.href}"`), `Canonical mismatch: ${url}`);
  assert.ok(/<h1[ >]/.test(html), `Missing heading: ${url}`);
  assert.ok(!html.includes('This tool is coming soon.'), `Empty tool: ${url}`);
  assert.ok(!html.includes('Ad space reserved'), `Ad placeholder: ${url}`);
  const rendered = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
  if (config.publisherId) {
    assert.ok(rendered.includes(`name="google-adsense-account" content="${config.publisherId}"`));
    assert.equal((rendered.match(/name="google-adsense-account"/g) || []).length, 1);
  }
  else assert.ok(!rendered.includes('google-adsense-account'));
  if (!config.enabled) assert.ok(!html.includes('pagead2.googlesyndication.com'), `Unexpected ad script: ${url}`);
  for (const m of rendered.matchAll(/href="([^"#]*)"/g)) {
    if (!m[1] || /^(mailto:|tel:)/.test(m[1])) continue;
    const target = new URL(m[1].replaceAll('&amp;', '&'), url);
    if (target.origin !== url.origin || checked.has(target.pathname)) continue;
    checked.add(target.pathname);
    const local = join(root, decodeURIComponent(target.pathname));
    try { const s = await stat(local); if (s.isDirectory()) await stat(join(local, 'index.html')); }
    catch { broken.push(`${url.pathname} -> ${target.pathname}`); }
  }
}
assert.deepEqual(broken, [], 'Broken internal links');
const robots = await readFile(join(root, 'robots.txt'), 'utf8');
assert.match(robots, /User-agent: \*\s+Allow: \//);
assert.ok(!/Disallow:\s*\/\s*$/m.test(robots));
if (config.publisherId) {
  const adsTxt = await readFile(join(root, 'ads.txt'), 'utf8');
  assert.ok(adsTxt.includes(`google.com, ${config.publisherId.slice(3)},`));
  assert.ok(!adsTxt.includes('<html'));
}
console.log(`PASS: ${urls.length} sitemap pages, canonical URLs, headings, ${checked.size} internal targets, no empty tools/placeholders, crawler access and verification state.`);
