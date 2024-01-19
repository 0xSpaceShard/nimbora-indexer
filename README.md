## Installation

The first step is to install the necessary dependencies. This can be done by running the command yarn install in the terminal. This command reads the package.json file in the current directory and installs the required packages.

```bash
$ yarn install
```

## Running the app (local)

# Setup

Clone the `.env.example` file and rename it to `.env` updating its content according to your needs

**Start database and GraphQL dependencies:** Before you can run the multi-indexer, you need to start its dependencies. This can be done by running the command make dev-up in the terminal.

```bash
# start database and GraphQL deps
$ make dev-up
```

**Development mode:** You can run the multi-indexer in development mode by running the command yarn run start in the terminal. This starts the application without any optimizations, which makes it easier to debug.

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev
```

**Production mode:** You can run the multi-indexer in production mode by running the command yarn run start:prod in the terminal. This starts the application with optimizations, which makes it faster and more efficient.

```bash
# production mode
$ yarn run start:prod
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
