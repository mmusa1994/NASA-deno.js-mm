import { Database, PostgresConnector, Relationships } from "../src/deps.ts";
import { LaunchModel } from "../src/modules/launches/launch.model.ts";
import { PlanetModel } from "../src/modules/planets/planet.model.ts";

const connection = new PostgresConnector({
  host: "localhost",
  username: "root",
  password: "root",
  database: "deno",
});

export const db = new Database(connection);

//Relationships.belongsTo(LaunchModel, PlanetModel);

db.link([PlanetModel, LaunchModel]);
