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

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { CheckoutSchema, CheckoutSchemaType } from "@/schema/checkout.schema";
import OnlinePayment from "@/actions/checkout/onlineCheckout.action";
import CashPayment from "@/actions/checkout/cashCheckout";

export default function CheckoutPage() {
  const router = useRouter();
  const { id }: { id: string } = useParams();
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [paymentType , setPaymentType] = useState("");

  const form = useForm<CheckoutSchemaType>({
    defaultValues: {
      details: "",
      phone: "",
      city: "",
    },
    resolver: zodResolver(CheckoutSchema),
  });

  async function HandleCheckout(values: CheckoutSchemaType) {

    if (paymentType === "online") {
      try {
        const res = await OnlinePayment(id, "" , values);
        if (res.status === "success") {
          window.location.href = res.session.url;
        }
        setErrMsg(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setErrMsg(err.response?.data.message);
          toast.error(err.response?.data.message, {
            duration: 3000,
            position: "top-right",
          });
          console.log(err.response?.data.message, "Axios Error checkout");
        }
      }
    } else if (paymentType === "cash") {
      try {   
        const res = await CashPayment(id);
        if (res.status === "success") {
          console.log(res)
          router.push("/allorders")
        }
        setErrMsg(null);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          setErrMsg(err.response?.data.message);
          toast.error(err.response?.data.message, {
            duration: 3000,
            position: "top-right",
          });
          console.log(err.response?.data.message, "Axios Error checkout");
        }
      }
     
    } 
  }

  return (
    <div className="w-[80%] sm:w-[75%] md:w-[70%] lg:w-[60%] xl:w-[50%] mx-auto mt-25">
      <h1 className="text-3xl font-bold tracking-tighter">Checkout</h1>
      {errMsg && (
        <h2 className="text-center text-red-600 text-lg mt-4">{errMsg}</h2>
      )}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(HandleCheckout)}>
          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="details" {...field} type="text" />
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
                  <Input placeholder="phone" {...field} type="tel" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem className="mt-5">
                <FormControl>
                  <Input placeholder="city" {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6 rounded-lg border border-slate-200 bg-white/70 p-4 shadow-sm">
            <span className="block text-sm font-medium text-slate-700 mb-2">Payment method</span>
            <div className="grid gap-2">
              <label htmlFor="cash" className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 hover:bg-slate-50 cursor-pointer transition">
                <input onChange={(e) => setPaymentType(e.target.value)} className="accent-emerald-600 h-4 w-4" type="radio" id="cash" name="pay" value="cash"/>
                <span className="text-sm font-medium text-slate-800">Cash</span>
              </label>
              <label htmlFor="online" className="flex items-center gap-3 rounded-md border border-slate-200 bg-white p-3 hover:bg-slate-50 cursor-pointer transition">
                <input onChange={(e) => setPaymentType(e.target.value)} className="accent-emerald-600 h-4 w-4" type="radio" id="online" name="pay" value="online" />
                <span className="text-sm font-medium text-slate-800">Online payment</span>
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full mt-5 cursor-pointer">
            Pay Now
          </Button>
        </form>
      </Form>
    </div>
  );
}
