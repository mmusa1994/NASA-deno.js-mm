import { Model } from "../../deps.ts";
import { LaunchModel } from "./launch.model.ts";

class LaunchRepository {
  async getAll(): Promise<LaunchModel[]> {
    return await LaunchModel.all();
  }

  async create(body: any): Promise<LaunchModel> {
    return await LaunchModel.create(body);
  }

  async delete(id: number): Promise<Model | Model[]> {
    return await LaunchModel.deleteById(id);
  }
}

export default new LaunchRepository();
