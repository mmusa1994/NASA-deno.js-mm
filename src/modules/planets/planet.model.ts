import { Model, DataTypes } from "../../deps.ts";
import { LaunchModel } from "../launches/launch.model.ts";

export class PlanetModel extends Model {
  static table = "planets";
  static timestamps = true;

  static fields = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kepler_name: DataTypes.STRING,
    koi_prad: DataTypes.STRING,
    koi_smass: DataTypes.STRING,
    koi_srad: DataTypes.STRING,
    koi_count: DataTypes.STRING,
    koi_steff: DataTypes.STRING,
  };
  static launches() {
    return this.hasMany(LaunchModel);
  }
}
