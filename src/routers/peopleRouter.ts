import { Request, Response } from 'express';
import { crearPersona, deletePerson, editPerson, obtenerPersonaPorId, obtenerPersonas } from '../controllers/peopleController';
import { Router } from 'express';

const router = Router();

router.get('/personas', async (req: Request, res: Response) => {
    const datos = await obtenerPersonas();
    res.json(datos);
});

router.get('/personas/:id', async (req: Request, res: Response) => {
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


router.post('/personas', async (req: Request, res: Response) => {
  const nuevaPersona = req.body;

  try {
    const personaCreada = await crearPersona(nuevaPersona);
    res.status(201).json(personaCreada);
  } catch (error: any) {
    if (error.detalles) {
      res.status(400).json({
        error: error.mensaje,
        detalles: error.detalles
      });
    } else {
      res.status(500).json({
        error: 'Error interno al crear la persona',
        detalles: error.message || error
      });
    }
  }
});

router.put('/personas/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const editedPerson = req.body;

  try {
    const resultado = await editPerson({ id, ...editedPerson });
    res.json(resultado);
  } catch (error: any) {
    if (error.detalles) {
      res.status(400).json({
        error: error.mensaje,
        detalles: error.detalles
      });
    } else {
      res.status(500).json({
        error: 'Error interno al editar la persona',
        detalles: error.message || error
      });
    }
  }
});

router.delete('/personas/:id', async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const personaEliminada = await deletePerson(id);
    res.json({ mensaje: 'Persona eliminada', persona: personaEliminada });
  } catch (error) {
    res.status(404).json({ mensaje: 'Persona no encontrada' });
  }
});

export const peopleRouter = router;