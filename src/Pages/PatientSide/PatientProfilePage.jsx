import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientProfile from './PageComponents/PatientProfile'

function PatientProfilePage() {
  return (
    <PatientSideBar child={<PatientProfile/>} />
  )
}

export default PatientProfilePage