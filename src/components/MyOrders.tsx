"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import moment from "moment";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { deleteOrder } from "@/services/order";
import { toast } from "sonner";
const MyOrders = ({ myOrders }: any) => {
  const handleDeleteOrder = async (orderId: string) => {
    try {
      const res = await deleteOrder(orderId);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Order delete failed. try again");
    }
  };
  return (
    <div className="space-y-4">
      {myOrders?.map((order: any) => (
        <div
          key={order._id}
          className="flex justify-between items-center p-4 border rounded-lg"
        >
          <Link
            href={`/orderDetails/${order?.transaction?.id}`}
            className="flex justify-between items-center flex-grow"
          >
            <div>
              <h3 className="font-medium">
                Transaction ID: {order?.transaction?.id}
              </h3>
              <p className="text-sm text-muted-foreground">
                {moment(order?.transaction?.date_time).format("lll")}
              </p>
            </div>
            <div className="text-right">
              <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                {order.status}
              </span>
              <p className="font-medium mt-1">
                Total Price: {order.totalPrice} BDT
              </p>
            </div>
          </Link>
          {order.status === "Pending" && (
            <AlertDialog>
              <AlertDialogTrigger asChild className="cursor-pointer">
                <Button variant="destructive" size="sm" className="ml-4 ">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your order.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel className="cursor-pointer">
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className="cursor-pointer"
                    onClick={() => handleDeleteOrder(order._id)}
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
