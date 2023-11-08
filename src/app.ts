import * as express from "express";
import { Markup, Telegraf } from "telegraf";
import { Sequelize } from "sequelize-typescript";
import { message } from "telegraf/filters";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

const isLocal = process.env.ENV === "test";
const port = Number(process.env.PORT ?? 3000);
const url = process.env.URL;
const telegramBotToken = process.env.TELE_BOT_API_TOKEN;

const app = express();
const bot = new Telegraf(telegramBotToken);
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
});

try {
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

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

bot.start((ctx) => {
  ctx.reply(`Hello ${ctx.from.first_name}!`).then(() => {
    setTimeout(() => {
      ctx.reply("Welcome to the Tele Bot demo for Fearless Camp!").then(() => {
        setTimeout(() => {
          ctx
            .reply(
              "Right now, the demo will show buttons for you to press instead of replying by text.",
            )
            .then(() => {
              setTimeout(() => {
                ctx
                  .reply(
                    "This should to show you the rough flow of how Keith thinks a user in Fearless Camp would use this bot.",
                  )
                  .then(() => {
                    setTimeout(() => {
                      ctx.reply(
                        "To start, enter a Team Number.",
                        Markup.keyboard(["1"]).persistent().oneTime().resize(),
                      );
                    }, 1000);
                  });
              }, 1000);
            });
        }, 1000);
      });
    }, 1000);
  });
});

bot.hears("1", (ctx) => {
  ctx.reply(
    `Are you Team 1?`,
    Markup.keyboard(["Yes", "No"]).persistent().oneTime().resize(),
  );
});

bot.hears("Yes", (ctx) => {
  ctx.reply(
    `Please enter your team's Team Code.`,
    Markup.keyboard(["AAAAA"]).persistent().oneTime().resize(),
  );
});

bot.hears("No", (ctx) => {
  ctx.reply(
    `There's only Team 1, too bad. Please enter your team's Team Code`,
    Markup.keyboard(["AAAAA"]).persistent().oneTime().resize(),
  );
});

bot.hears("AAAAA", (ctx) => {
  ctx.reply("Verifying your Team Code...").then(() => {
    setTimeout(() => {
      ctx.reply("Verified!").then(() => {
        ctx
          .reply(
            `Welcome ${ctx.from.first_name} of Team 1 to THE FEARLESS RACE 2023! 🎉`,
          )
          .then(() => {
            ctx
              .reply(`[Fearless Race flavor text, instructions etc etc]`)
              .then(() => {
                ctx.reply(
                  "Here is your first riddle: What is brown and sticky?",
                  Markup.keyboard(["Stick"]).persistent().oneTime().resize(),
                );
              });
          });
      });
    }, 2000);
  });
});

bot.hears("Stick", (ctx) => {
  ctx.reply(`That's correct!`).then(() => {
    ctx.reply("Your next location is Amphitheatre").then(() => {
      ctx.reply(
        "Please enter /nextLocation when you are ready to move on to the next location.",
        Markup.keyboard(["/nextLocation"]).persistent().oneTime().resize(),
      );
    });
  });
});

bot.command("nextLocation", (ctx) => {
  ctx.reply("Good job on completing your Amphitheatre task!").then(() => {
    ctx.reply(
      `Please enter the location's Completion Code.`,
      Markup.keyboard(["AMPHI"]).persistent().oneTime().resize(),
    );
  });
});

bot.hears("AMPHI", (ctx) => {
  ctx.reply("Verifying your Completion Code...").then(() => {
    setTimeout(() => {
      ctx.reply("Verified!").then(() => {
        ctx.reply(
          "Here is your next riddle: What do you call a snowman throwing a tantrum?",
          Markup.keyboard(["Meltdown"]).persistent().oneTime().resize(),
        );
      });
    }, 2000);
  });
});

bot.hears("Meltdown", (ctx) => {
  ctx.reply(`That's correct!`).then(() => {
    ctx.reply("Your next location is the endpoint!").then(() => {
      ctx.reply(`You're almost at the end!`).then(() => {
        ctx.reply(`Go go go!`).then(() => {
          ctx.reply(
            `Please enter /endGame upon reaching the endpoint.`,
            Markup.keyboard(["/endGame"]).persistent().oneTime().resize(),
          );
        });
      });
    });
  });
});

bot.command("endGame", (ctx) => {
  ctx.reply("Congratulations on completing the Fearless Race!").then(() => {
    ctx
      .reply(
        `[More flavor text, final safety instructions, where to dismiss/hold the youths etc etc]`,
      )
      .then(() => {
        ctx.reply(`Hope you've enjoyed the Fearless Race 2023!`).then(() => {
          ctx
            .reply(
              `Please listen to your Team Teachers for any further instructions.`,
            )
            .then(() => {
              ctx.reply(`Goodbye for now!`).then(() => {
                ctx.replyWithSticker(
                  "CAACAgQAAxkBAAPFZUPSzrvr8RGiTmvj85nbCXsraEYAAlkSAALao5Us0aNrfJt1dvIzBA",
                );
              });
            });
        });
      });
  });
});

bot.help((ctx) => {
  ctx
    .reply(
      `In actuality, I think this command could be used to help users with the following:\n- Navigating the bot\n- Show the user's team progress\n- Show necessary contact info like medics, camp comm and tech support`,
    )
    .then(() => {
      ctx.reply(
        "But for now, here are all the replies and commands available in this demo.",
        Markup.keyboard([
          "/start",
          "1",
          "Yes",
          "No",
          "AAAAA",
          "Stick",
          "/nextLocation",
          "AMPHI",
          "Meltdown",
          "/endGame",
        ])
          .persistent()
          .oneTime()
          .resize(),
      );
    });
});

bot.on([message("text"), message("photo"), message("video")], (ctx) =>
  ctx.reply(
    "You have sent a reply that the demo does not know how to respond to. Type /start to start over again, type /help or ask Keith if you need any help with this demo.",
  ),
);

bot.on(message("sticker"), (ctx) =>
  ctx.reply(`Sticker id is: ${ctx.message.sticker.file_id}`),
);

app.listen(port, () => {
  console.log(`Express app listening on port ${port}...`);
});

if (isLocal) {
  console.log("Running Telegram Bot locally...");
  bot.launch();
}

// Graceful shutdown on stopping Node.js
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
