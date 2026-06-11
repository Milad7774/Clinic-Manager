const CACHE_NAME = 'clinic-manager-v1';

const urlsToCache = [
  '/Clinic-Manager/',
  '/Clinic-Manager/index.html'
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
//Notifications

self.addEventListener('push', (event) => {
    let data = {};
  
    if (event.data) {
      data = event.data.json();
    }
  
    const options = {
      body: data.body || 'You have an appointment reminder',
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      vibrate: [200, 100, 200],
      data: {
        url: data.url || '/'
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title || 'Dentist App', options)
    );
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
  
    const urlToOpen = event.notification.data.url;
    event.waitUntil(
      clients.openWindow(urlToOpen)
    );
  });