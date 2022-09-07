import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Death } from "./Death";
import { Encounter } from "./Encounter";

@Entity({ name: "attempt" })
export class Attempt extends BaseEntity {
  @Column({ name: "game_name", type: "varchar", default: "INCLEMENT_EMERALD" })
  gameName: string;

  @Column({ name: "attempt_number", type: "integer" })
  attemptNumber: number;

  @Column({ name: "level_cap", type: "integer" })
  levelCap: number;

  @Column({ name: "active", type: "boolean" })
  active: boolean;

  @OneToMany(() => Encounter, (encounter) => encounter.attempt)
  alive: Array<Encounter>;

  @OneToMany(() => Death, (death) => death.attempt)
  deaths: Array<Death>;

  toJSON() {
    return {
      id: this.id,
      gameName: this.gameName,
      attemptNumber: this.attemptNumber,
      levelCap: this.levelCap,
      active: this.active,
      alive: this.alive,
      deaths: this.deaths,
    };
  }
}
