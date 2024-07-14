import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import defaultAuthConfig from "@/auth.config";
import { db } from "@/drizzle/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  callbacks: {
    session({ session, user }) {
      const scope = Sentry.getCurrentScope();

      scope.setUser({
        id: user.id,
        email: user.email,
      });

      return session;
    },
  },
  ...defaultAuthConfig,
});
