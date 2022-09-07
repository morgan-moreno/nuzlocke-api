import { RequestHandler } from "../types";

type AsyncHandler = (fn: RequestHandler) => RequestHandler;

export const asyncHandler: AsyncHandler = (fn) => (req, res, next) => {
  try {
    fn(req, res, next);
  } catch (error) {
    next(error);
  }
};
