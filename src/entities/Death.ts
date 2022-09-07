import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import { Attempt } from "./Attempt";
import { BaseEntity } from "./BaseEntity";
import { Encounter } from "./Encounter";

@Entity({
  name: "death",
})
export class Death extends BaseEntity {
  @Column({
    name: "encounter_id",
    type: "uuid",
  })
  encounterId: string;

  @Column({
    name: "attempt_id",
    type: "uuid",
  })
  attemptId: string;

  @Column({
    name: "description",
    type: "varchar",
  })
  description: string;

  @OneToOne(() => Encounter)
  @JoinColumn({ name: "encounter_id", referencedColumnName: "id" })
  encounter: Encounter;

  @ManyToOne(() => Attempt, (attempt) => attempt.deaths)
  @JoinColumn({ name: "attempt_id", referencedColumnName: "id" })
  attempt: Attempt;

  toJSON() {
    let formattedAttempt = {};
    let formattedEncounter = {};

    if (this.attempt) {
      formattedAttempt = Object.assign({}, this.attempt);
    }

    if (this.encounter) {
      formattedEncounter = Object.assign({}, this.encounter);
    }

    return {
      id: this.id,
      encounterId: this.encounterId,
      encounter: formattedEncounter,
      attempt: formattedAttempt,
      attemptId: this.attemptId,
    };
  }
}
