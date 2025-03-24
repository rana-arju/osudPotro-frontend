"use client";

import { Package, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Order {
  id: string;
  date: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default function UserOrders({ userOrders }: any) {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-purple-500";
      case "delivered":
        return "bg-green-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className=" px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/admin/users">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Users
          </Button>
        </Link>
      </div>

      {userOrders?.length === 0 ? (
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="text-center">No Orders Found</CardTitle>
            <CardDescription className="text-center">
              This user hasn&apos;t placed any orders yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Package className="h-24 w-24 text-muted-foreground" />
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {userOrders?.map((order: any) => (
            <Link href={`/orderDetails/${order?.transaction?.id}`} key={order?._id}>
              <Card className="flex flex-col">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    Order #
                    <Badge
                      className={`${getStatusColor(order.status)} text-white`}
                    >
                      {order.status}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {order?.medicines?.map((item: any) => (
                      <li
                        key={item?.medicine?._id}
                        className="flex justify-between"
                      >
                        <span>
                          {item?.medicine?.name?.slice(0, 10) + "..."} x
                          {item.quantity}
                        </span>
                        <span>
                        
                          ${ item?.medicine?.price && (item?.medicine?.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="bg-muted">
                  <div className="w-full flex justify-between items-center">
                    <span className="font-semibold">Total:</span>
                    <span className="font-bold">
                      ${order.totalPrice.toFixed(2)}
                    </span>
                  </div>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
