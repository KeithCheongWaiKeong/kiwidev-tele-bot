import * as express from "express";
import { join } from "path";
import { Telegraf } from "telegraf";

require('dotenv').config();

const isLocal = process.env.ENV === 'test';
const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;

const app = express();
const bot = new Telegraf(telegramBotToken);

// app.use(express.static(join(__dirname, "public")));

if (!isLocal) {
  app.use(async () => await bot.createWebhook({ domain: url }));
  // bot.telegram.setWebhook(`${url}/bot${telegramBotToken}`);
}

bot.start((ctx) => {
  ctx.reply(`
  Hello ${ctx.from.first_name}!\nWelcome to Keith's pilot Tele Bot!\nYou can use /help and /hello, type something or send a photo.`);
})

bot.help((ctx) => ctx.reply("I don't really want to..."));

bot.command('hello', (ctx) => ctx.reply('Hello again!'));

bot.on('text', (ctx) => ctx.reply(`You have sent: ${ctx.message.text}`));

bot.on('photo', (ctx) => ctx.reply('You look... okay'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

if (isLocal) {
  bot.launch({
    webhook:{
      domain: url,
      port+1
    }
  }).then(() => {
    console.info(`The bot ${bot.botInfo.username} is running on server`);
  });
} else {
  bot.launch().then(() => {
    console.info(`The bot ${bot.botInfo.username} is running locally`);
  });
}

// Graceful shutdown on stopping Node.js
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
