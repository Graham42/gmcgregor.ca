// This exists to delete the ServiceWorker cache of the old Gatsby site

self.addEventListener("install", function () {
  // Haven't tested if this this actually works, but if it doesn't then users
  // will have to close all browser tabs to my site and then reopen them to get
  // the update.
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          return caches.delete(cacheName);
        }),
      );
    }),
  );
});
