const CACHE_NAME = "ioseph-radio-cache-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/assets/logoR.jpg",
    "/assets/radio2.jpg",
    "https://stream.zeno.fm/b8swkaaaq9xuv"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Archivos en caché");
                return cache.addAll(urlsToCache);
            })
    );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log("Cache antiguo eliminado", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Interceptar solicitudes de red
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});
