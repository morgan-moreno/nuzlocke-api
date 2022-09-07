import { Attempt } from '../entities/Attempt';
import { Death } from '../entities/Death';
import { Encounter } from '../entities/Encounter';
import { Stats } from '../entities/Stats';
import { DataSource } from 'typeorm';
import {
	DB_DATABASE,
	DB_HOST,
	DB_PASSWORD,
	DB_PORT,
	DB_USER,
} from './env';

export const AppDataSource = new DataSource({
	type: 'postgres',
	host: DB_HOST,
	port: DB_PORT,
	database: DB_DATABASE,
	username: DB_USER,
	password: DB_PASSWORD,
	synchronize: true,
	entities: [Attempt, Encounter, Stats, Death],
});

export const connectToDb = () => {
	AppDataSource.initialize()
		.then(() => console.log('Db Connected'))
		.catch(error => console.error(`Error connecting to db: `, error));
};
