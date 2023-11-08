# Kiwidev Telegram Bot

## Overview

This is a Telegram Bot used to support an Amazing Race-like game.

This project uses the following stack:

| Stack               | Software   |
| ------------------- | ---------- |
| Language            | TypeScript |
| Framework           | Express    |
| Container           | Docker     |
| Database            | PostgreSQL |
| Bot API Library     | Telegraf   |
| Linter              | ESLint     |
| Formatter           | Prettier   |
| Deployment Platform | FL0        |

## Prerequisites

- Node: v18.18.2 or higher
- PostgresSQL: v16 or higher
- A Telegram Bot for testing

## Installing Prerequisite Software

### Node

It is recommended to use Node Version Manager (nvm) to install Node, but there are multiple ways to download Node:

- Windows
  - [nvm-windows](https://github.com/coreybutler/nvm-windows)
    - `nvm install 18 latest` or `nvm install lts`
    - `nvm use 18` or `nvm use lts`
  - [Chocolatey](https://chocolatey.org/)
    - `choco install nodejs-lts`
  - [website](https://nodejs.org/en)
    - Download and install any version later than or equal to Version 18
- Mac/Linux
  - [nvm](https://github.com/nvm-sh/nvm)
    - `nvm install 18 latest` or `nvm install lts`
    - `nvm use 18` or `nvm use lts`
  - [Homebrew](https://docs.brew.sh/Installation)
    - `brew install node@18` or `brew install node`
    - You can also install nvm via brew: `brew install nvm`
  - [website](https://nodejs.org/en)
    - Download and install any version later than or equal to Version 18

### PostgreSQL

Install PostgreSQL from the [website](https://www.postgresql.org/download/), I recommend to install [pgAdmin 4](https://www.pgadmin.org/download/) as well.

Create a local server for testing and save the connection URL in your local `.env` file. The URL should have the following layout: `postgresql://[username]:[password]@[host]:[port]/[database_name]`

If you're using default settings: `postgresql://postgres:[master_password]@localhost:5432/postgres`

### Telegram Bot

Create your own Telegram Bot using [BotFather](https://t.me/botfather) and save its API Token in your local `.env` file. The token should look like: `123456789:AbCdfGhIJKlmNoQQRsTUVwxyZ`

Here's a [tutorial](https://core.telegram.org/bots/features#botfather) in case you need some help.

## Getting Started

Create a `.env` file at the root directory with the following variables:

```dotenv
ENV=test
PORT=3000
DATABASE_URL=[Your PostgreSQL server URL]
TELE_BOT_API_TOKEN=[Your Telegram Bot API Token]
```

Use this command to install the Node packages:

```node
npm i
```

Use this command to initialise the database:

```node
npm run initialise-db
...
When '[nodemon] clean exit - waiting for changes before restart' appears in your console:
Exit nodemon using Ctrl+C
```

Use this command to run the bot locally:

```node
npm run start:dev
```

This project supports hot-reloading using `nodemon`, you can update your code while your bot is live!

## License

This repository is [MIT licensed](LICENSE).
