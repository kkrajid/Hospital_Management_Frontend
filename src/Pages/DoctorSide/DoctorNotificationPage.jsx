import React from 'react'
import DoctorSideBar from './DoctorComponents/DoctorSideBar'
import DoctorNotifications from './DoctorComponents/DoctorNotifications'

function DoctorNotificationPage() {
  return (
    <> <DoctorSideBar child={<DoctorNotifications/>} /></>
  )
}

export default DoctorNotificationPage