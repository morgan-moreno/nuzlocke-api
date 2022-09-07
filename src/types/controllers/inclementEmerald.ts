export interface CreateEncounterStats {
  hp?: number;
  atk?: number;
  def?: number;
  spa?: number;
  spd?: number;
  spe?: number;
}

export interface CreateEncounterBody {
  name: string;
  ability?: string;
  nature?: string;
  ivs?: CreateEncounterStats;
  moves?: Array<string>;
}

export interface KillEncounterParams {
  encounterId: string;
}
export interface KillEncounterBody {
  description: string;
}

export interface UpdateEncounterParams {
  encounterId: string;
}
export interface UpdateEncounterBody extends Omit<CreateEncounterBody, "name"> {
  evs?: CreateEncounterStats;
}

export interface GetAttemptsQuery {
  active: boolean;
}

export interface CreateAttemptBody {
  gameName: string;
}

export interface UpdateAttemptParams {
  attemptId: string;
}

export interface UpdateAttemptBody {
  levelCap: number;
}

export interface GetDeathsQuery {
  active: boolean;
  count: boolean;
}
