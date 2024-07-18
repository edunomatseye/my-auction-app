import { createClient } from "@/supabase/client";

export default async function SupaPage() {
  const supabase = createClient();

  const { data: todos } = await supabase.from("todos").select();

  return (
    <div>
      <ul>
        {todos?.map((todo) => {
          return <li key={todo.id}>{todo.description}</li>;
        })}
      </ul>

      <span>pls work!</span>
    </div>
  );
}
