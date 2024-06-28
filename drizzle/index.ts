import { drizzle } from "drizzle-orm/pg-proxy";

export const db = drizzle(async (sql: any, params: any, method: any) => {
  try {
    const response = await fetch("http://localhost:3000/query", {
      method: "POST",
      body: JSON.stringify({
        sql,
        params,
        method,
      }),
    });
    const rows = await response.json();

    return { rows: rows.data };
  } catch (e: any) {
    console.error("Error from pg proxy server: ", e.response.data);

    return { rows: [] };
  }
});
