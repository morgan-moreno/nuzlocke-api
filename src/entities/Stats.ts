import { Column, Entity, OneToOne } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { Encounter } from "./Encounter";

@Entity({ name: "stats" })
export class Stats extends BaseEntity {
  @Column({
    name: "hp",
    type: "integer",
    default: 0,
  })
  hp: number;

  @Column({
    name: "atk",
    type: "integer",
    default: 0,
  })
  atk: number;

  @Column({
    name: "def",
    type: "integer",
    default: 0,
  })
  def: number;

  @Column({
    name: "spa",
    type: "integer",
    default: 0,
  })
  spa: number;

  @Column({
    name: "spd",
    type: "integer",
    default: 0,
  })
  spd: number;

  @Column({
    name: "spe",
    type: "integer",
    default: 0,
  })
  spe: number;

  @OneToOne(() => Encounter, (encounter) => encounter.evs)
  evsEncounter: Encounter;

  @OneToOne(() => Encounter, (encounter) => encounter.ivs)
  ivsEncounter: Encounter;

  toJSON() {
    return {
      id: this.id,
      hp: this.hp,
      atk: this.atk,
      def: this.def,
      spa: this.spa,
      spd: this.spd,
      spe: this.spe,
    };
  }
}
