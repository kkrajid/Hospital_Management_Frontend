import React from 'react';
import AdminNavBar from '../../Components/AdminComponents/AdminNavBar';
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar';
import TotalAppointmentsCard from '../../Components/AdminComponents/TotalAppointmentsCard';
import PatientSurveysCard from '../../Components/AdminComponents/PatientSurveysCard';
import TopCasesCard from '../../Components/AdminComponents/TopCasesCard';

function AdminDashboard() {
  const totalAppointments = 150;
  const surveyCount = 50;
  const topCases = ['Case 1', 'Case 2', 'Case 3', 'Case 4', 'Case 5'];

  return (
    <div className="flex flex-col h-screen">
      <AdminNavBar />
      <div className="flex flex-row flex-grow">
        <AdminSidebar />
        <div className="flex-grow p-4 ml-20">
          <div className="overflow-y-auto max-h-[calc(100vh-64px)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <TotalAppointmentsCard totalAppointments={totalAppointments} />
              <PatientSurveysCard surveyCount={surveyCount} />
              <TopCasesCard topCases={topCases} />
              <TopCasesCard topCases={topCases} />
            </div>
            <div className="grid grid-cols-1 mt-2 md:grid-cols-2 gap-4">
              <TotalAppointmentsCard totalAppointments={totalAppointments} />
              <TopCasesCard topCases={topCases} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
