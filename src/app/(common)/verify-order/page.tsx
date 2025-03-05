"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";

import { VerifyOrder } from "@/services/order";

interface OrderData {
  order_id: string;
  currency: string;
  amount: number;
  payable_amount: number;
  discount_amount: number | null;
  disc_percent: number;
  received_amount: string;
  usd_amt: number;
  usd_rate: number;
  is_verify: number;
  card_holder_name: string | null;
  card_number: string | null;
  phone_no: string;
  bank_trx_id: string;
  invoice_no: string;
  bank_status: string;
  customer_order_id: string;
  sp_code: string;
  sp_message: string;
  name: string;
  email: string;
  address: string;
  city: string;
  method: string;
  date_time: string;
}

export default function VerifyOrderPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order_id");

  //const [isLoading, setIsLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      const res = await VerifyOrder(orderId!);

      if (res.success) {
        setOrderData(res?.data[0]);
      }
    };

    fetchOrder();
  }, [orderId]);
  console.log("orderData", orderData);

  return (
    <div className="container mx-auto pt-16 px-4">
      <h1 className="text-2xl font-bold mb-6">Order Verification</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Order Details Card */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Order Details</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">Order ID:</span>{" "}
            <span>{orderData?.order_id}</span>
            <span className="font-medium">Amount:</span>
            <span>
              {orderData?.currency} {orderData?.amount?.toFixed(2)}
            </span>
            <span className="font-medium">Status:</span>
            <Button className="bg-blue-500">{orderData?.bank_status}</Button>
            <span className="font-medium">Date:</span>
            <span>{new Date(orderData?.date_time ?? "").toLocaleString()}</span>
          </div>
        </Card>

        {/* Payment Details Card */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Payment Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">Method:</span>{" "}
            <span>{orderData?.method}</span>
            <span className="font-medium">Transaction ID:</span>{" "}
            <span>{orderData?.bank_trx_id}</span>
            <span className="font-medium">Invoice No:</span>{" "}
            <span>{orderData?.invoice_no}</span>
            <span className="font-medium">SP Code:</span>{" "}
            <span>{orderData?.sp_code}</span>
            <span className="font-medium">SP Message:</span>{" "}
            <span>{orderData?.sp_message}</span>
          </div>
        </Card>

        {/* Customer Details Card */}
        <Card className="p-6">
          <h3 className="font-semibold text-lg mb-4">Customer Information</h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <span className="font-medium">Name:</span>{" "}
            <span>{orderData?.name}</span>
            <span className="font-medium">Email:</span>{" "}
            <span>{orderData?.email}</span>
            <span className="font-medium">Phone:</span>{" "}
            <span>{orderData?.phone_no}</span>
            <span className="font-medium">Address:</span>{" "}
            <span>{orderData?.address}</span>
            <span className="font-medium">City:</span>{" "}
            <span>{orderData?.city}</span>
          </div>
        </Card>

        {/* Verification Status Card */}
        <Card className="p-6 flex flex-col justify-between">
          <h3 className="font-semibold text-lg mb-4">Verification Status</h3>
          <div className="flex items-center gap-2">
            {orderData?.sp_message === "Success" ? (
              <>
                <CheckCircle className="text-green-500" />
                <span className="text-green-500 font-medium">Verified</span>
              </>
            ) : (
              <>
                <AlertCircle className="text-red-500" />
                <span className="text-red-500 font-medium">Not Verified</span>
              </>
            )}
          </div>
          <Link href="/account" passHref>
            <Button className="mt-6 w-full cursor-pointer">View Orders</Button>
          </Link>
        </Card>
      </div>
    </div>
  );
}
