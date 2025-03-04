import React from "react";
import Profile from "@/components/auth/Profile";
import { getMe } from "@/services/AuthService";
export const dynamic = "force-dynamic"; 
const AdminProfile = async () => {
  const res = await getMe();
  const userData = res?.data;
  return (
    <div>
      <Profile userData= {userData} />
    </div>
  );
};

export default AdminProfile;
