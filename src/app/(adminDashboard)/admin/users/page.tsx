import React from 'react'
import UsersList from '@/components/admin/UsersList'
import { getAllUsers} from '@/services/AuthService'
export const dynamic = "force-dynamic"; 
async function UsersManage() {
  const res = await getAllUsers();
  
  const users = res?.data
  return (
    <div>
      <UsersList users= {users} />
    </div>
  )
}

export default UsersManage