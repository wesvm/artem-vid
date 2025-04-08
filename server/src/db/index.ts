import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { usersTable } from './schema';
const db = drizzle(process.env.DATABASE_URL!);

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: 'admin',
    username: 'admin',
    password: '$2a$10$gwis3cOJXzW043kWCmZ/5.p0RvpE.X4Ki0xnBz/LE6biP1qhHKbES',
    role: 'admin',
  };
  await db.insert(usersTable).values(user);
  console.log('New user created!')
}

//main();

export default db