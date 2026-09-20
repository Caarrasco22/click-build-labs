/* Run after npm run build. Uses an installed Chromium/Edge; no external services are mocked. */
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import http from 'node:http';

const root = path.resolve('out');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.txt': 'text/plain', '.woff2': 'font/woff2', '.ico': 'image/x-icon' };
const server = http.createServer(async (req, res) => {
  let file = path.resolve(root, '.' + decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
  if (!file.startsWith(root + path.sep) && file !== root) { res.writeHead(403).end(); return; }
  try {
    if ((await fs.stat(file)).isDirectory()) file = path.join(file, 'index.html');
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.end(await fs.readFile(file));
  } catch { if (process.env.DEBUG_HTTP) console.log('404', req.url); res.writeHead(404).end('Not found'); }
});

(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: process.env.BROWSER_CHANNEL || 'msedge', headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
  const page = await context.newPage();
  const errors = [], external = [], overflow = [];
  page.on('pageerror', e => errors.push(`${page.url()}: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') errors.push(`${page.url()}: ${m.text()}`); });
  page.on('request', r => { if (!r.url().startsWith(base) && /^https?:/.test(r.url())) external.push(r.url()); });
  async function visit(slug) {
    await page.goto(base + slug);
    await page.waitForLoadState('networkidle');
  }
  try {
    await visit('/tools/uuid-generator/');
    for (const version of [4, 1, 7]) {
      await page.getByRole('button', { name: `v${version}`, exact: true }).click();
      await page.getByRole('button', { name: 'Generate', exact: true }).click();
      const ids = await page.locator('main code').allTextContents();
      assert.equal(ids.length, 5);
      ids.forEach(id => assert.match(id.trim(), new RegExp(`^[a-f0-9]{8}-[a-f0-9]{4}-${version}[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$`)));
    }
    await visit('/tools/base64-encode/');
    await page.locator('textarea').first().fill('Hello 🌍');
    assert.equal(await page.locator('textarea').nth(1).inputValue(), Buffer.from('Hello 🌍').toString('base64'));
    await page.getByRole('button', { name: 'Decode', exact: true }).click();
    await page.locator('textarea').first().fill(Buffer.from('Hello 🌍').toString('base64'));
    assert.equal(await page.locator('textarea').nth(1).inputValue(), 'Hello 🌍');
    await page.locator('textarea').first().fill('%%%');
    assert.match(await page.locator('textarea').nth(1).inputValue(), /Invalid/);

    await visit('/tools/json-formatter/');
    await page.locator('textarea').first().fill('{"answer":42}');
    assert.deepEqual(JSON.parse(await page.locator('textarea').nth(1).inputValue()), {answer:42});
    await page.locator('textarea').first().fill('{broken');
    assert.match(await page.locator('textarea').nth(1).inputValue(), /JSON|property|position/i);

    await visit('/tools/password-generator/');
    await page.getByRole('button', { name: 'Generate', exact: true }).click();
    assert.equal((await page.locator('input[readonly]').inputValue()).length, 16);

    await visit('/tools/markdown-previewer/');
    await page.locator('textarea').fill('# Heading\n\n- first\n- second\n\n```js\nconst x = 1;\n```\n\n<img src="https://example.com/tracker" onerror="alert(1)"><script>alert(1)</script>\n\n[bad](javascript:alert(1))');
    assert.equal(await page.locator('main .prose h1').textContent(), 'Heading');
    assert.equal(await page.locator('main .prose li').count(), 2);
    assert.equal(await page.locator('main .prose pre code').count(), 1);
    assert.equal(await page.locator('main .prose img, main .prose script, main .prose [onerror], main .prose [href^="javascript:"]').count(), 0);

    await visit('/tools/javascript-minifier/');
    await page.locator('textarea').first().fill('const url = "https://example.com/a"; // remove\nconsole.log(url);');
    await page.getByRole('button', { name: 'Minify JS', exact: true }).click();
    await page.locator('textarea[readonly]').waitFor();
    assert.match(await page.locator('textarea[readonly]').inputValue(), /https:\/\/example.com\/a/);
    await page.locator('textarea').first().fill('const = ;');
    await page.getByRole('button', { name: 'Minify JS', exact: true }).click();
    await page.locator('main').getByRole('alert').waitFor();

    await visit('/tools/temperature-converter/');
    await page.locator('input[type="number"]').fill('0');
    assert.equal(await page.locator('input[readonly]').inputValue(), '32.00');
    await page.locator('input[type="number"]').fill('-300');
    assert.match(await page.locator('main').innerText(), /absolute zero/i);

    await visit('/tools/hash-generator/');
    await page.locator('textarea').fill('test');
    await page.getByRole('button', { name: 'Generate Hash' }).click();
    await page.getByText('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', { exact: true }).waitFor();

    await visit('/tools/image-resizer/');
    await page.locator('input[type="file"]').setInputFiles({ name: 'sample.png', mimeType: 'image/png', buffer: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+aV1cAAAAASUVORK5CYII=', 'base64') });
    await page.locator('input[type="number"]').first().waitFor();
    await page.waitForFunction(() => document.querySelector('input[type="number"]')?.value === '1');
    await page.locator('input[type="number"]').first().fill('10');
    await page.getByRole('button', { name: /Resize Image/i }).click();
    const download = await Promise.all([page.waitForEvent('download'), page.getByRole('button', {name:/Download/i}).click()]);
    assert.ok(download[0].suggestedFilename().endsWith('.png'));

    await visit('/tools/percentage-calculator/');
    await page.locator('input[type="number"]').nth(0).fill('20');
    await page.locator('input[type="number"]').nth(1).fill('100');
    await page.getByText('20.00',{exact:true}).waitFor();
    await page.getByRole('button',{name:'Change %',exact:true}).click();
    await page.locator('input[type="number"]').nth(0).fill('100');
    await page.locator('input[type="number"]').nth(1).fill('120');
    await page.getByText('20.00%',{exact:true}).waitFor();

    await visit('/tools/slug-generator/');
    await page.locator('textarea').fill('  Café Hello World  ');
    assert.equal((await page.locator('main code').textContent()).trim(),'cafe-hello-world');
    await page.getByRole('checkbox',{name:'Lowercase',exact:true}).uncheck();
    assert.equal((await page.locator('main code').textContent()).trim(),'Cafe-Hello-World');

    await visit('/tools/word-counter/');
    await page.locator('textarea').fill('One two three.');
    assert.equal(await page.locator('main p').filter({hasText:/^Words$/}).locator('..').locator('p').first().textContent().then(s=>s.trim()),'3');

    await visit('/tools/color-converter/');
    await page.locator('input[type="text"]').fill('#ff0000');
    assert.ok((await page.locator('main').innerText()).includes('rgb(255, 0, 0)'));

    await visit('/tools/?q=uuid');
    assert.equal(await page.locator('[data-tool-card]:visible').count(),1);
    await page.locator('input[type="search"]').fill('json');
    assert.ok(await page.locator('[data-tool-card]:visible').count() > 1);
    await visit('/tools/?category=dev');
    assert.ok(await page.locator('[data-tool-card]:visible').count() > 0);
    assert.equal(await page.locator('[data-tool-card]:visible:not([data-tool-category="dev"])').count(),0);

    const sample = ['/', '/tools/', '/categories/dev/', '/privacy/', '/about/', '/terms/', '/contact/', '/tools/uuid-generator/', '/tools/base64-encode/', '/tools/json-formatter/', '/tools/password-generator/', '/tools/markdown-previewer/', '/tools/javascript-minifier/', '/tools/temperature-converter/', '/tools/image-resizer/', '/tools/percentage-calculator/', '/tools/word-counter/', '/tools/slug-generator/', '/tools/color-converter/'];
    for (const width of [320, 375, 768, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      for (const route of sample) {
        await visit(route);
        const wide = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
        if (wide) overflow.push({width,route});
      }
    }
    await page.setViewportSize({ width:375, height:900 });
    await visit('/');
    await page.getByRole('button',{name:'Open menu'}).click();
    await Promise.all([
      page.waitForURL(/\/tools\/?$/),
      page.locator('header').getByRole('link',{name:'Tools',exact:true}).click(),
    ]);
    assert.match(new URL(page.url()).pathname, /^\/tools\/?$/);
    assert.equal(await page.locator('script[src*="adsbygoogle"], ins.adsbygoogle, [data-ad-slot]').count(),0);
    const cookies = await context.cookies();
    assert.equal(cookies.length, 0);
    const storageKeys = await page.evaluate(() => Object.keys(localStorage));
    assert.ok(storageKeys.every(k=>k==='theme'));
    if (process.env.SCREENSHOT_DIR) {
      await fs.mkdir(process.env.SCREENSHOT_DIR,{recursive:true});
      await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'mobile-tools.png')});
      await visit('/privacy/');
      await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'mobile-privacy.png')});
      await visit('/tools/uuid-generator/');
      await page.getByRole('button',{name:'Generate',exact:true}).click();
      await page.getByRole('button',{name:'Toggle theme'}).click();
      await page.waitForFunction(() => document.documentElement.classList.contains('dark'));
      assert.equal(await page.evaluate(() => localStorage.getItem('theme')),'dark');
      await page.reload();
      await page.waitForLoadState('networkidle');
      assert.equal(await page.evaluate(() => document.documentElement.classList.contains('dark')),true);
      await page.getByRole('button',{name:'Generate',exact:true}).click();
      await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'mobile-uuid-dark.png')});
      await page.getByRole('button',{name:'Toggle theme'}).click();
      await page.waitForFunction(() => document.documentElement.classList.contains('light'));
      await page.setViewportSize({width:1440,height:1000});
      await visit('/');
      await page.screenshot({path:path.join(process.env.SCREENSHOT_DIR,'desktop-home.png')});
    }
    console.log(JSON.stringify({samplePages:sample.length, widths:[320,375,768,1440], errors:errors.slice(0,5), errorCount:errors.length, externalRequests:[...new Set(external)], overflow, cookies, storageKeys},null,2));
    assert.equal(errors.length,0,'Browser console/page errors; see report');
    assert.deepEqual(external,[],'Unexpected external requests in disabled build');
    assert.deepEqual(overflow,[],'Horizontal overflow');
    console.log('PASS: representative tool interactions, navigation, mobile widths, privacy defaults and no external requests.');
  } finally {
    console.log(JSON.stringify({errors:errors.slice(0,3), errorCount:errors.length, externalRequests:[...new Set(external)], overflow},null,2));
    await browser.close(); await new Promise(resolve=>server.close(resolve));
  }
})().catch(e=>{ console.error(e); server.close(); process.exitCode=1; });
