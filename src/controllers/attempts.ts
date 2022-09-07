import * as AttemptService from '../service/attempts';
import { Attempt } from '../entities/Attempt';
import { RequestHandler } from '../types';
import {
	GetAttemptsQuery,
	MultipleAttemptsBody,
	SingleAttemptBody,
	UpdateAttemptBody,
	UpdateAttemptParams,
} from '../types/controllers/attempts';
import { ObjectUtils } from '../util/ObjectUtils';
import { ResponseUtils } from '../util/ResponseUtils';
import { GameName } from '../types/domain/GameName';

/**
 * @path GET /attempts
 * @query
 *  - active: boolean
 */
export const getAttempts: RequestHandler<
	any,
	any,
	GetAttemptsQuery
> = async (req, res, next) => {
	const { active } = req.query;
	let attempt: Attempt;
	let attempts: Array<Attempt>;

	// If active is present AND is true
	// We will only fetch the active attempt
	if (ObjectUtils.isPresentAndEqualsTrue(active)) {
		attempt = await AttemptService.getActiveAttemptByGameName(
			GameName.INCLEMENT_EMERALD
		);

		return ResponseUtils.okResponse<SingleAttemptBody>(res, {
			attempt,
		});
	}

	// If active is not present OR is false
	// We will fetch all attempts
	attempts = await AttemptService.getAllByGameName(
		GameName.INCLEMENT_EMERALD
	);

	return ResponseUtils.okResponse<MultipleAttemptsBody>(res, {
		attempts,
	});
};

/**
 * @path POST /attempts
 * @todo
 *  Body:
 *      - gameName: GameName
 */
export const createAttempt: RequestHandler = async (
	req,
	res,
	next
) => {
	const attempt = await AttemptService.createAttempt();

	return ResponseUtils.createdResponse<SingleAttemptBody>(res, {
		attempt,
	});
};

/**
 * @path PUT /attempts/:attemptId
 * @params
 *  - attemptId: string
 * @body
 *  - levelCap?: number
 *  - active?: boolean
 */
export const updateAttempt: RequestHandler<
	UpdateAttemptParams,
	UpdateAttemptBody
> = async (req, res, next) => {
	const { attemptId } = req.params;

	const attempt = await AttemptService.updateAttempt(
		attemptId,
		req.body
	);

	return ResponseUtils.okResponse<SingleAttemptBody>(res, {
		attempt,
	});
};
