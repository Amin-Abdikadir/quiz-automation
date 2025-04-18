# Huel Quiz Automation – Plan

---

## Tools I’m using

- Node.js
- Playwright
- Git + GitHub
- DevTools for inspecting elements

---

## ✅ Done so far

### ✅ Set up the project

- Run `npm init` ✅
- Install Playwright ✅
- Initialise Git and make first commit ✅

### ✅ Write the first bit of code

- Launch a headless browser and open Huel homepage ✅
- Confirm console logs appeared as expected ✅

### ✅ Step 3: Click the "Take the Quiz" button

- Accept the OneTrust cookie banner so it no longer blocks clicks ✅
- Dismiss stray signup modals with Escape ✅
- Click “Take the Quiz” link and then “Get started” button ✅

### ✅ Step 4: Go through the quiz

- Handle Q1–Q2 by clicking first input and then Continue button ✅
- Auto‑advance Q3+ by clicking the first input and waiting for it to detach ✅

### ✅ Step 5: Click the "No thanks" link

- Skip the signup prompt by clicking the “No thanks, show me the results” control (supports both `<a>` & `<button>`) ✅

### ✅ Step 6: Check the results page

- Wait for network idle after skipping ✅
- Confirm a product loaded by waiting for the first “Read more” button ✅

### ✅ Step 7: Add error handling

- Wrapped each major block (launch, navigation, quiz flow, skip link, results check) in try/catch with clear logs ✅

✅ Bonus fix: Handle page load delays on results screen
Added page.waitForLoadState("networkidle") before checking for products ✅
This fixed a timeout issue where products hadn’t loaded yet, even though the page looked ready
Learned: visually “loaded” isn’t the same as Playwright-ready — networkidle is more reliable for this screen

---

## 🔜 What’s next
