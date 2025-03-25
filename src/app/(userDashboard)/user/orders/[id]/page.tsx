import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download } from "lucide-react"

export const metadata: Metadata = {
  title: "OsudPotro - Order Details",
  description: "View details of your order",
}

export default async function OrderDetailsPage({ params }: any) {
  // In a real app, you would fetch the order details using the ID
  // For now, we'll use mock data
  const order = {
    id: params.id,
    status: "Processing",
    date: "June 15, 2023",
    total: 2450,
    items: [
      {
        id: "1",
        name: "Paracetamol 500mg",
        price: 150,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        name: "Vitamin C 1000mg",
        price: 350,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "3",
        name: "Blood Pressure Monitor",
        price: 1800,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
    shipping: {
      address: "123 Main St, Dhaka, Bangladesh",
      method: "Standard Delivery",
      cost: 60,
    },
    payment: {
      method: "Credit Card",
      last4: "4242",
    },
    hasPrescription: true,
    prescriptionImage: "/placeholder.svg?height=300&width=400",
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/user/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Order Details</h1>
      </div>

      <div className="grid gap-6">
        {/* Order Summary */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <CardTitle>Order #{order.id.substring(0, 8)}</CardTitle>
                <CardDescription>Placed on {order.date}</CardDescription>
              </div>
              <Badge variant="default" className="px-3 py-1">
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Order Items */}
              <div>
                <h3 className="font-medium mb-3">Items</h3>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-md overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{item.price} BDT</p>
                        <p className="text-sm text-muted-foreground">{item.price * item.quantity} BDT</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Prescription */}
              {order.hasPrescription && (
                <div>
                  <h3 className="font-medium mb-3">Prescription</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative aspect-[4/3] w-full sm:w-48 rounded-md overflow-hidden bg-muted">
                      <Image
                        src={order.prescriptionImage || "/placeholder.svg"}
                        alt="Prescription"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex items-center">
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download Prescription
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <Separator />

              {/* Shipping & Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Shipping Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm">{order.shipping.address}</p>
                    <p className="text-sm">Method: {order.shipping.method}</p>
                    <p className="text-sm">Cost: {order.shipping.cost} BDT</p>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium mb-3">Payment Information</h3>
                  <div className="space-y-2">
                    <p className="text-sm">Method: {order.payment.method}</p>
                    {order.payment.last4 && <p className="text-sm">Card ending in {order.payment.last4}</p>}
                  </div>
                </div>
              </div>

              <Separator />

              {/* Order Total */}
              <div className="flex flex-col items-end">
                <div className="w-full sm:w-64 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal:</span>
                    <span className="text-sm">{order.total - order.shipping.cost} BDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Shipping:</span>
                    <span className="text-sm">{order.shipping.cost} BDT</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total:</span>
                    <span>{order.total} BDT</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" asChild>
              <Link href="/user/orders">Back to Orders</Link>
            </Button>
            {order.status === "Pending" && <Button variant="destructive">Cancel Order</Button>}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}





