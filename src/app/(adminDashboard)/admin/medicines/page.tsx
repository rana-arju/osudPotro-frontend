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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

// Mock data for medicines
const initialMedicines = [
  { id: 1, name: "Paracetamol", stock: 500, price: 5.99 },
  { id: 2, name: "Ibuprofen", stock: 300, price: 7.99 },
  { id: 3, name: "Amoxicillin", stock: 200, price: 15.99 },
  // Add more medicines as needed
];

export default function ManageMedicines() {
  const [medicines, setMedicines] = useState(initialMedicines);
  const [newMedicine, setNewMedicine] = useState({
    name: "",
    stock: 0,
    price: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;



  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = medicines.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(medicines.length / itemsPerPage);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Medicines</h1>
      <div className="mb-6">
        <Link href="/admin/medicines/add">
          <Button>Add New Medicine</Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((medicine) => (
              <TableRow key={medicine.id}>
                <TableCell>{medicine.name}</TableCell>
                <TableCell>{medicine.stock}</TableCell>
                <TableCell>${medicine.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                // disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                // disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
