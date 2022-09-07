import HttpStatusCode from "../../types/domain/HttpStatusCode";
import { BaseException } from "./BaseException";

export interface AttemptNotFoundOptions {
  gameName?: string;
  id?: string;
}

export class AttemptNotFoundException extends BaseException<AttemptNotFoundOptions> {
  constructor({ gameName, id }: AttemptNotFoundOptions) {
    super(
      HttpStatusCode.NOT_FOUND,
      id
        ? `Attempt with id ${id} was not found`
        : `Attempt was not found for ${gameName}`
    );
    this.data = { gameName, id };
  }
}
