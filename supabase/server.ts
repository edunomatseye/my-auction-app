import type { cookies } from "next/headers";
import type { Database } from "./database.types";

import { type CookieOptions, createServerClient } from "@supabase/ssr";

export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
	return createServerClient<Database>(
		process.env.SUPABASE_URL as string,
		process.env.SUPABASE_SERVICE_ROLE_KEY as string,
		{
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value, ...options });
					} catch (_error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.set({ name, value: "", ...options });
					} catch (_error) {
						// The `delete` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
};
