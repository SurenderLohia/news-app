importScripts('./node_modules/workbox-sw/build/workbox-sw.js');

const staticAssets = [
  './',
  './css/main.css',
  './css/bulma.css',
  './css/basscss.css',
  './js/main.js',
  './fallback.json',
  './images/fetch-dog.jpg'
];

workbox.precaching.precacheAndRoute(staticAssets);

workbox.routing.registerRoute(
  new RegExp('^https://newsapi.org(.*)'),
  new workbox.strategies.NetworkFirst()
);

workbox.routing.registerRoute(
  // Cache image files.
  /\.(?:png|jpg|jpeg|svg|gif)$/,
  // Use the cache if it's available.
  new workbox.strategies.CacheFirst({
    // Use a custom cache name.
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        // Cache only 20 images.
        maxEntries: 20,
        // Cache for a maximum of a week.
        maxAgeSeconds: 7 * 24 * 60 * 60,
      })
    ],
  })
);
