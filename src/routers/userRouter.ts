import { Request, Response } from 'express';
import { getUsers, getUserById, createUser, editUser, deleteUser } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.get('/user', async (req: Request, res: Response) => {
    const data = await getUsers();
    res.json(data);
});

router.get('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await getUserById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ mensaje: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error from database' });
  }
});


router.post('/user', async (req: Request, res: Response) => {
  const newUser = req.body;

  try {
    const createdUser = await createUser(newUser);
    res.status(201).json(createdUser);
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

router.put('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editedUser = req.body;

  try {
    const result = await editUser({ id, ...editedUser });
    res.json(result);
  } catch (error) {
    res.status(404).json({ mensaje: 'User not found' });
  }
});

router.delete('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await deleteUser(id);
    res.json({ mensaje: 'User deleted', persona: deletedUser });
  } catch (error) {
    res.status(404).json({ mensaje: 'User not found' });
  }
});

export const userRouter = router;