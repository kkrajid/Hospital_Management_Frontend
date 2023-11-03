import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientDashboard from '../../Pages/PatientSide/PageComponents/PatientDashboard'

function PatientDashboardPage() {
  return (
    <>
    <PatientSideBar child ={<PatientDashboard/>} />
    </>
  )
}

export default PatientDashboardPage