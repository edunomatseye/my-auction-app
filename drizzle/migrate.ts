import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

import { migrationClient } from "./db";

// This will run migrations on the database, skipping the ones already applied
(async function () {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./drizzle/migrations",
  });
})();
