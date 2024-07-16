"use server";

import { cache } from "react";
import { asc, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/drizzle/db";
import { todos, user } from "@/drizzle/schema/schema";
export const addTodoAction = async (formData: FormData) => {
  type NewTodo = typeof todos.$inferInsert;

  const form = Object.fromEntries(formData);

  const insertTodo = async (todo: NewTodo) => {
    return db.insert(todos).values(todo);
  };

  const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    due_date: z.string().date(),
  });
  const validated = todoSchema.safeParse(form);

  if (!validated.success) {
    throw new Error("Error adding todo: " + validated.error.message);
  } else {
    await insertTodo(validated as unknown as NewTodo);
  }
};

export const getTodosAction = cache(async () => {
  return (
    await db.query.todos.findMany({
      orderBy: asc(todos.created_at),
    })
  ).reverse();
});

export const removeTodoAction = async ({ id }: { id: number }) => {
  await db.delete(todos).where(sql`${todos.id}, ${id}`);
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

export const toggleCompleteAction = async ({ id }: { id: number }) => {
  await db.transaction(async (tx) => {
    const todo = await tx.query.todos.findFirst({
      where: sql`${todos.id}, ${id}`,
    });

    await tx
      .update(todos)
      .set({
        completed: !todo?.completed,
      })
      .where(sql`${todos.id}, ${id}`)
      .returning({ completed: todos.completed });
  });
};
