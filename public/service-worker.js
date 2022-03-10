// I'm a new service worker

self.addEventListener('install', event => {
  console.log('Service worker installing...');
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  console.log('Service worker activating...');
});

self.addEventListener('fetch', event => {
  console.log('Inside the fetch event listener !');

  event.waitUntil(
    this.registration.showNotification('Hello', {
      body: 'Hello world !'
    })
  )

  console.log('After the wait until !');

  console.log('Fetching:', event.request.url);
});