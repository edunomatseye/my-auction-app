"use client";

import { useQueryClient } from "@tanstack/react-query";

import { title } from "@/components/primitives";
import { ButtonUp } from "@/components/buttonUp";

export default function BlogPage() {
  const queryClient = useQueryClient();
  const result = queryClient.getQueryData(["allTodos"]);

  return (
    <div>
      <h1 className={title()}>Blog</h1>
      <h2>Using getQueryData from the Query cache using queryClient</h2>

      <ButtonUp />

      <div>{JSON.stringify(result, null, 4)}</div>
    </div>
  );
}
