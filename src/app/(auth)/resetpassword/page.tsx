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
import Link from "next/link";

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Reset Password</h1>
          <p className="text-gray-600">Enter your new password to complete the reset</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeInUp">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleResetPass)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter your email" 
                        {...field} 
                        type="email"
                        className="h-12 text-base border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your new password"
                        {...field}
                        type="password"
                        className="h-12 text-base border-2 border-gray-200 focus:border-indigo-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="cursor-pointer w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-800 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Reset Password
              </Button>
            </form>
          </Form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-600">
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
