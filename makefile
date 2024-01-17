include .env

checkpoint-gen:
	yarn checkpoint generate \
		-c src/config/checkpoint/poolingManager.json \
		-s src/schema/checkpoint/schema.gql && \
		rm -rf src/types/generated && \
		mkdir -p src/types/generated/ && \
		mv .checkpoint/** src/types/generated/

dev-build: dev-down
	docker compose -f docker-compose.yml build

dev-up: dev-down
	docker compose -f docker-compose.yml up

dev-down:
	docker compose -f docker-compose.yml down -v