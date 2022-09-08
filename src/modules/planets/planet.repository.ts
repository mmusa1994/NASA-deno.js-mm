import { PlanetModel } from "./planet.model.ts";

class PlanetRepository {
  async getAll(): Promise<PlanetModel[]> {
    return await PlanetModel.all();
  }
  async getById(id: number): Promise<PlanetModel> {
    return await PlanetModel.find(id);
  }
}

export default new PlanetRepository();
