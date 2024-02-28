const STATION_CODE_SCENE_ID = "stationCode";

const TEAM_PATHS = [
  [1, 2, 3, 0],
  [1, 2, 0, 3],
  [1, 3, 2, 0],
  [1, 3, 0, 2],
  [1, 0, 2, 3],
  [1, 0, 3, 2],
  [2, 1, 3, 0],
  [2, 1, 0, 3],
  [2, 3, 1, 0],
  [2, 3, 0, 1],
  [2, 0, 1, 3],
  [2, 0, 3, 1],
  [3, 1, 2, 0],
  [3, 1, 0, 2],
  [3, 2, 1, 0],
  [3, 2, 0, 1],
];

const STATION_IDS = {
  HALL: 0,
  CLASS: 1,
  AUDI: 2,
  LOUNGE: 3,
};

const STATION_HINTS = [
  "It's at Dining Hall",
  "It's at Classroom",
  "It's at Audi",
  "It's at Lounge",
];

export { STATION_CODE_SCENE_ID, TEAM_PATHS, STATION_IDS, STATION_HINTS };
