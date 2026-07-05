const CACHE = "audite-v7";
const SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png",
  "https://unpkg.com/react@18/umd/react.production.min.js",
  "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js",
  "https://unpkg.com/@babel/standalone@7/babel.min.js",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) =>
      // cache: "reload" bypasses the HTTP cache so a new SW version
      // never precaches stale copies of the shell files
      Promise.allSettled(SHELL.map((u) => c.add(new Request(u, { cache: "reload" }))))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Never intercept audio streams or podcast feeds — always network,
  // so playback and fresh episode lists behave normally.
  const isShell =
    SHELL.some((u) => e.request.url === u || url.pathname.endsWith(u.replace("./", "/"))) ||
    url.origin === location.origin;
  if (e.request.method !== "GET" || !isShell) return;
  if (e.request.destination === "audio") return;

  e.respondWith(
    caches.match(e.request).then((hit) => hit || fetch(e.request))
  );
});
