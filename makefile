include .env

checkpoint-gen:
	yarn checkpoint generate \
		-c src/config/checkpoint/poolingManager.json \
		-s src/schema/checkpoint/schema.gql && \
		rm -rf src/types/generated && \
		mkdir -p src/types/generated/ && \
		mv .checkpoint/** src/types/generated/

# Dev
dev-build: dev-down
	docker compose -f docker-compose-dev.yml build

dev-up: dev-down
	docker compose -f docker-compose-dev.yml up

dev-down:
	docker compose -f docker-compose-dev.yml down -v

# Prod
prod-build: prod-down
	docker compose -f docker-compose-prod.yml build

prod-up: prod-down
	docker compose -f docker-compose-prod.yml up

prod-down:
	docker compose -f docker-compose-prod.yml down -v