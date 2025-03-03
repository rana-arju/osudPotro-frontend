import EditMedicine from "@/components/admin/UpdateMedicine";
import { getAllCategory } from "@/services/category";
import { getAllManufacturer } from "@/services/Manufacturers";
import React from "react";

const UpdateMedicinePage = async () => {
  const categories = await getAllCategory();
  const manufacturers = await getAllManufacturer();

  return (
    <div>
      <EditMedicine
        categories={categories?.data}
        manufacturers={manufacturers?.data}
      />
    </div>
  );
};

export default UpdateMedicinePage;
