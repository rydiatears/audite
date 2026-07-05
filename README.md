# Audite — deploy to GitHub Pages

A personal podcast player. RSS-first subscriptions, folders, a play-through
queue, position memory, and speed controls. All data lives in your browser's
localStorage — nothing is sent anywhere.

## Files

| File | Purpose |
|---|---|
| `index.html` | The whole app (React via CDN) |
| `manifest.webmanifest` | Makes it installable ("Add to Home Screen") |
| `sw.js` | Service worker — caches the app shell |
| `icon-192.png`, `icon-512.png` | Home screen icons |

## Deploy (≈5 minutes)

1. Create a new repo on GitHub — e.g. `audite`. Public is fine (the app
   contains no personal data; your subscriptions live only on your phone).
2. Upload all five files to the repo root (**Add file → Upload files** works;
   no git required).
3. Go to **Settings → Pages**. Under *Build and deployment*, set Source to
   **Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then visit
   `https://YOUR-USERNAME.github.io/audite/`
5. On your phone in Chrome: open that URL → menu (⋮) → **Add to Home screen**
   → **Install**. It opens full-screen with its own icon from then on.

## Notes

- **Your data stays on the device.** Subscriptions, queue, and playback
  positions are in localStorage per-device, so your phone and laptop keep
  separate libraries. (If you ever want export/import or sync, that's an
  easy feature to add later.)
- **Clearing Chrome's site data will erase your library.** "Clear browsing
  data" with "Site data" checked is the thing to avoid — normal cache
  clearing is fine.
- **Updating the app:** replace `index.html` in the repo. If your phone shows
  a stale version, close and reopen the app once or twice — the service
  worker refreshes in the background. Bump `audite-v1` to `audite-v2` in
  `sw.js` when making significant changes to force a clean refresh.
- Some podcast feeds block browser access (CORS). The app automatically
  retries through a public proxy (allorigins.win), which handles most of
  them. Audio streaming itself is rarely affected.
