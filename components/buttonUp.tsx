"use client";

import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import { animals } from "@/app/blog/data";

export function ButtonUp() {
  const queryClient = useQueryClient();
  const result = queryClient.getQueryData(["allTodos"]);
  const [value, setValue] = React.useState<number | string | null | undefined>(
    "cat",
  );

  return (
    <div className="flex w-full max-w-xs flex-col gap-2">
      Go hard or go home {value}
      <button type="button" onClick={() => setValue("dog")}>
        Dog right
      </button>
      <Autocomplete
        className="max-w-xs"
        defaultItems={animals}
        label="Favorite Animal"
        placeholder="Search an animal"
        selectedKey={value}
        variant="bordered"
        onSelectionChange={setValue}
      >
        {(item: { value: string | number; label: string }) => (
          <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
        )}
      </Autocomplete>
      <p className="text-default-500 text-small">Selected: {value}</p>
      <div className="flex gap-3 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar name="Junior" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar name="Jane" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar name="Joe" />
      </div>
      <div>{JSON.stringify(result, null, 4)}</div>
    </div>
  );
}
