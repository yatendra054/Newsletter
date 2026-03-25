# AI Guidance - Newsletter Project

This file provides instructions and standards for AI agents interacting with this codebase.

## 🛠️ Build & Run Commands

### Backend (Flask)
- Create venv: `python -m venv venv`
- Activate venv: `venv\Scripts\activate` (Windows)
- Install: `pip install -r newsletter-backend/requirements.txt`
- Run: `python newsletter-backend/run.py`
- Migrations: `flask db migrate`, `flask db upgrade`

### Frontend (React/Vite)
- Install: `npm install` (within `newsletter-frontend`)
- Run: `npm run dev`
- Build: `npm run build`

## 📏 Coding Standards

- **Backend:**
    - Use Flask Blueprints for routing.
    - Decouple business logic into services (`app/services/`).
    - Use SQLAlchemy for all database interactions.
    - Follow PEP 8 style guidelines.
- **Frontend:**
    - Use functional components and hooks.
    - Keep components focused and modular under `src/components/` and `src/pages/`.
    - Use Vanilla CSS for styling.
    - Prefer `fetch` or a dedicated API module for network requests.

## 📁 Project Structure Conventions
- Backend logic: `newsletter-backend/app/`
- Frontend logic: `newsletter-frontend/src/`
- Documentation: Root `Readme.md`
