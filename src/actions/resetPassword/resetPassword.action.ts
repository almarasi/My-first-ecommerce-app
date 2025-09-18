"use server";

import { resetPassSchemaType } from "@/schema/resetPassword.schema";
import { toast } from "sonner";
import { cookies } from "next/headers";


export default async function ResetPassword(
  formValue: resetPassSchemaType
) {
  try {

    const res = await fetch(
      `${process.env.Api_URL}api/v1/auth/resetPassword`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValue),
      }
    );
    const respnose = await res.json();

    if (respnose.statusMsg === "success") {
      const cookieStore = await cookies();
      cookieStore.delete("reset-verified");
    }

    return respnose;
  } catch (err) {
    console.log(err);
    toast.error("try again later");
  }
}
