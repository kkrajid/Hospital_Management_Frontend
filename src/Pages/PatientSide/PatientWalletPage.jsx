import React from 'react'
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientWallet from './PageComponents/PatientWallet'

function PatientWalletPage() {
  return (
    <PatientSideBar child={<PatientWallet/>}/>
  )
}

export default PatientWalletPage