import { DataTypes, Model } from "../../deps.ts";
import { PlanetModel } from "../planets/planet.model.ts";

export class LaunchModel extends Model {
  static table = "launches";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    flightNumber: DataTypes.INTEGER,
    mission: DataTypes.STRING,
    rocket: DataTypes.STRING,
    launchDate: DataTypes.DATETIME,
    upcoming: DataTypes.BOOLEAN,
    success: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    target: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  };
  static planet() {
    return this.hasOne(PlanetModel);
  }
}
