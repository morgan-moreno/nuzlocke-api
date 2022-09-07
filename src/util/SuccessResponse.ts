import { Response } from "express";
import HttpStatusCode from "../types/domain/HttpStatusCode";
import { SuccessResponseBody } from "../types/domain/Responses";

export function successResponse<T>(
  res: Response,
  statusCode: HttpStatusCode,
  data: T
) {
  const body = new SuccessResponseBody<T>(data);

  return res.status(statusCode).json(body);
}
