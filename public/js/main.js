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
              install_button.classList.add("is-hidden");
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

function isRunningStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in window.navigator && window.navigator.standalone)
  );
}

function safari() {
  if (!isRunningStandalone()) {
    const prompt = document.createElement("div");
    prompt.innerHTML = `
    <p>Add this app to your home screen for easy access!</p>
    <p>Tap the Share button <img src="share_icon.png" alt="Share Icon" width="20"> and then select "Add to Home Screen".</p>
  `;
    prompt.style.cssText = `
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background-color: #f0f0f0;
    padding: 10px;
    text-align: center;
    z-index: 1000; /* Ensure it's on top */
  `;
    document.body.appendChild(prompt);
  }
}
