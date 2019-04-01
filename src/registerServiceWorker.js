/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
// https://stackoverflow.com/questions/51214220/vue-cli-3-how-to-use-the-official-pwa-plugin-service-worker
// https://github.com/vuejs/vue-cli/issues/1481

import { register } from 'register-service-worker';

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready(registration) {
      console.log('Service worker is active.');
    },
    registered(registration) {
      console.log('Service worker has been registered.');
    },
    cached(registration) {
      console.log('Content has been cached for offline use.');
    },
    updatefound(registration) {
      console.log('New content is downloading.');
    },
    updated(registration) {
      console.log('New content is available; please refresh.');
      const worker = registration.waiting;
      worker.postMessage({ action: 'skipWaiting' });
    },
    offline() {
      console.log('No internet connection found. App is running in offline mode.');
    },
    error(error) {
      console.error('Error during service worker registration:', error);
    },
  });
}
