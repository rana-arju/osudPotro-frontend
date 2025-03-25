import { Suspense } from "react"
import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/user/mobile-sidebar"
import { getMe } from "@/services/AuthService"
import { myOrder } from "@/services/order"
import { Skeleton } from "@/components/ui/skeleton"
import { Package,  FileText, ShoppingBag, ArrowRight } from "lucide-react"

export const metadata: Metadata = {
  title: "OsudPotro - Dashboard",
  description: "Manage your account, view orders and payment methods",
}

export const dynamic = "force-dynamic"

export default async function AccountPage() {
  const res = await getMe()
  const response = await myOrder()
  const myOrders = response?.data || []
  const userData = res?.data

  // Get the most recent orders (up to 3)
  const recentOrders = myOrders?.slice(0, 3) || []

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <MobileSidebar />
      </div>

      {/* User welcome section */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">Welcome back, {userData?.name || "User"}</h2>
              <p className="text-muted-foreground mt-1">Here&apos;s an overview of your account and recent activity</p>
            </div>
            <Button asChild>
              <Link href="/products">
                Shop Now
                <ShoppingBag className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2  gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Orders</p>
              <h3 className="text-2xl font-bold">{myOrders?.length || 0}</h3>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Prescriptions</p>
              <h3 className="text-2xl font-bold">2</h3>
            </div>
          </CardContent>
        </Card>

    
      </div>

      {/* Recent orders */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>Your most recent orders and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<OrdersSkeleton />}>
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order:any) => (
                  <div
                    key={order._id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg gap-2"
                  >
                    <div>
                      <h3 className="font-medium">Order #{order._id.substring(0, 8)}</h3>
                      <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="text-left sm:text-right mt-2 sm:mt-0">
                      <div className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 mb-1">
                        {order.status}
                      </div>
                      <p className="font-medium">{order.totalPrice} BDT</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-muted-foreground">You haven
                &apos;t placed any orders yet.</p>
                <Button variant="outline" className="mt-4" asChild>
                  <Link href="/products">Browse Products</Link>
                </Button>
              </div>
            )}
          </Suspense>
        </CardContent>
        {recentOrders.length > 0 && (
          <CardFooter>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/user/orders">
                View All Orders
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Profile summary */}
      <Card>
        <CardHeader>
          <CardTitle>My Profile</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<ProfileSkeleton />}>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{userData?.name || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{userData?.email || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone Number</p>
                  <p className="font-medium">{userData?.phone || "Not provided"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Account Type</p>
                  <p className="font-medium capitalize">{userData?.role || "Customer"}</p>
                </div>
              </div>
            </div>
          </Suspense>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/user/profile">
              Update Profile
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

function ProfileSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-40" />
        </div>
      ))}
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

