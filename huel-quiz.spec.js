const { chromium } = require('playwright');

(async () => {
  // 1) launch a visible browser so I can watch each step
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page    = await browser.newPage();

  // 2) go to the homepage
  console.log("➡️ Loading Huel homepage...");
  await page.goto("https://uk.huel.com");
  console.log("✅ Homepage loaded");

  // 3) accept cookies if they appear
  try {
    await page.click('#onetrust-consent-sdk button:has-text("Accept")', { timeout: 5000 });
    console.log("🍪 Accepted cookies");
  } catch {
    console.log("ℹ️ No cookie banner found");
  }

  // 4) dismiss any signup popup
  await page.keyboard.press("Escape");
  console.log("🗙 Dismissed any signup popup");

  // 5) click “Take the Quiz”
  await page.getByRole("link", { name: "Take the Quiz", exact: true }).click();
  console.log("✅ Clicked Take the Quiz");

  // 6) click “Get started”
  await page.click('button:has-text("Get started")');
  console.log("🔀 Clicked Get started");

  // helper for Q1/Q2 & auto‑advance logic
  const ANSWER_INPUT = 'input[type="radio"], input[type="checkbox"]';

  // 7) answer Q1 and Q2 (both have Continue)
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

  // 8) Q3+ auto‑advance (pick and wait for detachment)
  const skipLinkOrButton = () =>
    page.locator('a:has-text("No thanks, show me the results."), button:has-text("No thanks, show me the results.")');
  while (true) {
    // if skip appears, break
    if (await skipLinkOrButton().count() > 0) {
      console.log("🔗 Skip link/button visible—breaking out");
      break;
    }
    // pick first answer
    await page.waitForSelector(ANSWER_INPUT, { timeout: 10000 });
    const input = page.locator(ANSWER_INPUT).first();
    const id    = await input.getAttribute("id");
    await input.scrollIntoViewIfNeeded();
    await input.click({ force: true });
    console.log(`✅ Picked answer with input#${id}`);
    // wait for that input to detach (next question)
    await page.waitForSelector(`input[id="${id}"]`, { state: "detached", timeout: 10000 });
    console.log("➡️ Moved to next question");
  }

  // 9) finally click “No thanks, show me the results”
  console.log("👉 Clicking the skip link/button now");
  await skipLinkOrButton().first().click();
  console.log("✂️ Clicked No thanks, show me the results");

  // 10) verify at least one product shows on results page
  await page.waitForSelector('.ProductCard, .product-tile, .product-grid', { timeout: 10000 });
  console.log("🎉 At least one product is displayed");

  // 11) close browser
  await browser.close();
})();