"use client";

import React from "react";

import { useState } from "react";
import { useTable, usePagination } from "@tanstack/react-table";
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
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

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

  const columns = React.useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Price",
        accessor: "price",
        Cell: ({ value }) => `$${value.toFixed(2)}`,
      },
      {
        Header: "Actions",
        Cell: ({ row }) => (
          <>
            <Button variant="outline" size="sm" className="mr-2">
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              Delete
            </Button>
          </>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data: medicines,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const addMedicine = () => {
    setMedicines([...medicines, { id: medicines.length + 1, ...newMedicine }]);
    setNewMedicine({ name: "", stock: 0, price: 0 });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Medicines</h1>
      <div className="mb-6">
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New Medicine</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Medicine</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={newMedicine.name}
                  onChange={(e) =>
                    setNewMedicine({ ...newMedicine, name: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="stock" className="text-right">
                  Stock
                </Label>
                <Input
                  id="stock"
                  type="number"
                  value={newMedicine.stock}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      stock: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={newMedicine.price}
                  onChange={(e) =>
                    setNewMedicine({
                      ...newMedicine,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <Button onClick={addMedicine}>Add Medicine</Button>
          </DialogContent>
        </Dialog>
      </div>
      <Table {...getTableProps()}>
        <TableHeader>
          {headerGroups.map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map((column) => (
                <TableHead {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <Button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {"<<"}
          </Button>
          <Button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {"<"}
          </Button>
          <Button onClick={() => nextPage()} disabled={!canNextPage}>
            {">"}
          </Button>
          <Button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </div>
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
