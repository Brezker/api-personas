import { Router } from 'express';
import { peopleRouter } from './peopleRouter';

const router = Router();

router.use('/people', peopleRouter);

export default router;