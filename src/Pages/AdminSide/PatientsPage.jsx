import React from 'react'
import AdminDashboard from './AdminDashboard'
import Patients from '../../Components/AdminComponents/PageComponents/Patients'

function PatientsPage() {
  return (
    <>
    <AdminDashboard state={ <Patients/>} />
    </>
  )
}

export default PatientsPage