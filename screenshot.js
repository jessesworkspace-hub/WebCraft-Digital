const puppeteer = require('puppeteer');
const path = require('path');

const pages = [
  { file: 'preview-plumbing.html',    out: 'screenshot-plumbing.jpg' },
  { file: 'preview-roofing.html',     out: 'screenshot-roofing.jpg' },
  { file: 'preview-contractor.html',  out: 'screenshot-contractor.jpg' },
  { file: 'preview-hvac.html',        out: 'screenshot-hvac.jpg' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  for (const p of pages) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    const url = 'file:///' + path.join('C:/Users/jesse/webcraft-digital', p.file).replace(/\\/g, '/');
    console.log('Screenshotting', url);
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 15000 });
    await new Promise(r => setTimeout(r, 1500));
    await page.screenshot({
      path: path.join('C:/Users/jesse/webcraft-digital', p.out),
      type: 'jpeg',
      quality: 90,
      clip: { x: 0, y: 0, width: 1440, height: 900 }
    });
    console.log('Saved', p.out);
    await page.close();
  }
  await browser.close();
  console.log('Done.');
})();
