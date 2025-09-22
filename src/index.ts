import express from 'express';
import rootRouter from './routers/rootRouter';
import { Pool } from 'pg';
import { setupSwagger } from './configs/swagger';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
setupSwagger(app);
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
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 Documentación Swagger en http://localhost:${PORT}/api-docs`)
});

pool.connect()
  .then(() => {
    console.log('✅ Connected to PostgreSQL DataBase');
  })
  .catch((err) => {
    console.error('❌ Error al connecting to DataBase:', err);
  });
