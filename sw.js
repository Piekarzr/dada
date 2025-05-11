// sw.js

const CACHE_VERSION = 'v1';
const CACHE_NAME    = `dada-cache-${CACHE_VERSION}`;

// === every single file in your repo ===
const URLS_TO_CACHE = [
  './',                // root
  'index.html',
  'dashboard.html',
  'documents.html',
  'dowodnowy.html',
  'more.html',
  'qr.html',
  'services.html',
  'manifest.json',
  'sw.js',

  // mObywatel 2.0_files
  'mObywatel 2.0_files/all.min.css',

  // dashboard_files
  'dashboard_files/css',

  // documents_files
  'documents_files/css',

  // dowodnowy_files
  'dowodnowy_files/css',
  'dowodnowy_files/dowodnowy.css',
  'dowodnowy_files/all.min.css',
  'dowodnowy_files/main.css',
  'dowodnowy_files/jquery-3.6.0.min.js',
  'dowodnowy_files/rozwijka.js',
  'dowodnowy_files/scale.js',
  'dowodnowy_files/sw.js',
  'dowodnowy_files/timenew.js',
  'dowodnowy_files/wybor.js',

  // more_files
  'more_files/css',

  // qr_files
  'qr_files/css',

  // services_files
  'services_files/css'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(URLS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request)
      .then(cached => {
        if (cached) return cached;
        return fetch(event.request).then(networkResponse => {
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME)
            .then(cache => cache.put(event.request, responseToCache));
          return networkResponse;
        });
      })
      .catch(() => caches.match('./index.html'))
  );
});
