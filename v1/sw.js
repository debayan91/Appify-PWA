const CACHE_NAME = "launcher-v2";
const PRECACHE = ["/", "/index.html", "/style.css", "/icons/icon-192.png"];

/* Install — cache the shell for instant startup */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

/* Activate — purge old caches, claim clients immediately */
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  );
  self.clients.claim();
});

/* Fetch — cache-first for same-origin, pass-through for external */
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  /* Never intercept cross-origin (the target site) */
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)),
  );
});
