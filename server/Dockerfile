FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y build-essential libpq-dev

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Copy start script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Set entrypoint
ENTRYPOINT ["/app/start.sh"]
