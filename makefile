dev-build:
	docker compose -f docker-compose-dev.yml build
dev-up:
	docker compose -f docker-compose-dev.yml up
dev-down:
	docker compose -f docker-compose-dev.yml down

prisma-gen:
	npx prisma generate

prisma-mig:
	npx prisma migrate dev

connect:
	psql -U admin apibara
