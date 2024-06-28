import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./drizzle/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres:Admin123@localhost:5432/auctions",
  },
  verbose: true,
  strict: true,
});
