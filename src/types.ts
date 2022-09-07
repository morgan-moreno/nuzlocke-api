import { NextFunction, Request, Response } from "express";
import { DbActionSource } from "./types/domain/DbActionSource";

declare global {
  namespace Express {
    interface Request {
      source?: DbActionSource;
    }
  }
}

export type RequestHandler<P = any, B = any, Q = any> = (
  req: Request<P, any, B, Q, { source?: string }>,
  res: Response,
  next: NextFunction
) => void;
