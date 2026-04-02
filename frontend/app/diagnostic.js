import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  // Listen to ALL console logs and errors
  page.on('console', msg => {
    console.log(`PAGE LOG [${msg.type()}]:`, msg.text());
  });
  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.toString());
  });

  console.log('Navigating to local site...');
  await page.goto('http://localhost:5174', { waitUntil: 'networkidle0' });
  
  // Check if HeroSection exists and what its size is
  const heroDimensions = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return { error: 'No main found' };
    const html = main.innerHTML;
    return {
      mainChildrenCount: main.children.length,
      htmlSummary: html.substring(0, 300)
    };
  });
  
  console.log('Diagnostic result:', heroDimensions);
  
  await browser.close();
})();
