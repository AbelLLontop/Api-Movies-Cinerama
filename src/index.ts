import express from 'express';
import {ErrorMiddleware} from './middlewares/ErrorMiddleware';
import {setupRoutes} from './config';
const app = express();

const initiMiddleware = (app: express.Express) => {
	app.use(express.static('public'));
	app.use(express.json());
	app.use(express.urlencoded({
		extended: true 
	}));
	app.use('*', (req, res) => {
		res.send('Not found');
	});
	app.use(ErrorMiddleware as any);
};

setupRoutes(app).then(() => {
	initiMiddleware(app);
	app.listen(3000, () => {
		console.log('Server listening on port 3000');  
	});
});
