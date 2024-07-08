"use client";

import React, { useRef } from "react";

import { Button } from "@/components/ui/button";

function UploadForm() {
  const url = "/api/profile/uploadImage";
  const fileInput = useRef<HTMLInputElement>(null);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    //formData.append("file", fileInput?.current?.files?.[0]!);

    if (fileInput.current) {
      await fetch(url, {
        method: "POST",
        body: formData,
      });
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <label>
          <span>Upload an Image </span>
          <input ref={fileInput} name="file" type="file" />
        </label>
        <div className="flex justify-between mt-10">
          <Button size="sm" type="submit">
            Upload Image
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
