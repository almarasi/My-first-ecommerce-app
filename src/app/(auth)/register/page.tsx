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
import Link from "next/link";

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
    <div className="mt-20 min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold gradient-text mb-2">Create Account</h1>
          <p className="text-gray-600">Join us and start your shopping journey</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeInUp">
          {errMsg && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm text-center">{errMsg}</p>
            </div>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleRegister)} className="space-y-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Full Name" 
                        {...field} 
                        type="text"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Email Address" 
                        {...field} 
                        type="email"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Phone Number" 
                        {...field} 
                        type="tel"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                        placeholder="Password"
                        {...field}
                        type="password"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
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
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Confirm Password"
                        {...field}
                        type="password"
                        className="h-12 text-base border-2 border-gray-200 focus:border-purple-500 transition-colors"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-emerald-800 to-emerald-600 hover:from-emerald-800 hover:to-emerald-600 transition-all duration-300 transform hover:scale-[1.02] shadow-lg mt-6"
              >
                Create Account
              </Button>
            </form>
          </Form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:text-blue-800 font-semibold transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
