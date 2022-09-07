import { Response } from "express";
import { HttpStatusCode } from "../types/domain";
import { successResponse } from "./SuccessResponse";

export class ResponseUtils {
  public static okResponse<T>(res: Response, data: T) {
    return successResponse<T>(res, HttpStatusCode.OK, data);
  }
  public static createdResponse<T>(res: Response, data: T) {
    return successResponse<T>(res, HttpStatusCode.CREATED, data);
  }
}
