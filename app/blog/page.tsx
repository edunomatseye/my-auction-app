import { db } from "@/drizzle/db";
import { title } from "@/components/primitives";
import { ButtonUp } from "@/components/buttonUp";

export default async function BlogPage() {
  const result = await db.query.users.findFirst({
    where(users, { eq }) {
      return eq(users.id, 51);
    },
    with: { profile_infos: true },
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
