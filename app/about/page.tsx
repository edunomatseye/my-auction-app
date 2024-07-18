import Link from "next/link";

import { title } from "@/components/primitives";
import { Todo } from "@/components/todo";

export default async function AboutPage() {
  return (
    <div>
      <h2 className={title()}>About</h2>
      <h1>AboutUs</h1>
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      <div>
        <Todo />
      </div>
    </div>
  );
}
