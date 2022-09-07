import { AppDataSource } from "../config/db";
import { Stats } from "../entities/Stats";
import { Repository } from "typeorm";

class StatRepository {
  repository: Repository<Stats>;

  constructor() {
    this.repository = AppDataSource.getRepository(Stats);
  }

  create(): Stats {
    return this.repository.create();
  }

  async save(stats: Stats): Promise<Stats> {
    return await this.repository.save(stats);
  }

  async findById(id: string): Promise<Stats> {
    return await this.repository.findOneBy({ id });
  }
}

export const statRepository = new StatRepository();
