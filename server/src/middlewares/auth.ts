import jwt from "../lib/jwt";
import { Request, Response, NextFunction } from "express";
import { UserSchema } from "../schemas/user.schema";

export interface AuthRequest extends Request {
  user?: UserSchema;
}

export default (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado: token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token) as UserSchema;
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token inválido o expirado" });
  }
}