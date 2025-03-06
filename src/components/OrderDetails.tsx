"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import Image from "next/image";

export default function OrderDetails({ details }: any) {
  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "orange-500";
      case "paid":
        return "blue-500";
      case "completed":
        return "green-500";
      case "cancelled":
        return "red-500";
      case "success":
        return "primary";
      case "shipped":
        return "primary";
      default:
        return "gray-500";
    }
  };

  if (!details) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">No orders found.</p>
      </div>
    );
  }

  return (
    <div className=" p-1 md:p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">Order Details</h1>
      {details && (
        <Card key={details._id} className="p-4 space-y-6">
          {/* Customer Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Customer Information
              </h2>
              <p>
                <strong>Name:</strong> {details?.user?.name}
              </p>
              <p>
                <strong>Email:</strong> {details.user.email}
              </p>
              <p>
                <strong>Order ID:</strong> {details._id}
              </p>
              <p>
                <strong>Order Date:</strong>{" "}
                {format(new Date(details.createdAt), "PPpp")}
              </p>
            </div>

            {/* Transaction Info */}
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Transaction Details
              </h2>
              {details?.transaction?.transactionStatus === "Initiated" ? (
                "Not Payment"
              ) : details.transaction ? (
                <>
                  <p>
                    <strong>Transaction ID:</strong> {details.transaction.id}
                  </p>
                  <p>
                    <strong>Payment Method:</strong>{" "}
                    {details.transaction.method || "N/A"}
                  </p>
                  <p>
                    <strong>Status:</strong>
                    <Badge
                      variant="outline"
                      className={`text-white bg-${getStatusColor(
                        details.transaction.bank_status
                      )}`}
                    >
                      {details.transaction.bank_status ||
                        details.transaction.transactionStatus ||
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
            <h2 className="font-semibold text-lg mb-2">Medicines</h2>
            <div className="space-y-4">
              {details.medicines.map((item: any) => (
                <div
                  key={item._id}
                  className="flex items-center space-x-4 border-b pb-3"
                >
                  <Image
                    src={item.medicine.images[0]}
                    alt={item.medicine.name}
                    width={50}
                    height={50}
                    className="rounded-md object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.medicine.name}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity} | Price: $
                      {item.medicine.price.toFixed(2)}
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
                ✔️ Order Placed - {format(new Date(details.createdAt), "PPpp")}
              </li>
              {details.transaction?.date_time && (
                <li className="text-blue-600">
                  💳 Payment{" "}
                  {details.transaction.bank_status ||
                    details.transaction.transactionStatus}{" "}
                  - {format(new Date(details.transaction.date_time), "PPpp")}
                </li>
              )}
              {details.status === "Paid" && (
                <li className="text-green-600">
                  ✔️ Order Completed -{" "}
                  {format(new Date(details.updatedAt), "PPpp")}
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
                ${details.totalPrice.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="font-medium">Items</p>
              <p className="text-xl font-bold">{details.medicines.length}</p>
            </div>
            <div>
              <p className="font-medium">Order Status</p>
              <Badge
                className={`bg-${getStatusColor(details.status)} text-white`}
              >
                {details.status}
              </Badge>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
