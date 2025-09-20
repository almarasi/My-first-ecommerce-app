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
    <div className=" mt-5 sm:mt-10 min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeInUp">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleLogin)} className="space-y-6">
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
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        className="h-12 text-base border-2 border-gray-200 focus:border-blue-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-start">
                <Link href="/forgetpassword" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                  Forgot your password?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-600 hover:to-emerald-800 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Sign In
              </Button>
            </form>
          </Form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Dont have an account?{" "}
              <Link href="/register" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
