import { uuid, text, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: varchar({ length: 255 }).notNull(),
	username: varchar({ length: 255 }).notNull().unique(),
	password: text().notNull(),
	role: varchar({ length: 255 }).notNull().default("user"),
});

export const customersTable = pgTable("customers", {
	id: uuid("id").primaryKey().defaultRandom(),
	documentType: varchar("document_type", { length: 10 }).notNull(),
	documentNumber: varchar("document_number", { length: 20 }).notNull().unique(),
	name: varchar({ length: 100 }).notNull(),
	tradeName: varchar({ length: 255 }),
	address: text(),
	department: varchar({ length: 50 }),
	province: varchar({ length: 50 }),
	district: varchar({ length: 50 }),
	phone: varchar({ length: 20 }),
	email: varchar({ length: 100 }),
})