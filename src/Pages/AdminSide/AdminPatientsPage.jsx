import React from 'react'
import AdminSidebar from './AdminComponents/AdminSidebar'
import AdminPatients from './AdminComponents/AdminPatients'

function AdminPatientsPage() {
  return (
    <>
    <AdminSidebar child={<AdminPatients/>} />
    </>
  )
}

export default AdminPatientsPage