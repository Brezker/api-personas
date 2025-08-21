import { Request, Response, NextFunction } from 'express';
import { pool } from '../index'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    throw new Error('Email y contraseña son requeridos');
  }

  const result = await pool.query('SELECT * FROM "user" WHERE email = $1', [email]);
  const user = result.rows[0];

  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error('Credenciales inválidas');
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET no está definida en el archivo .env');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    jwtSecret,
    { expiresIn: '1h' }
  );

  const { password: _, ...safeUser } = user;

  return { token, user: safeUser };
}

export function checkRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || !Array.isArray(user.role) || !user.role.some((r: string) => allowedRoles.includes(r))) {
      return res.status(403).json({ message: 'Denied access: unauthorized role' });
    }

    next();
  };
}

export async function getUsers() {
  const result = await pool.query('SELECT * FROM "user" ORDER BY id');
  return result.rows;
}

export async function getUserById(id: number) {
    const result = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
    return result.rows[0] || null;
}

export async function createUser(
  newUser: {
    name_s: string;
    last_name: string;
    m_sur_name: string;
    email: string;
    password: string;
    role: string[];
  },
  creator: { role:string[] }
) {
  const { name_s, last_name, m_sur_name, email, password, role } = newUser;
  const allowedRoles = ['admin', 'agent', 'client'];

  if (!Array.isArray(role) || !role.every((r) => allowedRoles.includes(r))) {
    throw new Error('Invalid role');
  }
  
  if (creator.role.includes('agent') && !role.every((r) => r === 'client')) {
    throw new Error('Can not create this role type');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
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
    [name_s, last_name, m_sur_name, email, hashedPassword, role]
  );

  const { password: _, ...safeUser } = result.rows[0];

  return safeUser;
}

export async function editUser(userToEdit: {
  id: number;
  name_s: string;
  last_name: string;
  m_sur_name: string;
  email: string;
  password: string;
  role: string[];
}) {
  const { id, name_s, last_name, m_sur_name, email, password, role } = userToEdit;

  const beforeResult = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
  const userBefore = beforeResult.rows[0];

  if (!userBefore) {
    throw new Error('User not found');
  }
  
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

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
    [id, name_s, last_name, m_sur_name, email, hashedPassword, role]
  );

  const { password: _, ...userAfter } = afterResult.rows[0];
  const { password: __, ...userBeforeSafe } = userBefore;

  return { before: userBeforeSafe, after: userAfter };
}

export async function changeUserPassword(id: number, newPassword: string) {
  const userResult = await pool.query('SELECT * FROM "user" WHERE id = $1', [id]);
  const user = userResult.rows[0];

  if (!user) {
    throw new Error('User not found');
  }

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

  const updateResult = await pool.query(
    `UPDATE "user" SET "password" = $2 WHERE id = $1 RETURNING *`,
    [id, hashedPassword]
  );

  const { password: _, ...safeUser } = updateResult.rows[0];
  return safeUser;
}


export async function deleteUser(id: number) {
    const result = await pool.query(
        'DELETE FROM "user" WHERE id=$1 RETURNING *', [id]
    );
    return result.rows[0];
}

