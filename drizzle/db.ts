//import { drizzle } from "drizzle-orm/pg-proxy";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

import * as schema from "@/drizzle/schema/schema";
import * as relations from "@/drizzle/schema/relations";

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

(async () => {
  // Your code with top-level await goes here
  await client.connect();
})();
export const db = drizzle(client, { schema: { ...schema, ...relations } });
