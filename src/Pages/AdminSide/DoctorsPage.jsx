import React from 'react'
import AdminDashboard from './AdminDashboard'
import Doctors from '../../Components/AdminComponents/PageComponents/Doctors'

function DoctorsPage() {
  return (
    <>
    <AdminDashboard state={<Doctors/>}/>
    </>
  )
}

export default DoctorsPage