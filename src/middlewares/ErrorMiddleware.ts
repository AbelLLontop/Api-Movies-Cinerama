import {NextFunction, Request, Response} from 'express';
import { ErrorServerResponse } from '../handlers/ResponseHandlers';
//   NextFunction,

export const ErrorMiddleware = (
	error: Error,
	req:Request,
	res: Response,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	next: NextFunction
) => {
	console.log(error);
	return ErrorServerResponse(res);
};
