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
├── assets/                 Images and static files
├── components/             Reusable UI
│   ├── layout/             SiteHeader, SiteFooter, MainLayout, navConfig (navigation per role)
│   ├── dashboard/          Trainee dashboard cards
│   ├── trainer/            Trainer dashboard cards and drawers
│   ├── admin/              Admin status strip
│   ├── modals/             Dialogs (create programme, schedule session, attendance, …)
│   ├── ai/                 AI assistant drawers (one per role)
│   ├── certificate/        Digital certificate
│   ├── offline/            Sync centre
│   └── common/             Loading / error screen
├── context/
│   ├── AuthContext.jsx     Session: login, signup, logout, current user, token
│   ├── DataContext.jsx     Loads dashboard data for the signed-in role via Services
│   └── AppContext.jsx      UI state and actions (useApp) used across pages
├── Pages/
│   ├── Auth/               SignInPage
│   ├── Trainee/            12 pages (Overview, Learning, Assessments, …)
│   ├── Trainer/            11 pages (Overview, Batches, Attendance, …)
│   └── Admin/              16 pages (Overview, Programmes, Nominations, …)
├── Services/
│   ├── apiClient.js        Config (base URL, mock switch), token storage, fetch wrapper, FastAPI error handling
│   └── api.js              Every backend call: authService, traineeService, trainerService,
│                           adminService, aiService, syncService
├── utils/
│   ├── i18n.js             5 languages
│   ├── voiceAssistant.js
│   └── mock/               Mock data used until the backend is connected
├── App.jsx                 Providers + layout
├── App.css
├── index.css               Design system (Tailwind theme, tokens)
└── main.jsx                Entry point
```

## Data flow

```
Page / component ──useData()──► DataContext ──► Services/api.js ──► FastAPI  (or utils/mock)
Page / component ──useApp()───► AppContext  ──► Services/api.js ──► FastAPI  (actions: create, verify, sync…)
SignInPage ────────useApp().login ─► AuthContext ─► api.js authService ─► POST /auth/login
```

Components never call `fetch` directly; to connect the backend, only `Services/api.js` (and `.env`) change.

## Connecting FastAPI

See **[BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md)** for the endpoint contract, response shapes and CORS setup.
