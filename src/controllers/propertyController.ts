import { pool } from '../index'
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { createPropertyDto, editPropertyDto } from '../dtos/propertyDTOs';

export async function getProperties() {
  const result = await pool.query('SELECT * FROM property ORDER BY id');
  return result.rows;
}

export async function getPropertyById(id: number) {
    const result = await pool.query('SELECT * FROM property WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function createProperty(
  newProperty: createPropertyDto
) {
    const dto= plainToInstance(createPropertyDto, newProperty);
    const errors = await validate(dto);
    if (errors.length > 0) {
      const details = errors.map(err => ({
        field: err.property,
        errors: err.constraints
      }));
      throw {
        message: 'Invalid data',
        details
      };
    }
    const result = await pool.query(
      `INSERT INTO property (
        title,
        description,
        transaction_type,
        status,
        currency,
        sale_price,
        rent_price,
        deposit,
        commission_rate,
        province,
        sector,
        latitude,
        longitude,
        has_parking,
        parking_spaces,
        is_furnished,
        video_url,
        virtual_tour_url,
        agent_id,
        broker_id,
        created_by,
        property_type,
        created_at,
        updated_at
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, NOW(), NOW()
      ) RETURNING *;`,
      [
        dto.title,
        dto.description,
        dto.transaction_type,
        dto.status,
        dto.currency,
        dto.sale_price,
        dto.rent_price,
        dto.deposit,
        dto.commission_rate,
        dto.province,
        dto.sector,
        dto.latitude,
        dto.longitude,
        dto.has_parking,
        dto.parking_spaces,
        dto.is_furnished,
        dto.video_url,
        dto.virtual_tour_url,
        dto.agent_id,
        dto.broker_id,
        dto.created_by,
        dto.property_type,
        // updated_at,
      ]
  );
  return result.rows[0];
}

export async function editProperty(
  updatedProperty: editPropertyDto
) {
  const { id, ...fieldsToUpdate } = updatedProperty;

  const beforeResult = await pool.query('SELECT * FROM property WHERE id = $1', [id]);
  const propertyBefore = beforeResult.rows[0];

  if (!propertyBefore) {
    throw new Error('Property not found');
  }

  const keys = Object.keys(fieldsToUpdate);
  const values = Object.values(fieldsToUpdate);

  if (keys.length === 0) {
    throw new Error('Update properties where not provided');
  }

  const setClause = keys.map((key, index) => `${key} = $${index + 2}`).join(', ');

  const query = `UPDATE property SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`;

  const result = await pool.query(query, [id, ...values]);
  const propertyAfter = result.rows[0];

  return { antes: propertyBefore, despues: propertyAfter };
}

export async function deleteProperty(id: number) {
    const result = await pool.query(
        'DELETE FROM property WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
}

