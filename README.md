# Appify

Lightweight Progressive Web App (PWA) shell that opens external websites in standalone mode, removing browser chrome to provide a native app–like experience.

The project controls installation, launch behavior, and fullscreen presentation while the browser engine handles networking, authentication, storage, and rendering.

---

## Features

* Installable to home screen
* Standalone / fullscreen display
* No URL bar or tab interface
* Immediate navigation to target site
* Minimal assets for fast startup
* Reuses existing cookies and permissions
* Mobile-first design

---

## Concept

This application is not a browser.
It is a thin launcher that hands off control to the host browser.

```
User opens app
-> PWA shell boots
-> Navigation to external website
-> Browser takes over
```

---

## How It Works

**Manifest**
Defines installability, icons, theme color, and standalone display so the app launches without visible browser UI.

**Service Worker**
Caches the minimal static resources required to start the shell quickly.

**Index**
Performs the boot sequence and redirects to the configured external URL.

---

## Installation

1. Deploy the project.
2. Open it in a supported browser.
3. Choose **Install / Add to Home Screen**.
4. Launch it like a native app.

---

## Use Cases

* Kiosk-style deployments
* Dedicated site launchers
* Enterprise portals
* Focused content delivery
* Converting web experiences into app entries

---

## License

MIT

---
