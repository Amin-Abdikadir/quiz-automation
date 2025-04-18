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
  no issues here everything installed and committed cleanly

### ✅ Write the first bit of code
- Launch a headless browser and open Huel homepage ✅
- Confirm console logs appeared as expected ✅  
  script ran first time with no errors

### ✅ Step 3: Click the "Take the Quiz" button
- Accept the OneTrust cookie banner so it no longer blocks clicks ✅
- Dismiss stray signup modals (newsletter / “Get £10 off”) with Escape ✅
- Click the “Take the Quiz” link ✅
- Click the survey intro “Get started” button ✅
- **Struggles & fixes**  
  * Cookie overlay was in the way so I added a wait for its Accept button then clicked it  
  * Newsletter popup kept popping up so I sent Escape to clear it  
  * “Get started” and answer options load slowly so I added waits before clicking  
- **What I learned**  
  * Always clear overlays before trying to click  
  * Role‑based selectors with exact text make life easier  

### ✅ Step 4: Go through the quiz
- Click one answer per question and advance through all steps ✅
- **Struggles & fixes**  
  * Only Q1 and Q2 have Continue buttons. I was trying to click Continue on every question and it failed. I fixed that by looping Continue only for the first two questions.  
  * Clicking labels sometimes just hovered instead of selecting. I switched to clicking the actual radio or checkbox input and forced the click.  
  * After selecting, the same option kept appearing so the script hung. I grabbed the input’s id and waited for it to go away before moving on.  
- **What I learned**  
  * The quiz changes behaviour (the UI) halfway through so you need different logic for different questions , 
  * Waiting for the element you clicked to disappear is a simple way to know the page moved on  

---

## 🔜 What’s next

### 🔲 Step 5: Click the "No thanks" link
- Make sure the link or button is there  
- Click it and confirm it works

### 🔲 Step 6: Check the results page
- Look for at least one product shown  
- Log something if it’s found

### 🔲 Step 7: Add error handling
- Wrap key steps in try/catch  
- Log clear messages if something goes wrong

---

## reminder for myself 
- Commit after each step so I can track progress , espescpicially when things are working 
- Take it one step at a time and don’t rush  

