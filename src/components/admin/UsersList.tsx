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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Search } from "lucide-react";
import { toast } from "sonner";
import { deleteUser, updateRole, updateStatus } from "@/services/AuthService";
import { useRouter } from "next/navigation";

export default function UsersList({ users }: any) {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

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
  const handleUserDelete = async (userId: string) => {
    try {
      const res = await deleteUser(userId);
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch {
      toast.error("Failed to delete user");
    }
  };

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
                        onClick={() => router.push(`/admin/users/${user?._id}`)}
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
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleUserDelete(user._id)}
                      >
                        <p className="text-red-500 hover:text-white font-bold capitalize">
                          Delete user
                        </p>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
