import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

const projectDir = process.cwd();

loadEnvConfig(projectDir);

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DIRECT_URL as string,
  },
  verbose: true,
  strict: true,
});
