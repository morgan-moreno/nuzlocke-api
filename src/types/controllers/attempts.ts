import { Attempt } from "../../entities/Attempt";
import { GameName } from "../domain/GameName";

export interface SingleAttemptBody {
  attempt: Attempt;
}
export interface MultipleAttemptsBody {
  attempts: Array<Attempt>;
}
export interface PaginatedAttemptsBody extends MultipleAttemptsBody {
  meta: Record<string, any>;
}

//! GET /attempts
export interface GetAttemptsQuery {
  active?: boolean;
}

//! POST /attempts
// TODO: This is not implemented, as of now we are only created INCLEMENT_EMERALD attempts
export interface CreateAttemptBody {
  gameName: GameName;
}

//! PUT /attempts/:attemptId
export interface UpdateAttemptParams {
  attemptId: string;
}
export interface UpdateAttemptBody {
  active?: boolean;
  levelCap?: number;
}
