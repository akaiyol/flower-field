const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const { checkFlowerRulers } = require('./flower-rulers.cjs');
const root = path.resolve(__dirname, '..');
const output = path.resolve(process.argv[2] || path.join(root, 'verification-output'));
fs.mkdirSync(output, { recursive: true });
const result = { checks: [], errors: [], cleanup: false };
const types = { 'index.html': 'text/html', 'field.js': 'text/javascript', 'field.css': 'text/css', 'flowers.png': 'image/png' };
let browser, server;
(async () => {
  try {
    server = http.createServer((request, response) => {
      const file = new URL(request.url, 'http://localhost').pathname.slice(1) || 'index.html';
      if (!types[file]) { response.writeHead(404); response.end(); return; }
      response.setHeader('Content-Type', types[file]);
      fs.createReadStream(path.join(root, file)).pipe(response);
    });
    await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
    browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
    page.on('pageerror', error => result.errors.push(String(error)));
    page.on('response', response => { if (response.status() >= 400) result.errors.push(`${response.status()} ${response.url()}`); });
    await page.goto(`http://127.0.0.1:${server.address().port}/`);
    await page.waitForSelector('.timeline-flowers svg');
    await page.evaluate(() => new Promise((resolve, reject) => {
      const artwork = new Image();
      artwork.onload = () => artwork.naturalWidth === 1155 ? resolve() : reject(Error('Unexpected artwork size'));
      artwork.onerror = () => reject(Error('Flower artwork failed to load'));
      artwork.src = document.querySelector('#original-flower-source').getAttribute('href');
    }));
    result.checks.push('Artwork loaded');
    for (const width of [1280, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      await page.waitForTimeout(100);
      const expected = width > 600 ? 11 : 6;
      await checkFlowerRulers(page, expected);
      const layout = await page.evaluate(() => {
        const plants = [...document.querySelectorAll('[data-flower]')].filter(p => getComputedStyle(p).display !== 'none');
        return { leaves: plants.map(p => p.querySelectorAll('[data-stem-leaf]').length),
          overflow: document.documentElement.scrollWidth > innerWidth,
          bottom: document.querySelector('.timeline-flowers').getBoundingClientRect().bottom };
      });
      assert(layout.leaves.every(count => count === 2), 'Each stem needs two leaves');
      assert(!layout.overflow, 'Horizontal overflow');
      assert(Math.abs(layout.bottom - 900) < 2, 'Flower stems do not finish at page bottom');
      await page.screenshot({ path: path.join(output, `field-${width}.png`) });
      if (width === 1280) await page.locator('.timeline-flowers').screenshot({ path: path.join(output, 'flower-field.png') });
      result.checks.push(`${width}px: plants, leaves, rulers, legibility, overflow, bottom alignment`);
    }
    await page.setViewportSize({ width: 1280, height: 900 });
    const svg = page.locator('.timeline-flowers svg');
    const frames = new Set();
    for (let i = 0; i <= 20; i++) {
      frames.add(await svg.evaluate(n => n.innerHTML));
      await svg.screenshot({ path: path.join(output, `motion-${String(i).padStart(2, '0')}.png`) });
      await page.waitForTimeout(500);
    }
    assert(frames.size > 10, 'Flower animation did not advance');
    result.checks.push('Ten-second motion sequence recorded');
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForTimeout(100);
    const staticFrame = await svg.evaluate(n => n.innerHTML);
    await page.waitForTimeout(200);
    assert.equal(await svg.evaluate(n => n.innerHTML), staticFrame, 'Reduced-motion artwork is moving');
    result.checks.push('Static reduced-motion presentation');
    // Faults exist only in this isolated browser, never in the exported files.
    const collision = await page.addStyleTag({ content: '[data-stem-ruler] text { font-size: 2.2px !important; }' });
    await assert.rejects(() => checkFlowerRulers(page, 11), /too small/);
    await collision.evaluate(n => n.remove());
    await page.locator('[data-stem-ruler] text').first().evaluate(n => n.remove());
    await assert.rejects(() => checkFlowerRulers(page, 11), /missing or incorrect/);
    result.checks.push('Missing labels and SVG font collision correctly rejected');
    assert.deepEqual(result.errors, [], 'Browser errors or failed asset requests');
    result.passed = true;
  } catch (error) {
    result.passed = false;
    result.errors.push(String(error));
    process.exitCode = 1;
  } finally {
    if (browser) await browser.close();
    if (server) await new Promise(resolve => server.close(resolve));
    result.cleanup = true;
    fs.writeFileSync(path.join(output, 'results.json'), JSON.stringify(result, null, 2));
    console.log(JSON.stringify(result, null, 2));
    console.log(`Evidence: ${output}`);
  }
})();
