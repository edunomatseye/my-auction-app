"use server";

import { revalidatePath } from "next/cache";
import { cache } from "react";

import { db } from "@/drizzle/db";
import { todos } from "@/drizzle/schema/schema";
export const todoAction = async (formData: FormData) => {
  //const form = Object.fromEntries(formData);

  const dueDate = formData.get("dueDate");
  const title = formData.get("title");
  const description = formData.get("description");

  type NewTodo = typeof todos.$inferInsert;

  const insertTodo = async (todo: NewTodo) => {
    return db.insert(todos).values(todo);
  };

  const newForm = {
    due_date: dueDate as string,
    title: title as string,
    description: description as string,
  };

  await insertTodo(newForm);

  revalidatePath("/about");
};

export const getTodos = cache(async () => {
  const todos = await db.query.todos.findMany();

  return todos;
});
