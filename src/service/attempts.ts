import { Attempt } from '../entities/Attempt';
import { attemptRepository } from '../repositories';
import { UpdateAttemptBody } from '../types/controllers/attempts';
import { GameName } from '../types/domain/GameName';
import { ObjectUtils } from '../util/ObjectUtils';

export const getActiveAttemptByGameName = async (
	gameName: GameName
): Promise<Attempt> => {
	return await attemptRepository.findActiveByGameName(gameName);
};

export const getAllByGameName = async (
	gameName: GameName
): Promise<Array<Attempt>> => {
	return await attemptRepository.findAllByGameName(gameName);
};

// TODO: Handle creating attempts for specific games `enum GameName`
export const createAttempt = async (): Promise<Attempt> => {
	let attemptNumber = 1;
	let previousAttempt: Attempt;
	let currentAttempt: Attempt;

	// Find previously active attempt
	previousAttempt = await attemptRepository.findActiveByGameName(
		GameName.INCLEMENT_EMERALD
	);

	// If a previously active attempt is found, we need to mark it as inactive
	if (ObjectUtils.isNotEmpty(previousAttempt)) {
		previousAttempt.active = false;

		previousAttempt = await attemptRepository.save(previousAttempt);

		attemptNumber = previousAttempt.attemptNumber + 1;
	}

	// Initialize new attempt
	// TODO: Extract into a helper method
	// ! createNewAttempt(attemptNumber: number): Promise<Attempt>
	currentAttempt = attemptRepository.create();

	currentAttempt.gameName = GameName.INCLEMENT_EMERALD;
	currentAttempt.attemptNumber = attemptNumber;
	currentAttempt.levelCap = 16;
	currentAttempt.active = true;

	// Save and return the newly created attempt
	currentAttempt = await attemptRepository.save(currentAttempt);

	return currentAttempt;
};

export const updateAttempt = async (
	id: string,
	fieldsToUpdate: UpdateAttemptBody
): Promise<Attempt> => {
	const { active, levelCap } = fieldsToUpdate;
	let attempt: Attempt;

	// Find the attempt that needs to be updated
	// * should throw an error if attempt cannot be found
	attempt = await attemptRepository.findOneById(id, true);

	// Update the fields as requested
	// TODO: Extract to a helper method
	// !: applyAttemptUpdates(attempt: Attempt, fieldsToUpdate: UpdateAttemptBody): Attempt;
	if (ObjectUtils.isNotEmpty(active)) {
		attempt.active = active;
	}

	if (ObjectUtils.isNotEmpty(levelCap)) {
		attempt.levelCap = levelCap;
	}

	attempt = await attemptRepository.save(attempt);

	return attempt;
};
