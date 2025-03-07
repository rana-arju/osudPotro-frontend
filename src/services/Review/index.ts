"use server";

import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createReview = async (data: any) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: (await cookies())?.get("accessToken")!.value,
      },
      body: JSON.stringify(data),
    });

    revalidateTag("Review");

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
export const getAllReview = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/review`, {
      next: {
        tags: ["Review"],
      },
    });

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
