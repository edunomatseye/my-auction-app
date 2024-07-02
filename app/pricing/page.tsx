"use client";

import React, { useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
} from "@nextui-org/react";

import { title } from "@/components/primitives";

export default function PricingPage() {
  const url = "/api/profile/uploadImage";
  const fileInput = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    //formData.append("file", fileInput?.current?.files?.[0]!);

    if (fileInput.current) {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      const result = await response.json();

      console.log(result);
    }
  };

  return (
    <>
      <h1 className={title()}>Pricing</h1>
      <Card className="max-w-[400px]">
        <CardHeader className="flex gap-3">
          <Image
            alt="nextui logo"
            height={40}
            radius="sm"
            src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
            width={40}
          />
          <div className="flex flex-col">
            <p className="text-md">NextUI</p>
            <p className="text-small text-default-500">nextui.org</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <p>Make beautiful websites regardless of your design experience.</p>
          <div>
            <div>
              <form className="form" onSubmit={onSubmit}>
                <label>
                  <span>Upload an Image </span>
                  <input ref={fileInput} name="file" type="file" />
                </label>
                <Button radius="full" size="sm" type="submit">
                  Upload
                </Button>
              </form>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter>
          <Link
            isExternal
            showAnchorIcon
            href="https://github.com/nextui-org/nextui"
          >
            Visit source code on GitHub.
          </Link>
        </CardFooter>
      </Card>
    </>
  );
}
