"use client";

import { useState } from "react";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export function Todo() {
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Finish project proposal",
      description: "Write up the details for the new project",
      dueDate: "2023-06-15",
      completed: false,
    },
    {
      id: 2,
      title: "Schedule team meeting",
      description: "Discuss project timeline and assign tasks",
      dueDate: "2023-06-10",
      completed: false,
    },
    {
      id: 3,
      title: "Research new design trends",
      description: "Look into the latest UI/UX design patterns",
      dueDate: "2023-06-20",
      completed: false,
    },
  ]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setNewTodo({
      ...newTodo,
      [e?.target?.name]: e?.target?.value,
    });
  };
  const handleAddTodo = () => {
    if (newTodo.title.trim() !== "") {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: newTodo.title,
          description: newTodo.description,
          dueDate: newTodo.dueDate,
          completed: false,
        },
      ]);
      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
      });
    }
  };
  const handleToggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] h-screen">
      <div className="bg-background border-r p-4 overflow-auto">
        <h2 className="text-2xl font-bold mb-4">Todo List</h2>
        {todos.map((todo) => (
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
              className={`mt-2 px-4 py-2 rounded-md transition-colors ${
                todo.completed
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-muted text-muted-foreground hover:bg-muted/90"
              }`}
              onClick={() => handleToggleComplete(todo.id)}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>
          </div>
        ))}
      </div>
      <div className="bg-background p-4">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <form
          className="grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            handleAddTodo();
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
