"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Image from "next/image";

interface Transaction {
  id: string;
  transactionStatus: string | null;
  bank_status: string;
  date_time: string;
  method: string;
  sp_code: string;
  sp_message: string;
}

interface Product {
  product: {
    name: string;
    images: string[];
    price: number;
  };
  quantity: number;
  _id: string;
  price: number;
}

interface Order {
  transaction: Transaction;
  _id: string;
  user: {
    name: string;
    email: string;
  };
  products: Product[];
  totalPrice: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export default function OrderDetailsPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching orders (replace with actual fetch call to your API)
    fetch("/api/orders") // Mock API endpoint
      .then((res) => res.json())
      .then((data) => {
        setOrders(data.data);
        setLoading(false);
      });
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "orange";
      case "paid":
        return "blue";
      case "completed":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Skeleton className="w-[90%] max-w-4xl h-60" />
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Order Details</h1>

      {orders.map((order) => (
        <Card key={order._id} className="p-4 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Customer Information
              </h2>
              <p>
                <strong>Name:</strong> {order.user.name}
              </p>
              <p>
                <strong>Email:</strong> {order.user.email}
              </p>
              <p>
                <strong>Order ID:</strong> {order._id}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {format(new Date(order.createdAt), "PPpp")}
              </p>
            </div>

            {/* Transaction Info */}
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Transaction Details
              </h2>
              {order.transaction ? (
                <>
                  <p>
                    <strong>Transaction ID:</strong> {order.transaction.id}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {order.transaction.method || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <Badge
                      variant="outline"
                      className={`bg-${getStatusColor(
                        order.transaction.bank_status
                      )}`}
                    >
                      {order.transaction.bank_status ||
                        order.transaction.transactionStatus ||
                        "N/A"}
                    </Badge>
                  </p>
                </>
              ) : (
                <p className="text-gray-500">No transaction data available.</p>
              )}
            </div>
          </div>

          <Separator />

          {/* Product List */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Products</h2>
            <div className="space-y-4">
              {order.products.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 border-b pb-3"
                >
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity} | Price: $
                      {item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Timeline */}
          <div>
            <h2 className="font-semibold text-lg mb-2">Order Timeline</h2>
            <ul className="space-y-2 text-sm">
              <li className="text-green-600">
                ✔️ Order Placed - {format(new Date(order.createdAt), "PPpp")}
              </li>
              {order.transaction?.date_time && (
                <li className="text-blue-600">
                  💳 Payment{" "}
                  {order.transaction.bank_status ||
                    order.transaction.transactionStatus}{" "}
                  - {format(new Date(order.transaction.date_time), "PPpp")}
                </li>
              )}
              {order.status === "Paid" && (
                <li className="text-green-600">
                  ✔️ Order Completed -{" "}
                  {format(new Date(order.updatedAt), "PPpp")}
                </li>
              )}
            </ul>
          </div>

          <Separator />

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="font-medium">Total Price</p>
              <p className="text-xl font-bold">
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Items</p>
              <p className="text-xl font-bold">{order.products.length}</p>
            </div>
            <div>
              <p className="font-medium">Order Status</p>
              <Badge
                className={`bg-${getStatusColor(order.status)} text-white`}
              >
                {order.status}
              </Badge>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
