import { Request, Response, Router } from 'express';
import { createProperty, getProperties, getPropertyById, editProperty, deleteProperty } from '../controllers/propertyController';

const router = Router();

router.get('/property', async (req: Request, res: Response) => {
    const datos = await getProperties();
    res.json(datos);
});

router.get('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const persona = await getPropertyById(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ mensaje: 'Property not found' });
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
    res.status(404).json({ mensaje: 'Propiedad no encontrada' });
  }
});

router.delete('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const deletedProperty = await deleteProperty(id);
    res.json({ mensaje: 'Propiedad eliminada', persona: deletedProperty });
  } catch (error) {
    res.status(404).json({ mensaje: 'Propiedad no encontrada' });
  }
});

export const propertyRouter = router;