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

import { useRouter } from "next/navigation";

import {
  resetPassSchema,
  resetPassSchemaType,
} from "@/schema/resetPassword.schema";
import ResetPassword from "@/actions/resetPassword/resetPassword.action";

export default function ResetPassPage() {
  const router = useRouter();

  const form = useForm<resetPassSchemaType>({
    defaultValues: {
      email: "",
      newPassword: "",
    },
    resolver: zodResolver(resetPassSchema),
  });

  async function HandleResetPass(value: resetPassSchemaType) {
    console.log(value);

    try {
      const res = await ResetPassword(value);

      if (res.statusMsg === "fail") {

        toast.error("Enter your correct email", {
            duration: 3000,
            position: "top-right",
          });
      } else {
        toast.success("Password has Changed Successfuly ", {
            duration: 3000,
            position: "top-right",
          });
          router.push("/login");

      }
    } catch (err) {
      toast.error("try again later", { duration: 2000, position: "top-right" });
    
    }
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-25">
      <h1 className="text-3xl font-bold tracking-tighter">Reset Password</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleResetPass)}>
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
            name="newPassword"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input
                    placeholder="Your New Password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full mt-5 cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
