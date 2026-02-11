const CACHE_NAME = "launcher-v1";
const PRECACHE = ["/", "/index.html", "/style.css"];

/* Install — cache the shell */
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) => c.addAll(PRECACHE)));
  self.skipWaiting();
});

/* Activate — purge old caches */
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

/* Fetch — cache-first for shell, network-first for everything else */
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);

  /* Only handle same-origin requests */
  if (url.origin !== location.origin) return;

  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request)),
  );
});
