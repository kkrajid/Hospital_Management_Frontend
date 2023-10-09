import React from 'react'
import AdminDashboard from './AdminDashboard'
import AddPatient from '../../Components/AdminComponents/PageComponents/AddPatient'

function AddPatientsPage() {
  return (
    <><AdminDashboard state={ <AddPatient/>} /></>
  )
}

export default AddPatientsPage