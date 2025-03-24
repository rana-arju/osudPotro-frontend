"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { orderStatusChange } from "@/services/order"
import { toast } from "sonner"
import { Download, ExternalLink, Loader2 } from "lucide-react"
import { Button } from "../ui/button"
import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

export default function AllOrders({ orders }: any) {
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(null)

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await orderStatusChange(orderId, newStatus)
      if (res?.success) {
        toast.success(res?.message)
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Status change failed. Try again!")
    }
  }

  const handleDownloadPrescription = async (orderId: string, imageUrl: string) => {
    setDownloadingOrderId(orderId)
    try {
      const response = await fetch(imageUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = `prescription_${orderId}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
      toast.success("Prescription downloaded successfully")
    } catch (error) {
      console.error("Download failed:", error)
      toast.error("Failed to download prescription. Please try again.")
    } finally {
      setDownloadingOrderId(null)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Orders</h1>

      {/* Desktop view - Table */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Prescription</TableHead>
              <TableHead>Actions</TableHead>
              <TableHead>More</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.length > 0 ? (
              orders?.map((order: any) => (
                <TableRow key={order?._id}>
                  <TableCell className="font-medium">#{order?._id.substring(0, 8)}</TableCell>
                  <TableCell>{order.user.name}</TableCell>
                  <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "Paid" ? "default" : "secondary"}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    {order?.medicines?.some((medicine: any) => medicine?.medicine?.prescription === "Yes") ? (
                      <Badge variant="destructive">Required</Badge>
                    ) : (
                      <Badge variant="outline">Not Required</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {order.prescriptionImage ? (
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="cursor-pointer"
                          onClick={() => handleDownloadPrescription(order._id, order.prescriptionImage)}
                          disabled={downloadingOrderId === order._id}
                        >
                          {downloadingOrderId === order._id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Download className="h-4 w-4 mr-2" />
                          )}
                          {downloadingOrderId === order._id ? "Downloading..." : "Download"}
                        </Button>
                      </div>
                    ) : (
                      <Badge variant="outline">No found</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Link href={`/orderDetails/${order?.transaction?.id}`}>
                        <Button size="sm" variant="outline">
                          <ExternalLink className="h-4 w-4 mr-2" /> Details
                        </Button>
                      </Link>
                      <Select value={order.status} onValueChange={(value) => updateOrderStatus(order._id, value)}>
                        <SelectTrigger className="w-[140px]">
                          <SelectValue placeholder="Update Status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Paid">Paid</SelectItem>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Processing">Processing</SelectItem>
                          <SelectItem value="Shipped">Shipped</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                          <SelectItem value="Cancelled">Cancelled</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  No orders found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-4">
        {orders?.length > 0 ? (
          orders?.map((order: any) => (
            <Card key={order?._id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Order ID</p>
                      <p className="font-medium">#{order?._id.substring(0, 8)}</p>
                    </div>
                    <Badge variant={order.status === "Paid" ? "default" : "secondary"}>{order.status}</Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Customer</p>
                      <p className="font-medium">{order.user.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="font-medium">${order.totalPrice.toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Prescription</p>
                      {order?.medicines?.some((medicine: any) => medicine?.medicine?.prescription === "Yes") ? (
                        <Badge variant="destructive">Required</Badge>
                      ) : (
                        <Badge variant="outline">Not Required</Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {order.prescriptionImage && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleDownloadPrescription(order._id, order.prescriptionImage)}
                        disabled={downloadingOrderId === order._id}
                      >
                        {downloadingOrderId === order._id ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <Download className="h-4 w-4 mr-2" />
                        )}
                        {downloadingOrderId === order._id ? "Downloading..." : "Download Prescription"}
                      </Button>
                    )}

                    <Link href={`/orderDetails/${order?.transaction?.id}`}>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" /> View Details
                      </Button>
                    </Link>

                    <Select value={order.status} onValueChange={(value) => updateOrderStatus(order._id, value)}>
                      <SelectTrigger className="w-full sm:w-[140px]">
                        <SelectValue placeholder="Update Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Processing">Processing</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No orders found</p>
          </div>
        )}
      </div>
    </div>
  )
}

