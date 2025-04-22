import { NextFunction, Request, Response } from 'express';
import db from '../db/index';
import { eq } from 'drizzle-orm';
import { customersTable } from '../db/schema';

export const getAllCustomers = async (_req: Request, res: Response) => {
  const customers = await db.select().from(customersTable);
  res.status(200).json({ customers });
}

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
  const { documentNumber } = req.body;

  try {
    const [existingDocument] = await db
      .select()
      .from(customersTable)
      .where(eq(customersTable.documentNumber, documentNumber));

    if (existingDocument) {
      res.status(400).json({ error: 'El número de documento ingresado ya existe' });
      return;
    }

    const customer = await db.insert(customersTable).values(req.body).returning()

    res.status(200).json({ message: 'Cliente creado', customer });
  } catch (error) {
    next(error);
  }
}

export const updateCustomer = async (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: 'update customer' });
}

