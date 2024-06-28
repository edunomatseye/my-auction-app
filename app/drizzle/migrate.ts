import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "@/drizzle/db";

// This will run migrations on the database, skipping the ones already applied
(async function () {
  await migrate(db, { migrationsFolder: "./drizzle" });
})();

// Don't forget to close the connection, otherwise the script will hang
