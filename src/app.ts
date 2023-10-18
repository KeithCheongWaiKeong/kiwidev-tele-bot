import { Telegraf } from "telegraf";

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;
const bot = new Telegraf(telegramBotToken);

if (process.env.NODE_ENV === 'production') {
  bot.telegram.setWebhook(`${url}/bot${telegramBotToken}`);
}

bot.start((ctx) => {
  ctx.reply(`Hello ${ctx.from.first_name}!`);
  ctx.reply("Welcome to Keith's pilot Tele Bot!");
  ctx.reply("You can use /help and /hello, type something or send a photo.");
})

bot.help((ctx) => ctx.reply("I don't really want to..."));

bot.command('hello', (ctx) => ctx.reply('Hello again!'));

bot.on('text', (ctx) => ctx.reply(`You have sent: ${ctx.message.text}`));

bot.on('photo', (ctx) => ctx.reply('You look... okay'));

if(process.env.NODE_ENV === 'production') {
  bot.launch({
    webhook:{
        domain: url,
        port
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