import { AppDataSource } from '../config/db';
import { Encounter } from '../entities/Encounter';
import { FindOptionsRelations, Repository } from 'typeorm';
import { TypeormPaginationParams } from '../util/PaginationUtil';
import { GameName } from '../types/domain/GameName';
import { Attempt } from '../entities/Attempt';
import { Stats } from '../entities/Stats';

class EncounterRepository {
	repository: Repository<Encounter>;
	defaultRelations: FindOptionsRelations<Encounter>;

	constructor() {
		this.repository = AppDataSource.getRepository(Encounter);
		this.defaultRelations = {
			evs: true,
			ivs: true,
		};
	}

	create(): Encounter {
		return this.repository.create();
	}

	async findAllByActiveAttempt(): Promise<Array<Encounter>> {
		const query = this.repository
			.createQueryBuilder('encounter')
			.innerJoin('encounter.attempt', 'attempt')
			.leftJoinAndSelect('encounter.ivs', 'ivs')
			.leftJoinAndSelect('encounter.evs', 'evs')
			.where('attempt.active = true')
			.andWhere('attempt.gameName = :gameName', {
				gameName: GameName.INCLEMENT_EMERALD,
			})
			.andWhere('encounter.deleted = false')
			.andWhere('encounter.dead = false')
			.orderBy('encounter.name', 'ASC');

		return await query.getMany();
	}

	async findAllByAttempt(
		attemptId: string,
		pagination?: TypeormPaginationParams
	): Promise<Array<Encounter>> {
		return await this.repository.find({
			where: {
				attemptId,
				dead: false,
			},
			relations: this.defaultRelations,
			order: {
				name: 'ASC',
			},
			...pagination,
		});
	}

	async findAllByGameName(
		gameName: string,
		pagination?: TypeormPaginationParams
	): Promise<Array<Encounter>> {
		return await this.repository
			.createQueryBuilder('encounter')
			.innerJoin('encounter.attempt', 'attempt')
			.leftJoinAndSelect('encounter.ivs', 'ivs')
			.leftJoinAndSelect('encounter.evs', 'evs')
			.where('attempt.gameName = :gameName', { gameName })
			.skip(pagination.skip ?? 0)
			.take(pagination.skip ?? 25)
			.getMany();
	}

	async findById(id: string): Promise<Encounter> {
		return await this.repository.findOneOrFail({
			where: {
				id,
			},
			relations: this.defaultRelations,
		});
	}

	async findByName(name: string, orFail = false): Promise<Encounter> {
		const query = this.repository
			.createQueryBuilder('encounter')
			.innerJoin(
				Attempt,
				'attempt',
				'encounter.attempt_id = attempt.id'
			)
			.where('attempt.active = true')
			.andWhere('encounter.name = :name', { name })
			.andWhere('encounter.deleted = false');

		return orFail ? await query.getOneOrFail() : await query.getOne();
	}

	async save(encounter: Encounter): Promise<Encounter> {
		encounter = await this.repository.save(encounter);
		return await this.repository.findOne({
			where: {
				id: encounter.id,
			},
			relations: this.defaultRelations,
		});
	}
}

export const encounterRepository = new EncounterRepository();
