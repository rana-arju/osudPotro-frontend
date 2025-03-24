"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, MoreHorizontal, Search, User } from "lucide-react"
import { toast } from "sonner"
import { deleteUser, updateRole, updateStatus } from "@/services/AuthService"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function UsersList({ users }: any) {
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredUsers, setFilteredUsers] = useState(users || [])
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const router = useRouter()

  // Filter users based on search term
  const handleSearch = (e:any) => {
    const term = e.target.value
    setSearchTerm(term)

    if (!term.trim()) {
      setFilteredUsers(users)
      return
    }

    const filtered = users.filter(
      (user:any) =>
        user.name.toLowerCase().includes(term.toLowerCase()) || user.email.toLowerCase().includes(term.toLowerCase()),
    )
    setFilteredUsers(filtered)
  }

  const handleRoleChange = async (userId: string, newRole: "customer" | "admin") => {
    try {
      const res = await updateRole(userId, newRole)
      if (res?.success) {
        toast.success(res?.message)
        // Update local state
        setFilteredUsers(filteredUsers.map((user:any) => (user._id === userId ? { ...user, role: newRole } : user)))
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Failed to update user role")
    }
  }

  const handleStatusChange = async (userId: string, newStatus: "in-progress" | "blocked") => {
    try {
      const res = await updateStatus(userId, newStatus)
      if (res?.success) {
        toast.success(res?.message)
        // Update local state
        setFilteredUsers(filteredUsers.map((user:any) => (user._id === userId ? { ...user, status: newStatus } : user)))
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Failed to update user status")
    }
  }

  const handleUserDelete = async (userId: string) => {
    try {
      const res = await deleteUser(userId)
      if (res?.success) {
        toast.success(res?.message)
        // Remove from local state
        setFilteredUsers(filteredUsers.filter((user:any) => user._id !== userId))
      } else {
        toast.error(res?.message)
      }
    } catch {
      toast.error("Failed to delete user")
    } finally {
      setIsDeleteDialogOpen(false)
      setUserToDelete(null)
    }
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Manage Users</h1>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users by name or email..."
          value={searchTerm}
          onChange={handleSearch}
          className="pl-10 max-w-md"
        />
      </div>

      {/* Desktop view - Table */}
      <div className="hidden md:block rounded-md border overflow-x-auto">
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
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user: any) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === "in-progress" ? "default" : "destructive"}>{user.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/users/${user._id}`}>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" /> View
                      </Button>
                    </Link>
                  </TableCell>
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
                          onClick={() => handleRoleChange(user._id, user.role === "admin" ? "customer" : "admin")}
                        >
                          Change Role to {user.role === "admin" ? "Customer" : "Admin"}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer"
                          onClick={() =>
                            handleStatusChange(user._id, user.status === "in-progress" ? "blocked" : "in-progress")
                          }
                        >
                          Mark as {user.status === "in-progress" ? "Blocked" : "In-Progress"}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="cursor-pointer text-destructive focus:text-destructive"
                          onClick={() => {
                            setUserToDelete(user)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Mobile view - Cards */}
      <div className="md:hidden space-y-4">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user: any) => (
            <Card key={user._id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <h3 className="font-medium">{user.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex flex-wrap gap-2 pt-1">
                      <Badge variant={user.role === "admin" ? "default" : "secondary"}>{user.role}</Badge>
                      <Badge variant={user.status === "in-progress" ? "default" : "destructive"}>{user.status}</Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => router.push(`/admin/users/${user?._id}`)}
                      >
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleRoleChange(user._id, user.role === "admin" ? "customer" : "admin")}
                      >
                        Change Role to {user.role === "admin" ? "Customer" : "Admin"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() =>
                          handleStatusChange(user._id, user.status === "in-progress" ? "blocked" : "in-progress")
                        }
                      >
                        Mark as {user.status === "in-progress" ? "Blocked" : "In-Progress"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer text-destructive focus:text-destructive"
                        onClick={() => {
                          setUserToDelete(user)
                          setIsDeleteDialogOpen(true)
                        }}
                      >
                        Delete User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="mt-4 flex justify-end">
                  <Link href={`/admin/users/${user._id}`}>
                    <Button size="sm" variant="outline">
                      <ExternalLink className="h-4 w-4 mr-2" /> View Orders
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="text-center py-8 bg-muted/30 rounded-lg">
            <p className="text-muted-foreground">No users found</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete user `{userToDelete?.name}` ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => userToDelete && handleUserDelete(userToDelete._id)}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

