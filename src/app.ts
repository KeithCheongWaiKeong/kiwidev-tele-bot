import * as express from "express";
import { Input, Markup, Scenes, Telegraf, session } from "telegraf";
import { message } from "telegraf/filters";
import stationCodeScene from "./scenes/stationCodeScene";
import { STATION_CODE_SCENE_ID } from "./scenes/contants";

require("dotenv").config();

const isLocal = process.env.ENV === "test";
const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;

const app = express();
const bot = new Telegraf<Scenes.WizardContext>(telegramBotToken);
const stage = new Scenes.Stage<Scenes.WizardContext>([stationCodeScene]);
bot.use(session());
bot.use(stage.middleware());

if (!isLocal) {
  console.log("Removing old Telegram Bot Webhook...");
  bot.telegram
    .setWebhook("")
    .then(() => {
      console.log("Setting up new Telegram Bot Webhook...");
      app.use(bot.webhookCallback("/"));
      bot.telegram.setWebhook(url);
    })
    .finally(() => {
      console.log("Telegram Bot webhook established...");
    });
}

console.log("Implementing Telegram bot logic...");

bot.start(async (ctx) => {
  await ctx
    .reply(`Hello ${ctx.from.first_name}!`)
    .then(async () => await ctx.reply("I am the Fearless Camp Telegram Bot!"))
    .then(
      async () =>
        await ctx.reply(
          "You can use me the hint for your next location or get a map of ACSI.",
        ),
    )
    .then(
      async () =>
        await ctx.reply(
          `Enter /hint to get your next station hint\nEnter /map for the map of ACSI`,
          Markup.keyboard(["/hint", "/map"]).oneTime().resize(),
        ),
    );
});

bot.command("hint", (ctx) => ctx.scene.enter(STATION_CODE_SCENE_ID));

bot.command("map", (ctx) =>
  ctx.replyWithPhoto(Input.fromURL("https://ibb.co/7SP7pFy")),
);

bot.help(async (ctx) => {
  await ctx.reply(
    `Enter /hint to get your next station hint\nEnter /map for the map of ACSI`,
    Markup.keyboard(["/hint", "/map"]).persistent().oneTime().resize(),
  );
});

bot.on(message("sticker"), (ctx) =>
  ctx.reply(`Sticker id is: ${ctx.message.sticker.file_id}`),
);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}...`);
});

bot.launch();

// Graceful shutdown on stopping Node.js
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
