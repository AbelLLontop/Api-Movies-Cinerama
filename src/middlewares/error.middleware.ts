import {Response} from 'express';
//   NextFunction,

export const ErrorMiddleware = (
	error: Error,
	req:Request,
	res: Response,
	//   next: NextFunction
) => {
	res.status(500).send(error.message);
};
