import HttpStatusCode from "../../types/domain/HttpStatusCode";
import { BaseException } from "./BaseException";

export class EncounterNotFoundException extends BaseException {
  constructor(id: string) {
    super(HttpStatusCode.NOT_FOUND, `Encounter with id ${id} was not found`);
  }
}
