import { ButtonUp } from "@/components/buttonUp";
import { title } from "@/components/primitives";

export default async function BlogPage() {
  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <h2>Server componenet static rendered</h2>

      <ButtonUp />
    </div>
  );
}
