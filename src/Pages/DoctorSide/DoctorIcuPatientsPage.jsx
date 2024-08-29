import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorIcuPatients from './DoctorComponents/DoctorIcuPatients'

function DoctorIcuPatientsPage() {
  return (
    <DoctorSideBar child={<DoctorIcuPatients/>}/>
  )
}

export default DoctorIcuPatientsPage