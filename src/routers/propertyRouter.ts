import { Request, Response } from 'express';
import { crearPersona, deletePerson, editPerson, obtenerPersonaPorId } from '../controllers/peopleController';
import { Router } from 'express';
import { getProperties } from '../controllers/propertyController';

const router = Router();

router.get('/property', async (req: Request, res: Response) => {
    const datos = await getProperties();
    res.json(datos);
});

router.get('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const persona = await obtenerPersonaPorId(id);
    if (persona) {
      res.json(persona);
    } else {
      res.status(404).json({ mensaje: 'Persona no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al consultar la base de datos' });
  }
});


router.post('/property', async (req: Request, res: Response) => {
  const nuevaPersona = req.body;

  try {
    const personaCreada = await crearPersona(nuevaPersona);
    res.status(201).json(personaCreada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la persona' });
  }
});

router.put('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editedPerson = req.body;

  try {
    const resultado = await editPerson({ id, ...editedPerson });
    res.json(resultado);
  } catch (error) {
    res.status(404).json({ mensaje: 'Persona no encontrada' });
  }
});

router.delete('/property/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const personaEliminada = await deletePerson(id);
    res.json({ mensaje: 'Persona eliminada', persona: personaEliminada });
  } catch (error) {
    res.status(404).json({ mensaje: 'Persona no encontrada' });
  }
});

export const propertyRouter = router;