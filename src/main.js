import { createApp } from "vue";
import "@picocss/pico/css/pico.css";
import "./css/app.css";
import "./js/app.js";
import App from "./App.vue";
//import './registerServiceWorker'

const app = createApp(App);

app.mount("#app");

let install_prompt = null;
let $install_button = document.querySelector(".install_app");

const worker = new Worker(new URL("./db.js", import.meta.url), {
  type: "module",
});
const $iniciarBaseDeDatos = document.querySelector("#btnIniciarBaseDeDatos"),
  $insertar = document.querySelector("#btnInsertar"),
  $obtener = document.querySelector("#btnObtener"),
  $nombre = document.querySelector("#nombre"),
  $fechaNacimiento = document.querySelector("#fechaNacimiento"),
  $contenedorPersonas = document.querySelector("#contenedorPersonas");

$insertar.addEventListener("click", () => {
  worker.postMessage([
    "insertar_persona",
    { nombre: $nombre.value, fechaNacimiento: $fechaNacimiento.value },
  ]);
});
$obtener.addEventListener("click", () => {
  worker.postMessage(["obtener_personas"]);
});
$iniciarBaseDeDatos.onclick = () => {
  worker.postMessage(["iniciar"]);
};
worker.onmessage = (evento) => {
  const accion = evento.data[0];
  const argumentos = evento.data[1];
  switch (accion) {
    case "iniciado":
      [$nombre, $fechaNacimiento, $insertar, $obtener].forEach(
        (elemento) => (elemento.disabled = false),
      );
      break;
    case "persona_insertada":
      console.log({ argumentos });
      break;
    case "personas_obtenidas":
      const personas = argumentos;
      $contenedorPersonas.innerHTML = "";
      for (const persona of personas) {
        $contenedorPersonas.innerHTML += `<strong>${persona.nombre}</strong> ${persona.fechaNacimiento}<br>`;
      }
      break;
  }
};

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("...pwa can be installed!");
  event.preventDefault();

  install_prompt = event;
  $install_button.classList.remove("is-hidden");
  $install_button.addEventListener("click", () => {
    console.log("...install app btn click");
    install_prompt.prompt();

    install_prompt.userChoice.then((choice_result) => {
      if (choice_result.outcome === "accepted") {
        console.log("User accepted the A2HS install app prompt");
      } else {
        console.log("User dismissed the A2HS install app prompt");
      }
      install_prompt = null;
      $install_button.classList.add("is-hidden");
    });
  });
});
