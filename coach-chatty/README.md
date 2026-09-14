# Coach Chatty Gym Log

Mobile-first, dependency-free gym log hosted in `chipmc/chipmc.github.io` at `coach-chatty/`.

## Use
Open https://chipmc.github.io/coach-chatty/ once online and wait for Offline ready. Add exercises from Library or the workout picker, enter weight/reps and check each completed set. Record RPE, discomfort, substitutions and notes. Finish Workout saves the session on this browser and opens Copy for ChatGPT and Download JSON. Paste the compact result into the coaching conversation. History permits re-export and a full backup download.

No GitHub credentials, analytics or backend are used. Completed workouts remain in browser local storage until explicitly copied/downloaded. They do not automatically sync to GitHub or across devices. Browser storage can be cleared or evicted; download backups. Install via the browser's Add to Home Screen option where supported. Rest timers use wall-clock deadlines; no guaranteed background sound on iOS.

## Coaching workflow
Update `coach-chatty/data/current-workout.json` on the repository's `master` branch before a session. GitHub Pages republishes after a commit. On opening / Check for new plan, the app fetches the file network-first with a cache-busting query. An active draft is preserved: Start a fresh session explicitly loads the new plan. Offline fallback retains the last fetched plan. A cached plan badge does not imply that the feed is up to date.

Use stable exercise IDs from the library for prior-value matching. Local completed values (same units, no substitution) take precedence over supplied `prior`. Target set values take precedence over prior prefill. Prefilled sets are never marked complete automatically. New IDs/revisions identify each prescription. The currently shipped open-session plan contains no invented history or personal prescription.

Example feed (illustrative, not a prescribed workout):
```json
{"schemaVersion":1,"id":"session-2026-09-14","revision":1,"title":"Workout A","unit":"kg","coachNote":"Your session instructions","exercises":[{"id":"db-bench","name":"Dumbbell bench press","equipment":"Dumbbells + bench","target":"Your agreed target and progression rule","note":"Weight per dumbbell","restSeconds":90,"sets":[{"weight":null,"reps":null}],"prior":[{"weight":20,"reps":8}]}]}
```
`schemaVersion`, `id`, `title`, `unit` (kg/lb), and `exercises` are required. Each exercise requires a unique id, name and sets array. Weight/reps are nonnegative numbers or null. Reps must be integers. Sets can be edited/added/removed in the app. Optional `prior`, `target`, `note`, `restSeconds`, `equipment` and `coachNote` supply coaching context. Keep private medical details out of this public repository/feed.

Equipment inventory was recovered from the earlier conversation; uncertain machines remain explicitly unconfirmed. No original workout history was available to import.

## Development
Serve this directory with any static HTTP server; no build is required. `node --check app.js` and `node --check sw.js` check syntax. Service workers require localhost or HTTPS. Increment the cache version in sw.js when changing shell assets. The worker's scope and cache cleanup are restricted to Coach Chatty.
