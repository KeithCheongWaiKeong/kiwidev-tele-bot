import { Sequelize } from "sequelize-typescript";
import * as DBConstants from "./DBConstants.json";
import Team from "./models/team.model";
import Location from "./models/location.model";
import Path from "./models/path.model";

require("dotenv").config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  models: [__dirname + "/models"],
});

try {
  console.log("Authenticating connection...");
  sequelize.authenticate().then(() => {
    console.log("Connection has been established successfully.");
    console.log("Initialising DB Models...");

    sequelize.sync({ force: true }).then(() => {
      console.log("Initialising DB Data...");
      const { teams, locations, paths } = DBConstants;

      teams.forEach((value) => {
        const team = new Team({ ...value, currentPath: 0, isOnRiddle: true });
        team.save();
      });

      locations.forEach((value) => {
        const location = new Location(value);
        location.save();
      });

      paths.forEach((value) => {
        const path = new Path({
          teamNumber: value.teamNumber,
          route: JSON.stringify(value.route),
        });
        path.save();
      });
    });
  });
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
