import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "@/drizzle/schema/schema";
import * as relations from "@/drizzle/schema/relations";

const connectionString = process.env.SUPABASE_DIRECT_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, { prepare: false });

export const migrationClient = postgres(connectionString, { max: 1 });
export const db = drizzle(client, { schema: { ...schema, ...relations } });
