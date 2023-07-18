import {Express} from 'express';
import fs from 'fs';
import path from 'path';

export const setupRoutes = async(app:Express)=>{
	const pathRoutes = path.join(__dirname, '../routes');
	const routesPaths = fs.readdirSync(pathRoutes);
	const promises = routesPaths.map(async(routerPath)=>{
		if((/\.route\.ts$/).test(routerPath) ){
			const {default: router}:any= await import(`${pathRoutes}/${routerPath}`);
			return app.use(router);          
		}
	});
	return Promise.all(promises);
};