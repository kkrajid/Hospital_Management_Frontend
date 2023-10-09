import React from 'react'
import AdminDashboard from './AdminDashboard'
import Settings from '../../Components/AdminComponents/PageComponents/Settings'

function SettingsPage() {
  return (
    <>
    <AdminDashboard state={<Settings/>} />
    </>
  )
}

export default SettingsPage