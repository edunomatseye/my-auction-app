"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Button } from "@nextui-org/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import UserIcon from "./icon/UserIcon";

//import { Input } from "@/components/ui/input";

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

  const emptyValues = {
    email: "",
    password: "",
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

  const createLogin = async (data: LoginForm) => {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const dat = await response.json();

    console.log(dat);
  };

  const loginMutator = useMutation({
    mutationKey: ["loginForm"],
    mutationFn: createLogin,
    onSuccess: () => {
      console.log("success");
      reset(emptyValues);
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    console.log(data);
    loginMutator.mutate(data);
    //reset(emptyValues);
  };

  return (
    <div>
      <div>loginForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("email", { required: true })}
          className="max-w-xs"
          label="Email"
          placeholder="email"
          type="email"
        />
        {errors.email && <span role="alert">{errors.email.message}</span>}
        <Input
          {...register("password", { required: true })}
          className="max-w-xs"
          label="Password"
          placeholder="password"
          type="password"
        />
        {errors.password && <span role="alert">{errors.password.message}</span>}
        <Button
          color="success"
          name="login"
          startContent={<UserIcon />}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
