# Newsletter Application

A full-stack newsletter management system featuring a Flask backend and a React frontend. This application allows users to subscribe to updates and provides administrators with a dashboard to create and send email campaigns.

## 🚀 Features

### For Users
- **Easy Subscription:** A clean, simple form to join the newsletter using your name and email.
- **Automated Welcome:** Receive an instant "Welcome" email immediately after subscribing.
- **Manage Subscription:** Built-in functionality to unsubscribe at any time.
- **Campaign Insights:** Browse and view detailed content of past and current newsletter campaigns.

### For Admins
- **Campaign Dashboard:** A centralized view of all created campaigns, including status and publishing dates.
- **Rich Content Creation:** Create professional campaigns with custom subjects, preview text, and full HTML content.
- **Automated Delivery:** Automatically trigger bulk email delivery to all active subscribers as soon as a campaign is created.
- **Manual Control:** Flexibility to manually resend campaigns or delete outdated ones.

## 🛠️ Tech Stack

### Backend
- **Framework:** [Flask](https://flask.palletsprojects.com/) (Python)
- **Database:** [SQLAlchemy](https://www.sqlalchemy.org/) (ORM) with [Flask-Migrate](https://flask-migrate.readthedocs.io/) for effortless database versioning.
- **Email:** Core SMTP integration for reliable and scalable email delivery.
- **CORS:** Pre-configured for secure and seamless communication with the React frontend.
- **Environment Management:** [python-dotenv](https://github.com/theskumar/python-dotenv) for secure configuration.

### Frontend
- **Library:** [React](https://react.dev/) (powered by [Vite](https://vitejs.dev/) for high performance).
- **Routing:** [React Router](https://reactrouter.com/) for fluid, client-side navigation.
- **Styling:** Custom, responsive Vanilla CSS designed for a professional user experience.
- **State Management:** Modern React hooks (`useState`, `useEffect`) and context-aware logic.

## ✅ What I Have Done

- **Critical Bug Fixes:** Resolved "405 Method Not Allowed" API errors and fixed circular dependency issues in the backend structure.
- **Robust Database Architecture:** Designed and implemented the `Subscriber` and `Campaign` models with optimized queries.
- **Email Service Engineering:** Developed a dedicated `campaign_service.py` and `email_service.py` to handle bulk SMTP delivery efficiently.
- **RESTful API Development:** Built a complete set of endpoints for subscriber management and campaign CRUD operations.
- **Frontend UI/UX:** Built a responsive, modern frontend from scratch, including Home, Admin Dashboard, and Campaign Detail pages.
- **Process Automation:** Integrated automated triggers for "Welcome" emails and bulk campaign distributions upon publication.

## ⚙️ Setup Instructions

### Backend Setup
1.  **Navigate:** `cd newsletter-backend`
2.  **Environment:** `python -m venv venv`
3.  **Activate:** `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4.  **Install:** `pip install -r requirements.txt`
5.  **Configure:** Create a `.env` file in the `app/` directory with `MAIL_USERNAME`, `MAIL_PASSWORD`, `DATABASE_URL`, and `SITE_URL`.
6.  **Database:** `flask db upgrade`
7.  **Run:** `python run.py`

### Frontend Setup
1.  **Navigate:** `cd newsletter-frontend`
2.  **Install:** `npm install`
3.  **Run:** `npm run dev`

---
