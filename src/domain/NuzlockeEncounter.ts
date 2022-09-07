import { Encounter } from "../entities/Encounter";

export class NuzlockeEncounter {
  id: string;
  name: string;
  ability: string;
  nature: string;
  moves: Array<string>;
  dead: boolean;
  evs: any;
  ivs: any;
  attemptId: string;

  constructor(
    id: string,
    name: string,
    ability: string,
    nature: string,
    moves: Array<string>,
    dead: boolean,
    evs: any,
    ivs: any,
    attemptId: any
  ) {
    this.id = id;
    this.name = name;
    this.ability = ability;
    this.nature = nature;
    this.moves = moves;
    this.dead = dead;
    this.evs = evs;
    this.ivs = ivs;
    this.attemptId = attemptId;
  }

  public static of(encounter: Encounter) {
    return new NuzlockeEncounter(
      encounter.id,
      encounter.name,
      encounter.ability,
      encounter.nature,
      encounter.moves,
      encounter.dead,
      encounter.evs,
      encounter.ivs,
      encounter.attemptId
    );
  }
}
