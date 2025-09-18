"use server";

import getMyToken from "../getMyToken.action";
import { CheckoutSchemaType } from "@/schema/checkout.schema";

export default async function OnlinePayment(
  cartId: string,
  url = process.env.Next_URL,
  formValues: CheckoutSchemaType
) {
  const Mytoken = await getMyToken();

  if (!Mytoken || typeof Mytoken !== "string") {
    return null;
  }

  try {
    const res = await fetch(
      `${process.env.Api_URL}api/v1/orders/checkout-session/${cartId}?url=${url}`,
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
