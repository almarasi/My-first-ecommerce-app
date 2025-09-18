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

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";
import {
  forgetPasswordSchema,
  forgetPasswordSchemaType,
} from "@/schema/forgetPassword.schema";
import forgetPassword from "@/actions/resetPassword/forgetPassword.action";
import { toast } from "sonner";

export default function ForgetPasswordPage() {
  const router = useRouter();

  const form = useForm<forgetPasswordSchemaType>({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(forgetPasswordSchema),
  });

  async function HandleSubmit(value: forgetPasswordSchemaType) {
    console.log(value);

    try {
      const res = await forgetPassword(value);
      console.log(res);

      if (res.statusMsg === "success") {
        toast.success("reset code sent to your email", {
          duration: 2000,
          position: "top-right",
        });
        router.push("/resetcode")
      } else {
        toast.error("try again later", {
          duration: 2000,
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("try again later", { duration: 2000, position: "top-right" });
    }
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-25">
      <h1 className="text-3xl font-bold tracking-tighter">Forget Password ?</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleSubmit)}>
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
          <Button type="submit" className="w-full mt-5 cursor-pointer">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
