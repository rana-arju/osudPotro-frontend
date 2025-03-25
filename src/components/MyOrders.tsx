"use client"

import { useState } from "react"
import Link from "next/link"
import moment from "moment"
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
} from "@/components/ui/alert-dialog"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { Trash2, ExternalLink, Package } from "lucide-react"
import { deleteOrder } from "@/services/order"
import { toast } from "sonner"

const MyOrders = ({ myOrders }: any) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDeleteOrder = async (orderId: string) => {
    try {
      setIsDeleting(orderId)
      const res = await deleteOrder(orderId)
      if (res?.success) {
        toast.success(res?.message)
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Order delete failed. Try again")
    } finally {
      setIsDeleting(null)
    }
  }

  if (!myOrders || myOrders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        <h3 className="mt-4 text-lg font-medium">No orders found</h3>
        <p className="mt-2 text-sm text-muted-foreground">You haven&apos;t placed any orders yet.</p>
        <Button className="mt-4" asChild>
          <Link href="/products">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {myOrders?.map((order: any) => (
        <div
          key={order._id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-4"
        >
          <div className="flex-grow">
            <Link
              href={`/orderDetails/${order?.transaction?.id}`}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4"
            >
              <div>
                <h3 className="font-medium">
                  Transaction ID: <span className="font-normal text-muted-foreground">{order?.transaction?.id}</span>
                </h3>
                <p className="text-sm text-muted-foreground">{moment(order?.transaction?.date_time).format("lll")}</p>
              </div>
              <div className="flex flex-col items-start sm:items-end gap-1">
                <Badge variant="default">{order.status}</Badge>
                <p className="font-medium">Total: {order.totalPrice} BDT</p>
              </div>
            </Link>
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="sm:ml-4" asChild>
              <Link href={`/orderDetails/${order?.transaction?.id}`}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Details
              </Link>
            </Button>

            {order.status === "Pending" && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" disabled={isDeleting === order._id}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently cancel your order.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDeleteOrder(order._id)}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}



export default MyOrders

