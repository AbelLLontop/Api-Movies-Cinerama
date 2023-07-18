import { NextFunction, Request, Response } from 'express';
import { CineramaScrapperService } from '../services/CineramaScrapperService';
import { SuccessResponse } from '../handlers/ResponseHandlers';

export class MovieController{
	constructor(
	){}

	getMovies = async (req:Request, res:Response, next:NextFunction) => {
		try{
			const cineramaService = new CineramaScrapperService();
			const moviesList = await cineramaService.getMovies();
			return SuccessResponse(res, moviesList);
		}catch(e){ 
			next(e);
		}
	};
}