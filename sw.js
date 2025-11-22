const CACHE_NAME = 'abbas-portfolio-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/style.min.css',
  '/script.js',
  '/manifest.json',
  '/img/Abbas Uddin Logo.webp',
  '/img/abbasuddin.webp',
];

// 1. INSTALL: Cache critical files immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching portfolio assets...');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. ACTIVATE: Clean up old caches 
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// 3. FETCH: Serve from Cache, fall back to Network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // If found in cache, return it
      if (cachedResponse) {
        return cachedResponse;
      }
      // Otherwise, fetch from network
      return fetch(event.request);
    })
  );
});