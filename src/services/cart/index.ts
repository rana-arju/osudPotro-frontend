"use server";

import { ICoupon } from "@/types/cart";
import { IOrder } from "@/types/order";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const placeOrder = async (order: IOrder) => {
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
export const addCoupon = async ({ shopId, subTotal, couponCode }: ICoupon) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/coupon/${couponCode}`,
      {
        method: "POST",
        headers: {
          Authorization: (await cookies())?.get("accessToken")!.value,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ orderAmount: subTotal, shopId }),
      }
    );
    revalidateTag("Order");
    return res.json();
  } catch (error: any) {
    return new Error(error.message || "Unknown error");
  }
};
