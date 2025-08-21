import { pool } from '../index'

export async function getUsers() {
  const result = await pool.query('SELECT * FROM "user" ORDER BY id');
  return result.rows;
}

export async function getUserById(id: number) {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function createUser(newUser:{
  name_s: string; last_name: string; m_sur_name: string;
  email: string; password: string; role: string[] 
}) {
    const { name_s, last_name, m_sur_name, email, password, role } = newUser;
    const result = await pool.query(
        `INSERT INTO "user" (
          name_s,
          last_name,
          m_sur_name,
          email,
          "password",
          "role"
        ) VALUES (
          $1, $2, $3, $4, $5, $6
        ) RETURNING *`,
        [name_s, last_name, m_sur_name, email, password, role]
    );
    return result.rows[0];
}

export async function editUser(userToEdit: { 
  id: number; name_s: string; last_name: string; m_sur_name: string;
  email: string; password: string; role: string[] 
}) {
  const { id, name_s, last_name, m_sur_name, email, password, role } = userToEdit;

  const beforeResult = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
  const userBefore = beforeResult.rows[0];

  if (!userBefore) {
    throw new Error('User not found');
  }
  
  const afterResult = await pool.query(
    `UPDATE "user" SET
      name_s = $2,
      last_name = $3,
      m_sur_name = $4,
      email = $5,
      "password" = $6,
      "role" = $7
    WHERE id = $1
    RETURNING *`,
    [id, name_s, last_name, m_sur_name, email, password, role]
  );
  const userAfter = afterResult.rows[0];

  return { before: userBefore, after: userAfter };
}

export async function changeUserPassword(id: number, newPassword: string) {
  const userResult = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
  const user = userResult.rows[0];
  if (!user) {
    throw new Error('User not found');
  }
  const updateResult = await pool.query(
    `UPDATE "user" SET "password" = $2 WHERE id = $1 RETURNING *`,
    [id, newPassword]
  );
  return updateResult.rows[0];
}

export async function deleteUser(id: number) {
    const result = await pool.query(
        'DELETE FROM "user" WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
}

