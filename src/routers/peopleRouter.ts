import { Request, Response } from 'express';
import { obtenerPersonas } from '../controllers/peopleController';
import { personas } from '../configs/data-source';
import { Router } from 'express';

const router = Router();

router.get('/personas', async (req: Request, res: Response) => {
    const datos = await obtenerPersonas();
    res.json(datos);
});

router.get('/personas/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const persona = personas[id];

  if (persona) {
    res.json(persona);
  } else {
    res.status(404).json({ error: "Persona no encontrada" });
  }
});

export const peopleRouter = router;