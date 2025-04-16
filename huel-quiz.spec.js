const { chromium } = require('playwright');

(async () => {
  // launching a browser (runs in the background, I don’t need to see it)
  const browser = await chromium.launch();

  // starting a clean browser session
  const context = await browser.newContext();

  // opening a new tab in the browser
  const page = await context.newPage();

  // going to the Huel homepage
  console.log("➡️ Loading the Huel homepage...");
  await page.goto('https://uk.huel.com');

  // confirming the page has loaded
  console.log("✅ Huel homepage loaded successfully");

  // closing the browser after loading the page
  await browser.close();
})();