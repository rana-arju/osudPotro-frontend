import AllOrders from '@/components/admin/AllOrders'
import { getAllOrder } from '@/services/order'
import React from 'react'

const OrderManagement = async() => {
  const res = await getAllOrder();
  
  const orders = res?.data;

  return (
    <div>
      <AllOrders orders = {orders} />
    </div>
  )
}

export default OrderManagement