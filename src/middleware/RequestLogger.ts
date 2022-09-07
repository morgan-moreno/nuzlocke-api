import moment from 'moment';
import { RequestHandler } from '../types';

const TIME_FORMAT = 'h:mm:ss.SS';

export const requestLogger: RequestHandler = (req, res, next) => {
	const start = moment();
	console.log(
		`========= REQUEST START - [${start.format(
			TIME_FORMAT
		)}] =========`
	);

	console.log(`PATH: ${req.method} ${req.path}`);
	console.log('PARAMS: ', req.params);
	console.log('BODY: ', req.body);
	console.log('QUERY: ', req.query);
	console.log('HEADERS: ', req.headers);
	console.log(
		'x-nuzlocke-source: ',
		req.headers['x-nuzlocke-source']
	);

	res.on('finish', () => {
		const end = moment();
		console.log(
			'REQUEST_TIME: ',
			Math.abs(start.diff(end, 's', true))
		);
		console.log('STATUS: ', res.statusCode);
		console.log(
			`========= REQUEST END - [${end.format(TIME_FORMAT)}] =========`
		);
	});

	next();
};
