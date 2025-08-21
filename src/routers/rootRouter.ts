import { Router } from 'express';
import { peopleRouter } from './peopleRouter';
import { userRouter } from './userRouter'

const router = Router();

router.use('/user', userRouter);
router.use('/people', peopleRouter);

export default router;