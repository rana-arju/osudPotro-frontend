"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { orderStatusChange } from "@/services/order";
import { toast } from "sonner";
import { Download, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useState } from "react";

export default function AllOrders({ orders }: any) {
  const [downloadingOrderId, setDownloadingOrderId] = useState<string | null>(
    null
  );
  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await orderStatusChange(orderId, newStatus);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Status change failed. Try again!");
    }
  };
  const handleDownloadPrescription = async (
    orderId: string,
    imageUrl: string
  ) => {
    setDownloadingOrderId(orderId);
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `prescription_${orderId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      toast.success("Prescription downloaded successfully");
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download prescription. Please try again.");
    } finally {
      setDownloadingOrderId(null);
    }
  };
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Prescription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders?.map((order: any) => (
            <TableRow key={order._id}>
              <TableCell>#{order._id}</TableCell>
              <TableCell>{order.user.name}</TableCell>
              <TableCell>${order.totalPrice.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={order.status === "Paid" ? "default" : "secondary"}
                >
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell>
                {order.prescriptionImage ? (
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        handleDownloadPrescription(
                          order._id,
                          order.prescriptionImage
                        )
                      }
                      disabled={downloadingOrderId === order._id}
                    >
                      {downloadingOrderId === order._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Download className="h-4 w-4 mr-2" />
                      )}
                      {downloadingOrderId === order._id
                        ? "Downloading..."
                        : "Download"}
                    </Button>
                  </div>
                ) : (
                  <Badge variant="outline">No found</Badge>
                )}
              </TableCell>
              <TableCell>
                {order?.medicines?.map((medicine: any) => (
                  <Badge key={medicine.medicine._id} variant="destructive">
                    {medicine.medicine.prescription}
                  </Badge>
                )) ? (
                  <Badge variant="destructive">Required</Badge>
                ) : (
                  <Badge variant="outline">Not Required</Badge>
                )}
              </TableCell>
              <TableCell>
                <Select
                  value={order.status}
                  onValueChange={(value) => updateOrderStatus(order._id, value)}
                >
                  <SelectTrigger className="w-[180px]">
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
