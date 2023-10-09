import React from 'react'
import AdminDashboard from './AdminDashboard'
import DoctorForm from '../../Components/AdminComponents/PageComponents/DoctorForm'

function AddDoctorPage() {
  return (
    <><AdminDashboard state={ <DoctorForm/>} /></>
  )
}

export default AddDoctorPage