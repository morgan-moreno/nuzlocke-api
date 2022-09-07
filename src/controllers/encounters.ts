import { Response } from 'express';
import { AttemptNotFoundException } from '../domain/exceptions';
import { NuzlockeEncounter } from '../domain/NuzlockeEncounter';
import { Attempt } from '../entities/Attempt';
import { Encounter } from '../entities/Encounter';
import {
	attemptRepository,
	encounterRepository,
} from '../repositories';
import * as EncounterService from '../service/encounters';
import { RequestHandler } from '../types';
import {
	GetEncounterByIdParams,
	GetEncountersQuery,
	UpdateEncounterBody,
	UpdateEncounterParams,
	SingleEncounterBody,
	PaginatedEncountersBody,
	MultipleEncountersBody,
	KillEncounterBody,
} from '../types/controllers/encounters';
import { CreateEncounterBody } from '../types/controllers/inclementEmerald';
import { GameName } from '../types/domain/GameName';
import { asyncHandler } from '../util/AsyncHandler';
import { ObjectUtils } from '../util/ObjectUtils';
import { ResponseUtils } from '../util/ResponseUtils';

/**
 * @path GET /encounters
 * @params
 *  - active: boolean
 */
export const getEncounters: RequestHandler<
	any,
	any,
	GetEncountersQuery
> = asyncHandler(async (req, res, next) => {
	let { active, page, limit } = req.query;
	let encounters: Array<Encounter> | Array<NuzlockeEncounter>;

	// If `active` query param is provided and if it is true
	// We will only be fetching the encounters associated with
	// the active inclement emerald run for the user making the request
	if (ObjectUtils.isPresentAndEqualsTrue(Boolean(active))) {
		encounters =
			await EncounterService.getEncountersForActiveAttempt();

		encounters = encounters.map(encounter =>
			NuzlockeEncounter.of(encounter)
		);

		return ResponseUtils.okResponse<MultipleEncountersBody>(res, {
			encounters,
		});
	}

	// If `active` query param is not provided or it is false
	// We will fetch all encounters across all inclement emerald attempts
	encounters = await EncounterService.getAllEncounters({
		page,
		limit,
	});

	encounters = encounters.map(encounter =>
		NuzlockeEncounter.of(encounter)
	);

	return ResponseUtils.okResponse<PaginatedEncountersBody>(res, {
		encounters,
		meta: { page, limit },
	});
});

/**
 * @path GET /encounters/:encounterId
 * @params
 *  - encounterId: string
 */
export const getEncounterById: RequestHandler<GetEncounterByIdParams> =
	asyncHandler(async (req, res, next) => {
		const { encounterId } = req.params;

		const encounter = NuzlockeEncounter.of(
			await EncounterService.getEncounterById(encounterId)
		);

		return ResponseUtils.okResponse<SingleEncounterBody>(res, {
			encounter,
		});
	});

/**
 * @path POST /encounters
 * @body
 *  - name: string
 *  - ability?: string
 *  - ivs?: { hp: number, atk: number, def: number, spa: number, spd: number, spe: number }
 *  - moves?: Array<string>
 *  - nature?: string
 */
export const createEncounter: RequestHandler<
	any,
	CreateEncounterBody
> = asyncHandler(async (req, res, next) => {
	const encounter = NuzlockeEncounter.of(
		await EncounterService.createEncounter(req.body)
	);

	return ResponseUtils.createdResponse<SingleEncounterBody>(res, {
		encounter,
	});
});

/**
 * @method POST /encounters/death
 * @body
 *  - description: string
 *  - name: string
 *
 */
export const killEncounter: RequestHandler<
	any,
	KillEncounterBody
> = async (req, res, next) => {
	const encounter = NuzlockeEncounter.of(
		await EncounterService.killEncounter(req.body)
	);

	return ResponseUtils.createdResponse<SingleEncounterBody>(res, {
		encounter,
	});
};

/**
 * @method PUT /encounters/:encounterId
 * @params
 *  - encounterId: string
 * @body
 *  - ability?: string
 *  - nature?: string
 *  - nature?: string
 *  - ivs?: CreateStats
 *  - evs?: CreateStats
 *  - moves?: Array<string>
 */
export const updateEncounter: RequestHandler<
	UpdateEncounterParams,
	UpdateEncounterBody
> = async (req, res, next) => {
	const { encounterId } = req.params;

	const encounter = NuzlockeEncounter.of(
		await EncounterService.updateEncounter(encounterId, req.body)
	);

	return ResponseUtils.okResponse<SingleEncounterBody>(res, {
		encounter,
	});
};
