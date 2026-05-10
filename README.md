# GotTime Planner

GotTime is a beginner-friendly, browser-based planner for splitting a 24-hour day into 30-minute blocks. It starts with an example framework:

- 8 hours of sleep
- 3 hours of eating
- 1 hour of buffer time
- 8 hours of work
- 4 hours of free time

You can add or remove blocks to experiment with different life settings, such as longer work days, dedicated project time, exercise, study, or extra buffer time.

## How to run it

Open `index.html` in a web browser, or run a tiny local server from this folder:

```bash
python3 -m http.server 8000
```

Then visit <http://127.0.0.1:8000/>.

## How it works

- The day is always 24 hours.
- Every block is rounded to 30-minute slots.
- The summary shows the equation for your current day.
- The timeline displays 48 squares, one for each 30-minute block.
- If your plan is longer than 24 hours, the app warns you so you can adjust it.
