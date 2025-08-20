import { Router } from 'express';
import { peopleRouter } from './peopleRouter';

const router = Router();

// Routers extras
router.use('/people', peopleRouter);

export default router;