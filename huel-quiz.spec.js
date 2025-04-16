const { chromium } = require("playwright");

(async () => {
  // launching a browser (runs in the background, I don’t need to see it)
  const browser = await chromium.launch();

  // starting a clean browser session
  const context = await browser.newContext();

  // opening a new tab in the browser
  const page = await context.newPage();

  // going to the Huel homepage
  console.log("➡️ Loading the Huel homepage...");
  await page.goto("https://uk.huel.com");

  // confirming the page has loaded
  console.log("✅ Huel homepage loaded successfully");

  // check if the cookie overlay exists and block it properly
  try {
    await page.waitForSelector("#onetrust-consent-sdk", { timeout: 5000 });

    // remove the entire cookie SDK if it's getting in the way
    await page.evaluate(() => {
      const el = document.getElementById("onetrust-consent-sdk");
      if (el) el.remove();
    });

    console.log("🚫 Removed cookie overlay (OneTrust) manually");
  } catch (err) {
    console.log("ℹ️ No cookie overlay found, moving on");
  }

  // check if the cookie overlay is still there and remove it
  const overlay = page.locator("#onetrust-consent-sdk");

  if (await overlay.isVisible()) {
    await page.evaluate(() => {
      const el = document.getElementById("onetrust-consent-sdk");
      if (el) el.remove();
    });
    console.log("🚫 Removed cookie overlay manually");
  }

  // wait for the quiz link to be ready and click it
  const quizLink = page.getByRole("link", {
    name: "Take the Quiz",
    exact: true,
  });
  await quizLink.waitFor({ state: "visible", timeout: 5000 });
  await quizLink.click({ force: true });

  console.log("✅ Clicked the Take the Quiz button");

  // closing the browser after loading the page
  await browser.close();
})();
