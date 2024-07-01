import { title } from "@/components/primitives";
import { Todo } from "@/components/todo";

export default function AboutPage() {
  return (
    <div>
      <h1 className={title()}>About</h1>
      <div>
        <Todo />
      </div>
    </div>
  );
}
