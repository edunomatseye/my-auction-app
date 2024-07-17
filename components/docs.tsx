"use client";

import { Spinner } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";

import { getTodosAction } from "@/app/about/actions";

export default function Docs({ username }: { username?: string }) {
	const { data, isLoading, isError } = useQuery({
		queryFn: async () => await getTodosAction(),
		queryKey: ["allTodos"], //Array according to Documentation
	});

	if (isLoading) return <Spinner />;
	if (isError) return <div>Sorry There was an Error</div>;

	return (
		<div>
			{username ? (
				<h2>Using useQuery and populating the cache:- {username}</h2>
			) : (
				<h2> No username provided</h2>
			)}
			<span>{JSON.stringify(data, null, 4)}</span>
		</div>
	);
}
