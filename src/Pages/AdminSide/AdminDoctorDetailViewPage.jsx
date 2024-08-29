import React from 'react'
import AdminSidebar from './AdminComponents/AdminSidebar'
import AdminDoctorDetailView from './AdminComponents/AdminDoctorDetailView'

function AdminDoctorDetailViewPage() {
  return (
    <AdminSidebar child={<AdminDoctorDetailView/>} />
  )
}

export default AdminDoctorDetailViewPage