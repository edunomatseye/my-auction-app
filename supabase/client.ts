import { createBrowserClient } from "@supabase/ssr";

import { Database } from "./database.types";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
