import { useEffect } from "react";

// when transitioning from previous frameworks, exiting service workers can
// cause issues. See also public/sw.js which completes the solution.
export function useUnregisterAllServiceWorkers() {
  useEffect(() => {
    async function unregisterAll() {
      if (!navigator?.serviceWorker?.getRegistrations) return;
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map((registration) => registration.unregister()),
        );
      } catch (err) {
        console.log(
          "something went wrong removing the existing service worker:",
          err,
        );
      }
    }
    unregisterAll();
  }, []);
}
