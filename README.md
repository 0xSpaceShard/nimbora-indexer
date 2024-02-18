# Nimbora Indexer
This service indexes the Nimbora Starknet contracts and stores the events in a Postgres database. The events are then exposed to the services through a Hasura graphql service.

This indexer indexes the following projects:
- Liquity
- YieldDex

### Add a new project
- Create a new module and rename it `nimbora-XXX` and then 
- Implements the `Service` interface.
- Add the schema inside the `[schema](src/schema/checkpoint/schema.gql)` file.
- Add writters to the `[config](src/config/checkpoint/config.json)` file.
- Add the new service to the [checkpoint](src/checkpoint/checkpoint.service.ts) service.
- And voila :)

## Installation

The first step is to install the necessary dependencies. This can be done by running the command yarn install in the terminal. This command reads the `package.json` file in the current directory and installs the required packages.

```bash
$ yarn install
```

### ENVs

Clone the `.env.example` file and rename it to `.env` updating its content according to your needs

## Running the app (local)

To start the indexer on your local machine run the following commands

1. Build the project
```bash
$ make dev-build
```

2. Start the services. The indexer used hot reload feature that allows you to develop using docker compose files.
```bash
$ make dev-up
```

3. After the services are up, go to `http://0.0.0.0:8080/console` and connect the hasura graphql to the database.
```sh
DATABASE_NAME=nimbora
DATABASE_URL=postgres://postgres:postgres@postgres:5432/nimbora
```

4. When you are done with the dev, stop the services using the following cmd:
```bash
$ make dev-down
```

## Test

**Unit tests:** You can run the unit tests by running the command yarn run test in the terminal. Unit tests are used to test individual components of the application in isolation.

```bash
# unit tests
$ yarn run test
```

**End-to-end tests:** You can run the end-to-end tests by running the command yarn run test:e2e in the terminal. End-to-end tests are used to test the application as a whole, from start to finish.

```Bash
# e2e tests
$ yarn run test:e2e

```

**Coverage**

```bash
# test coverage
$ yarn run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
