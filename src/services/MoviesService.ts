import { CineramaScrapper } from '../libs/CineramaScrapper';
import { TMDBApi } from '../libs/TMDBApi';
import { MovieRepository } from '../repositories/movieRepository';

export class MoviesService {
	constructor(private moviesRepository = new MovieRepository()){}
	getMovies = async () => {
		const movies = await this.moviesRepository.getMovies();
		return movies;
	};
	getAndSaveAllMoviesByScrapper = async () => {
		const cineramaScrapper = new CineramaScrapper();
		const moviesList = await cineramaScrapper.getMovies();
		const moviesWithExtra = await this.fetchExtraMovieData(moviesList);
		await this.moviesRepository.cleanMovies();
		await this.moviesRepository.saveMovies(moviesWithExtra);
		return moviesWithExtra;
	};
	private fetchExtraMovieData = async (movieList:any[]) => {
		const tmdbapi = new TMDBApi();
		const asyncMapMovies = movieList.map(async (movie) => {
			const movieTMDB = await tmdbapi.searchMovie(movie.title);
			return {
				...movie,
				extra: movieTMDB,
			};
		});
		return Promise.all([...asyncMapMovies]);

	};
}
