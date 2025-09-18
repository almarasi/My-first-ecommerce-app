"use server";
import { forgetPasswordSchemaType } from "@/schema/forgetPassword.schema";
import { toast } from "sonner";
import { cookies } from "next/headers";

export default async function forgetPassword(
  formValue: forgetPasswordSchemaType
) {
  try {

    const res = await fetch(
      `${process.env.Api_URL}api/v1/auth/forgotPasswords`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      }
    );
    const respnose = await res.json();

    if (respnose.statusMsg === "success") {
      const cookieStore = await cookies();
      cookieStore.set("reset-started", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 60, // 10 minutes
        path: "/",
      });
    }

    return respnose;
  } catch (err) {
    console.log(err);
    toast.error("try again later");
  }
}
