import Manufacturers from '@/components/admin/Manufacturer'
import { getAllManufacturer } from '@/services/Manufacturers'
import React from 'react'

const ManufacturerPage = async() => {
  const manufacturers = await getAllManufacturer()
  console.log("manufacturers", manufacturers);
  
  return (
    <div>
      <Manufacturers manufacturers={manufacturers.data} />
    </div>
  );
}

export default ManufacturerPage