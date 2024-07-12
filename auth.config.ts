import type { NextAuthConfig } from "next-auth";

import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import Twitter from "next-auth/providers/twitter";

export default {
  providers: [Google, GitHub, Twitter],
} satisfies NextAuthConfig;
