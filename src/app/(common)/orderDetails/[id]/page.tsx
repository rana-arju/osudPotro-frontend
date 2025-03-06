import OrderDetails from "@/components/OrderDetails";
import { getSingleOrder } from "@/services/order";
import React from "react";

const OrderDetailsPage = async ({ params }: any) => {
  const { id } = await params;
  const res = await getSingleOrder(id);
  const details = res?.data;
  return (
    <div>
      <OrderDetails details = {details} />
    </div>
  );
};

export default OrderDetailsPage;
