BACKEND=server
FRONTEND=client
DB=postgres

# Docker Compose Commands
up:
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

restart:
	$(MAKE) down
	$(MAKE) up

docker-frontend:
	docker compose up -d $(FRONTEND)

docker-backend:
	docker compose up -d $(BACKEND)

logs:
	docker compose logs -f

bash:
	docker compose exec $(BACKEND) bash

psql:
	docker compose exec $(DB) psql -U postgres

frontend-dev:
	cd $(FRONTEND) && npm install && npm run dev

# Clean Docker artifacts
prune:
	docker system prune -f
