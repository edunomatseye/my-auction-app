"use client";

import React from "react";
import { Autocomplete, AutocompleteItem, Avatar } from "@nextui-org/react";

import { animals } from "./data";

import { title } from "@/components/primitives";

export default function BlogPage() {
  const [value, setValue] = React.useState<React.Key>("cat");

  return (
    <div>
      <h1 className={title()}>Blog</h1>
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
          multiple={true}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
        <p className="text-default-500 text-small">Selected: {value}</p>
      </div>
      <div className="flex gap-3 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar name="Junior" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar name="Jane" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar name="Joe" />
      </div>
    </div>
  );
}
