import axios from 'axios';
import cherio from 'cherio';

interface Movie {
	img: string;
	title: string;
	types: string[];
	director: string;
	duracion: string;
	fechaEstreno: string;
	reparto: string;
	sinopsis: string;
	horarios: string[];
}
export class CineramaScrapper {
	constructor(
		private api = axios.create({
			baseURL: 'http://www.cinerama.com.pe',
		})
	) {}
	getMovies = async () => {
		const response = await this.api.get('/cartelera_cine/CINERAMA_CHIMBOTE');
		const moviesList: Movie[] = [];
		const html = (await response).data;
		const $ = cherio.load(html, null, false);

		$('.row.flexbox-center').each((index, $movie) => {

			const movie: Movie = {
				img: $($movie).find('img').attr('src'),
				title: $($movie).find('.transformers-content h2').text().replace('(PREVENTA)', '').trim(),
				types: [],
				director: '',
				duracion: '',
				fechaEstreno: '',
				reparto: '',
				sinopsis: '',
				horarios: [],
			};

			$($movie)
				.find('.transformers-content p .btn')
				.each((index, type) => {
					movie.types.push($(type).text());
				});
			const data = 	$($movie).find('.transformers-content ul li .transformers-right').toArray();
			movie.director=$(data[0]).text().trim();
			movie.duracion=$(data[1]).text().trim();
			movie.fechaEstreno=$(data[2]).text().trim();
			movie.reparto=$(data[3]).text().trim();
			movie.sinopsis =$(data[4]).find('.text-justify').text().trim();
			$(data[5]).find('.btn').each((index, horario) => {
				movie.horarios.push($(horario).text().trim());
			});
			moviesList.push(movie);
		});
		return moviesList;
	};
}
