import { promises } from 'dns';
import express, { Request, Response } from 'express';
import rootRouter from './routers/rootRouter';
import { resolve } from 'path';

const app = express();
const PORT = 3000;

const persona = {
  nombre: "Julian",
  edad: 30,
  correo: "julian@example.com"
};

// Función asincrónica que simula obtener datos con una promesa
async function obtenerPersona(): Promise<typeof persona> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(persona);
    }, 1000); // Simula 1 segundo de espera
  });
}

// Ruta /persona
app.get('/persona', async (req: Request, res: Response) => {
  const datos = await obtenerPersona();
  res.json(datos);
});



app.use(express.json());

app.use('/api', rootRouter);


// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
