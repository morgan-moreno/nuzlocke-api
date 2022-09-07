import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { Attempt } from './Attempt';
import { BaseEntity } from './BaseEntity';
import { Stats } from './Stats';

@Entity({ name: 'encounter' })
export class Encounter extends BaseEntity {
	@Column({
		name: 'attempt_id',
		type: 'uuid',
	})
	attemptId: string;

	@Column({
		name: 'name',
		type: 'varchar',
	})
	name: string;

	@Column({
		name: 'ability',
		type: 'varchar',
	})
	ability: string;

	@Column({
		name: 'nature',
		type: 'varchar',
	})
	nature: string;

	@Column('varchar', { array: true, default: {} })
	moves: Array<string>;

	@Column({ name: 'dead', type: 'boolean', default: false })
	dead: boolean;

	@Column({
		name: 'evs_id',
		type: 'uuid',
	})
	evsId: string;

	@Column({
		name: 'ivs_id',
		type: 'uuid',
	})
	ivsId: string;

	@ManyToOne(() => Attempt, attempt => attempt.alive)
	@JoinColumn({ name: 'attempt_id', referencedColumnName: 'id' })
	attempt: Attempt;

	@OneToOne(() => Stats, stats => stats.evsEncounter)
	@JoinColumn({ name: 'evs_id', referencedColumnName: 'id' })
	evs: Stats;

	@OneToOne(() => Stats, stats => stats.ivsEncounter)
	@JoinColumn({ name: 'ivs_id', referencedColumnName: 'id' })
	ivs: Stats;

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			ability: this.ability,
			nature: this.nature,
			moves: this.moves,
			dead: this.dead,
			evs: this.evs.toJSON(),
			ivs: this.ivs.toJSON(),
			attemptId: this.attemptId,
			evsId: this.evsId,
			ivsId: this.ivsId,
		};
	}
}
