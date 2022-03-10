import React from 'react';

import { init } from '../../shared/utils/api.utils';
import store from '../../shared/store';
import { Provider } from 'react-redux';
import BoardsList from '../../board/components/BoardsList';

const App = () => {
    Notification.requestPermission((status) => {
        console.log('Notification permission status:', status);
    });

    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('service-worker.js')
            .then((registration) => {
              console.log('Service Worker is registered', registration);
              registration.showNotification('Hello there !');
            })
            .catch((err) => {
              console.error('Registration failed:', err);
            });
        });
      }

      function displayNotification() {
        Notification.requestPermission(function(result) {
          if (result === 'granted') {
            navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification('Vibration Sample', {
                body: 'Buzz! Buzz!',
                icon: '../images/touch/chrome-touch-icon-192x192.png',
                vibrate: [200, 100, 200, 100, 200, 100, 200],
                tag: 'vibration-sample'
              });
            });
          }
        });
      }

    init(store.store);

    return (
        <Provider store={store.store}>
            <BoardsList />
            <button onClick={displayNotification}>Test</button>
        </Provider>
    );
};

export default App;