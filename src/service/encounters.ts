import { AttemptNotFoundException } from '../domain/exceptions';
import { Attempt } from '../entities/Attempt';
import { Death } from '../entities/Death';
import { Encounter } from '../entities/Encounter';
import { Stats } from '../entities/Stats';
import {
	encounterRepository,
	attemptRepository,
	statRepository,
	deathRepository,
} from '../repositories';
import {
	CreateEncounterBody,
	KillEncounterBody,
	UpdateEncounterBody,
} from '../types/controllers';
import { GameName } from '../types/domain/GameName';
import { PaginationParams } from '../types/domain/PaginationParams';
import { ArrayUtils } from '../util/CollectionUtils';
import { ObjectUtils } from '../util/ObjectUtils';
import {
	PaginationUtil,
	TypeormPaginationParams,
} from '../util/PaginationUtil';
import { StringUtils } from '../util/StringUtils';

export const getEncountersForActiveAttempt = async (): Promise<
	Array<Encounter>
> => {
	let encounters: Array<Encounter>;

	// Find all encounters related to the eactive attempt
	encounters = await encounterRepository.findAllByActiveAttempt();

	return encounters;
};

export const getAllEncounters = async (
	options: PaginationParams
): Promise<Array<Encounter>> => {
	let encounters: Array<Encounter>;
	let pagination: TypeormPaginationParams;

	pagination = PaginationUtil.parseParams(options);

	encounters = await encounterRepository.findAllByGameName(
		GameName.INCLEMENT_EMERALD
	);

	return encounters;
};

export const getEncounterById = async (
	encounterId: string
): Promise<Encounter> => {
	return await encounterRepository.findById(encounterId);
};

export const createEncounter = async (
	body: CreateEncounterBody
): Promise<Encounter> => {
	const { name, ability, nature, moves, ivs } = body;

	let activeAttempt = await attemptRepository.findActiveByGameName(
		GameName.INCLEMENT_EMERALD
	);

	if (ObjectUtils.isEmpty(activeAttempt)) {
		throw new AttemptNotFoundException({
			gameName: GameName.INCLEMENT_EMERALD,
		});
	}

	let encounter = encounterRepository.create();
	let newIvs = statRepository.create();
	let newEvs = statRepository.create();

	// TODO: Move this into `StatsService.createDefaultStats(ivs?: CreateStats): Promise<{ ivsId: string, evsId: string }>`
	// Instantiate ivs & evs record for the encounter
	if (ivs) {
		newIvs.hp = ivs.hp;
		newIvs.atk = ivs.atk;
		newIvs.def = ivs.def;
		newIvs.spa = ivs.spa;
		newIvs.spd = ivs.spd;
		newIvs.spe = ivs.spe;
	}
	newIvs = await statRepository.save(newIvs);
	newEvs = await statRepository.save(newEvs);

	encounter.attemptId = activeAttempt.id;
	encounter.name = name;
	encounter.ability = ability ?? '';
	encounter.nature = nature ?? '';
	encounter.moves = moves ?? [];
	encounter.ivsId = newIvs.id;
	encounter.evsId = newEvs.id;

	encounter = await encounterRepository.save(encounter);

	return encounter;
};

export const updateEncounter = async (
	id: string,
	updatedFields: UpdateEncounterBody
): Promise<Encounter> => {
	const { ability, nature, dead, moves, evs, ivs } = updatedFields;
	let encounter: Encounter;
	let encounterEvs: Stats;
	let encounterIvs: Stats;
	let death: Death;

	// Find the encounter that should be updated
	// This will throw an error if not found
	// TODO: How should we handle the specific error that is thrown ??
	encounter = await encounterRepository.findById(id);
	encounterEvs = await statRepository.findById(encounter.evsId);
	encounterIvs = await statRepository.findById(encounter.ivsId);

	// Apply the requested updates
	// TODO: Extract out to a helper function
	// ! `applyEncounterUpdates(encounter: Encounter, updates: UpdateEncounterBody): Promise<Encounter>`
	if (StringUtils.isNotEmpty(ability)) {
		encounter.ability = ability;
	}

	if (StringUtils.isNotEmpty(nature)) {
		encounter.nature = nature;
	}

	if (ArrayUtils.isNotEmpty(moves)) {
		encounter.moves = moves;
	}

	if (ObjectUtils.isNotEmpty(dead)) {
		encounter.dead = dead;

		if (dead === true) {
			death = deathRepository.create();

			death.attemptId = encounter.attemptId;
			death.encounterId = encounter.id;
			death.description = 'DEFAULT_DESCRIPTION';

			await deathRepository.save(death);
		}
	}

	if (ObjectUtils.isNotEmpty(evs)) {
		Object.assign(encounterEvs, evs);
		encounterEvs = await statRepository.save(encounterEvs);
	}

	if (ObjectUtils.isNotEmpty(ivs)) {
		Object.assign(encounterIvs, ivs);
		encounterIvs = await statRepository.save(encounterIvs);
	}

	// Save all changes to the encounter
	encounter = await encounterRepository.save(encounter);

	return encounter;
};

export const killEncounter = async ({
	name,
	description,
}: KillEncounterBody): Promise<Encounter> => {
	let encounter: Encounter;
	let death: Death;

	// Find the encounter that is to be killed
	encounter = await encounterRepository.findByName(name, true);

	// Mark the encounter as dead
	encounter.dead = true;
	encounter = await encounterRepository.save(encounter);

	// Create a new death record for the encounter
	death = deathRepository.create();

	death.attemptId = encounter.attemptId;
	death.encounterId = encounter.id;
	death.description = description;

	await deathRepository.save(death);

	return encounter;
};
