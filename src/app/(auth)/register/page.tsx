"use client";
import React, { useState } from "react";

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
import { registerSchemaType } from "@/schema/register.schema";
import { registerSchema } from "@/schema/register.schema";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
  const [errMsg, setErrMsg] = useState(null);
  const router = useRouter();

  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });

  async function HandleRegister(value: registerSchemaType) {
    // console.log(value), "Register Data";

    try {
      const response = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        value
      );
      // console.log(response, "Register Response");
      if (response?.data?.message === "success") {
        // form.reset();
        toast.success("Registered Successfully", {
          duration: 3000,
          position: "top-right",
        });
        router.push("/login");
      }
      setErrMsg(null);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setErrMsg(err.response?.data.message);
        toast.error(err.response?.data.message, {
          duration: 3000,
          position: "top-right",
        });
        console.log(err.response?.data.message, "Axios Error Register");
      }
    }
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto my-25">
      <h1 className="text-3xl font-bold tracking-tighter">Register </h1>
      {errMsg && (
        <h2 className="text-center text-red-600 text-lg mt-4">{errMsg}</h2>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleRegister)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Your Name" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
          <FormField
            control={form.control}
            name="rePassword"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input
                    placeholder="Your RePassword"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Your Phone" {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full mt-5 cursor-pointer">
            Register
          </Button>
        </form>
      </Form>
    </div>
  );
}
