# Backend Integration (FastAPI)

The frontend talks to the backend only through `src/services/api.js`, which holds the configuration, token storage and HTTP client followed by every endpoint call. Every endpoint function has a mock branch and an API branch; flipping one environment variable switches the whole app from mock data to your FastAPI server.

## 1. Switch the frontend to the API

`frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:8000/api
VITE_USE_MOCK=false
```

Restart `npm run dev` after changing `.env`.

## 2. Allow the frontend origin (CORS)

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],   # add your deployed frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 3. Conventions the client expects

| Topic | Expectation |
|---|---|
| Base path | All routes below are relative to `VITE_API_BASE_URL` (e.g. `/api`). |
| Auth | Login/signup return `{ access_token, token_type: "bearer", user }`. The client stores the token and sends `Authorization: Bearer <token>` on every request. |
| Current user | `user = { id, name, email, role, institute, avatar_url }`, where `role` is `"trainee"`, `"trainer"` or `"admin"`. The role decides which portal opens. |
| Errors | Standard FastAPI errors: `{"detail": "message"}` or validation lists. The message is shown to the user (e.g. on the sign-in form). |
| 401 | Any 401 on an authenticated request signs the user out. |
| Request bodies | JSON, snake_case. |
| Dashboard responses | camelCase keys matching the mock data (see §5), because the UI components read those names directly. Use Pydantic `alias_generator=to_camel` with `populate_by_name=True`, or return dicts with these keys. |

## 4. Endpoints

### Auth — `api.js → authService`

| Method | Path | Body | Response |
|---|---|---|---|
| POST | `/auth/login` | `{ email, password, role }` | `{ access_token, token_type, user }` |
| POST | `/auth/signup` | `{ name, email, password, role, institute }` | `{ access_token, token_type, user }` |
| GET | `/auth/me` | — | `user` (used to restore a session on page load) |
| POST | `/auth/logout` | — | `204` |

### Trainee — `api.js → traineeService`

| Method | Path | Body | Used by |
|---|---|---|---|
| GET | `/trainee/dashboard` | — | All trainee pages (§5) |
| PATCH | `/trainee/notifications/{id}/read` | — | Notifications page |
| POST | `/trainee/booster-quiz` | `{ score }` | Booster quiz dialog |
| POST | `/attendance/check-in` | `{ method: "face" \| "qr" }` | Face ID attendance dialog |
| POST | `/trainee/career-applications` | `{ opportunity_id }` | Career opportunity dialog |

### Trainer — `api.js → trainerService`

| Method | Path | Body | Used by |
|---|---|---|---|
| GET | `/trainer/dashboard` | — | All trainer pages (§5) |
| POST | `/trainer/interventions` | `{ topic, trainees: [names], message, duration_minutes }` | Intervention wizard |
| POST | `/trainer/competency-claims/{id}/verify` | — | Competency verification |
| POST | `/trainer/notes` | `{ trainee_id, note_text }` | Trainee detail drawer |
| POST | `/trainer/announcements` | `{ message }` | Announcement dialog |
| POST | `/trainer/resources` | multipart: `title`, `file` (optional) | Upload resource dialog |

### Institution admin — `api.js → adminService`

| Method | Path | Body | Used by |
|---|---|---|---|
| GET | `/admin/dashboard?institute=` | — | All admin pages (§5) |
| POST | `/admin/programmes` | `{ title, code, seats }` | Create programme dialog |
| POST | `/admin/timetable/sessions` | `{ trainer, room, time_slot }` | Schedule session dialog |
| POST | `/admin/nominations/conflicts/{id}/resolve` | `{ resolution }` | Nomination conflict dialog |
| POST | `/admin/resource-requests` | `{ source_institute }` | Resource exchange dialog |

### Shared

| Method | Path | Body | Response | Service |
|---|---|---|---|---|
| POST | `/ai/chat` | `{ role, message, language }` | `{ reply, action_text?, action_modal?, action_tab?, evidence_badge? }` | `api.js → aiService` |
| POST | `/sync` | `{ records: [] }` | `{ synced, last_synced_at }` | `api.js → syncService` |

## 5. Dashboard payloads

Each dashboard endpoint returns one object. The exact field shapes are the mock files in `src/data/` — treat them as the response schema.

| Endpoint | Keys | Mock source |
|---|---|---|
| `GET /trainee/dashboard` | `trainee, hostelLogistics, nominationInfo, learningJourneyStages, courses, assessments, skills, aiRecommendation, closedLoopIntervention, certificates, attendance, careerOpportunities, careerReadiness, gamification, upcomingSchedule, notifications` | `data/mockData.js` |
| `GET /trainer/dashboard` | `trainer, batchHealth, priorityInsights, traineeRiskList, silentWeakSpots, interventions, topicHeatmap, competencyEvidenceClaims, trainerNotes` | `data/mockTrainerData.js` |
| `GET /admin/dashboard` | `admin, networkInstitutes, operationalSignals, demandSignals, programmeOperations, nominationConflicts, timetableSessions, hostelBlocks, hostelAllocations, logisticsChecklist, trainerCapacity, resourceExchange` | `data/mockAdminData.js` |

For example, `mockTrainee` in `mockData.js` is the shape of `trainee`, and `mockCourses` is the shape of `courses`.

Which dashboards are loaded after sign-in:

| Signed-in role | Loads | Why |
|---|---|---|
| trainee | trainee | — |
| trainer | trainer, trainee | Trainers can switch to the trainee view |
| admin | admin, trainer, trainee | Admins can switch persona |

If the primary dashboard fails, the user sees an error screen with **Try again**. Failures of the extra dashboards are logged to the console only.

## 6. Minimal FastAPI skeleton

```python
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import HTTPBearer
from pydantic import BaseModel

router = APIRouter(prefix="/api")
bearer = HTTPBearer()

class LoginIn(BaseModel):
    email: str
    password: str
    role: str

@router.post("/auth/login")
def login(body: LoginIn):
    user = authenticate(body.email, body.password, body.role)     # your logic
    if not user:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    return {"access_token": create_jwt(user), "token_type": "bearer", "user": user}

@router.get("/trainee/dashboard")
def trainee_dashboard(creds=Depends(bearer)):
    user = current_user(creds.credentials)                      # validate JWT, check role
    return build_trainee_dashboard(user)                          # keys as in §5
```

## 7. Where to change things

| To change | Edit |
|---|---|
| API base URL / mock switch | `.env` |
| A route path or request body | `src/services/api.js` (endpoint services) |
| Token storage, headers, error parsing, timeouts | `src/services/api.js` (top of the file) |
| Which data loads after sign-in | `src/hooks/useSystemInit.js` |
