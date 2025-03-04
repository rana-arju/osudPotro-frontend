import Profile from "@/components/auth/Profile";
import { getMe } from "@/services/AuthService";
import React from "react";

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
