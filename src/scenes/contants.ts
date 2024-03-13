const STATION_CODE_SCENE_ID = "stationCode";

const
  RELAY = 0,
  LASER = 1,
  DODGE_ONE = 2,
  DODGE_TWO = 3,
  ESCAPE_ONE = 4,
  ESCAPE_TWO = 5,
  ESCAPE_THREE = 6,
  ESCAPE_FOUR = 7;

const STATION_IDS = {
  KNIGHT: RELAY,
  NINJA: LASER,
  ARCHER: DODGE_ONE,
  RANGER: DODGE_TWO,
  SAMURAI: ESCAPE_ONE,
  LANCER: ESCAPE_TWO,
  SWORDSMAN: ESCAPE_THREE,
  GUARD: ESCAPE_FOUR,
};

const TEAM_PATHS = [
  [RELAY, DODGE_ONE, ESCAPE_ONE, LASER], // 1
  [LASER, RELAY, DODGE_ONE, ESCAPE_ONE], // 2
  [ESCAPE_ONE, LASER, RELAY, DODGE_ONE], // 3
  [DODGE_ONE, ESCAPE_ONE, LASER, RELAY], // 4
  [RELAY, DODGE_ONE, LASER, ESCAPE_TWO], // 5
  [DODGE_ONE, RELAY, LASER, ESCAPE_THREE], // 6
  [ESCAPE_TWO, DODGE_TWO, RELAY, LASER], // 7
  [LASER, DODGE_TWO, ESCAPE_TWO, RELAY], // 8
  [RELAY, ESCAPE_TWO, DODGE_ONE, LASER], // 9
  [LASER, RELAY, DODGE_TWO, ESCAPE_FOUR], // 10
  [DODGE_TWO, ESCAPE_THREE, RELAY, LASER], // 11
  [ESCAPE_THREE, LASER, DODGE_TWO, RELAY], // 12
  [RELAY, LASER, ESCAPE_THREE, DODGE_ONE], // 13
  [ESCAPE_FOUR, RELAY, LASER, DODGE_TWO], // 14
  [LASER, ESCAPE_FOUR, RELAY, DODGE_TWO], // 15
  [DODGE_TWO, LASER, ESCAPE_FOUR, RELAY], // 16
];

const STATION_HINTS = {
  [RELAY]: "_In one place we gather to praise His name,\nPerformances and dancing fill this space\\._",
  [LASER]: "_Through the door, tummies growl\\.\nOut the door, feeling whole\\._",
  [DODGE_ONE]: "_Where hellos start and goodbyes end,\nBeyond here will friendships extend\\. \\(\\#1\\)_",
  [DODGE_TWO]: "_Where hellos start and goodbyes end,\nBeyond here will friendships extend\\. \\(\\#2\\)_",
  [ESCAPE_ONE]: "_Books, pencils, desks and more\\.\nWhere ideas bloom, and minds explore\\. \\(\\#1\\)_",
  [ESCAPE_TWO]: "_Books, pencils, desks and more\\.\nWhere ideas bloom, and minds explore\\. \\(\\#2\\)_",
  [ESCAPE_THREE]: "_Books, pencils, desks and more\\.\nWhere ideas bloom, and minds explore\\. \\(\\#3\\)_",
  [ESCAPE_FOUR]: "_Books, pencils, desks and more\\.\nWhere ideas bloom, and minds explore\\. \\(\\#4\\)_",
};

export { STATION_CODE_SCENE_ID, TEAM_PATHS, STATION_IDS, STATION_HINTS };
