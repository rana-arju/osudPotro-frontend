import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Package } from "lucide-react";

const orders = [
  {
    id: "ORD001",
    date: "2024-03-01",
    total: 104.99,
    status: "Delivered",
    items: [
      { name: "Paracetamol 500mg", quantity: 2 },
      { name: "Vitamin C 1000mg", quantity: 1 },
    ],
  },
  {
    id: "ORD002",
    date: "2024-02-28",
    total: 79.5,
    status: "Processing",
    items: [{ name: "Blood Pressure Monitor", quantity: 1 }],
  },
  // Add more mock orders as needed
];

export default function OrderHistoryPage() {
  return (
    <div className="px-2 md:px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Order History</h1>
      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Order #{order.id}</CardTitle>
                <Badge
                  variant={
                    order.status === "Delivered" ? "default" : "secondary"
                  }
                >
                  {order.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <span className="text-muted-foreground">
                  Date: {order.date}
                </span>
                <span className="font-semibold">
                  Total: ${order.total.toFixed(2)}
                </span>
              </div>
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
