const app_name = "hello_pwa";

const assets = [
  "./",
  "./index.html",
  "./favicon.png",
  "./js/log2textarea.js",
  "./js/app.js",
  "./css/pico.css",
  "./css/app.css",
  "./img/spelltrainer_icon.png",
  "./img/spelltrainer_landing.png",
  "./img/spelltrainer_logo.png",
  "./img/screenshot.png",
];

self.addEventListener("install", (installEvent) => {
  self.skipWaiting();
  installEvent.waitUntil(
    caches.open(app_name).then((cache) => {
      return Promise.all(
        assets.map((file) =>
          cache
            .add(file)
            .catch((err) => console.error(`..failed to cache ${file}:`, err)),
        ),
      );
    }),
  );
});

self.addEventListener("activate", function (event) {
  //console.log('[Service Worker] Activating Service Worker ....', event);
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          //console.log('key: '+ key);
          if (key !== app_name && key !== app_name) {
            return caches.delete(key);
          }
        }),
      );
    }),
  );
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {});

self.addEventListener("sync", (e) => {
  if (e.tag === "sync-posts") {
    e
      .waitUntil
      // Code to send queued posts to the server
      //send_contact(),
      ();
  }
});

function send_contact() {
  console.log("...send_contact");
  // Implementation for sending queued posts to the server
  /*
  return fetch('/api/send-queued-posts', {
    method: 'POST',
    body: JSON.stringify({ posts: queuedPosts }),
    headers: {
      'Content-Type': 'application/json',
    },
    });
    */
}

self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: "/images/icon.png",
    badge: "/images/badge.png",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

addEventListener("message", (event) => {
  message(event);
});

async function message(event) {
  //console.log("...got message from App ");
  //console.log(event.data);
  const client = await self.clients.get(event.source.id);
  const response = event.data.split("").reverse().join("");
  client.postMessage({ msg: response });
}
