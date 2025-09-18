"use server";

import getMyToken from "../getMyToken.action";
import { CheckoutSchemaType } from "@/schema/checkout.schema";

export default async function OnlinePayment(
  cartId: string,
  formValues: CheckoutSchemaType,
  url?: string 
) {
  const Mytoken = await getMyToken();

  if (!Mytoken || typeof Mytoken !== "string") {
    return null;
  }

  // Use provided URL, or fallback to environment variable, or use Vercel URL
  const baseUrl = url || process.env.Next_URL || process.env.VERCEL_URL 
    ? `https://${process.env.VERCEL_URL}` 
    : 'http://localhost:3000';

  try {
    const res = await fetch(
      `${process.env.Api_URL}api/v1/orders/checkout-session/${cartId}?url=${baseUrl}`,
      {
        method: "POST",
        headers: {
          token: Mytoken, // Mytoken is now guaranteed to be a string
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shippingAddress: formValues }),
      }
    );
    const respnose = await res.json();
    return respnose;
  } catch (err) {
    console.log(err);
  }
}
