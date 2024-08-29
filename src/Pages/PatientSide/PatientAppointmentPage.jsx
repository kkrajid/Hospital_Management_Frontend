import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientAppointment from './PageComponents/PatientAppointment'

function PatientAppointmentPage() {
  return (
    <PatientSideBar child ={<PatientAppointment/>} />
  )
}

export default PatientAppointmentPage