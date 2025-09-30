// server/db.ts  — ლოკალური PostgreSQL (TCP) ვერსია
import 'dotenv/config';
import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL must be set.');
}

// ლოკალურზე SSL საერთოდ არ გჭირდება:
export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });
