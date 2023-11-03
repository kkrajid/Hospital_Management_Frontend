import React from 'react'
import AdminSidebar from './AdminComponents/AdminSidebar'
import AdminDoctorsList from './AdminComponents/AdminDoctorsList'

function AdminDoctorsPage() {
  return (
    <>
    <AdminSidebar child={<AdminDoctorsList/>}/>
    </>
  )
}

export default AdminDoctorsPage