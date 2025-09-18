"use server";

import axios from "axios";

export default async function getBrands() {
  try {
    const res = await fetch(`${process.env.Api_URL}api/v1/brands`, {
      method: "GET",
      next: { revalidate: 60 },
    });
    const data = await res.json();
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return { message: error.message };
    }
  }
}
