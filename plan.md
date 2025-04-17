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
- Accept the OneTrust cookie banner so it no longer blocks clicks ✅
- Dismiss stray signup modals (newsletter / “Get £10 off”) with Escape ✅
- Click the “Take the Quiz” link ✅
- Click the survey intro “Get started” button ✅
- **Struggles & fixes:**  
  • The cookie overlay kept intercepting clicks → added a `waitForSelector` + click on its Accept button  
  • A newsletter popup appeared unpredictably → sent `Escape` (and tried its close button) to clear it  
  • Needed to wait for dynamic content (Get started, then answer labels) → added `waitForSelector` calls  
- Now the quiz flow to the first question runs sucessfully ✅


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
