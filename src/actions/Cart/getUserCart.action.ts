"use server";

import getMyToken from "../getMyToken.action";

export default async function getLoggedUserCart() {
  const Mytoken = await getMyToken();

  if (!Mytoken || typeof Mytoken !== "string") {
    return null;
  }

  try {
    const res = await fetch(`${process.env.Api_URL}api/v1/cart`, {
      method: "GET",
      headers: {
        token: Mytoken, // Mytoken is now guaranteed to be a string
        "Content-Type": "application/json",
      },
    });
    const respnose = await res.json();
    return respnose;
  } catch (err) {
    console.log(err);
  }
}
