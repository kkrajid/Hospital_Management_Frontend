import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorChat from './DoctorComponents/DoctorChat'

function DoctorChatPage() {
  return (
    <DoctorSideBar child ={<DoctorChat/>} />
  )
}

export default DoctorChatPage