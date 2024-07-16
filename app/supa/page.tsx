import { cookies } from "next/headers";

import { createClient } from "@/supabase/server";
//import { supabase } from "@/supabase/db";

export default async function SupaPage() {
  const cookieStore = cookies();

  //const supabase = createClient();
  const supabase = createClient(cookieStore);

  const { data: todos } = await supabase.from("todos").select();

  return (
    <div>
      <ul>{todos?.map((todo) => <li key={todo.id}>{todo.description}</li>)}</ul>
    </div>
  );
}
