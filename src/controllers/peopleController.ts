import { pool } from '../index'

export async function obtenerPersonas() {
  const result = await pool.query('SELECT * FROM personas ORDER BY id');
  return result.rows;
}

export async function obtenerPersonaPorId(id: number) {
    const result = await pool.query('SELECT * FROM personas WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function crearPersona(nuevaPersona:{nombre: string; edad: number; correo: string }) {
    const { nombre, edad, correo } = nuevaPersona;
    const result = await pool.query(
        'INSERT INTO personas (nombre,edad,correo) VALUES ($1,$2,$3) RETURNING *',
        [nombre,edad,correo]
    );
    return result.rows[0];
}

export async function editPerson(personToEdit: { id: number; nombre: string; edad: number; correo: string }) {
    const { id, nombre, edad, correo } = personToEdit;
    const result = await pool.query(
        'UPDATE personas SET nombre=$2,edad=$3,correo=$4 WHERE id=$1 RETURNING *',
        [id,nombre,edad,correo]
    );
    return result.rows[0];
}

export async function deletePerson(id: number) {
    const result = await pool.query(
        'DELETE FROM personas WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
}

