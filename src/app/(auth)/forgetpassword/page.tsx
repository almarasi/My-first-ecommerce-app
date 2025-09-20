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
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Forgot Password?</h1>
          <p className="text-gray-600">No worries! Enter your email and we will send you a reset code</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeInUp">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email address" 
                        {...field} 
                        type="email"
                        className="h-12 text-base border-2 border-gray-200 focus:border-orange-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className=" cursor-pointer w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-800 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Send Reset Code
              </Button>
            </form>
          </Form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Remember your password?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
