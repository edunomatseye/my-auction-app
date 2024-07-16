import { createClient } from "@supabase/supabase-js";

import { Database } from "./database.types";

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: { "x-my-iteo-header": "my-auction-app" },
  },
} as const;

export default createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_PUBLIC_ANON!,
  options
);
