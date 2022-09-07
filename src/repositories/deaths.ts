import { AppDataSource } from "../config/db";
import { Death } from "../entities/Death";
import { Repository, SelectQueryBuilder } from "typeorm";
import { GameName } from "../types/domain/GameName";

class DeathRepository {
  repository: Repository<Death>;
  query: SelectQueryBuilder<Death>;

  constructor() {
    this.repository = AppDataSource.getRepository(Death);
  }

  create(): Death {
    return this.repository.create();
  }

  async save(death: Death): Promise<Death> {
    return this.repository.save(death);
  }

  async countByActiveAttempt(): Promise<number> {
    return await this.repository
      .createQueryBuilder("death")
      .leftJoin("death.attempt", "attempt")
      .where("attempt.active = true")
      .andWhere("attempt.gameName = :gameName", {
        gameName: GameName.INCLEMENT_EMERALD,
      })
      .andWhere("death.deleted = false")
      .getCount();
  }

  async findAllByActiveAttempt(): Promise<Array<Death>> {
    return await this.repository
      .createQueryBuilder("death")
      .leftJoin("death.attempt", "attempt")
      .innerJoinAndSelect("death.encounter", "encounter")
      .where("attempt.active = true")
      .andWhere("attempt.gameName = :gameName", {
        gameName: GameName.INCLEMENT_EMERALD,
      })
      .andWhere("death.deleted = false")
      .getMany();
  }

  async countAll(): Promise<number> {
    return await this.repository
      .createQueryBuilder("death")
      .leftJoin("death.attempt", "attempt")
      .where("attempt.active = true")
      .andWhere("attempt.gameName = :gameName", {
        gameName: GameName.INCLEMENT_EMERALD,
      })
      .andWhere("death.deleted = false")
      .getCount();
  }

  async findAll(): Promise<Array<Death>> {
    return await this.repository
      .createQueryBuilder("death")
      .leftJoin("death.attempt", "attempt")
      .innerJoinAndSelect("death.encounter", "encounter")
      .where("attempt.gameName = :gameName", {
        gameName: GameName.INCLEMENT_EMERALD,
      })
      .andWhere("death.deleted = false")
      .getMany();
  }
}

export const deathRepository = new DeathRepository();
