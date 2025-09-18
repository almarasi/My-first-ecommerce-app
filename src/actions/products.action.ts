"use server";

import axios from "axios";

export default async function getProducts() {
  try {
    const res = await fetch(`${process.env.Api_URL}api/v1/products`, {
      method: "GET",
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { message: error.message };
    }
    // console.log(error);
  }
}

export async function getProductDetails(id: string) {
  try {
    const res = await fetch(
      `${process.env.Api_URL}api/v1/products/${id}`,
      {
        method: "GET",
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { message: error.message };
    }
  }
}


export async function getRelatedProducts(cartId: string) {
  try {
    const res = await fetch(
      `${process.env.Api_URL}api/v1/products?category[in]=${cartId}`,
      {
        method: "GET",
        next: { revalidate: 60 },
      }
    );
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { message: error.message };
    }
  }
}


