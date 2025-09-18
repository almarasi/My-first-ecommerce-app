"use server";
import { toast } from "sonner";
import getMyToken from "../getMyToken.action";
import { redirect } from "next/navigation";

export default async function removeItemFromCart(id: string) {
  const Mytoken = await getMyToken();

  if (!Mytoken || typeof Mytoken !== "string") {
    return null;
  }

  try {
    const res = await fetch(`${process.env.Api_URL}api/v1/cart/${id}`, {
      method: "DELETE",
      headers: {
        token: Mytoken, // Mytoken is now guaranteed to be a string
        "Content-Type": "application/json",
      },
    });
    const respnose = await res.json();
    return respnose;
  } catch (err) {
    console.log(err);
    toast.error("Please login to see your cart");
    redirect("/login");
  }
}
