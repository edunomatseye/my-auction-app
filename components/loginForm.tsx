"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import UserIcon from "./icon/UserIcon";

export default function LoginForm() {
  const loginFormSchema = z.object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(8),
  });

  type LoginForm = z.infer<typeof loginFormSchema>;

  const defaultValues = {
    email: "olowo@bab.com",
    password: "olowo@bab.com",
  };

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div>loginForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", { required: true })}
          className="max-w-xs"
          placeholder="email"
          type="email"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <Input
          {...register("password", { required: true })}
          className="max-w-xs"
          placeholder="password"
          type="password"
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <Button color="success" startContent={<UserIcon />} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}
