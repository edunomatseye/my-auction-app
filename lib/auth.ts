import { SupabaseAdapter } from "@auth/supabase-adapter";
import jwt from "jsonwebtoken";
import NextAuth from "next-auth";

import defaultAuthConfig from "@/auth.config";
//import { db } from "@/drizzle/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  //adapter: DrizzleAdapter(db),
  adapter: SupabaseAdapter({
    url: process.env.SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  callbacks: {
    session({ session, token }) {
      //const signingSecret = process.env.SUPABASE_JWT_SECRET;

      if (process.env.SUPABASE_JWT_SECRET) {
        const payload = {
          aud: "authenticated",
          exp: token.exp,
          sub: token.sub,
          email: token.email,
          role: "authenticated",
        };

        session.supabaseAccessToken = jwt.sign(
          payload,
          process.env.SUPABASE_JWT_SECRET,
        );
      }

      return session;
    },
  },
  session: { strategy: "jwt" },
  ...defaultAuthConfig,
});
