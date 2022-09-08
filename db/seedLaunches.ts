import { flatMap, log } from "../src/deps.ts";
import { Database, PostgresConnector } from "../src/deps.ts";
import { LaunchModel } from "../src/modules/launches/launch.model.ts";

const connection = new PostgresConnector({
  host: "localhost",
  username: "root",
  password: "root",
  database: "deno",
});

export const db = new Database(connection);

db.link([LaunchModel]);

log.info("Downloading launch data...");
const response = await fetch("https://api.spacexdata.com/v3/launches", {
  method: "GET",
});

if (!response.ok) {
  log.warning("Problem downloading launch data.");
  throw new Error("Launch data download failed.");
}

const launchData = await response.json();
for (const launch of launchData) {
  const payloads = launch["rocket"]["second_stage"]["payloads"];
  const customers = flatMap(payloads, (payload: any) => {
    return payload["customers"];
  });

  const cust = { customers };

  const flightData = {
    flightNumber: launch["flight_number"],
    mission: launch["mission_name"],
    rocket: launch["rocket"]["rocket_name"],
    launchDate: new Date(launch["launch_date_unix"]),
    upcoming: launch["upcoming"],
    success: launch["launch_success"],
  };

  await LaunchModel.create(flightData);
}
