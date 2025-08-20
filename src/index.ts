import { promises } from 'dns';
import express, { Request, Response } from 'express';
import rootRouter from './routers/rootRouter';
import { resolve } from 'path';
import { Pool } from 'pg';

const app = express();
const PORT = 3000;
export const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'persona',
  password: 'root',
  port: 5432,
});

app.use(express.json());

app.use('/api', rootRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

pool.connect()
  .then(() => {
    console.log('✅ Conectado a la base de datos PostgreSQL');
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err);
  });

// const persona = {
//   nombre: "Julian",
//   edad: 30,
//   correo: "julian@example.com"
// };

// // Función asincrónica que simula obtener datos con una promesa
// async function obtenerPersona(): Promise<typeof persona> {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(persona);
//     }, 1000); // Simula 1 segundo de espera
//   });
// }

// // Ruta /persona
// app.get('/persona', async (req: Request, res: Response) => {
//   const datos = await obtenerPersona();
//   res.json(datos);
// });