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
export class CineramaScrapperService {
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
				title: $($movie).find('.transformers-content h2').text(),
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
					const typetext = $(type).text();
					movie.types.push(typetext);
				});

			$($movie)
				.find('.transformers-content ul li .transformers-right')
				.each((index, lista) => {
					switch (index) {
						case 0: {
							movie.director = $(lista).text().trim();
							break;
						}
						case 1:
							movie.duracion = $(lista).text().trim();
							break;
						case 2:
							movie.fechaEstreno = $(lista).text().trim();
							break;
						case 3:
							movie.reparto = $(lista).text().trim();
							break;
						case 4:
							movie.sinopsis = $(lista).find('.text-justify').text().trim();
							break;
						case 5: {
							const horarios: any[] = [];
							const horariosObject = $(lista).find('.btn');
							horariosObject.each((index, horario) => {
								const horarioText = $(horario).text().trim();
								horarios.push(horarioText);
							});
							movie.horarios = horarios;
							break;
						}
					}
				});
			moviesList.push(movie);
		});
		return moviesList;
	};
}
