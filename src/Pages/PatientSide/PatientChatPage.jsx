import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientChat from './PageComponents/PatientChat'

function PatientChatPage() {
  return (
    <PatientSideBar child ={<PatientChat/>} />
    )
}

export default PatientChatPage