import AddMedicine from "@/components/admin/AddMedicine";
import { getAllCategory } from "@/services/category";
import { getAllManufacturer } from "@/services/Manufacturers";
import React from "react";

const AddMedicinePage =async () => {
  const categories = await getAllCategory();
  const manufacturers = await getAllManufacturer();

  return (
    <div>
      <AddMedicine
        categories={categories?.data}
        manufacturers={manufacturers?.data}
      />
    </div>
  );
};

export default AddMedicinePage;
