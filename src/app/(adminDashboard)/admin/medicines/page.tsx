import ManageMedicines from '@/components/admin/medicineManagement'
import { getAllMedicine } from '@/services/medicine'
import React from 'react'

const ManagementMedicinePage = async () => {
  const allMedicinesInfo = await getAllMedicine({});
  const medicines = allMedicinesInfo
  console.log("category", medicines);

  return (
    <div>
      <ManageMedicines medicines={medicines.data} />
    </div>
  );
}

export default ManagementMedicinePage