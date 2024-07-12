import NextAuth from "next-auth";

import defaultAuthConfig from "./auth.config";

export const { auth: middleware } = NextAuth(defaultAuthConfig);
