abstract class ResponseBody<T> {
  success: boolean;
  data: T;

  constructor(success: boolean, data: T) {
    this.success = success;
    this.data = data;
  }
}

export class SuccessResponseBody<T> extends ResponseBody<T> {
  constructor(data: T) {
    super(true, data);
  }
}

export class ErrorResponseBody<T> extends ResponseBody<T> {
  error: ErrorType;
  message: string;

  constructor(error: ErrorType, message: string, data?: T) {
    super(false, data);
    this.message = message;
    this.error = error;
  }
}

export enum ErrorType {
  INVALID_REQUEST_BODY,
  RESOURCE_NOT_FOUND,
  NOT_AUTHORIZED,
  INTERNAL_SERVER_ERROR,
}
