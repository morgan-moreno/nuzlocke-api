import HttpStatusCode from "../../types/domain/HttpStatusCode";

export class BaseException<T = any> extends Error {
  statusCode: HttpStatusCode;
  data: T;

  constructor(statusCode: HttpStatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;

    Error.captureStackTrace(this);
  }
}
