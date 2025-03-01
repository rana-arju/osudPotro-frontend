"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for users
const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", orderCount: 5 },
  { id: 2, name: "Jane Smith", email: "jane@example.com", orderCount: 3 },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", orderCount: 7 },
  // Add more users as needed
];

export default function ManageUsers() {
  const [users] = useState(initialUsers);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.orderCount}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>User Details</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div>
                        <h3 className="font-semibold">Name</h3>
                        <p>{user.name}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p>{user.email}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold">Total Orders</h3>
                        <p>{user.orderCount}</p>
                      </div>
                      {/* Add more user details here */}
                    </div>
                  </DialogContent>
                </Dialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
