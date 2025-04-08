import bcrypt from 'bcrypt';
import db from '../db/index';
import { eq } from 'drizzle-orm';
import { usersTable } from '../db/schema';
import { Request, Response } from 'express';
import jwt from '../lib/jwt';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: 'El usuario y contraseña son requeridos' });
    return;
  }

  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.username, username));

  if (!user) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(401).json({ error: 'Credenciales inválidas' });
    return;
  }

  const token = jwt.sign({
    id: user.id,
    username: user.username,
    name: user.name,
    role: user.role
  });

  res.status(200).json({
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      role: user.role
    },
    token
  });
}