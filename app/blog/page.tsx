"use client";

import React from "react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

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
    </div>
  );
}
