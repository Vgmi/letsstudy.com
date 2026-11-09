# Let'sStudy

<p align="center">
  <img src="icon.svg" width="92" alt="Let'sStudy logo">
</p>

<h3 align="center">Work clearly. Learn continuously.</h3>
<p align="center">A calm, lightweight workspace for planning tasks, capturing real work, and protecting your focus.</p>

<p align="center">
  <a href="https://vgmi.github.io/letsstudy.com/">🌐 Open the web app</a> ·
  <a href="https://github.com/Vgmi/letsstudy.com/releases/latest/download/Let'sStudy-Windows.zip">⬇️ Download for Windows</a> ·
  <a href="https://github.com/Vgmi/letsstudy.com/releases/latest/download/letsstudy-android.apk">📱 Download Android APK</a>
</p>

> **Note:** Windows and Android links use the latest GitHub Release assets. A release is created automatically when a version tag (`v1.0.0`, for example) is pushed. Until the first release is published, use the web app and install it from your browser’s **Install app** button.

## What is Let'sStudy?

Let'sStudy brings planned work and real work together in one focused space:

| Feature | Why it helps |
| --- | --- |
| **Today's tasks** | Keep the next important actions visible without overwhelming your day. |
| **Daily work log** | Record what actually happened, including progress that was never a task. |
| **Focus room** | Start a 25-minute session and build momentum with a simple timer. |
| **Progress summary** | See completion and open work at a glance. |
| **Offline-ready PWA** | Use the app on desktop or mobile, even when your connection is unreliable. |
| **Private by default** | Your tasks and logs stay in this browser using local storage. |

## Get started

1. Open the [web app](https://vgmi.github.io/letsstudy.com/).
2. Add a task with **Add task**.
3. Capture your progress in **Daily work log**.
4. Start a focus session when you are ready to do the work.

The current build is a fast, no-account MVP. Data is saved locally in the browser. Multi-device sync, accounts, shared workspaces, and AI features belong to the next product phase.

## Run locally

No build step is required:

```bash
git clone https://github.com/Vgmi/letsstudy.com.git
cd letsstudy.com
python3 -m http.server 8080
```

Then open <http://localhost:8080>. A local server is required for the service worker and installable PWA behaviour.

## Release downloads

Push a version tag to package the app:

```bash
git tag v1.0.0
git push origin v1.0.0
```

GitHub Actions packages a portable Windows ZIP and builds the Android APK from the hosted PWA, then attaches both to the GitHub Release.

## Product direction

The long-term Let'sStudy vision is a secure work operating system for students, developers, freelancers, professionals, and teams. Planned phases include persistent accounts, projects and subtasks, calendar planning, notes and knowledge, analytics, collaboration, and permission-aware AI assistance.

## License

This project is maintained by [Vgmi](https://github.com/Vgmi).
