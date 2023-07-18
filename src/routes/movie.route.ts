import { Router } from 'express';
import { MovieController } from '../controllers/MoviesController';

const router = Router();
const moviesController = new MovieController();

router.use('/movies', router.get('/list', moviesController.getMovies));

export default router;
