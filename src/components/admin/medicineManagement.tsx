"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Edit, Trash2, Search, ChevronLeft, ChevronRight, Plus, Eye, MoreHorizontal, AlertTriangle } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"

import { getAllMedicine, deleteMedicine } from "@/services/medicine"

export default function ManageMedicines({ medicines: initialMedicines }:any) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [medicines, setMedicines] = useState(initialMedicines || [])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [medicineToDelete, setMedicineToDelete] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMedicine, setSelectedMedicine] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  // Fetch medicines with pagination
  const fetchMedicines = async (page = 1, search = "") => {
    setIsLoading(true)
    try {
      const params: Record<string, unknown> = {
        page,
        limit: 10,
      }

      if (search) {
        params.searchTerm = search
      }

      const response = await getAllMedicine(params)

      if (response.success) {
        setMedicines(response.data)
        setTotalPages(response.meta.totalPages)
        setCurrentPage(response.meta.page)
      } else {
        toast.error("Failed to fetch medicines")
      }
    } catch (error) {
      console.error("Error fetching medicines:", error)
      toast.error("An error occurred while fetching medicines")
    } finally {
      setIsLoading(false)
    }
  }

  // Initial fetch and when page changes
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1
    const search = searchParams.get("search") || ""

    setCurrentPage(page)
    setSearchTerm(search)
    fetchMedicines(page, search)
  }, [searchParams])

  // Handle search
  const handleSearch = (e:any) => {
    e.preventDefault()
    router.push(`/admin/medicines?page=1&search=${encodeURIComponent(searchTerm)}`)
  }

  // Handle pagination
  const handlePageChange = (newPage:any) => {
    if (newPage < 1 || newPage > totalPages) return

    const searchQuery = searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ""
    router.push(`/admin/medicines?page=${newPage}${searchQuery}`)
  }

  // Handle delete
  const handleDelete = async () => {
    if (!medicineToDelete) return

    try {
      const response = await deleteMedicine(medicineToDelete._id)

      if (response.success) {
        toast.success("Medicine deleted successfully")
        fetchMedicines(currentPage, searchTerm)
      } else {
        toast.error(response.message || "Failed to delete medicine")
      }
    } catch (error) {
      console.error("Error deleting medicine:", error)
      toast.error("An error occurred while deleting the medicine")
    } finally {
      setIsDeleteDialogOpen(false)
      setMedicineToDelete(null)
    }
  }

  // Handle view medicine details
  const handleViewMedicine = (medicine: any) => {
    setSelectedMedicine(medicine)
    setIsViewDialogOpen(true)
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="shadow-md">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-2xl">Manage Medicines</CardTitle>
            <CardDescription>View, edit, and manage your medicine inventory</CardDescription>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search medicines..."
                className="pl-8 w-full sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </form>
            <Button onClick={() => router.push("/admin/medicines/add")} className="gap-1">
              <Plus className="h-4 w-4" /> Add Medicine
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          {/* Mobile View - Cards */}
          <div className="grid grid-cols-1 gap-4 md:hidden">
            {isLoading ? (
              Array(3)
                .fill(0)
                .map((_, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Skeleton className="h-16 w-16 rounded-md" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-4 w-1/2" />
                          <Skeleton className="h-4 w-1/4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
            ) : medicines.length === 0 ? (
              <div className="text-center py-8">
                <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-2 text-lg font-medium">No medicines found</h3>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or add a new medicine.</p>
              </div>
            ) : (
              medicines.map((medicine:any) => (
                <Card key={medicine._id} className="overflow-hidden">
                  <div className="flex items-start p-4">
                    <div className="h-16 w-16 rounded-md overflow-hidden bg-muted mr-3 flex-shrink-0">
                      {medicine.images && medicine.images.length > 0 ? (
                        <Image
                          src={medicine.images[0] || "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742804695/medicine_xhnv5i.avif"}
                          alt={medicine.name}
                          width={64}
                          height={64}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium line-clamp-1">{medicine.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant={medicine.quantity > 10 ? "outline" : "destructive"} className="text-xs">
                          {medicine.quantity > 10 ? "In Stock" : "Low Stock"}
                        </Badge>
                        <span className="text-sm text-muted-foreground">${medicine.price}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => handleViewMedicine(medicine)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2"
                          onClick={() => router.push(`/admin/medicines/edit/${medicine._id}`)}
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 px-2 text-destructive border-destructive hover:bg-destructive/10"
                          onClick={() => {
                            setMedicineToDelete(medicine)
                            setIsDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          {/* Desktop View - Table */}
          <div className="hidden md:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Prescription</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  Array(5)
                    .fill(0)
                    .map((_, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Skeleton className="h-10 w-10 rounded-md" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[200px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[80px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[60px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[100px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-[60px]" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-8 w-[100px] ml-auto" />
                        </TableCell>
                      </TableRow>
                    ))
                ) : medicines.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                      <h3 className="mt-2 text-lg font-medium">No medicines found</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        Try adjusting your search or add a new medicine.
                      </p>
                    </TableCell>
                  </TableRow>
                ) : (
                  medicines?.map((medicine: any) => (
                    <TableRow key={medicine._id}>
                      <TableCell>
                        <div className="h-10 w-10 rounded-md overflow-hidden bg-muted">
                          {medicine.images && medicine.images.length > 0 ? (
                            <Image
                              src={medicine.images[0] || "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742804695/medicine_xhnv5i.avif"}
                              alt={medicine.name}
                              width={40}
                              height={40}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground text-xs">
                              No img
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{medicine.name}</TableCell>
                      <TableCell>${medicine.price}</TableCell>
                      <TableCell>
                        <Badge variant={medicine.quantity > 10 ? "outline" : "destructive"}>{medicine.quantity}</Badge>
                      </TableCell>
                      <TableCell>{medicine.category?.name || "N/A"}</TableCell>
                      <TableCell>
                        <Badge variant={medicine.prescription === "Yes" ? "secondary" : "outline"}>
                          {medicine.prescription}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleViewMedicine(medicine)}>
                              <Eye className="mr-2 h-4 w-4" /> View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/admin/medicines/edit/${medicine._id}`)}>
                              <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                setMedicineToDelete(medicine)
                                setIsDeleteDialogOpen(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>

        {/* Pagination */}
        {!isLoading && medicines.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t p-4">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete `{medicineToDelete?.name}`? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Medicine Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-5xl h-[400px] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Medicine Details</DialogTitle>
          </DialogHeader>

          {selectedMedicine && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="aspect-square rounded-md overflow-hidden bg-muted mb-4">
                  {selectedMedicine.images && selectedMedicine.images.length > 0 ? (
                    <Image
                      src={selectedMedicine.images[0] || "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742804695/medicine_xhnv5i.avif"}
                      alt={selectedMedicine.name}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                      No image available
                    </div>
                  )}
                </div>

                {selectedMedicine.images && selectedMedicine.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedMedicine.images.slice(1).map((img: string, idx:number) => (
                      <div key={idx} className="aspect-square rounded-md overflow-hidden bg-muted">
                        <Image
                          src={img || "https://res.cloudinary.com/db8l1ulfq/image/upload/v1742804695/medicine_xhnv5i.avif"}
                          alt={`${selectedMedicine.name} image ${idx + 2}`}
                          width={100}
                          height={100}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold">{selectedMedicine.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="outline">{selectedMedicine.category?.name || "N/A"}</Badge>
                    <Badge variant={selectedMedicine.prescription === "Yes" ? "secondary" : "outline"}>
                      {selectedMedicine.prescription === "Yes" ? "Prescription Required" : "No Prescription"}
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Price</p>
                    <p className="font-medium">${selectedMedicine.price}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Quantity</p>
                    <p className="font-medium">{selectedMedicine.quantity} units</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Type</p>
                    <p className="font-medium">{selectedMedicine.type || "N/A"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{selectedMedicine.manufacturer?.name || "N/A"}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Description</h4>
                  <p className="text-sm">{selectedMedicine.description || "No description available"}</p>
                </div>

                {selectedMedicine.usege && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Usage Instructions</h4>
                    <p className="text-sm">{selectedMedicine.usege}</p>
                  </div>
                )}

                {selectedMedicine.sideEffect && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Side Effects</h4>
                    <p className="text-sm">{selectedMedicine.sideEffect}</p>
                  </div>
                )}

                {selectedMedicine.precautions && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Precautions</h4>
                    <p className="text-sm">{selectedMedicine.precautions}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => router.push(`/admin/medicines/edit/${selectedMedicine?._id}`)}>
              <Edit className="mr-2 h-4 w-4" /> Edit
            </Button>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

