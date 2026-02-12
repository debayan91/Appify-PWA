/**
 * Launcher Script
 * Handles the transition from PWA launch to the external target.
 *
 * Strategy:
 * 1. Allow the app to boot (renders shell, registers SW).
 * 2. Wait for a short duration to ensure "app-like" behavior is registered by the OS/Browser.
 * 3. Perform a hard navigation to the target URL.
 */

const TARGET_URL = "https://youtube.com";
const LAUNCH_DELAY_MS = 2000;

export const initLauncher = () => {
  console.log(
    `[Launcher] App initialized. Scheduled navigation to ${TARGET_URL} in ${LAUNCH_DELAY_MS}ms.`,
  );

  setTimeout(() => {
    console.log("[Launcher] Navigating now...");
    window.location.href = TARGET_URL;
  }, LAUNCH_DELAY_MS);
};
