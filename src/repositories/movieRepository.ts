import { Movie } from '../models/movie';

export class MovieRepository{
	async getMovies(){
		const movies = await Movie.find();
		return movies;
	}
	async cleanMovies(){
		await Movie.deleteMany();
	}
	async saveMovies(movies:any[]){
		const moviesToSave = movies.map((movie)=>new Movie(movie));
		await Movie.insertMany(moviesToSave);
	}
}