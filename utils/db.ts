import { eq, and } from "drizzle-orm";

import { db } from "@/drizzle/db";
import { users } from "@/drizzle/schema/schema";

type User = typeof users.$inferSelect;

export const getUserByCredentials = async (
  email: string,
  pwHash: string
): Promise<User | undefined> => {
  const user = db.query.users.findFirst({
    where: and(eq(users.email, email), eq(users.password, pwHash)),
  });

  return user;
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  });

  return user;
};
