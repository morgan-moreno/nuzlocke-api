import { DB_ACTION_SOURCES } from "../entities/BaseEntity";
import { DbActionSource } from "../types/domain/DbActionSource";
import { RequestHandler } from "../types";

interface RequestSourceQuery {
  source?: DbActionSource;
}

export const getRequestSource: RequestHandler = (req, res, next) => {
  const nuzlockeSource = req.headers["x-nuzlocke-source"] as string;

  if (nuzlockeSource && validateRequestSource(nuzlockeSource)) {
    req.source = nuzlockeSource as DbActionSource;
  }

  next();
};

function validateRequestSource(source: string): boolean {
  return DB_ACTION_SOURCES.includes(source as DbActionSource);
}
