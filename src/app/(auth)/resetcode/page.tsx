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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Enter Reset Code</h1>
          <p className="text-gray-600">Check your email and enter the 6-digit code we sent you</p>
        </div>

        {/* Form Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 animate-fadeInUp">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(HandleResetCode)} className="space-y-6">
              <FormField
                control={form.control}
                name="resetCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input 
                        placeholder="Enter Your reset code" 
                        {...field} 
                        type="number"
                        className="h-12 border-2 border-gray-200 focus:border-green-500 transition-colors text-center text-2xl tracking-widest"
                        maxLength={6}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full h-12 text-base font-semibold bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Verify Code
              </Button>
            </form>
          </Form>

          {/* Back to Forgot Password Link */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Didn't receive the code?{" "}
              <Link href="/forgetpassword" className="text-green-600 hover:text-green-800 font-semibold transition-colors">
                Resend code
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
