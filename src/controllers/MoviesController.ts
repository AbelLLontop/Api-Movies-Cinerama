import { NextFunction, Request, Response } from 'express';
import { MoviesService } from '../services/MoviesService';
import { SuccessResponse } from '../handlers/ResponseHandlers';

export class MovieController{
	constructor(
	){}

	getMovies = async (req:Request, res:Response, next:NextFunction) => {
		try{
			const moviesService = new MoviesService();
			const moviesList = await moviesService.getMovies();
			return SuccessResponse(res, moviesList);
		}catch(e){ 
			next(e);
		}
	};
	
}