import React from 'react'
import Patient_Appointmetn_detail_vew from './PageComponents/Patient_Appointmetn_detail_vew'
import PatientSideBar from './PageComponents/PatientSideBar'

function Patient_Appointment_Detail_View_Page() {
  return (

   <><PatientSideBar child ={<Patient_Appointmetn_detail_vew/>} /></>
  )
}

export default Patient_Appointment_Detail_View_Page