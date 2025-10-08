import { Request, Response, Router } from 'express';
import { createProperty, getProperties, getPropertyById, editProperty, deleteProperty } from '../controllers/propertyController';

const router = Router();

router.get('/property', async (req: Request, res: Response) => {
    const data = await getProperties();
    res.json(data);
});

router.get('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const property = await getPropertyById(id);
    if (property) {
      res.json(property);
    } else {
      res.status(404).json({ message: 'Property not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error quering data' });
  }
});


router.post('/property', async (req: Request, res: Response) => {
  const newProperty = req.body;
  try {
    const createdProperty = await createProperty(newProperty);
    res.status(201).json(createdProperty);
  } catch (error) {
    res.status(500).json({ error: 'Error creating property' });
    console.log(error);
  }
});

router.put('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editedProperty = req.body;

  try {
    const result = await editProperty({ id, ...editedProperty });
    res.json(result);
  } catch (error) {
    res.status(404).json({ message: 'Property not found' });
  }
});

router.delete('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedProperty = await deleteProperty(id);
    res.json({ message: 'Property deleted', persona: deletedProperty });
  } catch (error) {
    res.status(404).json({ message: 'Property not found' });
  }
});

export const propertyRouter = router;