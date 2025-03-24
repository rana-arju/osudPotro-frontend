import UserOrders from "@/components/admin/UserOrders";
import { getUserOrders } from "@/services/AuthService";
import React from "react";

async function UserOrdersPage({ params }: any) {
  const { id } = await params;
  const res = await getUserOrders(id);
  const userOrders = res.data;
  console.log("user orders", userOrders);
  
  return (
    <div>
      <UserOrders userOrders={userOrders} />
    </div>
  );
}

export default UserOrdersPage;
