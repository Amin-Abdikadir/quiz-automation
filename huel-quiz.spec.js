const { chromium } = require('playwright');

(async () => {
  // launching a visible browser so I can follow each step
  const browser = await chromium.launch({ headless: false, slowMo: 300 });
  const page = await browser.newPage();

  // going to the Huel homepage
  console.log("➡️ Loading Huel homepage...");
  await page.goto("https://uk.huel.com");
  console.log("✅ Homepage loaded");

  // accept cookie banner if shown
  try {
    await page.waitForSelector('#onetrust-consent-sdk button:has-text("Accept")', { timeout: 5000 });
    await page.click('#onetrust-consent-sdk button:has-text("Accept")');
    console.log("🍪 Accepted cookies");
  } catch {
    console.log("ℹ️ No cookie banner found");
  }

  // close the “Get £10 off” signup popup if it appears
  try {
    const signupClose = page.locator('button:has-text("×")');
    if (await signupClose.count() > 0) {
      await signupClose.first().click();
      console.log("🗙 Closed the signup offer popup");
    }
  } catch {
    console.log("ℹ️ No signup popup to close");
  }

  // press Escape just in case any modal remains
  await page.keyboard.press('Escape');
  console.log("🗙 Pressed Escape to clear any leftover popup");

  // find and click the Take the Quiz link
  const quizLink = page.getByRole("link", { name: "Take the Quiz", exact: true });
  await quizLink.waitFor({ state: "visible", timeout: 5000 });
  await quizLink.click({ force: true });
  console.log("✅ Clicked Take the Quiz");

  // find and click Get started
  await page.waitForSelector('button:has-text("Get started")', { timeout: 10000 });
  await page.click('button:has-text("Get started")');
  console.log("🔀 Clicked Get started");

  // wait for the first question to appear
  await page.waitForSelector("label.Answer_Answer__label__wbfzR", { timeout: 10000 });
  console.log("✅ First answer options visible");

  // pick “Lose weight” and continue
  await page.getByLabel("Lose weight").click();
  console.log("✅ Picked Lose weight");
  await page.getByRole("button", { name: "Continue" }).click();
  console.log("➡️ Clicked Continue");

  // await browser.close();
})();


