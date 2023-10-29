import * as express from "express";
import { Telegraf } from "telegraf";
import { Sequelize } from "sequelize-typescript";
import { message } from "telegraf/filters";

require('dotenv').config();

const isLocal = process.env.ENV === 'test';
const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;

const app = express();
const bot = new Telegraf(telegramBotToken);
const sequelize = new Sequelize(process.env.DATABASE_URL, { dialect: 'postgres'});

try {
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
  });
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

if (!isLocal) {
  console.log('Removing old Telegram Bot Webhook...');
  bot.telegram.setWebhook('').then(() => {
    console.log('Setting up new Telegram Bot Webhook...');
    app.use(bot.webhookCallback('/'));
    bot.telegram.setWebhook(url);
  }).finally(() => {
    console.log('Telegram Bot webhook established...')
  });
}

console.log('Implementing Telegram bot logic...');

bot.start((ctx) => {
  ctx.reply(`
  Hello ${ctx.from.first_name}!\nWelcome to Keith's pilot Tele Bot!\nYou can use /help and /hello, type something or send a photo/video.`);
})

bot.help((ctx) => ctx.reply('Have you tried turning it off and on again?'));

bot.command('hello', (ctx) => ctx.reply('Hello again!'));

bot.command('testcommand', (ctx) => ctx.reply('Good job in finding this command, now stay away from it.'))

bot.on(message('text'), (ctx) => ctx.reply(`You have sent: ${ctx.message.text}... Well, you said something!`));

bot.on(message('photo'), (ctx) => ctx.reply('It looks... okay'));

bot.on(message('video'), (ctx) => ctx.reply('What... do I do with this?'));

app.listen(port, () => {
  console.log(`Express app listening on port ${port}...`);
});

if (isLocal) {
  console.log('Running Telegram Bot locally...')
  bot.launch();
}

// Graceful shutdown on stopping Node.js
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
