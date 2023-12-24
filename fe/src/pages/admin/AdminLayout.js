import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import path from 'utils/path'
import { AdminSidebar } from 'components'

const AdminLayout = () => {
  const { isLoggedIn, current, token } = useSelector((state) => state.user)
  const decodedToken = typeof token === 'string' ? jwtDecode(token) : null
  const userRole = decodedToken?.role

  if (!isLoggedIn || !current || userRole !== 'admin')
    return <Navigate to={`/${path.LOGIN}`} replace={true} />
  return (
    <div className="flex w-full bg-gray-100 min-h-screen relative text-gray-900">
      <div className='w-[327px] top-0 bottom-0 flex-none fixed'>
        <AdminSidebar/>
      </div>
      <div className='w-[327px]'></div>
      <div className='flex-auto'>
        <Outlet />
      </div>
    </div>
  )
}

export default AdminLayout
