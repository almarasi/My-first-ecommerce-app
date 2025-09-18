"use client";
import React from "react";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormMessage,
} from "@/Components/ui/form";
import { Input } from "@/Components/ui/input";
import { Button } from "@/Components/ui/button";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemaType } from "@/schema/login.schema";
import { loginSchema } from "@/schema/login.schema";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default function Login() {
  const router = useRouter();

  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  async function HandleLogin(value: loginSchemaType) {
    // console.log(value);

    const response = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
      callbackUrl: "/",
    });
    // console.log(response, "Response After Login");
    if (response?.ok) {
      toast.success("Login Success", { duration: 3000, position: "top-right" });
      router.push("/");
    } else {
      toast.error(response?.error, {
        duration: 3000,
        position: "top-right",
      });
    }
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-25">
      <h1 className="text-3xl font-bold tracking-tighter">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleLogin)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Your Email" {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input
                    placeholder="Your Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-5">
            <Link href="/forgetpassword" >
              <span className="text-left text-emerald-600">
                Forget Password ?
              </span>
            </Link>
          </div>

          <Button type="submit" className="w-full mt-5 cursor-pointer">
            Login
          </Button>
        </form>
      </Form>
    </div>
  );
}
