"use client";

import { Button } from "@/components/ui/button";

import { currencyFormatter } from "@/lib/currencyFormatter";
import { orderedProductsSelector, subTotalSelector } from "@/redux/features/cartSlice";
import { useAppSelector } from "@/redux/hooks";

import Link from "next/link";

export default function PaymentDetails() {
  const subTotal = useAppSelector(subTotalSelector);
  const productSelector = useAppSelector(orderedProductsSelector);


  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4  p-5 min-h-screen">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="space-y-2 my-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-gray-500 ">Shipping</p>
          <div className="flex flex-col">
            <p className="font-bold">Dhaka - 60</p>
            <p className="font-bold">Outside Dhaka - 120</p>
          </div>
        </div>
      </div>

      <Link href="/checkout" className=" w-full mt-8">
        <Button
          className="w-full text-lg  py-5 cursor-pointer"
          disabled={productSelector?.length > 0 ? false : true}
        >
          Checkout contitnue
        </Button>
      </Link>
    </div>
  );
}
