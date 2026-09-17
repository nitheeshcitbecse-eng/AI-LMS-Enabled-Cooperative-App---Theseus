# NCCT Connect — Frontend

React (JavaScript) + Vite + Tailwind CSS. Three role-based portals — **Trainee**, **Trainer**, **Institution Admin** — behind one sign-in page, with a services layer ready for a FastAPI backend.

## Run

```bash
npm install
cp .env.example .env      # optional; defaults to mock data
npm run dev               # http://localhost:5173
npm run build             # production build in dist/
```

With `VITE_USE_MOCK=true` (the default) the app runs entirely on local mock data and any email/password signs in; the role dropdown decides which portal opens.

## Project structure

```
src/
├── assets/                     Images and static files
├── components/                 Reusable UI
│   ├── dashboard/              Trainee dashboard cards
│   ├── trainer/                Trainer dashboard cards and drawers
│   ├── admin/                  Admin status strip
│   ├── modals/                 Dialogs (create programme, schedule session, attendance, …)
│   ├── ai/                     AI assistant drawers (one per role)
│   ├── certificate/            Digital certificate
│   ├── offline/                Sync centre
│   └── common/                 Loading / error screen
├── context/
│   └── SystemStateContext.jsx  Global state: useAuth() session, useData() dashboards, useApp() UI state and actions
├── data/                       Mock data used until the backend is connected (also the response schema)
│   ├── mockData.js             Trainee
│   ├── mockTrainerData.js      Trainer
│   └── mockAdminData.js        Institution admin
├── hooks/
│   ├── useApi.js               Loading / error / data state for any services call
│   └── useSystemInit.js        Boots the app: restores the session, loads dashboards for the role
├── layouts/                    MainLayout, SiteHeader, SiteFooter, navConfig (navigation per role)
├── pages/
│   ├── Auth/                   SignInPage
│   ├── NotFound/               404 page
│   ├── Trainee/                12 pages (Overview, Learning, Assessments, …)
│   ├── Trainer/                11 pages (Overview, Batches, Attendance, …)
│   └── Admin/                  16 pages (Overview, Programmes, Nominations, …)
├── routes/
│   ├── AppRoutes.jsx           Route tree and guards (signed-out, signed-in, role access)
│   └── routePaths.js           Every URL, per role
├── services/
│   └── api.js                  Config, token storage, HTTP client and every backend call:
│                               authService, traineeService, trainerService, adminService, aiService, syncService
├── utils/
│   ├── i18n.js                 5 languages
│   └── voiceAssistant.js
├── App.jsx                     Router + SystemStateProvider
├── App.css
├── index.css                   Design system (Tailwind theme, tokens)
└── main.jsx                    Entry point
```

## Data flow

```
useSystemInit ──► services/api.js ──► FastAPI (or src/data)      session restore + dashboard load
Page / component ──useData()──► SystemStateContext                dashboard data
Page / component ──useApp()───► SystemStateContext ──► services/api.js   actions: create, verify, sync…
SignInPage ────────useApp().login ─► api.js authService ─► POST /auth/login
```

Components never call `fetch` directly; to connect the backend, only `services/api.js` (and `.env`) change.

## Connecting FastAPI

See **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** for the endpoint contract, response shapes and CORS setup.
