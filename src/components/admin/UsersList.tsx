"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Loader2, MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { updateRole, updateStatus } from "@/services/AuthService";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  status: "in-progress" | "blocked";
  orderCount: number;
}

interface Order {
  id: string;
  date: string;
  total: number;
  status: string;
}

export default function UsersList({ users }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [userOrders, setUserOrders] = useState<Order[]>([]);

  const fetchUserOrders = async (userId: string) => {
    try {
      // Replace this with your actual API call
      const response = await fetch(`/api/users/${userId}/orders`);
      const data = await response.json();
      setUserOrders(data);
    } catch (error) {
      console.error("Failed to fetch user orders:", error);
      toast.error("Failed to fetch user orders");
    }
  };

  const handleRoleChange = async (
    userId: string,
    newRole: "customer" | "admin"
  ) => {
    console.log("newrole", userId);

    try {
      const res = await updateRole(userId, newRole);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Failed to update user role");
    }
  };

  const handleStatusChange = async (
    userId: string,
    newStatus: "in-progress" | "blocked"
  ) => {
    console.log("user status", newStatus);
    
    try {
      const res = await updateStatus(userId, newStatus);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Failed to update user status");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  console.log("users", users);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <div className="mb-4 flex items-center">
        <Input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-2"
        />
        <Search className="text-gray-400" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge
                    variant={user.role === "admin" ? "default" : "secondary"}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      user.status === "in-progress" ? "default" : "destructive"
                    }
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.orderCount}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedUser(user);
                          fetchUserOrders(user.id);
                        }}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleRoleChange(
                            user._id,
                            user.role === "admin" ? "customer" : "admin"
                          )
                        }
                      >
                        Change Role to{" "}
                        {user.role === "admin" ? "Customer" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleStatusChange(
                            user._id,
                            user.status === "in-progress"
                              ? "blocked"
                              : "in-progress"
                          )
                        }
                      >
                        Mark as{" "}
                        {user.status === "in-progress"
                          ? "blocked"
                          : "In-Progress"}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog>
        <DialogTrigger asChild>
          <span className="hidden">Open Dialog</span>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>User Details</DialogTitle>
            <DialogDescription>
              View user information and order history
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="py-4">
              <h3 className="font-semibold mb-2">{selectedUser.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {selectedUser.email}
              </p>
              <h4 className="font-semibold mb-2">Order History</h4>
              {userOrders.length > 0 ? (
                <ul className="space-y-2">
                  {userOrders.map((order) => (
                    <li key={order.id} className="text-sm">
                      <span className="font-medium">{order.date}</span> - $
                      {order.total.toFixed(2)} ({order.status})
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No orders found
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
