import "dotenv/config";
//import { drizzle } from "drizzle-orm/pg-proxy";
// import { Pool } from "pg";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/drizzle/schema/schema";
import * as relations from "@/drizzle/schema/relations";

// export const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
// });

// export const db = drizzle(pool, { schema: { ...schema, ...relations } });

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const migrationClient = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema: { ...schema, ...relations } });
