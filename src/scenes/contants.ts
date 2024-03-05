const STATION_CODE_SCENE_ID = "stationCode";

const
  RELAY = 0,
  LASER = 1,
  DODGE = 2,
  ESCAPE = 3;

const STATION_IDS = {
  MARIO: RELAY,
  LUIGI: LASER,
  PEACH: DODGE,
  TOAD: DODGE,
  YOSHI: ESCAPE,
  BOWSER: ESCAPE,
  DONKEY: ESCAPE,
  DAISY: ESCAPE,
};

const TEAM_PATHS = [
  [RELAY, DODGE, ESCAPE, LASER], // 1
  [LASER, RELAY, DODGE, ESCAPE], // 2
  [ESCAPE, LASER, RELAY, DODGE], // 3
  [DODGE, ESCAPE, LASER, RELAY], // 4
  [RELAY, DODGE, LASER, ESCAPE], // 5
  [DODGE, RELAY, LASER, ESCAPE], // 6
  [ESCAPE, DODGE, RELAY, LASER], // 7
  [LASER, DODGE, ESCAPE, RELAY], // 8
  [RELAY, ESCAPE, LASER, LASER], // 9
  [LASER, RELAY, LASER, ESCAPE], // 10
  [DODGE, ESCAPE, RELAY, LASER], // 11
  [ESCAPE, LASER, LASER, RELAY], // 12
  [RELAY, LASER, ESCAPE, DODGE], // 13
  [ESCAPE, RELAY, LASER, DODGE], // 14
  [LASER, ESCAPE, RELAY, DODGE], // 15
  [DODGE, LASER, ESCAPE, RELAY], // 16
];

const STATION_HINTS = {
  [RELAY]: "_In one place we gather to praise His name,\nPerformances and dancing fill this space\\._",
  [LASER]: "_I'm enclosed by wall,\nI surely am tall\\.\nI sound like a ball,\nBut im not that small\\.\nWhat am i?_",
  [DODGE]: "_Where hellos start and goodbyes end,\nBeyond here will friendships extend\\._",
  [ESCAPE]: "_Books, pencils, desks and more\\.\nWhere ideas bloom, and minds explore\\._",
};

export { STATION_CODE_SCENE_ID, TEAM_PATHS, STATION_IDS, STATION_HINTS };
