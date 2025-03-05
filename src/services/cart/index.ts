"use server";


import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const placeOrder = async (order: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/order`, {
      method: "POST",
      headers: {
        Authorization: (await cookies())?.get("accessToken")!.value,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(order),
    });
    revalidateTag("Order");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};

