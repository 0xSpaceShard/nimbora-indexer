include .env

# Generate types
checkpoint-gen:
	rm -rf src/types/generated && mkdir -p src/types/generated/ && \
	yarn typechain && \
	yarn checkpoint generate \
		-c src/config/checkpoint/config.json \
		-s src/schema/checkpoint/schema.gql && \
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
	docker compose -f docker-compose.yml build

prod-up: prod-down
	docker compose -f docker-compose.yml up

prod-down:
	docker compose -f docker-compose.yml down -v

.PHONY: checkpoint-gen