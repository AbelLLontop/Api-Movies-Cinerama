import mongoose from 'mongoose';
const movieSchema = new mongoose.Schema({
	img: String,
	title: String,
	types: [String],
	director: String,
	duracion: String,
	fechaEstreno: String,
	reparto: String,
	sinopsis: String,
	horarios: [String],
	extra: {
		id: Number,
		title: String,
		backdrop_path: String,
		poster_path: String,
		trailer: {
			key: String,
			id: String
		}
	}
});

export const Movie = mongoose.model('Movie', movieSchema);