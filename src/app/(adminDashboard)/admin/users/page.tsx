import UsersList from '@/components/admin/UsersList'
import { getAllUsers} from '@/services/AuthService'
import React from 'react'

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