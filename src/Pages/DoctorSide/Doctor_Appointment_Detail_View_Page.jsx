import React from 'react'
import Doctor_Appointmetn_detail_vew from './DoctorComponents/Doctor_Appointmetn_detail_vew'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'

function Doctor_Appointment_Detail_View_Page() {
  return (
     <DoctorSideBar child={<Doctor_Appointmetn_detail_vew/>}/>
    
  )
}

export default Doctor_Appointment_Detail_View_Page