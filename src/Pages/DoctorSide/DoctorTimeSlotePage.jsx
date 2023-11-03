import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorTimeSlote from './DoctorComponents/DoctorTimeSlote'

function DoctorTimeSlotePage() {
  return (
   <DoctorSideBar child={<DoctorTimeSlote/>}/>
  )
}

export default DoctorTimeSlotePage