"use client";

import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import { currencyFormatter } from "@/lib/currencyFormatter";
import {
  citySelector,
  clearCart,
  grandTotalSelector,
  orderedProductsSelector,
  orderSelector,
  phoneSelector,
  shippingAddressSelector,
  shippingCostSelector,
  subTotalSelector,
} from "@/redux/features/cartSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { placeOrder } from "@/services/cart";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function PaymentDetails({ userData }: any) {
  const subTotal = useAppSelector(subTotalSelector);
  const shippingCost = useAppSelector(shippingCostSelector);
  const grandTotal = useAppSelector(grandTotalSelector);
  const order = useAppSelector(orderSelector);
  const citySelect = useAppSelector(citySelector);
  const shippingAddress = useAppSelector(shippingAddressSelector);
  const cartProducts = useAppSelector(orderedProductsSelector);
  const phoneSelect = useAppSelector(phoneSelector);

  const user = useUser();

  const router = useRouter();

  const dispatch = useAppDispatch();

  const phone = phoneSelect || userData?.phone || "";
  const city = citySelect || userData?.city || "";
  const address = shippingAddress || userData?.address || "";

  const handleOrder = async () => {
    const orderLoading = toast.loading("Order is being placed");
    try {
      if (!user.user) {
        router.push("/login");
        throw new Error("Please login first.");
      }

      if (!city) {
        throw new Error("City is missing");
      }
      if (!address) {
        throw new Error("Shipping address is missing");
      }
      if (!phone) {
        throw new Error("Phone is missing");
      }

      if (cartProducts.length === 0) {
        throw new Error("Cart is empty, what are you trying to order ??");
      }
      order.shippingInfo.phone = phone;
      order.shippingInfo.city = city;
      order.shippingInfo.address = address;
        console.log("order", order);

      const res = await placeOrder(order);

      if (res?.success) {
        toast.success(res.message, { id: orderLoading });
        dispatch(clearCart());
        if (res?.data) {
          const timer = setTimeout(() => {
            router.push(res?.data);
          }, 1000);
          return () => clearTimeout(timer);
        }
      }

      if (!res.success) {
        toast.error(res.message, { id: orderLoading });
      }
    } catch (error: any) {
      toast.error(error.message, { id: orderLoading });
    }
  };

  return (
    <div className="border-2 border-white bg-background brightness-105 rounded-md col-span-4 h-fit p-5">
      <h1 className="text-2xl font-bold">Payment Details</h1>

      <div className="space-y-2 mt-4">
        <div className="flex justify-between">
          <p className="text-gray-500 ">Subtotal</p>
          <p className="font-semibold">{currencyFormatter(subTotal)}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-500 ">Shipment Cost</p>
          <p className="font-semibold">{currencyFormatter(shippingCost)}</p>
        </div>
      </div>
      <div className="flex justify-between mt-10 mb-5">
        <p className="text-gray-500 ">Grand Total</p>
        <p className="font-semibold">{currencyFormatter(grandTotal)}</p>
      </div>

      <Button
        onClick={handleOrder}
        className="w-full text-xl font-semibold py-5 cursor-pointer"
      >
        Order Now
      </Button>
    </div>
  );
}
