import { pool } from '../index'

export async function getProperties() {
  const result = await pool.query('SELECT * FROM property ORDER BY id');
  return result.rows;
}

export async function getPropertyById(id: number) {
    const result = await pool.query('SELECT * FROM property WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function createProperty(nuevaPersona:{nombre: string; edad: number; correo: string }) {
    const { nombre, edad, correo } = nuevaPersona;
    const result = await pool.query(
        'INSERT INTO property (nombre,edad,correo) VALUES ($1,$2,$3) RETURNING *',
        [nombre,edad,correo]
    );
    return result.rows[0];
}

export async function editProperty(personToEdit: { id: number; nombre: string; edad: number; correo: string }) {
  const { id, nombre, edad, correo } = personToEdit;

  const beforeResult = await pool.query('SELECT * FROM property WHERE id = $1', [id]);
  const personaAntes = beforeResult.rows[0];

  if (!personaAntes) {
    throw new Error('Persona no encontrada');
  }
  
  const afterResult = await pool.query(
    'UPDATE property SET nombre=$2, edad=$3, correo=$4 WHERE id=$1 RETURNING *',
    [id, nombre, edad, correo]
  );
  const personaDespues = afterResult.rows[0];

  return { antes: personaAntes, despues: personaDespues };
}

export async function deleteProperty(id: number) {
    const result = await pool.query(
        'DELETE FROM property WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
}

