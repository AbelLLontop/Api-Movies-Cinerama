import axios from 'axios';
import {Request, Response, Router} from 'express';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import cherio from 'cherio';
const router = Router();
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
router.use('/movies',
	router.get('/list', async (req: Request, res: Response) => {
		const response = axios.get('http://www.cinerama.com.pe/cartelera_cine/CINERAMA_CHIMBOTE');
		const moviesList: Movie[] = [];
		const html = (await response).data;
		const $ = cherio.load(html, null, false);
		const $movies = $('.row.flexbox-center');

		$movies.each((index, $movie) => {
			const movie: Movie = {
				img: '',
				title: '',
				types: [],
				director: '',
				duracion: '',
				fechaEstreno: '',
				reparto: '',
				sinopsis: '',
				horarios: [],
			};

			const img = $($movie).find('img').attr('src');
			movie.img = img;
			const title = $($movie).find('.transformers-content h2').text();
			movie.title = title;
			const types:any[]= [];
			const typesObject = $($movie).find('.transformers-content p .btn');

			typesObject.each((index, type) => {
				const typetext = $(type).text();
				types.push(typetext);
			});

			movie.types = types;

			const listasDatos = $($movie).find(
				'.transformers-content ul li .transformers-right'
			);

			listasDatos.each((index, lista) => {
				if (index === 0) {	
					const director = $(lista).text().trim(); 
					movie.director = director; 
					console.log('dfsdf');
				}
				if (index === 1) {
					const duracion = $(lista).text().trim(); movie.duracion = duracion;
			
				}
				if (index === 2) {
					const fechaEstreno = $(lista).text().trim();
					movie.fechaEstreno = fechaEstreno;
				}
				if (index === 3) {
					const reparto = $(lista).text().trim();
					movie.reparto = reparto;
				}
				if (index === 4) {
					const sinopsis = $(lista).find('.text-justify').text().trim();
					movie.sinopsis = sinopsis;
				}
				if (index === 5) {
					const horarios:any[]= [];
					const horariosObject = $(lista).find('.btn');
					horariosObject.each((index, horario) => {
						const horarioText = $(horario).text().trim();
						horarios.push(horarioText);
					});
					movie.horarios = horarios;
				}
			});
			moviesList.push(movie);
		});

		return res.json(moviesList);
	})
);

export default router;
