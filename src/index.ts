import express, { Request, Response } from 'express';
import rootRouter from './routers/rootRouter';
import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3000;
export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

app.use(express.json());

app.use('/api', rootRouter);

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
