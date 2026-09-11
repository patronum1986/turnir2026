/* Service worker: оболочка гида (страница, стили, шрифты, картинки) — cache-first.
   Аудио сюда НЕ попадает: оно хранится в IndexedDB (Safari плохо отдаёт аудио из Cache API).
   ПРИ КАЖДОМ ОБНОВЛЕНИИ сайта поднимайте номер версии: v1 → v2 → v3… */
const CACHE = "put-drakona-v4";

const SHELL = [
  "./",
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "participants.json",
  "tasks.json",
  "assets/favicon.png",
  "assets/apple-touch-icon.png",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/img/cover.jpg",
  "assets/img/d1.jpg",
  "assets/img/d2.jpg",
  "assets/img/d3.jpg",
  "assets/img/d4.jpg",
  "assets/img/d5.jpg",
  "assets/img/d6.jpg",
  "assets/img/d7.jpg",
  "assets/img/d8.jpg",
  "assets/fonts/montserrat-cyrillic-400-normal.woff2",
  "assets/fonts/montserrat-cyrillic-600-normal.woff2",
  "assets/fonts/montserrat-cyrillic-700-normal.woff2",
  "assets/fonts/montserrat-latin-400-normal.woff2",
  "assets/fonts/montserrat-latin-600-normal.woff2",
  "assets/fonts/montserrat-latin-700-normal.woff2",
  "assets/fonts/oswald-cyrillic-300-normal.woff2",
  "assets/fonts/oswald-cyrillic-400-normal.woff2",
  "assets/fonts/oswald-latin-300-normal.woff2",
  "assets/fonts/oswald-latin-400-normal.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(SHELL.map((u) => new Request(u, { cache: "reload" }))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.includes("/assets/audio/")) return; // аудио — мимо кэша, напрямую в сеть

  // Списки участников и заданий: сначала сеть (чтобы правки доходили без смены версии), без сети — из кэша
  if (/\/(participants|tasks)\.json$/.test(url.pathname)) {
    e.respondWith(
      fetch(req).then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); return res; })
        .catch(() => caches.match(req, { ignoreSearch: true }))
    );
    return;
  }

  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then((hit) => {
      if (hit) return hit;
      return fetch(req).catch(() =>
        req.mode === "navigate" ? caches.match("index.html") : Response.error()
      );
    })
  );
});
