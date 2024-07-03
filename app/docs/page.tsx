"use client";

import { useQuery } from "@tanstack/react-query";
//import getMovies from "./api/getMovies";
import { Spinner } from "@nextui-org/spinner";

import { getTodos } from "@/app/about/actions";
import { title } from "@/components/primitives";

export default function DocsPage() {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => await getTodos(),
    queryKey: ["allTodos"], //Array according to Documentation
  });

  if (isLoading) return <Spinner />;
  if (isError) return <div>Sorry There was an Error</div>;

  return (
    <div>
      <h1 className={title()}>Docs</h1>
      <h2>Using useQuery and populating the cache</h2>
      <span>{JSON.stringify(data, null, 4)}</span>
    </div>
  );
}
