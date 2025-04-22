# Huel Quiz Automation

This project automates the "Which product is right for me?" quiz on the Huel UK website using Playwright.

The goal was to build something simple, reliable, and easy to follow.  

---

## What this script does

- Loads the Huel homepage
- Accepts cookies if the banner shows up
- Closes any signup popups
- Clicks "Take the Quiz" and "Get started"
- Picks answers for all quiz questions
- Skips the email signup offer
- Checks that at least one product shows at the end
- Takes a screenshot if anything goes wrong

---

## Tech used

- Node.js
- Playwright
- Git and GitHub
- DevTools for inspecting and testing

---

## Extra stuff I added

- If an error happens, the script saves a screenshot automatically
- Console logs were written properly so it is easy to see where it is at any time

## Final notes

- Whenever something did not work, I stopped, inspected properly, and built the right fix
- I did not guess or rush. I made sure I understood every problem before moving forward


---

## How to run it

```bash
npm install
node huel-quiz.spec.js
```


## Reflections

- I learned the importance of not assuming anything. I always inspected elements properly instead of guessing.
- I realised that different parts of a website can behave differently (e.g., questions needing a Continue button, others auto-advancing).
- I learned how powerful DevTools are when trying to find real selectors instead of relying on guesses.
- I improved my Playwright skills by working with both `getByRole` and manual CSS selectors, depending on what was most reliable.
- I learned that adding small waits, checking for detached elements, and handling unexpected popups made my script much more stable.
- I understood the value of breaking tasks into very small steps and committing each one properly.
- I practised writing logs that tell me exactly where the script is at every point, which made debugging easier.
- I discovered how useful it is to capture screenshots automatically when something goes wrong, especially for longer test runs.
