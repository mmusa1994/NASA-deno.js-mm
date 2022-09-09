import { BufReader, join, parse, pick } from "../src/deps.ts";
import { Database, PostgresConnector } from "../src/deps.ts";
import { PlanetModel } from "../src/modules/planets/planet.model.ts";

const connection = new PostgresConnector({
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "deno",
});

export const db = new Database(connection);

db.link([PlanetModel]);

type Planet = Record<string, string>;

async function loadPlanetData() {
  const path = join("data", "kepler_exoplanets_nasa.csv");

  const file = await Deno.open(path);
  const bufReader = new BufReader(file);

  const result = await parse(bufReader, {
    skipFirstRow: true,
    comment: "#",
  });

  // Close file resource id (rid) to avoid leaking resources.
  Deno.close(file.rid);

  const planets = filterHabitablePlanets(result as Array<Planet>);

  return planets.map((planet) => {
    return pick(planet, [
      "kepler_name",
      "koi_prad",
      "koi_smass",
      "koi_srad",
      "koi_count",
      "koi_steff",
    ]);
  });
}

function filterHabitablePlanets(planets: Array<Planet>) {
  return planets.filter((planet) => {
    const planetaryRadius = Number(planet["koi_prad"]);
    const stellarRadius = Number(planet["koi_srad"]);
    const stellarMass = Number(planet["koi_smass"]);

    return (
      planet["koi_disposition"] === "CONFIRMED" &&
      planetaryRadius > 0.5 &&
      planetaryRadius < 1.5 &&
      stellarRadius > 0.99 &&
      stellarRadius < 1.01 &&
      stellarMass > 0.78 &&
      stellarMass < 1.04
    );
  });
}

const planets = await loadPlanetData();

await PlanetModel.create(planets);
