import { defineConfig } from "drizzle-kit";
import { loadEnvConfig } from "@next/env";

const projectDir = process.cwd();

loadEnvConfig(projectDir);

export default defineConfig({
  schema: "./drizzle/schema/*",
  out: "./drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.SUPABASE_DIRECT_URL!,
  },
  verbose: true,
  strict: true,
});
