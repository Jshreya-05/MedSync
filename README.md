# MedSync

Hospital coordination platform — ICU monitoring, emergency alerts, resource exchange, and AI predictions.

## Stack

| Layer | Technology |
|-------|------------|
| Web dashboard | React + Vite + TypeScript |
| Mobile (later) | React Native |
| API | FastAPI (Python) |
| Database / Auth | Supabase |
| ML (later) | Python (`ml-engine/`) |

## Project structure

```
MedSync/
├── frontend-react/      # Hospital command dashboard
├── backend-fastapi/     # REST API + ML orchestration
├── supabase/            # SQL migrations
├── ml-engine/           # Prediction models (Phase 5)
└── mobile-react-native/ # Mobile app (Phase 2+)
```

## Quick start

### 1. Backend

```bash
cd backend-fastapi
python -m venv .venv
.venv\Scripts\activate          # Windows
pip install -r requirements.txt
copy .env.example .env
uvicorn app.main:app --reload
```

API docs: http://127.0.0.1:8000/docs

### 2. Frontend

```bash
cd frontend-react
npm install
npm run dev
```

Dashboard: http://localhost:5173

The Vite dev server proxies `/api` and `/health` to the FastAPI backend.

### 3. Supabase (Phase 3)

1. Create a project at [supabase.com](https://supabase.com).
2. Run `supabase/migrations/001_initial_schema.sql` in the SQL editor.
3. Copy URL and keys into `backend-fastapi/.env`.

## Development phases

1. **UI** — React dashboard (current)
2. **API** — FastAPI routes with mock data (current)
3. **Supabase** — Auth, database, storage
4. **Realtime** — Live ICU and alert streams
5. **ML** — ICU overload and shortage predictions

## API endpoints (stub)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Service health |
| GET | `/api/hospitals` | List hospitals |
| GET | `/api/alerts` | List alerts |
| POST | `/api/alerts` | Create alert |
