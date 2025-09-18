"use server";
import { toast } from "sonner";
import getMyToken from "../getMyToken.action";
import { redirect } from "next/navigation";
import { jwtDecode } from "jwt-decode";

export default async function getAllOrders() {
  const Mytoken = await getMyToken();


  if (!Mytoken || typeof Mytoken !== "string") {
    return null;
  }

  const decodedToken: { id: string } = jwtDecode(Mytoken as string);
  const userId = decodedToken.id;

  try {
    const res = await fetch(
      `${process.env.Api_URL}api/v1/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          token: Mytoken, // Mytoken is now guaranteed to be a string
          "Content-Type": "application/json",
        },
      }
    );
    const respnose = await res.json();
    return respnose;
  } catch (err) {
    console.log(err);
    toast.error("Please login to add products");
    redirect("/login");
  }
}
