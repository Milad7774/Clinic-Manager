// public/service-worker.js
const CACHE_NAME = 'clinic-manager-v1';
const urlsToCache = [
    '/Clinic-Manager/',
    '/Clinic-Manager/index.html',
    '/Clinic-Manager/static/js/main.chunk.js',
    '/Clinic-Manager/static/css/main.chunk.css'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});