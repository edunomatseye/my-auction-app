import { db } from "@/drizzle/db";
import { title } from "@/components/primitives";
import { ButtonUp } from "@/components/buttonUp";
import { users } from "@/drizzle/schema/schema";

export default async function BlogPage() {
  const result = await db.query.users.findMany({
    where(users, { eq, gt }) {
      return gt(users.id, 0);
    },
    with: { profiles: true },
  });

  // await db.insert(users).values({
  //   name: "blog",
  //   email: "blog@example.com",
  //   password: "blog",
  //   role: "admin",
  // });

  return (
    <div>
      <h1 className={title()}>Blog</h1>

      <ButtonUp />

      <div>{JSON.stringify(result, null, 4)}</div>
    </div>
  );
}
