## Overview

This is a Telegram Bot used to support an Amazing Race-like game.

This project uses the following stack:

<table>
<tr>
  <th>Language</th>
  <td>Typescript</td>
</tr>
<tr>
  <th>Node / npm Version</th>
  <td>>=18.18.2 / >=9.8.2</td>
</tr>
<tr>
  <th>Node Framework</th>
  <td>Express</td>
</tr>
<tr>
  <th>Container</th>
  <td>Docker</td>
</tr>
<tr>
  <th>Telegram Bot API Library</th>
  <td>Telegraf</td>
</tr>
<tr>
  <th>Deployment Platform</th>
  <td>FL0</td>
</tr>
</table>

## Getting Started

Clone this repo and do the following steps from the project root:

1. Create your own Telegram Bot using [BotFather](https://t.me/botfather) and save its API Token, click [here](https://core.telegram.org/bots/features#botfather) for the tutorial
2. Create a .env file at the root directory with the following variables:
```
ENV=test
PORT=3000
TELE_BOT_API_TOKEN=[Your Telegram Bot API Token]
```
3. Run `npm i`
4. Run `npm run start:dev`
5. Start using your Telegram Bot
6. You can locally update code while the bot is live
   - `nodemon` will hot-reload the bot for you

## License

This repository is [MIT licensed](LICENSE).
