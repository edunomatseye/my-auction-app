import type { NextAuthConfig } from "next-auth";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { ZodError } from "zod";

import { db } from "../../../drizzle/db";
import { signInSchema } from "../../../lib/zod";
import { getUserByCredentials } from "../../../utils/db";
import { saltAndHashPassword } from "../../../utils/password";

const CredentialsProvider = Credentials({
  name: "Credentials",
  credentials: {
    email: { label: "Email", type: "email", placeholder: "you@example.com" },
    password: { label: "Password", type: "password" },
  },
  authorize: async (credentials) => {
    try {
      const { email, password } = await signInSchema.parseAsync(credentials);
      const pwHash = await saltAndHashPassword(password);
      const user = await getUserByCredentials(email, pwHash);

      if (!user) {
        throw new Error("Invalid email or password");
      }

      return user;
    } catch (error) {
      if (error instanceof ZodError) {
        return null;
      }
      throw error;
    }
  },
});

export default NextAuth({
  adapter: DrizzleAdapter(db),
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [CredentialsProvider],
} satisfies NextAuthConfig);
