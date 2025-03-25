import { Suspense } from "react"
import type { Metadata } from "next"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MobileSidebar } from "@/components/user/mobile-sidebar"
import { myOrder } from "@/services/order"
import MyOrders from "@/components/MyOrders"
import { Skeleton } from "@/components/ui/skeleton"

export const metadata: Metadata = {
  title: "OsudPotro - My Orders",
  description: "View and manage your order history",
}

export const dynamic = "force-dynamic"

export default async function OrdersPage() {
  const response = await myOrder()
  const myOrders = response?.data

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Orders</h1>
        <MobileSidebar />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
          <CardDescription>View your past orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OrdersSkeleton />}>
            <MyOrders myOrders={myOrders} />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

function OrdersSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-6 w-20" />
          </div>
          <div className="flex justify-between mt-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      ))}
    </div>
  )
}

