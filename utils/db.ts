import { eq, and } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { user } from "@/drizzle/schema/schema";

type User = typeof user.$inferSelect;

export const getUserByCredentials = async (
  email: string,
  pwHash: string
): Promise<User | undefined> => {
  const users = db.query.user.findFirst({
    where: and(eq(user.email, email), eq(user.password, pwHash)),
  });

  return users;
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const users = await db.query.user.findFirst({
    where: eq(user.email, email),
  });

  return users;
};
