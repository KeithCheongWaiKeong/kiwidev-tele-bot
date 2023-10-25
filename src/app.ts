import * as express from "express";
import { Telegraf } from "telegraf";
import { message } from 'telegraf/filters'

require('dotenv').config();

const isLocal = process.env.ENV === 'test';
const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;

const app = express();
const bot = new Telegraf(telegramBotToken);

if (!isLocal) {
  console.log('Setting up Telegram Bot Webhook...');
  app.use(bot.webhookCallback('/'));
  bot.telegram.setWebhook(url);
}

console.log('Implementing Telegram bot logic...');

bot.start((ctx) => {
  ctx.reply(`
  Hello ${ctx.from.first_name}!\nWelcome to Keith's pilot Tele Bot!\nYou can use /help and /hello, type something or send a photo/video.`);
})

bot.help((ctx) => ctx.reply('Have you tried turning it off and on again?'));

bot.command('hello', (ctx) => ctx.reply('Hello again!'));

bot.on(message('text'), (ctx) => ctx.reply(`You have sent: ${ctx.message.text}... Not really helpful at this point`));

bot.on(message('photo'), (ctx) => ctx.reply('It looks... okay'));

bot.on(message('video'), (ctx) => ctx.reply('What... do I do with this?'));

app.listen(port, () => {
  console.log(`Express app listening on port ${port}...`);
});

if (isLocal) {
  bot.launch().then(() => {
    console.info(`The bot ${bot.botInfo.username} is running locally`);
  });
}

// Graceful shutdown on stopping Node.js
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
