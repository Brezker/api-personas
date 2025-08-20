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
//   const persona = personas[id]; // para tomar el index del arreglo
  const persona = personas.find(p => p.id === id);

  if (persona) {
    res.json(persona);
  } else {
    res.status(404).json({ error: "Persona no encontrada" });
  }
});

router.post('/personas', (req: Request, res: Response) => {
  const nuevaPersona = req.body;

  // Generar un nuevo ID automáticamente
  const nuevoId = personas.length > 0 ? personas[personas.length - 1].id + 1 : 1;
  const personaConId = { id: nuevoId, ...nuevaPersona };

  personas.push(personaConId);

  res.status(201).json(personaConId);
});

// PUT: Reemplazo completo de una persona
router.put('/personas/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const nuevaPersona = req.body;

  const index = personas.findIndex(p => p.id === id); // index revisa long del arreglo

  if (index === -1) {
    return res.status(404).json({ mensaje: 'Persona no encontrada' });
  }

  // Reemplazar completamente la persona
  personas[index] = { id, ...nuevaPersona };

  res.json(personas[index]);
});

router.delete('/personas/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    
    const index = personas.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ mensaje: 'Persona no encontrada' });
    }

    // Eliminar la persona del arreglo
    const personaEliminada = personas.splice(index, 1)[0];

    res.json({ mensaje: 'Persona eliminada', persona: personaEliminada });
    });

  
//   const persona = personas.find(p => p.id === id);

//   if (persona) {
//     const personaEliminada = personas.splice(persona.id, 1)[0];
//     res.json({ mensaje: 'Persona eliminada', persona: personaEliminada });
//   } else {
//     res.status(404).json({ error: "Persona no encontrada" });
//   }
// });

export const peopleRouter = router;