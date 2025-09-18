"use server";
import { ResetCodeSchemaType } from "@/schema/resetCode.schema";
import { toast } from "sonner";
import { cookies } from "next/headers";

export default async function ResetCode(
  formValue: ResetCodeSchemaType
) {
  try {

    const res = await fetch(
      `${process.env.Api_URL}api/v1/auth/verifyResetCode`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      }
    );
    const respnose = await res.json();

    if (respnose.status === "Success") {
      const cookieStore = await cookies();
      cookieStore.set("reset-verified", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 10 * 60, // 10 minutes
        path: "/",
      });
      cookieStore.delete("reset-started");
    }

    return respnose;
  } catch (err) {
    console.log(err);
    toast.error("try again later");
  }
}
