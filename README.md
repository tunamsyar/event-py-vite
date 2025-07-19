# 📅 Event Management Web App

This is a full-stack Event Management Web App built with React (TypeScript) on the frontend and FastAPI on the backend, with PostgreSQL as the database. It enables users to create, filter, and manage events efficiently.

🔧 Key Features
✅ Event Creation: Users can submit new events via a dynamic form with validation and error handling.

🔍 Filter/Search Events: Filter events by name, location, and date using URL query parameters.

📅 Date Handling: Uses datetime-local inputs and proper parsing in both frontend and backend.

💾 PostgreSQL Integration: Relational database design with unique constraints and indexing for performance.

🚀 Deployment on Railway: Fully deployed and tested on Railway with automatic builds.

🐳 Docker & Makefile Support: Easily spin up the full environment with docker-compose and make.


🚀 **Deployed on [Railway](https://railway.app/)**

---

## 🧱 Tech Stack

- **Backend:** FastAPI, Pydantic, SQLAlchemy
- **Frontend:** React, TypeScript, Tailwind CSS
- **Database:** PostgreSQL
- **Containerization:** Docker & Docker Compose
- **Deployment:** Railway

---

## 🐳 Local Development Setup

### 1. Prerequisites

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Make](https://www.gnu.org/software/make/)

### 2. Clone the Repository

```bash
git clone https://github.com/your-username/event-management-app.git
cd event-management-app
```

### 3. Environment Configuration
Create a .env file at the project root:

```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=event_db
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/event_db
```

### 4. Start the App
```bash
make up
```

Access:

Backend API: http://localhost:8000/docs

Frontend: http://localhost:3000

### 🛠️ Development Commands
Command	Description
```bash
make up	Start all containers
make down	Stop containers
make restart	Restart all containers
make docker-frontend  Start Docker Frontend
make docker-backend  Start Docker Backend
make bash	Enter backend container
make build	Build Docker images
make logs	Tail container logs
make frontend-dev	Run frontend in local dev mode
make prune Docker prune
```

### ⚙️ Project Structure
```bash
.
├── client/             # React app
├── server/             # FastAPI app
├── docker-compose.yml
├── Makefile
└── README.md
└── test.csv
```

### 🚀 Deployment
This project is deployed on Railway

[https://stellar-sparkle-production.up.railway.app/]()


📄 License
MIT License. Feel free to use and extend.
