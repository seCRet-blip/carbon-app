# Carbon Credit Assessment Platform

A proof-of-concept web app for landowners who want a first-pass answer to a simple question: **is this land likely eligible for carbon credits?**

Upload photos of a property, and an AI model returns an eligibility prediction with a confidence score. The product is aimed at New Zealand land use — forestry, pastoral, and conservation — and is built as a full frontend from authentication through to assessment results.

This repo is a portfolio piece. The walkthrough below is for employers and reviewers; setup instructions are at the bottom if you want to run it.

---

## What it does

1. **Sign up / log in** — email and password accounts through Firebase Auth, with Formik + Yup validation (password strength, confirmation match, and login error handling).
2. **Dashboard** — a carbon management portal: assessment stats, portfolio summary, recent activity, and a short getting-started guide.
3. **Upload & assess** — drag-and-drop land photos; the app sends them to a prediction API and shows whether the land is eligible, plus confidence and class probabilities.
4. **Map (built in)** — Leaflet map with New Zealand location search via OpenStreetMap Nominatim, for tying assessments to a place.

The assessment looks at what the photos show: vegetation coverage, terrain, land use, and water features — the things that drive carbon sequestration potential.

---

## Why I built it

Carbon credit eligibility is usually slow, expert-led, and hard for landowners to approach. This POC explores a faster path: **photo in, model out**, so someone can get a directional answer before they spend time on a full survey.

It was a chance to ship a real product slice — auth, a dashboard, file upload, an external ML API, and map/search — rather than a single isolated component.

---

## Tech stack

| Area | Tools |
| --- | --- |
| UI | React 19, TypeScript, Vite, Material UI |
| Auth & data | Firebase Authentication, Cloud Firestore |
| Forms | Formik, Yup |
| Maps | Leaflet, React Leaflet, OpenStreetMap Nominatim |
| Charts | Recharts |
| CI | GitHub Actions — install, TypeScript check, and production build on every PR |

Secrets stay out of source. Firebase config and the prediction API key/URL are read from `VITE_*` environment variables.

---

## Architecture

```
Browser (React + MUI)
   │
   ├─ Firebase Auth ──────── sign up, login, session
   ├─ Cloud Firestore ────── project data store
   └─ Prediction API ─────── POST land images → eligibility + confidence
```

The frontend lives in `carbon-poc/`. Auth state is observed with `onAuthStateChanged`, then the app switches between login/signup and the authenticated shell (sidebar + dashboard or upload view).

---

## What a reviewer will see

- Typed React with feature-based components (`auth/`, `dashboard/`, upload, map)
- Client-side validation and Firebase error mapping on login
- File upload UX: drag-and-drop, previews, loading and result states
- Environment-based config so keys and personal endpoints are not committed
- PR build check in `.github/workflows/pr-build-check.yml`

---

## Local setup

You only need this section if you want to run the app.

### Prerequisites

- Node.js 18+ and npm
- A [Firebase](https://console.firebase.google.com/) project with **Authentication** (email/password) enabled
- Optional: a prediction API that accepts `multipart/form-data` and an `X-API-Key` header. Without it, auth and the dashboard still work; image analysis will fail until an endpoint is set.

### 1. Clone and install

```bash
git clone <this-repo-url>
cd carbon-app/carbon-poc
npm install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in `.env` (values stay local — `.env` is gitignored):

| Variable | Purpose |
| --- | --- |
| `VITE_FIREBASE_API_KEY` | Firebase web API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | e.g. `your-project.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Cloud Messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | Analytics measurement ID (optional) |
| `VITE_API_KEY` | Header key for the prediction API |
| `VITE_API_ENDPOINT` | Full predict URL, e.g. `https://host.example/predict` |

Firebase values come from **Project settings → Your apps → SDK setup and configuration**.

### 3. Run

```bash
npm run dev
```

Vite prints a local URL (usually `http://localhost:5173`). Create an account on the signup screen, then use **Upload & Assess** to try an image.

### Other scripts

```bash
npm run build    # production build (TypeScript + Vite)
npm run lint     # ESLint
npm run preview  # serve the production build locally
```

---

## Project layout

```
carbon-app/
├── .github/workflows/     CI build check on pull requests
├── carbon-poc/            React app
│   ├── config/            Firebase init (env-driven)
│   ├── src/auth/          Login and signup
│   ├── src/components/    Dashboard, upload, map, sidebar
│   └── .env.example       Required env keys (no secrets)
└── README.md
```
