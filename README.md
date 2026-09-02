# Student Dashboard

A customizable widget board for students — warm cream/taupe aesthetic, drag-and-drop widgets, everything saved in your browser.

## How to open it
Just **double-click `index.html`** — it runs in any browser, no install needed.
(Optional: to run it on a local web server instead, run `node serve.js` and open `http://localhost:5599`. This is only needed if your browser blocks something on `file://`.)

## Using the board
- **✎ Edit Layout** — turn on edit mode, then **drag a widget by its top bar** to move it and **drag the bottom-right corner** to resize. Widgets **push each other out of the way and never overlap**, and float up to fill gaps. **✕** removes a widget, **⚙** opens its options.
- **Focus Timer ⚙** — click the gear on the timer to set focus/session, short break, long break minutes, sessions before a long break, and the countdown timer length (works without edit mode).
- **＋ Add Widget** — drop in any of the widgets.
- **🎨 Theme** — pick an accent color to recolor the whole board.
- **↺ Reset** — restore the default layout (clears your data).
- Everything you add or rearrange **saves automatically** (browser localStorage — nothing leaves your device).

## Widgets
Flip Clock (two big tiles) · Focus Timer (Pomodoro / Timer / Stopwatch, editable lengths, plays a sound) · To-Do List (priority + due date/time shown on each task) ·
Assignments (Google-Classroom-style filters) · Weather · Spotify · Calendar (events show as day tabs like Google Calendar) ·
Goals (day/week/month) · Habit Tracker (weekly + streaks) · Grade Calculator · Quick Notes ·
**Upcoming** · **Tests & Exams** · **Daily Schedule** · **Reminders** · **Daily Quote** · **Alarms** · **Study Sounds** · **Journal & Mood** · **Gmail**.

## Journal & Mood
Each day: pick how you felt (5 moods), write a journal entry, and rate anything you want to track — the **Rate your day** slider is there by default, and **＋ Track something** adds your own (Sleep, Stress, Productivity…). Click the **▦** button for a **mood calendar**: a month grid coloured by how you felt each day — tap any day to read or edit that day's entry.

## Add a widget → Connect an app
The **＋ Add Widget** drawer has two parts: a **Connect an app** row (Spotify, Google Classroom, Gmail, PowerSchool) that adds the widget *and* starts sign-in, and the full **Widgets** gallery below. PowerSchool has no personal student login for outside apps, so it can't live-sync — that tile adds the Grade Calculator (which works the same way, manually).

## The newer widgets
- **Upcoming** — one feed of everything due soon: pulls tasks (with due dates), assignments, calendar events, and tests, sorted by date with a countdown ("Today", "Tomorrow", "in 3 days").
- **Tests & Exams** — add a test with a date and get a live countdown. Click a test to open it: edit notes/study-guide text and **attach files** (PDFs, images, study guides — stored in your browser; keep them under ~4 MB each). Attachments open in a new tab.
- **Daily Schedule** — block out your day: add time blocks (start–end) tagged Task / Study / Event / Break, colour-coded and sorted by time.
- **Reminders** — a "must-do" checklist; optionally set a time (HH:MM) and it fires a notification + sound at that minute.
- **Daily Quote** — rotating encouragement. ‹ › to change manually, ⏸/▶ to toggle auto-rotate (every ~18s), ⚙ to manage your own list of quotes.
- **Alarms** — add alarms with a time + label and a toggle; when the time hits, it shows a browser notification and beeps. (Allow notifications when the browser asks.)
- **Study Sounds** — an ambient sound mixer (like the reference): a **Master volume** + **Stop all**, and a grid of sounds (Rain, Ocean Waves, Wind, Forest, Fireplace, Coffee Shop, Brown / White / Pink noise). Tap a card to play it, drag its slider to set its level — layer several at once. The sounds are generated live with the Web Audio API, so no audio files are needed and it works offline.

## Grade calculator
Works like PowerSchool by **quarters**: pick a tab **Q1 / Q2 / Q3 / Q4**, or **ALL** for the average across all quarters.
Enter each assignment's **points earned / total** — each assignment shows its own **%**, each class shows its average **%**,
and the header shows your **overall average percent** across the classes you tick to "count" (no GPA — just percentages).

## Connecting your Spotify & Google Classroom accounts

Real logins **can't run from a double-clicked file** — the login page refuses to hand tokens back to a `file://` page. So run the dashboard through its local server:

```bash
node "C:/Users/Ayleena/Desktop/student-dashboard/serve.js"
```

Then open **http://127.0.0.1:5599** (use `127.0.0.1`, not `localhost` — Spotify requires the numeric address). You never type a password into the dashboard: you log in on Google's / Spotify's own page and they hand back a read-only token stored in your browser.

### Spotify (pick from your existing playlists)
1. In the Spotify widget click **🎧 Log in & import my playlists**.
2. First time only, it walks you through: open **developer.spotify.com/dashboard** → **Create app** → set **Redirect URI** to exactly `http://127.0.0.1:5599/` → tick **Web API** → copy the **Client ID** into the dashboard.
3. Log in on Spotify's page → your saved playlists are imported into the widget. Click one to play it.
- *Browsing* your playlists works on any account. *Full in-page playback* needs **Spotify Premium** (otherwise you get the embed player / 30-second previews). You can still paste playlist links anytime.

### Google Classroom (pull your real to-do assignments)
1. In the Assignments widget click **🎓 Connect Google Classroom**.
2. First time only, it walks you through a free **Google Cloud** setup: create a project → enable the **Google Classroom API** → configure the **OAuth consent screen** (External, add yourself as a **Test user**) → create an **OAuth client ID (Web application)** with **Authorized JavaScript origin** `http://127.0.0.1:5599` → copy the **Client ID** into the dashboard.
3. Log in on Google's page (click through the "unverified app" screen — that's normal for a personal setup) → your active courses and their not-yet-done assignments load into the widget, filterable like Classroom's To-Do view.
- In personal/testing mode Google's token expires roughly weekly, so you'll click **Connect** again now and then.

### Gmail (browse your recent inbox)
Uses the **same Google Cloud project** as Classroom. One extra step: in the console, **enable the Gmail API**, and on the **OAuth consent screen** add the scope `.../auth/gmail.readonly`. Then click **✉️ Connect Gmail** (in the Gmail widget or the Connect-an-app row) — it lists your recent inbox (sender, subject, snippet, time); click a message to open it in Gmail. It's **read-only** (it can't send or delete).

## The three "external" widgets
- **Weather** — real, live. Uses the free **Open-Meteo** API with your location, or click *Set location* to search a city. No key needed.
- **Spotify** — real playback via Spotify's official **embed player**. Paste any playlist / track / album link (e.g. `https://open.spotify.com/playlist/...`) and you get play/pause/skip inline.
- **Assignments (Google Classroom)** — mirrors Classroom's *To-Do* view (filter by status & class) and works fully for assignments you add. **Live sync to a real Google Classroom account is not wired up** because it requires Google OAuth **and a small backend server** — a page opened straight from a file can't do that securely. To add real sync later you'd:
  1. Create a Google Cloud project, enable the Classroom API, make OAuth credentials.
  2. Add a tiny server (or serverless function) to hold the client secret and do the OAuth exchange.
  3. Call `courses.courseWork` / `studentSubmissions` and feed the results into the Assignments widget's `items`.
  (The same pattern — OAuth + backend — would let Spotify auto-list your saved playlists.)

## Files
- `index.html` — page structure
- `style.css` — theme & layout
- `app.js` — all widget logic and the drag/resize board
- `serve.js` — optional local static server
