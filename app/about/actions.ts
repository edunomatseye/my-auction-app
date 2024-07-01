"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/drizzle/db";
import { todos } from "@/drizzle/schema/schema";
export const todoAction = async (formData: FormData) => {
  //const formData = new FormData();
  const form = Object.fromEntries(Object.entries(formData));

  type TTodo = typeof todos.$inferInsert;
  const todo: TTodo = {
    title: form.title,
    description: form.description,
    due_date: form.due_date,
    completed: false,
  };

  await db.insert(todos).values(todo).returning();

  revalidatePath("/about");
};
