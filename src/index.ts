import express from 'express';
import cors from 'cors';
import { connectToDb } from './config/db';
import { requestLogger } from './middleware/RequestLogger';
import { getRequestSource } from './middleware/RequestSource';
import {
	AttemptRouter,
	DeathsRouter,
	EncountersRouter,
} from './routes';

const app = express();

connectToDb();

app.use(cors());
app.use(express.json());

app.use('/', requestLogger);
app.use('/', getRequestSource);

app.use('/attempts', AttemptRouter);
app.use('/deaths', DeathsRouter);
app.use('/encounters', EncountersRouter);

app.listen(3001, () =>
	console.log(`Server listening on port ${3001}`)
);
