import { Router } from 'express';
import { peopleRouter } from './peopleRouter';
import { userRouter } from './userRouter';
import { propertyRouter } from './propertyRouter';

const router = Router();

router.use('/user', userRouter);
router.use('/property', propertyRouter);
router.use('/people', peopleRouter);

export default router;