# Huel Quiz Automation – Plan
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
- Initialise Git and make the first commit ✅

### ✅ Write the first bit of code
- Open a headless browser ✅
- Go to huel.com and check it loads ✅
- Log a message in the console ✅
- Commit that step ✅

### ✅ Step 3: Click the "Take the Quiz" button
- Inspect the element and use `getByRole` to target the correct link ✅
- Detect initial failure due to cookie overlay blocking clicks ✅
- Try `waitForSelector` and clicking "Accept All" ✅
- Try removing the overlay with `page.evaluate()` ✅
- Final working solution: wait for overlay, remove it if found, then force click the quiz button ✅
- Quiz button now consistently clickable ✅

---

## 🔜 What’s next

### 🔲 Step 4: Go through the quiz
- Click one answer per question
- Keep logs for each step

### 🔲 Step 5: Click the "No thanks" link
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
- Commit after each step to show clear progress
- Write comments in my own voice so I remember what I did
- Focus on understanding everything step-by-step without rushing
