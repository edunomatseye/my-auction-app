"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  addTodoAction,
  getTodosAction,
  toggleCompleteAction,
  removeTodoAction,
} from "@/app/about/actions";

export function Todo() {
  const queryClient = useQueryClient();

  type Todo =
    | {
        id: number;
        title: string | null;
        description: string | null;
        dueDate: string | null;
        completed: boolean | null;
      }[]
    | undefined;
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });

  const {
    data: todos,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["allFormattedTodos"],
    queryFn: () => getTodosAction(),
    select: (todos) => {
      return todos.map((todo) => ({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        dueDate: todo.due_date,
        completed: todo.completed,
      }));
    },
  });

  const { mutate: toggleCompleteMutate } = useMutation({
    mutationKey: ["toggleComplete"],
    mutationFn: toggleCompleteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFormattedTodos"] });
    },
  });

  const { mutate: addTodoMutate } = useMutation({
    mutationKey: ["addTodo"],
    mutationFn: addTodoAction,
    onMutate: async (newTodo) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["allFormattedTodos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["allFormattedTodos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["allFormattedTodos"], (old: Todo[]) => [
        ...old,
        newTodo,
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos, newTodo };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(["allFormattedTodos"], context?.previousTodos);
      toast.error("Error adding todo");
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["allFormattedTodos"] });
    },
    onSuccess: () => {
      toast.success("Todo added successfully");
    },
  });

  const { mutate: removeTodoMutate } = useMutation({
    mutationKey: ["removeTodo"],
    mutationFn: removeTodoAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allFormattedTodos"] });
      toast.success("Todo removed successfully");
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewTodo({
      ...newTodo,
      [e?.target?.name]: e?.target?.value,
    });
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    addTodoMutate(formData, {
      onSuccess: () => {
        if (newTodo.title.trim() !== "") {
          setNewTodo({
            title: "",
            description: "",
            dueDate: "",
          });
        }
      },
    });
  };

  const handleTodoRemove = async (id: number) => {
    removeTodoMutate({ id });
  };

  const handleToggleComplete = (id: number) => {
    toggleCompleteMutate({ id });
  };

  if (isLoading) return <Spinner />;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-screen">
      <div className="bg-background border-r p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        {todos?.map((todo) => (
          <div
            key={todo.id}
            className={`bg-card p-4 rounded-lg mb-4 border transition-colors ${
              todo.completed
                ? "border-primary text-muted-foreground"
                : "border-input hover:bg-accent"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{todo.title}</div>
              <div
                className={`px-2 py-1 rounded-full text-xs ${
                  todo.completed
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {todo.completed ? "Completed" : "Pending"}
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-2">
              {todo.description}
            </div>
            <div className="text-sm text-muted-foreground">
              Due: {todo.dueDate}
            </div>
            <button
              className={`m-2 px-4 py-2 rounded-sm transition-colors ${
                todo.completed
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground hover:bg-muted/90"
              }`}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
            <button
              className={`mt-2 px-4 py-2 rounded-sm transition-colors bg-primary text-primary-foreground hover:bg-primary/90`}
              onClick={() => handleTodoRemove(todo.id)}
            >
              X
            </button>
          </div>
        ))}
      </div>
      <div className="bg-background p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <form
          className="grid gap-4"
          onSubmit={async (e) => {
            e.preventDefault();
            await handleAddTodo(e);
          }}
        >
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter task title"
              value={newTodo.title}
              onChange={handleInputChange}
            />
            {/* {!!state && <div>Error showing title</div>} */}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Enter task description"
              rows={3}
              value={newTodo.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="dueDate">Due Date</Label>
            <Input
              id="dueDate"
              name="dueDate"
              type="date"
              value={newTodo.dueDate}
              onChange={handleInputChange}
            />
          </div>
          <Button type="submit">Add Todo</Button>
        </form>
      </div>
    </div>
  );
}
