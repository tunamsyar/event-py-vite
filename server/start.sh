#!/bin/bash
set -e  # Exit on error

echo "🛠️ Running Alembic migrations..."
alembic upgrade head

echo "🚀 Starting FastAPI app with Uvicorn..."
exec uvicorn main:app --host 0.0.0.0 --port 8000 --proxy-headers --forwarded-allow-ips '*'
