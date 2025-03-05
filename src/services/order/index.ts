"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const VerifyOrder = async (orderId: string) => {
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
export const myOrder = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/myOrder`,
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
export const deleteOrder = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/order/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: (await cookies())?.get("accessToken")!.value,
        },
      }
    );
    revalidateTag("order");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
