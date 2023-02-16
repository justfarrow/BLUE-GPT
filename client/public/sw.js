const cacheName = "LAD GPT";

const assets = [
  "../index.html",
  "../manifest.json",
  "../scripts.js",
  "../styles.css",
  "../assets/sounds/e.mp3",
  "../assets/bot.svg",
  "../assets/send.svg",
  "../assets/user.svg",
  "/lad-icon.png",
];

// Cache all the files to make a PWA
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      cache.addAll(assets);
    })
  );
});

// Our service worker will intercept all fetch requests
// and check if we have cached the file
// if so it will serve the cached file
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .open(cacheName)
      .then((cache) => cache.match(event.request, { ignoreSearch: true }))
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
