import { Telegraf } from "telegraf";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const telegramBotToken = process.env.TELE_BOT_API_TOKEN;
const bot = new Telegraf(telegramBotToken);

bot.start((ctx) => {
  ctx.reply(`Hello ${ctx.from.first_name}!`);
  ctx.reply("Welcome to Keith's pilot Tele Bot!");
  ctx.reply("You can use /help and /hello, type something or send a photo.");
})

bot.help((ctx) => ctx.reply("I don't really want to..."));

bot.command('hello', (ctx) => ctx.reply('Hello again!'));

bot.on('text', (ctx) => ctx.reply(`You have sent: ${ctx.message.text}`));

bot.on('photo', (ctx) => ctx.reply('You look... okay'));

bot.launch();

// Graceful shutdown on stopping Node.js
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));