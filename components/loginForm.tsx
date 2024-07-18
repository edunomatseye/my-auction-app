"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@nextui-org/react";
import { useMutation } from "@tanstack/react-query";
import { type SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";

import { Button } from "@/components/ui/button";

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
    await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  const loginMutator = useMutation({
    mutationKey: ["loginForm"],
    mutationFn: createLogin,
    onSuccess: () => {
      reset(emptyValues);
    },
  });

  const onSubmit: SubmitHandler<LoginForm> = (data) => {
    toast.success("Login successfull");
    loginMutator.mutate(data);
    //reset(emptyValues);
  };

  return (
    <div>
      <div>loginForm</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Project Login</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>

                <Input
                  {...register("email", { required: true })}
                  className="max-w-xs"
                  label="Email"
                  placeholder="email"
                  type="email"
                />
                {errors.email && (
                  <span role="alert">{errors.email.message}</span>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input
                  {...register("password", { required: true })}
                  className="max-w-xs"
                  label="Password"
                  placeholder="password"
                  type="password"
                />
                {errors.password && (
                  <span role="alert">{errors.password.message}</span>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {/* <Button name="login" startContent={<UserIcon />} type="submit"> */}
            <Button name="login" type="submit">
              Login
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
