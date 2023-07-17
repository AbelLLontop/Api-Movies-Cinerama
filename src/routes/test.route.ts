import { Request, Response, Router } from 'express';

const router = Router();

router.get('/test', (req: Request, res: Response) => {
	res.send('FUNCIONO');
});

export default router;
