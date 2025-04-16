# Huel Quiz Automation – Plan

---

## Tools I’m using
- Node.js
- Playwright
- Git + GitHub
- DevTools for inspecting stuff

---

## ✅ Done so far

### ✅ Set up the project
- Ran `npm init`
- Installed Playwright
- Initialised Git and made the first commit

### ✅ Wrote the first bit of code
- Opened a headless browser
- Went to huel.com and checked it loaded
- Logged a message in the console
- Committed that bit too

---

## 🔜 What’s next

✅ Step 3: Click the "Take the Quiz" button
Inspected the element and used getByRole to target the correct link
Initial attempts failed due to a cookie overlay (#onetrust-consent-sdk) blocking clicks
Tried using waitForSelector to detect the cookie banner and click “Accept All” — didn't always appear
Tried removing the overlay using page.evaluate() — still caused intermittent blocking
Final working solution: Used waitForSelector with a timeout, then removed the overlay manually if it existed. Followed that with a forced click on the quiz link after waiting for visibility.
✔ Now clicking the quiz button works every time, and script is stable

### 🔲 Step 4: Go through the quiz
- Click one answer per question
- Keep logs for each step

### 🔲 Step 5: Click the “No thanks” link
- Make sure it’s there
- Click it and confirm it works

### 🔲 Step 6: Check the results page
- Look for at least one product shown
- Log something if it's found

### 🔲 Step 7: Add error handling
- Use try/catch blocks
- Add helpful console messages

---

## Other stuff
- Committing after each step so it’s easy to follow
- Comments in the code are in my own voice, so I remember what I did
- Not overthinking it, just focusing on understanding everything as I go