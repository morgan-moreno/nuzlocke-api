import { Death } from "../entities/Death";
import { deathRepository } from "../repositories";

export const getDeathsCountForActiveAttempt = async (): Promise<number> => {
  return await deathRepository.countByActiveAttempt();
};

export const getDeathsForActiveAttempt = async (): Promise<Array<Death>> => {
  return await deathRepository.findAllByActiveAttempt();
};

export const getAllDeathsCount = async (): Promise<number> => {
  return await deathRepository.countAll();
};

export const getAllDeaths = async (): Promise<Array<Death>> => {
  return await deathRepository.findAll();
};
