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

import { toast } from "sonner";
import {
  ResetCodeSchema,
  ResetCodeSchemaType,
} from "@/schema/resetCode.schema";
import ResetCode from "@/actions/resetPassword/resetCode.action";

export default function ResetCodePage() {
  const router = useRouter();

  const form = useForm<ResetCodeSchemaType>({
    defaultValues: {
      resetCode: "",
    },
    resolver: zodResolver(ResetCodeSchema),
  });

  async function HandleResetCode(value: ResetCodeSchemaType) {
    console.log(value);

    try {
      const res = await ResetCode(value);
      console.log(res);

      if (res.status === "Success") {
        toast.success("you can reset password now", {
          duration: 3000,
          position: "top-right",
        });
        router.push("/resetpassword");
      } else {
        toast.error("reset code is not correct", {
          duration: 3000,
          position: "top-right",
        });
      }
    } catch (err) {
      toast.error("try again later", { duration: 2000, position: "top-right" });
    
    }
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-25">
      <h1 className="text-3xl font-bold tracking-tighter">Reset Code ?</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleResetCode)}>
          <FormField
            control={form.control}
            name="resetCode"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="Your reset code " {...field} type="number" />
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
