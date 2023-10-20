import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientHome from './PageComponents/PatientHome'

function PatientDashboard() {
  return (
    <>
    <PatientSideBar child ={<PatientHome/>} />
    </>
  )
}

export default PatientDashboard