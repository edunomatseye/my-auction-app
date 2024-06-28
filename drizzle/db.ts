//import { drizzle } from "drizzle-orm/pg-proxy";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";

export const dbs = async (
  sql: any,
  params: any,
  method: any
): Promise<{ rows: any }> => {
  try {
    const response = await fetch("http://localhost:3000/query", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        sql,
        params,
        method,
      }),
    });
    const rows = await response.json();

    return { rows };
  } catch (e: any) {
    console.error("Error from pg proxy server: ", e.message);

    return { rows: [] };
  }
};

export const client3 = new Client({
  connectionString: "postgres://postgres:Admin123@localhost:5432/auctions",
});

// or
export const client = new Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "Admin123",
  database: "auctions",
  ssl: false,
});

(async () => {
  // Your code with top-level await goes here
  await client.connect();
})();
export const db = drizzle(client);
