import { Request, Response } from "express";
import db from "../db/index";
import { usersTable } from "../db/schema";

export const getAllUsers = async (_req: Request, res: Response) => {
  const users = await db
    .select({
      id: usersTable.id,
      name: usersTable.name,
      username: usersTable.username,
      role: usersTable.role,
    })
    .from(usersTable);
  res.status(200).json({ users });
};
