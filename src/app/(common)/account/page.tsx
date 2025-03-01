import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, Package, User } from "lucide-react";

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">My Account</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="mr-2 h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="orders" className="flex items-center">
            <Package className="mr-2 h-4 w-4" />
            Orders
          </TabsTrigger>
          <TabsTrigger value="payment" className="flex items-center">
            <CreditCard className="mr-2 h-4 w-4" />
            Payment Methods
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>
                Update your personal details here.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" defaultValue="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" defaultValue="Doe" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  defaultValue="john.doe@example.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" type="tel" defaultValue="+1 (555) 123-4567" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue="123 Main St" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" defaultValue="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" defaultValue="10001" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Order History</CardTitle>
              <CardDescription>
                View your past orders and their status.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    id: "ORD-12345",
                    date: "Feb 15, 2024",
                    status: "Delivered",
                    total: "$34.97",
                  },
                  {
                    id: "ORD-12344",
                    date: "Jan 28, 2024",
                    status: "Delivered",
                    total: "$62.98",
                  },
                  {
                    id: "ORD-12343",
                    date: "Jan 10, 2024",
                    status: "Delivered",
                    total: "$15.99",
                  },
                ].map((order) => (
                  <div
                    key={order.id}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{order.id}</h3>
                      <p className="text-sm text-muted-foreground">
                        {order.date}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                        {order.status}
                      </span>
                      <p className="font-medium mt-1">{order.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                Manage your saved payment methods.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center text-white font-bold">
                      Visa
                    </div>
                    <div>
                      <p className="font-medium">Visa ending in 4242</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 12/25
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>

                <div className="p-4 border rounded-lg flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-12 h-8 bg-red-600 rounded mr-4 flex items-center justify-center text-white font-bold">
                      MC
                    </div>
                    <div>
                      <p className="font-medium">Mastercard ending in 8888</p>
                      <p className="text-sm text-muted-foreground">
                        Expires 08/26
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Remove
                  </Button>
                </div>

                <Button variant="outline" className="w-full">
                  Add New Payment Method
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
