import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getAdSenseConfig, mergeAdsTxt } from '../lib/adsense.mjs';
import { v1, v4, v7, validate, version } from 'uuid';
import { minify } from 'terser';

// Synthetic fixture is only used in memory, never in generated site output.
const publisherId = `ca-pub-${'9'.repeat(16)}`;
test('missing ID disables tags; malformed IDs and incomplete activation fail closed', () => {
  assert.deepEqual(getAdSenseConfig({ ADSENSE_PUBLISHER_ID: '' }), { publisherId: '', enabled: false });
  for (const id of ['example', 'ca-pub-', `ca-pub-${'0'.repeat(16)}`]) {
    assert.throws(() => getAdSenseConfig({ ADSENSE_PUBLISHER_ID: id }));
  }
  assert.throws(() => getAdSenseConfig({ ADSENSE_ENABLED: 'true', ADSENSE_PUBLISHER_ID: '' }));
  assert.throws(() => getAdSenseConfig({ ADSENSE_ENABLED: 'true', ADSENSE_PUBLISHER_ID: publisherId }));
  assert.equal(getAdSenseConfig({ ADSENSE_PUBLISHER_ID: publisherId }).enabled, false);
  assert.equal(getAdSenseConfig({ ADSENSE_PUBLISHER_ID: publisherId, ADSENSE_ENABLED: 'true', ADSENSE_CMP_READY: 'true' }).enabled, true);
});
test('ads.txt preserves other sellers, comments and existing matching records; no duplicate', () => {
  const existing = '# Keep this comment\nother.example, seller-1, DIRECT\n';
  assert.equal(mergeAdsTxt(existing, ''), existing);
  const merged = mergeAdsTxt(existing, publisherId);
  assert.ok(merged.startsWith(existing));
  assert.equal(mergeAdsTxt(merged, publisherId), merged);
  assert.match(merged, /google\.com, pub-\d{16}, DIRECT, f08c47fec0942fa0/);
  const reseller = `google.com, ${publisherId.slice(3)}, RESELLER, f08c47fec0942fa0 # existing\n`;
  assert.equal(mergeAdsTxt(reseller, publisherId), reseller);
});
test('UUID variants have valid RFC version/variant bits and timestamp layout', () => {
  for (const [generate, expected] of [[v1, 1], [v4, 4], [v7, 7]]) {
    const ids = Array.from({ length: 100 }, () => generate());
    assert.equal(new Set(ids).size, ids.length);
    ids.forEach(id => { assert.ok(validate(id)); assert.equal(version(id), expected); });
  }
  const now = Date.now();
  assert.equal(parseInt(v7({ msecs: now }).replaceAll('-', '').slice(0, 12), 16), now);
});
test('JS minification preserves URL strings, regex, templates and automatic semicolon insertion', async () => {
  const input = 'const url = "https://example.com/a"; const re = /a\\/b/; const t = ` a  b `; function f(){ return\n42; }';
  const result = await minify(input, { compress: false, mangle: false, format: { comments: 'some' } });
  for (const code of [input, result.code]) {
    // Only fixed test code, never site visitor input.
    assert.deepEqual(Function(`${code};return [url,re.source,t,f()]`)(), ['https://example.com/a', 'a\\/b', ' a  b ', undefined]);
  }
  await assert.rejects(minify('const = ;'));
});
