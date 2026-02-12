/**
 * Fullscreen Enforcement Script
 *
 * Objectives:
 * 1. Request fullscreen on first interaction.
 * 2. Detect exit and attempt re-entry.
 * 3. Handle visibility changes and window focus.
 * 4. Provide invisible overlay for required user gestures.
 */

(function () {
  "use strict";

  const debug = false; // Set to true for console logs
  function log(msg) {
    if (debug) console.log("[Fullscreen]", msg);
  }

  // Configuration
  const RETRY_DELAY_MS = 1000;

  // State
  let isFullscreen = false;

  /**
   * Attempts to enter fullscreen mode.
   * Returns a promise that resolves if successful, rejects if failed.
   */
  function requestFullscreen() {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      return docEl.requestFullscreen();
    } else if (docEl.webkitRequestFullscreen) {
      /* Safari */
      return docEl.webkitRequestFullscreen();
    } else if (docEl.msRequestFullscreen) {
      /* IE11 */
      return docEl.msRequestFullscreen();
    }
    return Promise.reject(new Error("Fullscreen API not supported"));
  }

  /**
   * Checks if currently in fullscreen.
   */
  function checkFullscreenStatus() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  /**
   * Creates and shows an invisible overlay to capture user gesture.
   */
  function showOverlay() {
    if (document.getElementById("fullscreen-gesture-overlay")) return;

    log("Showing overlay for gesture");
    const overlay = document.createElement("div");
    overlay.id = "fullscreen-gesture-overlay";
    overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            z-index: 2147483647; /* Max z-index */
            background: transparent;
            cursor: pointer;
            touch-action: manipulation;
        `;

    // On click, attempt fullscreen and remove overlay
    const handleInteraction = (e) => {
      log("Overlay interaction");
      // Stop propagation so it doesn't trigger underlying elements immediately if unwanted,
      // but for a "transparent" feel, we might want to let it pass through?
      // Requirement says "invisible overlay/button if user gesture is required".
      // If we stop propagation, the user might click a button and it won't work, just fullscreen.
      // If we don't stop propagation, browser might block fullscreen if the event is consumed elsewhere?
      // Usually, fullscreen fits within the same event loop.

      // To be least intrusive: try to enter fullscreen.
      // If we are just an overlay to catch "any" click, we should probably remove ourselves after one attempt.

      enterFullscreen()
        .then(() => {
          removeOverlay();
        })
        .catch((err) => {
          log("Overlay fullscreen failed: " + err);
          // Keep overlay if it failed? Or retry?
          // If it failed on interaction, it might be denied content setting or error.
        });
    };

    // Handle both touch and click to be responsive
    overlay.addEventListener("click", handleInteraction);
    // overlay.addEventListener('touchstart', handleInteraction); // touchstart might not be considered a user gesture for fullscreen in some browsers, click is safer.

    document.body.appendChild(overlay);
  }

  function removeOverlay() {
    const overlay = document.getElementById("fullscreen-gesture-overlay");
    if (overlay) {
      log("Removing overlay");
      overlay.remove();
    }
  }

  /**
   * Main function to enforce fullscreen.
   */
  function enforce() {
    if (checkFullscreenStatus()) {
      isFullscreen = true;
      removeOverlay();
      return;
    }

    isFullscreen = false;
    log("Enforcing fullscreen...");

    requestFullscreen()
      .then(() => {
        log("Fullscreen entered successfully");
        isFullscreen = true;
        removeOverlay();
      })
      .catch((err) => {
        log("Fullscreen request failed or requires gesture: " + err);
        // If failed, show overlay to catch next gesture
        showOverlay();
      });
  }

  // --- Event Listeners ---

  // 1. Monitor fullscreen changes
  const fullscreenEvents = [
    "fullscreenchange",
    "webkitfullscreenchange",
    "mozfullscreenchange",
    "MSFullscreenChange",
  ];
  fullscreenEvents.forEach((event) => {
    document.addEventListener(event, () => {
      if (!checkFullscreenStatus()) {
        log("Exited fullscreen via system/user action");
        isFullscreen = false;
        // Immediately try to re-enter or show overlay
        // Short timeout to allow the browser to settle state
        setTimeout(enforce, 100);
      } else {
        isFullscreen = true;
        removeOverlay();
      }
    });
  });

  // 2. Window focus (alt-tab back)
  window.addEventListener("focus", () => {
    log("Window focused");
    setTimeout(enforce, 200);
  });

  // 3. Visibility change (tab switch / minimize)
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      log("Visibility: visible");
      setTimeout(enforce, 200);
    }
  });

  // 4. Initial Interaction - Global listener as backup
  // This runs on the capture phase to try and grab the first click anywhere
  document.addEventListener(
    "click",
    () => {
      if (!checkFullscreenStatus()) {
        enforce();
      }
    },
    { capture: true, once: false },
  ); // once: false to keep trying if it fails?
  // actually enforce() handles the logic.

  // 5. On Load
  window.addEventListener("load", () => {
    log("Window loaded");
    // Some browsers might allow fullscreen on load if installed PWA? Unlikely but worth a shot.
    // Usually fails without gesture.
    setTimeout(enforce, 500);
  });
})();
