import React from 'react'
import AdminSidebar from './AdminComponents/AdminSidebar'
import AdminDashboard from './AdminComponents/AdminDashboard'

function AdminDashboardPage() {
  return (
   <>
   <AdminSidebar child={<AdminDashboard/>}/>
   </>
  )
}

export default AdminDashboardPage