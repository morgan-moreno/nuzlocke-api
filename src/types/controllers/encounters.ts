import { NuzlockeEncounter } from "../../domain/NuzlockeEncounter";

export interface GetEncountersQuery {
  active?: boolean;
  page?: string;
  limit?: string;
}

export interface GetEncounterByIdParams {
  encounterId: string;
}

export interface CreateEncounterBody {
  name: string;
  ability?: string;
  nature?: string;
  ivs?: CreateStats;
  moves?: Array<string>;
}

export interface CreateStats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}

export interface KillEncounterBody {
  name: string;
  description: string;
}

export interface UpdateEncounterParams {
  encounterId: string;
}
export interface UpdateEncounterBody extends Omit<CreateEncounterBody, "name"> {
  evs?: CreateStats;
  dead?: boolean;
}
export interface SingleEncounterBody {
  encounter: NuzlockeEncounter;
}
export interface PaginatedEncountersBody {
  encounters: Array<NuzlockeEncounter>;
  meta: Record<string, any>;
}
export interface MultipleEncountersBody {
  encounters: Array<NuzlockeEncounter>;
}
