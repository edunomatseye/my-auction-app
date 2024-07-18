import type { Database } from "./database.types";

import { createClient } from "@supabase/supabase-js";

// import { auth } from "../lib/auth";

// const session = await auth();
// const supabaseAccessToken = session?.supabaseAccessToken;

const options = {
  db: {
    schema: "public",
  },
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
  //   global: {
  //     headers: { Authorization: `Bearer ${supabaseAccessToken}` },
  //   },
} as const;

export const supabase = createClient<Database>(
  process.env.SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  options,
);
