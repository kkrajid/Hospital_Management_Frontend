import React from 'react'
import AdminSidebar from './AdminComponents/AdminSidebar'
import AdminSettings from './AdminComponents/AdminSettings'

function AdminSettingsPage() {
  return (
    <>
    <AdminSidebar child={<AdminSettings/>} />
    </>
  )
}

export default AdminSettingsPage