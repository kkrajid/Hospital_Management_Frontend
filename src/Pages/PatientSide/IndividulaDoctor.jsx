import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import DoctorView from './PageComponents/DoctorView'


function IndividulaDoctor() {
  return (
    <PatientSideBar child ={<DoctorView/>} />
  )
  
}

export default IndividulaDoctor