import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorAppointmentList from './DoctorComponents/DoctorAppointmentList'

function DoctorAppointmentPage() {
  return (
    <DoctorSideBar  child={<DoctorAppointmentList/>}/>
  )
}

export default DoctorAppointmentPage
