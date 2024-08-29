import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorProfile from './DoctorComponents/DoctorProfile'

function DoctorProfilePage() {
  return (
   <> <DoctorSideBar child={<DoctorProfile/>} /></>
  )
}

export default DoctorProfilePage