# GotTime Planner

GotTime is a beginner-friendly, browser-based planner for splitting a 24-hour day into a personal time framework. It starts with an example:

- 24 hours in the day
- subtract 8 hours of sleep
- subtract 3 hours of eating
- subtract 1 hour of buffer time
- subtract 8 hours of work
- end with 4 hours left

You can edit the table, enter fractional hours like `1.5` or `0.25`, remove rows, and add a new row beneath any existing row.

## What you need to know first

This project is a small website made from four main files that are visible at the top level of this repo:

- `README.md` is this instruction file.
- `index.html` is the page you open in a browser.
- `styles.css` controls how the page looks.
- `script.js` controls the planner behavior.

There is no account, database, install step, or paid server required for this first version. You can run it on your own computer.

## Beginner setup: how to get the project onto your computer

If the project is already on your computer, you can skip to [Run the app](#run-the-app).

If the project is on GitHub, you usually need to **clone** it the first time. Cloning means “download a copy of this project folder to my computer.”

1. Install Git if you do not already have it: <https://git-scm.com/downloads>
2. Open your terminal:
   - On macOS: open **Terminal**.
   - On Windows: open **PowerShell** or **Git Bash**.
   - On Linux: open your usual terminal app.
3. Choose where you want the project to live. For example, your Desktop:

   ```bash
   cd Desktop
   ```

4. Clone the project. Replace the URL below with the actual GitHub repository URL:

   ```bash
   git clone https://github.com/YOUR-USERNAME/GotTime.git
   ```

5. Move into the project folder:

   ```bash
   cd GotTime
   ```

### Do I need to pull it?

- If you **do not have the project folder yet**, use `git clone ...` first.
- If you **already cloned it before** and want the newest version, go into the project folder and run:

  ```bash
  git pull
  ```

- If you are using a downloaded `.zip` file instead of Git, you do not use `git pull`. You would download the newest zip again.

## Run the app

You have two beginner-friendly options.

### Option 1: open the file directly

This is the simplest option.

1. Find the project folder named `GotTime`.
2. Double-click `index.html`.
3. Your browser should open the GotTime Planner.

If double-clicking works for you, you do not need to run a server yet.

### Option 2: run a local server from the project folder

A local server lets your browser view the project at a local address like `http://127.0.0.1:8000/`. “Local” means it is running on your computer, not publicly on the internet.

#### Step 1: open a terminal

Open your terminal app:

- macOS: **Terminal**
- Windows: **PowerShell** or **Git Bash**
- Linux: your terminal app

#### Step 2: go into the project folder

Use `cd`, which means “change directory.” A directory is the same idea as a folder.

For example, if the project is on your Desktop:

```bash
cd Desktop/GotTime
```

If that says the folder cannot be found, check where you saved the project. You can also drag the folder into many terminal windows to paste its path.

#### Step 3: start the server

Run this command from inside the `GotTime` folder:

```bash
python3 -m http.server 8000
```

If you are on Windows and `python3` does not work, try:

```bash
python -m http.server 8000
```

When it works, the terminal will keep running and show something like `Serving HTTP on ... port 8000`. Leave that terminal window open while you use the app.

#### Step 4: open the app in your browser

Open this address in Chrome, Safari, Edge, or Firefox:

```text
http://127.0.0.1:8000/
```

You should now see the GotTime Planner.

#### Step 5: stop the server when you are done

Go back to the terminal window and press:

```text
Ctrl + C
```

That stops the local server.

## How to use the planner table

Each row follows this pattern:

```text
Previous hour count - Hours to deduct = Hours remaining
```

For example:

```text
24 - 8 = 16
16 - 3 = 13
13 - 1 = 12
12 - 8 = 4
```

Use the table like this:

1. Type a purpose, such as `Sleep`, `Work`, `Exercise`, or `Project`.
2. Enter the number of hours to deduct. Fractions are okay, so `1.5` means 1 hour and 30 minutes.
3. Click **Add row beneath** to insert a new row directly under that row.
4. Watch the circle on the right. It shows one number: your final hours left.

## Common beginner problems

### “python3: command not found”

Python may not be installed, or your computer may call it `python` instead of `python3`. Try:

```bash
python -m http.server 8000
```

If that also fails, install Python from <https://www.python.org/downloads/>.

### “Address already in use”

Something else is already using port `8000`. Try another port:

```bash
python3 -m http.server 8001
```

Then open:

```text
http://127.0.0.1:8001/
```

### “I opened the page, but I do not see my changes”

Refresh the browser. If that does not work, stop the server with `Ctrl + C`, start it again, and refresh the page.

## How it works

- The day starts with 24 hours.
- Each row deducts a number of hours from the previous row's remaining time.
- Fractional hours are allowed.
- The summary circle shows the final number of hours left.
- If your plan is longer than 24 hours, the app warns you so you can adjust it.
