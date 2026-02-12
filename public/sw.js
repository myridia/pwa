const app_name = "hello_pwa";
importScripts("sqlite3.js");

const assets = [
  "./",
  "./index.html",
  "./favicon.png",
  "./js/log2textarea.js",
  "./js/main.js",
  "./sqlite3.js",
  "./sqlite3.wasm",
  "./css/pico.css",
  "./css/app.css",
  "./img/icon.png",
  "./img/landing.png",
  "./img/logo.png",
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
  event.waitUntil(initDB());
  return self.clients.claim();
});

//self.addEventListener("fetch", (e) => {});

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

self.addEventListener("message", (event) => {
  message(event);
});

async function message(event) {
  //console.log("...got message from App ");
  //console.log(event.data);
  const client = await self.clients.get(event.source.id);
  const response = event.data.split("").reverse().join("");
  await insertarPersona(event.data, "12");
  const personas = await obtenerPersonas();
  console.log(personas);
  client.postMessage({ msg: response });
}

async function initDB() {
  console.log("...start slqite3");
  self.sqlite3InitModule().then((sqlite3) => {
    console.log(sqlite3.version);

    if ("opfs" in sqlite3) {
      db = new sqlite3.oo1.OpfsDb("hello_pwa.db");
      console.log(
        "OPFS is available, created persisted database at",
        db.filename,
      );
    } else {
      db = new sqlite3.oo1.DB("hello_pwa.db", "ct");
      console.log(
        "OPFS is not available, created transient database",
        db.filename,
      );
    }

    db.exec(`CREATE TABLE IF NOT EXISTS people(
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				age TEXT NOT NULL)`);
  });
}

const insertarPersona = async (nombre, fechaNacimiento) => {
  const filas = await db.exec({
    sql: "INSERT INTO people(name, age) VALUES (?, ?) RETURNING *",
    bind: [nombre, fechaNacimiento],
    returnValue: "resultRows",
    rowMode: "object",
  });
  return filas[0];
};
const obtenerPersonas = async () => {
  return await db.exec({
    sql: "SELECT id, name, age FROM people",
    returnValue: "resultRows",
    rowMode: "object",
  });
};
