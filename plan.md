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
  _no issues here everything installed and committed cleanly_

### ✅ Write the first bit of code
- Launch a headless browser and open Huel homepage ✅  
- Confirm console logs appeared as expected ✅  
  _script ran first time with no errors_

### ✅ Step 3: Click the "Take the Quiz" button
- Accept the OneTrust cookie banner so it no longer blocks clicks ✅  
- Dismiss stray signup modals with Escape ✅  
- Click “Take the Quiz” link and then “Get started” button ✅  
- **Struggles & fixes**  
  - Cookie overlay intercepting clicks → waited for its Accept button and clicked it  
  - Newsletter popup kept appearing → sent `Escape` to close it  
  - Dynamic content (Get started button) took time to load → added explicit waits  
- **What I learned**  
  - Always check for overlays before interacting  
  - Role‑based selectors (`getByRole`) are more reliable than guessing CSS  
  - Do not assume what will appear wait for it safely  

### ✅ Step 4: Go through the quiz
- Handle Q1–Q2 by clicking first input and then clicking Continue ✅  
- Auto‑advance Q3+ by clicking the first input and waiting for it to disappear ✅  
- **Struggles & fixes**  
  - At first I thought every question needed a Continue → realised only Q1–Q2 did  
  - Clicking labels alone sometimes only hovered → switched to clicking `<input>` with `{ force: true }`  
  - Script sometimes hung on repeated selections → captured input `id` and waited for it to detach before moving on  
- **What I learned**  
  - Quiz layouts can change mid-flow—watch each question's behaviour  
  - Waiting for an input to detach is a simple way to confirm navigation without making assumptions  

### ✅ Step 5: Click the "No thanks" link
- After answering all questions, skip the signup by clicking “No thanks, show me the results” ✅  
- **Original assumption:** thought it was always an `<a>` link  
- **What actually happened:** sometimes it was a `<button>`, so clicks failed  
- **Fix:** inspected using DevTools properly and matched both `<a>` and `<button>` by visible text  
- **What I learned**  
  - Never assume the tag—always check the real DOM  
  - Best to match visible text when possible across different HTML structures  

### ✅ Step 6: Check the results page
- Wait for the page to finish loading after skipping ✅  
- Check for presence of products before moving on ✅  
- **Original assumption:** looked for `.ProductCard`, `.product-tile`, `.product-grid` because they sounded right  
- **What actually happened:** those elements did not exist on the real page  
- **Fix:** inspected the page properly and found that each product tile had a “Read more” button; switched to waiting for that  
- **What I learned**  
  - Never guess element classes  
  - Always inspect and match what real users would click on (“Read more” felt natural and user-visible)

### ✅ Step 7: Add error handling
- Wrapped the entire flow in a `try/catch` ✅  
- If an error happens, capture a screenshot of the full page ✅  
- Save the screenshot in a `/screenshots/` folder, creating it if missing ✅  
- **Struggles & fixes**  
  - Tested failure by forcing a fake button click (`DefinitelyDoesNotExist`) to make sure screenshots were captured properly  
- **What I learned**  
  - A graceful exit with helpful evidence (screenshot) is extremely valuable for debugging  
  - It's better to fail usefully rather than crash without context  

---

## ✅ Bonus features added

### ✅ Wait for network idle before checking products
- After clicking "No thanks", I added an extra wait to make sure the page was fully idle before checking for products ✅  
- I noticed some elements could be lazy‑loaded, and I wanted the script to be reliable even if the page was still loading bits in the background  

### ✅ Capture a screenshot automatically if anything fails
- I added full-page screenshot capture if anything goes wrong ✅  
- I thought this would be really useful having a screenshot of what went wrong would save loads of time  
- I added this because I was enjoying the task and wanted to push myself a bit more  

---

---

> **Journal note:**  
> I added the two bonus features because I wanted to learn more and properly challenge myself. I enjoyed the task.  
> I realised that taking time to inspect properly, plan my selectors carefully, and add graceful error handling makes a big difference in building scripts that are actually useful and could have saved me soo much time.

