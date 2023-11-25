import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorIcuDetail_View from './DoctorComponents/DoctorIcuDetail_View'

function DoctorIcuDetail_ViewPage() {
  return (
    <DoctorSideBar  child={<DoctorIcuDetail_View/> }/>
  )
  
}

export default DoctorIcuDetail_ViewPage