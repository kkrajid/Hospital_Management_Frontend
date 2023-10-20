import React from 'react'

import PatientSideBar from './PageComponents/PatientSideBar'
import PatientDoctorList from './PageComponents/PatientDoctorList'

function PatientDoctorPage() {
  return (
    <PatientSideBar child ={<PatientDoctorList/>} />
  )
}

export default PatientDoctorPage