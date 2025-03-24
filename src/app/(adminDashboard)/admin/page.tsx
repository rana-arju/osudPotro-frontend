"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Package,
  FileText,
  AlertTriangle,
  Users,
  Pill,
  TrendingUp,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal,
  Search,
  Filter,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SalesChart } from "@/components/admin/sales-chart"
import { InventoryChart } from "@/components/admin/inventory-chart"
import { OrderStatusChart } from "@/components/admin/order-status-chart"
import { RevenueChart } from "@/components/admin/revenue-chart"

export default function AdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 space-y-6 p-6">
        <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Admin Dashboard</h2>
            <p className="text-muted-foreground">Overview of your medicine e-commerce store performance</p>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="day">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Calendar className="mr-2 h-4 w-4" />
              Date Range
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Total Revenue"
            value="$24,389.50"
            change="+12.5%"
            trend="up"
            description="vs. previous period"
            icon={<DollarSign className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Total Orders"
            value="1,234"
            change="+20.1%"
            trend="up"
            description="vs. previous period"
            icon={<ShoppingCart className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Total Users"
            value="5,678"
            change="+8.2%"
            trend="up"
            description="vs. previous period"
            icon={<Users className="h-4 w-4 text-muted-foreground" />}
          />
          <MetricCard
            title="Total Medicines"
            value="2,456"
            change="+15.3%"
            trend="up"
            description="vs. previous period"
            icon={<Pill className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Inventory Status */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Low Stock Items"
            value="23"
            change="-5.2%"
            trend="down"
            description="vs. previous period"
            icon={<Package className="h-4 w-4 text-muted-foreground" />}
            variant="warning"
          />
          <MetricCard
            title="Out of Stock"
            value="7"
            change="-12.5%"
            trend="down"
            description="vs. previous period"
            icon={<AlertTriangle className="h-4 w-4 text-muted-foreground" />}
            variant="destructive"
          />
          <MetricCard
            title="Pending Prescriptions"
            value="15"
            change="+3.1%"
            trend="up"
            description="vs. previous period"
            icon={<FileText className="h-4 w-4 text-muted-foreground" />}
            variant="warning"
          />
          <MetricCard
            title="Conversion Rate"
            value="3.2%"
            change="+0.8%"
            trend="up"
            description="vs. previous period"
            icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />}
          />
        </div>

        {/* Charts */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Revenue Overview</CardTitle>
                  <CardDescription>Revenue trends for the current {selectedPeriod}</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <RevenueChart />
                </CardContent>
              </Card>
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                  <CardDescription>Distribution of order statuses</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrderStatusChart />
                </CardContent>
              </Card>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Inventory Status</CardTitle>
                  <CardDescription>Current inventory levels by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <InventoryChart />
                </CardContent>
              </Card>
              <Card className="col-span-4">
                <CardHeader className="flex flex-row items-center">
                  <div className="grid gap-2">
                    <CardTitle>Recent Orders</CardTitle>
                    <CardDescription>Latest orders from your customers</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" className="ml-auto gap-1">
                    <Filter className="h-3.5 w-3.5" />
                    Filter
                  </Button>
                </CardHeader>
                <CardContent>
                  <RecentOrdersTable />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View All Orders
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="sales" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sales Analytics</CardTitle>
                <CardDescription>Detailed sales performance over time</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="inventory" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Inventory Management</CardTitle>
                  <CardDescription>Monitor and manage your product inventory</CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input type="search" placeholder="Search products..." className="w-[200px] pl-8 md:w-[300px]" />
                  </div>
                  <Button>Add Product</Button>
                </div>
              </CardHeader>
              <CardContent>
                <TopSellingProducts />
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Products
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="customers" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Customer Analytics</CardTitle>
                <CardDescription>Insights about your customer base</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-10 text-muted-foreground">
                  Customer analytics data will be available soon
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

// Metric Card Component
function MetricCard({ title, value, change, trend, description, icon, variant = "default" }: any) {
  return (
    <Card
      className={
        variant === "destructive" ? "border-destructive/50" : variant === "warning" ? "border-yellow-500/50" : ""
      }
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center pt-1">
          <span className={`text-xs ${trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}>
            {trend === "up" ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
            {change}
          </span>
          <span className="text-xs text-muted-foreground ml-1">{description}</span>
        </div>
      </CardContent>
    </Card>
  )
}

// Recent Orders Table Component
function RecentOrdersTable() {
  const recentOrders = [
    {
      id: "ORD-1234",
      customer: {
        name: "John Smith",
        email: "john@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Delivered",
      amount: "$129.99",
      date: "2 hours ago",
    },
    {
      id: "ORD-1233",
      customer: {
        name: "Sarah Johnson",
        email: "sarah@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Processing",
      amount: "$79.95",
      date: "5 hours ago",
    },
    {
      id: "ORD-1232",
      customer: {
        name: "Michael Brown",
        email: "michael@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Shipped",
      amount: "$54.50",
      date: "Yesterday",
    },
    {
      id: "ORD-1231",
      customer: {
        name: "Emily Davis",
        email: "emily@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      status: "Pending",
      amount: "$199.99",
      date: "Yesterday",
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 text-sm text-muted-foreground">
        <div>Order</div>
        <div className="col-span-2">Customer</div>
        <div>Status</div>
        <div className="text-right">Amount</div>
      </div>
      <div className="space-y-4">
        {recentOrders.map((order) => (
          <div key={order.id} className="grid grid-cols-5 items-center">
            <div className="font-medium">{order.id}</div>
            <div className="col-span-2 flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={order.customer.avatar} alt={order.customer.name} />
                <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <div className="font-medium">{order.customer.name}</div>
                <div className="text-xs text-muted-foreground">{order.customer.email}</div>
              </div>
            </div>
            <div>
              <Badge
                variant={
                  order.status === "Delivered"
                    ? "default"
                    : order.status === "Processing"
                      ? "secondary"
                      : order.status === "Shipped"
                        ? "outline"
                        : "destructive"
                }
              >
                {order.status}
              </Badge>
            </div>
            <div className="text-right font-medium">{order.amount}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Top Selling Products Component
function TopSellingProducts() {
  const products = [
    {
      id: "PRD-001",
      name: "Paracetamol 500mg",
      category: "Pain Relief",
      stock: 120,
      stockPercentage: 80,
      price: "$5.99",
      sales: 234,
    },
    {
      id: "PRD-002",
      name: "Vitamin C 1000mg",
      category: "Vitamins",
      stock: 85,
      stockPercentage: 60,
      price: "$12.99",
      sales: 189,
    },
    {
      id: "PRD-003",
      name: "Blood Pressure Monitor",
      category: "Devices",
      stock: 12,
      stockPercentage: 20,
      price: "$49.99",
      sales: 156,
    },
    {
      id: "PRD-004",
      name: "Allergy Relief Tablets",
      category: "Allergy",
      stock: 0,
      stockPercentage: 0,
      price: "$8.49",
      sales: 142,
    },
    {
      id: "PRD-005",
      name: "Digital Thermometer",
      category: "Devices",
      stock: 32,
      stockPercentage: 45,
      price: "$15.99",
      sales: 128,
    },
  ]

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-6 text-sm text-muted-foreground">
        <div className="col-span-2">Product</div>
        <div>Category</div>
        <div>Stock</div>
        <div>Price</div>
        <div className="text-right">Actions</div>
      </div>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="grid grid-cols-6 items-center">
            <div className="col-span-2">
              <div className="font-medium">{product.name}</div>
              <div className="text-xs text-muted-foreground">{product.id}</div>
            </div>
            <div>{product.category}</div>
            <div>
              <div className="flex items-center gap-2">
                <div className="w-full max-w-[100px]">
                  <Progress value={product.stockPercentage} className="h-2" />
                </div>
                <span
                  className={`text-xs ${product.stock === 0 ? "text-destructive" : product.stockPercentage < 30 ? "text-yellow-500" : "text-muted-foreground"}`}
                >
                  {product.stock} units
                </span>
              </div>
            </div>
            <div>{product.price}</div>
            <div className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem>Edit Product</DropdownMenuItem>
                  <DropdownMenuItem>View Details</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Update Stock</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

