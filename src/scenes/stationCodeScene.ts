import { Composer, Scenes } from "telegraf";
import { STATION_CODE_SCENE_ID, STATION_HINTS, STATION_IDS, TEAM_PATHS } from "./contants";
import { message } from "telegraf/filters";

const lastTeamNumber = 16;
let teamPath: number[] = [];

const startStepHandler = new Composer<Scenes.WizardContext>();
startStepHandler.command("leave", async (ctx) => {
  await ctx.reply("Cancelling query");
  return ctx.scene.leave();
})
startStepHandler.on(message("text"), async (ctx) => {

  await ctx.reply("Enter your Team Number")
    .then(() => ctx.reply("You can leave the query anytime using /leave"));
  return ctx.wizard.next();
})

const teamStepHandler = new Composer<Scenes.WizardContext>();
teamStepHandler.command("leave", async (ctx) => {
  await ctx.reply("Cancelling query");
  return ctx.scene.leave();
});
teamStepHandler.on(message("text"), async (ctx) => {
  const teamNumber = Number.parseInt(ctx.message.text);
  if(!Number.isInteger(teamNumber)) {
    await ctx.reply("Enter only your team number (e.g. 12)")
    .then(() => ctx.reply("You can leave the query anytime using /leave"));
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  if(teamNumber <= 0 || teamNumber > lastTeamNumber) {
    await ctx.reply(`Enter a correct team number (between 1-${lastTeamNumber})`)
    .then(() => ctx.reply("You can leave the query anytime using /leave"));
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  teamPath = TEAM_PATHS[teamNumber-1];
  await ctx.reply("Enter your location code (HALL, CLASS, AUDI, LOUNGE)")
  .then(() => ctx.reply("You can leave the query anytime using /leave"));
  return ctx.wizard.next();
});

const stationCodeStepHandler = new Composer<Scenes.WizardContext>();
stationCodeStepHandler.command("leave", async (ctx) => {
  await ctx.reply("Cancelling query");
  return ctx.scene.leave();
});
stationCodeStepHandler.on(message("text"), async (ctx) => {
  const stationId: number = STATION_IDS[ctx.message.text.toUpperCase()] ?? -1;
  if(stationId === -1) {
    await ctx.reply("Invalid code, please try again")
    .then(() => ctx.reply("You can leave the query anytime using /leave"));
    return ctx.wizard.selectStep(ctx.wizard.cursor);
  }
  const currentStation = teamPath.indexOf(stationId);
  if(currentStation === teamPath.length - 1) {
    await ctx.reply("You have cleared your last station!")
    .then(() => ctx.reply("Thank you for playing!"));
    return ctx.scene.leave();
  };
  const nextStationHint = STATION_HINTS[teamPath[currentStation+1]];
  await ctx.reply("Your next hint is...")
  .then(() => ctx.reply(nextStationHint));
  return ctx.scene.leave();
})

const stationCodeScene = new Scenes.WizardScene(
  STATION_CODE_SCENE_ID,
  startStepHandler,
  teamStepHandler,
  stationCodeStepHandler
);

export default stationCodeScene;
