const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  try {
    // 1) Go to the homepage
    console.log("➡️ Loading Huel homepage...");
    await page.goto("https://uk.huel.com");
    console.log("✅ Homepage loaded");

    // 2) Accept cookies if they appear
    try {
      await page.click('#onetrust-consent-sdk button:has-text("Accept")', { timeout: 5000 });
      console.log("🍪 Accepted cookies");
    } catch {
      console.log("ℹ️ No cookie banner found");
    }

    // 3) Dismiss any signup popup
    await page.keyboard.press("Escape");
    console.log("🗙 Dismissed any signup popup");

    // 4) Click "Take the Quiz"
    await page.getByRole("link", { name: "Take the Quiz", exact: true }).click();
    console.log("✅ Clicked Take the Quiz");

    // 5) Click "Get started"
    await page.click('button:has-text("Get started")');
    console.log("🔀 Clicked Get started");

    // Helper for quiz answers
    const ANSWER_INPUT = 'input[type="radio"], input[type="checkbox"]';

    // 6) Answer Q1 and Q2
    for (let q = 1; q <= 2; q++) {
      await page.waitForSelector(ANSWER_INPUT, { timeout: 10000 });
      console.log(`✅ Q${q} answers visible`);
      const first = page.locator(ANSWER_INPUT).first();
      await first.scrollIntoViewIfNeeded();
      await first.click({ force: true });
      console.log(`✅ Q${q}: picked first available answer`);
      const cont = page.getByRole("button", { name: "Continue", exact: true });
      await cont.waitFor({ state: "visible", timeout: 10000 });
      await cont.click();
      console.log(`➡️ Q${q}: clicked Continue`);
    }

    // 7) Auto-advance Q3+
    const skipLinkOrButton = () =>
      page.locator('a:has-text("No thanks, show me the results."), button:has-text("No thanks, show me the results.")');

    while (true) {
      if (await skipLinkOrButton().count() > 0) {
        console.log("🔗 Skip link/button visible—breaking out");
        break;
      }

      await page.waitForSelector(ANSWER_INPUT, { timeout: 10000 });
      const input = page.locator(ANSWER_INPUT).first();
      const id = await input.getAttribute("id");
      await input.scrollIntoViewIfNeeded();
      await input.click({ force: true });
      console.log(`✅ Picked answer with input#${id}`);
      await page.waitForSelector(`input[id="${id}"]`, { state: "detached", timeout: 10000 });
      console.log("➡️ Moved to next question");
    }

    // 8) Click "No thanks, show me the results"
    console.log("👉 Clicking the skip link/button now");
    await skipLinkOrButton().first().click();
    console.log("✂️ Clicked No thanks, show me the results");

    // 9) Verify at least one product
    console.log("🔄 Page is idle, checking for products...");
    await page.waitForSelector('button:has-text("Read more")', { timeout: 10000 });
    console.log("🎉 At least one product is displayed");

    // ❌ TEMPORARY: Throw fake error to test screenshot capture
    await page.click('button:has-text("DefinitelyDoesNotExist")');

  } catch (error) {
    console.error("❗ Something went wrong. Taking a screenshot...");

    // Create screenshots folder if missing
    const screenshotsDir = path.resolve(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir);
    }

    // Build dynamic filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filepath = path.join(screenshotsDir, `error-${timestamp}.png`);

    // Take screenshot
    await page.screenshot({ path: filepath, fullPage: true });
    console.log(`📸 Screenshot saved to: ${filepath}`);

    // Re-throw the error so it still exits with failure
    throw error;
  } finally {
    await browser.close();
  }
})();


