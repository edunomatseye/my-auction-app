import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import authConfig from "@/auth.config";
import {
  account,
  session,
  user,
  verificationToken,
} from "@/drizzle/schema/schema";
import { db } from "@/drizzle/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: user,
    accountsTable: account,
    sessionsTable: session,
    verificationTokensTable: verificationToken,
  }),
  session: { strategy: "jwt" },
  ...authConfig,
});
