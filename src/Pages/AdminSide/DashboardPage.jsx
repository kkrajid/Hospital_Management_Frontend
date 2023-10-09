import React from 'react'
import AdminDashboard from './AdminDashboard'
import Dashboard from '../../Components/AdminComponents/PageComponents/Dashboard'

function DashboardPage() {
  return (
    <><AdminDashboard state={ <Dashboard/>} /></>
  )
}

export default DashboardPage