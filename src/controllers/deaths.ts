import { Death } from "../entities/Death";
import * as DeathService from "../service/deaths";
import { RequestHandler } from "../types";
import { GetDeathsQuery } from "../types/controllers/deaths";
import { ObjectUtils } from "../util/ObjectUtils";
import { ResponseUtils } from "../util/ResponseUtils";

/**
 * @path GET /deaths
 * @query
 *  - active: boolean
 *  - count: boolean
 */
export const getDeaths: RequestHandler<any, any, GetDeathsQuery> = async (
  req,
  res,
  next
) => {
  const { active, count } = req.query;
  let deathsCount: number;
  let deaths: Array<Death>;

  if (
    ObjectUtils.isPresentAndEqualsTrue(active) &&
    ObjectUtils.isPresentAndEqualsTrue(count)
  ) {
    deathsCount = await DeathService.getDeathsCountForActiveAttempt();
  } else if (ObjectUtils.isPresentAndEqualsTrue(active) && !count) {
    deaths = await DeathService.getDeathsForActiveAttempt();
  } else if (!active && ObjectUtils.isPresentAndEqualsTrue(count)) {
    deathsCount = await DeathService.getAllDeathsCount();
  } else {
    deaths = await DeathService.getAllDeaths();
  }

  return ResponseUtils.okResponse(res, { deaths, count: deathsCount });
};
