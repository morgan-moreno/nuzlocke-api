import { AppDataSource } from '../config/db';
import { Attempt } from '../entities/Attempt';
import {
	FindOneOptions,
	FindOptionsRelations,
	Repository,
} from 'typeorm';
import { ObjectUtils } from '../util/ObjectUtils';

class AttemptRepository {
	repository: Repository<Attempt>;
	defaultRelations: FindOptionsRelations<Attempt>;

	constructor() {
		this.repository = AppDataSource.getRepository(Attempt);
	}

	create(): Attempt {
		return this.repository.create();
	}

	async findActiveByGameName(gameName: string): Promise<Attempt> {
		return await this.repository.findOne({
			where: {
				gameName,
				active: true,
				deleted: false,
			},
		});
	}

	async findAllByGameName(gameName: string): Promise<Array<Attempt>> {
		return await this.repository.find({
			where: {
				gameName,
				deleted: false,
			},
		});
	}

	async findOneById(id: string, orFail = false): Promise<Attempt> {
		let findMethod: (
			options: FindOneOptions<Attempt>
		) => Promise<Attempt>;

		if (ObjectUtils.isPresentAndEqualsTrue(orFail)) {
			findMethod = this.repository.findOneOrFail;
		} else {
			findMethod = this.repository.findOne;
		}

		return await findMethod({
			where: {
				id,
				deleted: false,
			},
		});
	}

	async save(attempt: Attempt): Promise<Attempt> {
		return await this.repository.save(attempt);
	}
}

export const attemptRepository = new AttemptRepository();
