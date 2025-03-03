import ManageMedicines from '@/components/admin/medicineManagement'
import { getAllMedicine } from '@/services/medicine'
import React from 'react'

const ManagementMedicinePage = async () => {
  const allMedicinesInfo = await getAllMedicine();
  const medicines = allMedicinesInfo?.data
  return (
    <div>
      <ManageMedicines medicines={medicines} />
    </div>
  );
}

export default ManagementMedicinePage