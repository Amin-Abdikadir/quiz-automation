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
- **Struggles & fixes**
  - Cookie overlay intercepting clicks → waited for its Accept button and clicked it
  - Newsletter popup kept appearing → sent `Escape` to close it
  - Dynamic content (Get started, answer labels) loaded slowly → added explicit waits
- **What I learned**
  - Always inspect and clear overlays before interacting
  - Role‑based selectors (`getByRole`) are more reliable than guessing CSS

### ✅ Step 4: Go through the quiz

- Handle Q1–Q2 by clicking first input and then the real Continue button ✅
- Auto‑advance Q3+ by clicking the first input and waiting for it to detach ✅
- **Struggles & fixes**
  - Tried clicking Continue on every question → realised only Q1–Q2 need it
  - Clicking labels sometimes only hovered → switched to clicking `<input>` with `{ force: true }`
  - Script hung on repeated selections → captured input `id` and waited for it to disappear
- **What I learned**
  - Quiz UI can change mid‑flow—verify each question’s behaviour
  - Waiting for an element to detach is a simple way to confirm navigation

### ✅ Step 5: Click the "No thanks" link

- After all questions, skip the signup prompt and proceed to results ✅
- **Original assumption:** thought it was always an `<a>`
- **What actually happened:** sometimes it was a `<button>`, so my click failed
- **Fix:** inspected in DevTools, then matched both variants by text
- **What I learned**
  - Never assume the tag—always inspect the live DOM
  - Prefer matching on visible text or role across tags

### ✅ Step 6: Check the results page

- Wait for the page to finish loading (network idle) before checking for products ✅
- **Original assumption:** looked for `.ProductCard`, `.product-tile`, `.product-grid` because those sounded logical
- **What actually happened:** none of those containers exist in the real results page
- **Fix:** drew on the lesson from Step 5—inspected in DevTools and found that every product tile has a “Read more” button; switched to waiting for that
- **What I learned**
  - Never guess class names—inspect and confirm before writing selectors
  - Targeting clickable elements users see (“Read more”) is more robust than assumed containers

### 🔲 Step 7: Add error handling

- Wrap each major block in `try/catch`
- Log clear messages on failure

---

> **Journal note:** By carrying forward the “inspect before I assume” lesson from Step 5 into Step 6, I avoided repeating the same mistake and built a selector strategy that actually matched what the page rendered.
