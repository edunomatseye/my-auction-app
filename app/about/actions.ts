"use server";

import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/drizzle/db";
import { todos, user } from "@/drizzle/schema/schema";
export const addTodoAction = async (formData: FormData) => {
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

  const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    due_date: z.string().date(),
  });
  const validated = todoSchema.safeParse(newForm);

  if (!validated.success) {
    throw new Error("Error adding todo: " + validated.error.message);
  } else {
    await insertTodo(newForm);
  }
};

export const getTodosAction = cache(async () => {
  return (
    await db.query.todos.findMany({
      orderBy: asc(todos.created_at),
    })
  ).reverse();
});

export const removeTodoAction = async ({ id }: { id: string }) => {
  await db.delete(todos).where(eq(todos.id, id));
};

export const addUserAction = async () => {
  //type NewUser = typeof user.$inferInsert;
  (async () => {
    db.insert(user)
      .values({
        name: "Alice Rice",
        email: "alice@example.com",
        password: "alice",
        role: "admin",
      })
      .returning();
  })();
};

export const toggleCompleteAction = async ({ id }: { id: string }) => {
  await db.transaction(async (tx) => {
    const todo = await tx.query.todos.findFirst({
      where: eq(todos.id, id),
    });

    await tx
      .update(todos)
      .set({
        completed: !todo?.completed,
      })
      .where(eq(todos.id, id))
      .returning({ completed: todos.completed });
  });
};
