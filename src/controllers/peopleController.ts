import { pool } from '../index'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CrearPersonaDto, editPersonDto } from '../dtos/peopleDTO';

export async function obtenerPersonas() {
  const result = await pool.query('SELECT * FROM personas ORDER BY id');
  return result.rows;
}

export async function obtenerPersonaPorId(id: number) {
    const result = await pool.query('SELECT * FROM personas WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function crearPersona(nuevaPersona:CrearPersonaDto) {
  const dto = plainToInstance(CrearPersonaDto, nuevaPersona);
  const errors = await validate(dto);
  
  if (errors.length > 0) {
    const detalles = errors.map(err => ({
      campo: err.property,
      errores: err.constraints
    }));
    throw {
      mensaje: 'Datos inválidos',
      detalles
    };
  }
  const result = await pool.query(
      'INSERT INTO personas (nombre,edad,correo) VALUES ($1,$2,$3) RETURNING *',
      [dto.nombre,dto.edad,dto.correo]
  );
  return result.rows[0];
}

export async function editPerson(personToEdit: editPersonDto) {
  const dto = plainToInstance(editPersonDto, personToEdit);
  const errors = await validate(dto);
  const beforeResult = await pool.query('SELECT * FROM personas WHERE id = $1', [dto.id]);
  const personaAntes = beforeResult.rows[0];

  if (errors.length > 0) {
    const details = errors.map(err => ({
      field: err.property,
      errors: err.constraints
    }));
    throw {
      mensaje: 'Datos inválidos',
      details
    };
  }

  if (!personaAntes) {
    throw new Error('Persona no encontrada');
  }

  const afterResult = await pool.query(
    'UPDATE personas SET nombre=$2, edad=$3, correo=$4 WHERE id=$1 RETURNING *',
    [dto.id, dto.nombre, dto.edad, dto.correo]
  );
  const personaDespues = afterResult.rows[0];

  return { antes: personaAntes, despues: personaDespues };
}


export async function deletePerson(id: number) {
  const result = await pool.query(
    'DELETE FROM personas WHERE id=$1 RETURNING *',
    [id]
  );
  if (result.rowCount === 0) {
    throw new Error(`No se encontró ninguna persona con el id ${id}`);
  }
  return result.rows[0];
}
