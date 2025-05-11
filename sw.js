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
  'mObywatel 2.0_files/main.css',
  'mObywatel 2.0_files/main.js',

  // dashboard_files
  'dashboard_files/dashboard.css',
  'dashboard_files/dashboard.js',

  // documents_files
  'documents_files/documents.css',
  'documents_files/documents.js',

  // dowodnowy_files
  'dowodnowy_files/dowodnowy.css',
  'dowodnowy_files/dowodnowy.js',

  // more_files
  'more_files/more.css',
  'more_files/more.js',

  // qr_files
  'qr_files/qr.css',
  'qr_files/qr.js',

  // services_files
  'services_files/services.css',
  'services_files/services.js',

  // all your icons
  'icons/logo48.png',
  'icons/logo72.png',
  'icons/logo96.png',
  'icons/logo144.png',
  'icons/logo168.png',
  'icons/logo192.png',
  'icons/logo512.png'
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
