// src/serviceWorkerRegistration.js

export function register() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register(process.env.PUBLIC_URL + "/service-worker.js")
          .then((registration) => {
            console.log("Service Worker registered");
  
            registration.update();
  
            registration.onupdatefound = () => {
              const installingWorker = registration.installing;
  
              if (!installingWorker) return;
  
              installingWorker.onstatechange = () => {
                if (
                  installingWorker.state === "installed" &&
                  navigator.serviceWorker.controller
                ) {
                  console.log("New version found. Reloading...");
  
                  navigator.serviceWorker.addEventListener(
                    "controllerchange",
                    () => {
                      window.location.reload();
                    }
                  );
  
                  installingWorker.postMessage({
                    type: "SKIP_WAITING",
                  });
                }
              };
            };
          })
          .catch((err) => {
            console.error("Service Worker registration failed:", err);
          });
      });
    }
  }
  
  export function unregister() {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.unregister();
      });
    }
  }