const CACHE_NAME = "pmbm-mtsn1-v1";
const STATIC_CACHE = "pmbm-static-v1";
const DYNAMIC_CACHE = "pmbm-dynamic-v1";

const STATIC_ASSETS = [
  "/",
  "/panitia",
  "/personil",
  "/jadwal",
  "/faq",
  "/kontak",
  "/manifest.webmanifest",
  "/favicon.png",
  "/apple-touch-icon.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
];

const NEVER_CACHE = [
  "https://pmbm-kanwilbanten.com",
  "https://www.google.com/maps",
  "chrome-extension://",
];

function shouldSkip(url) {
  return NEVER_CACHE.some((u) => url.startsWith(u));
}

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== STATIC_CACHE && k !== DYNAMIC_CACHE).map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const { request } = e;
  const url = request.url;

  if (request.method !== "GET") return;
  if (shouldSkip(url)) return;

  if (url.includes("/assets/") || url.includes("/icons/")) {
    e.respondWith(cacheFirst(request));
    return;
  }

  if (request.destination === "document") {
    e.respondWith(networkFirst(request));
    return;
  }

  e.respondWith(staleWhileRevalidate(request));
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(STATIC_CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    return new Response("Offline", { status: 503 });
  }
}

async function networkFirst(req) {
  try {
    const res = await fetch(req);
    if (res.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(req, res.clone());
    }
    return res;
  } catch {
    const cached = await caches.match(req);
    if (cached) return cached;
    const offline = await caches.match("/");
    return (
      offline ?? new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } })
    );
  }
}

async function staleWhileRevalidate(req) {
  const cache = await caches.open(DYNAMIC_CACHE);
  const cached = await cache.match(req);
  const fetchPromise = fetch(req)
    .then((res) => {
      if (res.ok) cache.put(req, res.clone());
      return res;
    })
    .catch(() => null);
  return cached ?? (await fetchPromise) ?? new Response("Offline", { status: 503 });
}

self.addEventListener("message", (e) => {
  if (e.data?.type === "SKIP_WAITING") self.skipWaiting();
});
