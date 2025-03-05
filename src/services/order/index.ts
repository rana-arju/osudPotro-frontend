"use server";
import { cookies } from "next/headers";

export const VerifyOrder = async (orderId:string) => {
  const queryParams = new URLSearchParams({ orderId }).toString();

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/verify?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
        next: {
          tags: ["order"],
        },
      }
    );

    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
