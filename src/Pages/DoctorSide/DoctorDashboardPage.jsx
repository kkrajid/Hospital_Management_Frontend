import React from 'react';

import DoctorSideBar from './DoctorComponents/DoctorSideBar';

import DoctorDashboard from './DoctorComponents/DoctorDashboard';

function DoctorDashboardPage() {
  return (
   <DoctorSideBar child ={<DoctorDashboard/> } />
  );
}

export default DoctorDashboardPage;
