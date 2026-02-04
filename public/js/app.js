var log = new Log2textarea("logger");
let install_prompt = null;
let install_button = document.querySelector(".install_app");

window.onload = async function () {
  var registration = await register_sw();
  const button = document.querySelector("#send_message_button");
  if (button) {
    button.addEventListener("click", (event) => {
      const message = document.querySelector("#message_textarea").value;
      log.info("...App: " + message);
      registration.active.postMessage(message);
    });
  }
  navigator.serviceWorker.addEventListener("message", (event) => {
    log.info("...SW: " + event.data.msg);
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
