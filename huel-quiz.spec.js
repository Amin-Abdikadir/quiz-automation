const { chromium } = require('playwright');

(async () => {
  // launching a visible browser so I can watch each step
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page    = await browser.newPage({ timeout: 5000 }); // ⬅️ Lower global timeout for quicker test failures

  // 1) go to the homepage
  console.log("➡️ Loading Huel homepage...");
  await page.goto("https://uk.huel.com");
  console.log("✅ Homepage loaded");

  // 2) accept cookies if they appear
  try {
    await page.click('#onetrust-consent-sdk button:has-text("Accept")', { timeout: 3000 });
    console.log("🍪 Accepted cookies");
  } catch {
    console.log("ℹ️ No cookie banner found");
  }

  // 3) dismiss any signup popup
  await page.keyboard.press("Escape");
  console.log("🗙 Dismissed any signup popup");

  // 4) click "Take the Quiz"
  await page.getByRole("link", { name: "Take the Quiz", exact: true }).click();
  console.log("✅ Clicked Take the Quiz");

  // 5) click "Get started"
  await page.click('button:has-text("Get started")', { timeout: 3000 });
  console.log("🔀 Clicked Get started");

  // helper for Q1/Q2 & auto‑advance logic
  const ANSWER_INPUT = 'input[type="radio"], input[type="checkbox"]';

  // 6) answer Q1 and Q2 (both have Continue)
  for (let q = 1; q <= 2; q++) {
    await page.waitForSelector(ANSWER_INPUT, { timeout: 5000 });
    console.log(`✅ Q${q} answers visible`);
    const first = page.locator(ANSWER_INPUT).first();
    await first.scrollIntoViewIfNeeded();
    await first.click({ force: true });
    console.log(`✅ Q${q}: picked first available answer`);
    const cont = page.getByRole("button", { name: "Continue", exact: true });
    await cont.waitFor({ state: "visible", timeout: 5000 });
    await cont.click();
    console.log(`➡️ Q${q}: clicked Continue`);
  }

  // 7) Q3+ auto‑advance (pick and wait for detachment)
  const skipLinkOrButton = () =>
    page.locator('a:has-text("No thanks, show me the results."), button:has-text("No thanks, show me the results.")');

  while (true) {
    // if skip appears, break
    if (await skipLinkOrButton().count() > 0) {
      console.log("🔗 Skip link/button visible—breaking out");
      break;
    }
    // pick first answer
    await page.waitForSelector(ANSWER_INPUT, { timeout: 5000 });
    const input = page.locator(ANSWER_INPUT).first();
    const id    = await input.getAttribute("id");
    await input.scrollIntoViewIfNeeded();
    await input.click({ force: true });
    console.log(`✅ Picked answer with input#${id}`);
    // wait for that input to detach (next question)
    await page.waitForSelector(`input[id="${id}"]`, { state: "detached", timeout: 5000 });
    console.log("➡️ Moved to next question");
  }

  // 8) click "No thanks, show me the results"
  console.log("👉 Clicking the skip link/button now");
  await skipLinkOrButton().first().click();
  console.log("✂️ Clicked No thanks, show me the results");

  // 9) verify at least one product shows on results page
  console.log("🔄 Page is idle, checking for products...");
  await page.waitForSelector('button:has-text("Read more")', { timeout: 5000 });
  console.log("🎉 At least one product is displayed");

  // 10) close the browser
  await browser.close();
})();

