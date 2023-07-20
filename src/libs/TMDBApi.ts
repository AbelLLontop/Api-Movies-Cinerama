import axios from 'axios';

export class TMDBApi {
	constructor(
		private api = axios.create({
			baseURL: 'https://api.themoviedb.org/3',
			headers: {
				'Content-Type': 'application/json;charset=utf-8',
				Authorization:
					`Bearer ${process.env.TMDB_API_KEY}`,
			},
		})
	) {}
	searchMovie = async (query: string) => {
		const response = await this.api.get(`/search/movie`, {
			params: {
				query,
				language: 'es-mx',
				page: 1,
			}
		});
		const moviesList = response.data.results;
		const movie = moviesList[0];
		if(movie){
			movie.backdrop_path = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
			movie.poster_path = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
		}
		const trailer = await this.getLastTrailer(movie.id);
		const movieFinal:any = {
			id: movie.id,
			title: movie.title,
			backdrop_path: movie.backdrop_path,
			poster_path: movie.poster_path,
			trailer: null
		};
		
		if(trailer){
			movieFinal.trailer = {
				key: trailer.key,
				id: trailer.id
			};
		}
		return movieFinal;
	};
	getLastTrailer = async (movieId: string) => {
		const response = await this.api.get(`/movie/${movieId}/videos`, {
			params: {
				language: 'es-mx',
			}
		});
		const trailers = response.data.results;
		const trailer = trailers[0];
		return trailer;
	};
}
