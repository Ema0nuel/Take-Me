import { precacheAndRoute } from 'workbox-precaching'
import { registerRoute } from 'workbox-routing'
import { CacheFirst, NetworkFirst } from 'workbox-strategies'
import { ExpirationPlugin } from 'workbox-expiration'

// Use the injected manifest
precacheAndRoute(self.__WB_MANIFEST)

// Cache page navigations
registerRoute(
    ({ request }) => request.mode === 'navigate',
    new NetworkFirst({
        cacheName: 'pages',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50
            })
        ]
    })
)

// Cache JavaScript and CSS
registerRoute(
    ({ request }) =>
        request.destination === 'script' ||
        request.destination === 'style',
    new NetworkFirst({
        cacheName: 'static-resources'
    })
)

// Cache images
registerRoute(
    ({ request }) => request.destination === 'image',
    new CacheFirst({
        cacheName: 'images',
        plugins: [
            new ExpirationPlugin({
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
            })
        ]
    })
)

// Handle service worker installation
self.addEventListener('install', () => {
    self.skipWaiting()
})

// Handle service worker activation
self.addEventListener('activate', (event) => {
    event.waitUntil(clients.claim())
})

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
    event.notification.close();

    const notificationData = event.notification.data;
    let urlToOpen = new URL('/', self.location.origin).href;

    // Handle different notification actions
    if (event.action === 'view' && notificationData.noteId) {
        urlToOpen = new URL(`/#/notes/${notificationData.noteId}`, self.location.origin).href;
    }

    event.waitUntil(
        clients.matchAll({ type: 'window' }).then(windowClients => {
            // Check if there is already a window/tab open with the target URL
            for (let client of windowClients) {
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            // If no window/tab is open, open a new one
            return clients.openWindow(urlToOpen);
        })
    );
});