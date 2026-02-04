var log = new Log2textarea("logger", "...loading PSI");
let install_prompt = null;
let install_button = document.querySelector(".install_app");

window.onload = async function () {
  var registration = await register_sw();
  const button = document.querySelector("#send_message");
  console.log(button);
  if (button) {
    button.addEventListener("click", (event) => {
      log.info("...button send_message clicked");
      log.info("...send message to SW");
      registration.active.postMessage("Hello from App");
    });
  }

  navigator.serviceWorker.addEventListener("message", (event) => {
    log.info("...received message from SW: " + event.data.msg);
  });
};

// Register Service Worker
const register_sw = async () => {
  if ("serviceWorker" in navigator) {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
      });
      if (registration.installing) {
        log.info("...service worker installing");
      } else if (registration.waiting) {
        log.info("...service worker installed");
      } else if (registration.active) {
        log.info("...service worker active");

        const refresh_btn = document.querySelector(".refresh");
        refresh_btn.addEventListener("click", () => {
          log.info("...update service worker registered");
          registration.unregister().then((boolean) => {
            window.location.reload(true);
          });
        });

        window.addEventListener("beforeinstallprompt", (event) => {
          log.info("...pwa can be installed!");
          event.preventDefault();
          install_prompt = event;
          install_button.classList.remove("is-hidden");
          install_button.addEventListener("click", () => {
            log.info("...install app btn click");
            install_prompt.prompt();

            install_prompt.userChoice.then((choice_result) => {
              if (choice_result.outcome === "accepted") {
                log.info("User accepted the A2HS install app prompt");
              } else {
                log.info("User dismissed the A2HS install app prompt");
              }
              install_prompt = null;
            });
          });
        });

        return registration;
      }
    } catch (error) {
      log.info(`Registration failed with ${error}`);
    }
  }
};
