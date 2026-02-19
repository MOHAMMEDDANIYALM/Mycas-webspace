# CollegeHub

Production-ready college management portal (student project) with role-based access.

## Monorepo structure

- `frontend/` - Next.js app (to be added in next phase)
- `backend/` - Express + MongoDB API (Phase 1 ready)
- `docker-compose.yml` - local MongoDB for development
- `.github/workflows/` - CI/CD workflows (to be added)

## Backend quick start

1. Go to backend folder:
   - `cd backend`
2. Install dependencies:
   - `npm install`
3. Copy env template:
   - `copy .env.example .env`
4. Fill `.env` values.
5. Start API in dev mode:
   - `npm run dev`

## Frontend quick start

1. Go to frontend folder:
   - `cd frontend`
2. Install dependencies:
   - `npm install`
3. Create local env file:
   - `copy .env.example .env.local`
4. Start frontend:
   - `npm run dev`

Frontend env:

- `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1`

Important:

- Backend `FRONTEND_ORIGIN` must match frontend URL exactly (`http://localhost:3000` in local).
- Frontend requests must include cookies for refresh token flow.

## Auth API endpoints

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/refresh`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me` (Bearer access token required)

## Timetable API endpoints (Phase 3)

- `GET /api/v1/timetable?classCode=BCA-SEM1` (all authenticated roles)
- `POST /api/v1/timetable` (teacher, promo_admin, super_admin)
- `PATCH /api/v1/timetable/:id` (teacher, promo_admin, super_admin)
- `DELETE /api/v1/timetable/:id` (teacher, promo_admin, super_admin)

Timetable notes:

- Basic conflict validation blocks overlapping events in the same `classCode`.
- Students get read-only calendar in dashboard.
- Teachers/admin roles can create, drag-drop/resize (update), and delete events.

## Email API endpoints (Phase 4)

- `POST /api/email/send-bulk` (teacher only)

Request body:

- `classId` (example: `BCA-SEM1`)
- `subject`
- `message`

SendGrid env required in `backend/.env`:

- `SENDGRID_API_KEY`
- `EMAIL_FROM` (verified sender)

Optional retry tuning:

- `SENDGRID_MAX_RETRIES` (default `3`, retries only on `429`)
- `SENDGRID_BASE_BACKOFF_MS` (default `500`, exponential backoff base)

Common Phase 4 issues:

- `401` usually means invalid SendGrid API key.
- `403` usually means sender identity in `EMAIL_FROM` is not verified in SendGrid.
- `429` means SendGrid rate limits are hit; system retries with exponential backoff and then marks failures if still limited.
- If students do not have `classId`/`classCode` saved, recipient list for that class will be empty.
