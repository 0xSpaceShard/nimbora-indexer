## Installation

```bash
$ yarn install
```

## Running the app (local)

```bash
# start database and GraphQL deps
$ make dev-up

# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Docker

```bash
# Build the multi-indexer image
docker build -t multi-indexer .

# Run docker compose
make prod-up
```

## License

Nest is [MIT licensed](LICENSE).
