import "dotenv/config";
import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "./db";

// This will run migrations on the database, skipping the ones already applied
(async function () {
  await migrate(db, { migrationsFolder: "./drizzle" });
})();

// Don't forget to close the connection, otherwise the script will hang
//await client.end();
