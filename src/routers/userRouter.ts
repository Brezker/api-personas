import { Request, Response } from 'express';
import { authenticateJWT } from '../middlewares/jwtMiddleware';
import { loginUser, checkRole, getUsers, getUserById, createUser, 
  editUser, deleteUser, changeUserPassword } from '../controllers/userController';
import { Router } from 'express';

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }
  try {
    const { token, user } = await loginUser(email, password);
    res.json({ token, user });
  } catch (error) {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

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
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error from database' });
  }
});

router.post(
  '/user',
  authenticateJWT,
  checkRole(['admin', 'agent']),
  async (req, res) => {
    try {
      const creator = (req as any).user;
      const newUser = req.body;
      const createdUser = await createUser(newUser, creator);
      res.status(201).json(createdUser);
    } catch (error:any) {
      if (error.details) {
        res.status(400).json({
          error: error.message,
          details: error.details
        });
      } else {
        res.status(500).json({ 
          message: error instanceof Error ? error.message : 'Internal error creating user',
          details: error.message || error 
        });
      }
    }
  }
);

router.put('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editedUser = req.body;

  try {
    const result = await editUser({ id, ...editedUser });
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.patch('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const { password } = req.body;
  if (!password) {
    return res.status(400).json({ message: 'Password is required' });
  }
  try {
    const updatedUser = await changeUserPassword(id, password);
    res.json(updatedUser);
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

router.delete('/user/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedUser = await deleteUser(id);
    res.json({ message: 'User deleted', persona: deletedUser });
  } catch (error) {
    res.status(404).json({ message: 'User not found' });
  }
});

export const userRouter = router;