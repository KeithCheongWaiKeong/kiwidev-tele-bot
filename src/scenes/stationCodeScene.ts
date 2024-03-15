import { Composer, Markup, Scenes } from "telegraf";
import {
  STATION_CODE_SCENE_ID,
  STATION_HINTS,
  STATION_IDS,
  TEAM_PATHS,
} from "./contants";
import { message } from "telegraf/filters";

const lastTeamNumber = 16;
let teamPath: number[] = [];

const startStepHandler = new Composer<Scenes.WizardContext>();
startStepHandler.command("quit", async (ctx) => {
  await ctx
    .replyWithSticker(
      "CAACAgUAAxkBAAIEfWXuuAdt46bwKDAwk3mi3DzGQjQVAAIBBwACzMbiAmi6iojy_RarNAQ",
    )
    .then(() =>
      ctx.reply(
        "You can ask again using /hint",
        Markup.keyboard([["/hint", "/map"]])
          .oneTime()
          .resize(),
      ),
    );
  return ctx.scene.leave();
});
startStepHandler.on(message("text"), async (ctx) => {
  await ctx
    .reply("Enter your Team Number 🔢")
    .then(() =>
      ctx.reply(
        "You can stop looking for the hint anytime using /quit",
        Markup.keyboard(["/quit"]).oneTime().resize(),
      ),
    );
  return ctx.wizard.next();
});

const teamStepHandler = new Composer<Scenes.WizardContext>();
teamStepHandler.command("quit", async (ctx) => {
  await ctx
    .replyWithSticker(
      "CAACAgUAAxkBAAIEfWXuuAdt46bwKDAwk3mi3DzGQjQVAAIBBwACzMbiAmi6iojy_RarNAQ",
    )
    .then(() =>
      ctx.reply(
        "You can ask again using /hint",
        Markup.keyboard([["/hint", "/map"]])
          .oneTime()
          .resize(),
      ),
    );
  return ctx.scene.leave();
});
teamStepHandler.on(message("text"), async (ctx) => {
  const teamNumber = Number.parseInt(ctx.message.text);
  if (!Number.isInteger(teamNumber)) {
    await ctx
      .replyWithSticker(
        "CAACAgUAAxkBAAIErWXuvBGh-udKcFrVP_Jn3Z4ZHRgUAAJOBwACzMbiAqeL7jcpiHnGNAQ",
      )
      .then(() =>
        ctx.replyWithMarkdownV2(
          "Enter *only* your team number \\(e\\.g\\. 12\\)",
        ),
      )
      .then(() =>
        ctx.reply(
          "You can stop looking for the hint anytime using /quit",
          Markup.keyboard(["/quit"]).oneTime().resize(),
        ),
      );
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  if (teamNumber <= 0 || teamNumber > lastTeamNumber) {
    await ctx
      .replyWithSticker(
        "CAACAgUAAxkBAAIErWXuvBGh-udKcFrVP_Jn3Z4ZHRgUAAJOBwACzMbiAqeL7jcpiHnGNAQ",
      )
      .then(() =>
        ctx.reply(`Enter a correct team number (between 1-${lastTeamNumber})`),
      )
      .then(() =>
        ctx.reply(
          "You can stop looking for the hint anytime using /quit",
          Markup.keyboard(["/quit"]).oneTime().resize(),
        ),
      );
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  teamPath = TEAM_PATHS[teamNumber - 1];
  await ctx
    .replyWithMarkdownV2(
      "Enter your location code 🔠 \\(Say `START` if you want your first hint\\)",
    )
    .then(() =>
      ctx.reply(
        "You can stop looking for the hint anytime using /quit",
        Markup.keyboard(["/quit"]).oneTime().resize(),
      ),
    );
  return ctx.wizard.next();
});

const stationCodeStepHandler = new Composer<Scenes.WizardContext>();
stationCodeStepHandler.command("quit", async (ctx) => {
  await ctx
    .replyWithSticker(
      "CAACAgUAAxkBAAIEfWXuuAdt46bwKDAwk3mi3DzGQjQVAAIBBwACzMbiAmi6iojy_RarNAQ",
    )
    .then(() =>
      ctx.reply(
        "You can ask again using /hint",
        Markup.keyboard([["/hint", "/map"]])
          .oneTime()
          .resize(),
      ),
    );
  return ctx.scene.leave();
});
stationCodeStepHandler.on(message("text"), async (ctx) => {
  if (ctx.message.text.toUpperCase() === "START") {
    await ctx
      .reply("Your next hint is... 🤔")
      .then(() => ctx.replyWithMarkdownV2(STATION_HINTS[teamPath[0]]))
      .then(() =>
        ctx.reply(
          "The answer to this hint lies in /map 🗺️\nEnter /hint again to look for the next hint! 👍",
          Markup.keyboard([["/hint", "/map"]])
            .oneTime()
            .resize(),
        ),
      );
    return ctx.scene.leave();
  }

  const stationId: number = STATION_IDS[ctx.message.text.toUpperCase()] ?? -1;
  if (stationId === -1) {
    await ctx
      .replyWithSticker(
        "CAACAgUAAxkBAAIErWXuvBGh-udKcFrVP_Jn3Z4ZHRgUAAJOBwACzMbiAqeL7jcpiHnGNAQ",
      )
      .then(() => ctx.reply("Invalid code, please try again"))
      .then(() =>
        ctx.reply(
          "You can stop looking for the hint anytime using /quit",
          Markup.keyboard(["/quit"]).oneTime().resize(),
        ),
      );
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  const currentStation = teamPath.indexOf(stationId);
  if (currentStation === teamPath.length - 1) {
    await ctx
      .reply("You have cleared your last station!")
      .then(
        async () =>
          await ctx.replyWithSticker(
            "CAACAgUAAxkBAAIEoWXuum_wWaFj4JF6PS7GYdDMQ04pAAJVBwACzMbiAiAi4_oE2ZSYNAQ",
          ),
      )
      .then(async () => await ctx.reply("Thank you for playing! 🎉"));
    return ctx.scene.leave();
  }
  const nextStationHint = STATION_HINTS[teamPath[currentStation + 1]];
  await ctx
    .reply("Your next hint is... 🤔")
    .then(() => ctx.replyWithMarkdownV2(nextStationHint))
    .then(() =>
      ctx.reply(
        "The answer to this hint lies in /map 🗺️\nEnter /hint again to look for the next hint! 👍",
        Markup.keyboard([["/hint", "/map"]])
          .oneTime()
          .resize(),
      ),
    );
  return ctx.scene.leave();
});

const stationCodeScene = new Scenes.WizardScene(
  STATION_CODE_SCENE_ID,
  startStepHandler,
  teamStepHandler,
  stationCodeStepHandler,
);

export default stationCodeScene;
