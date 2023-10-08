import React from 'react'
import TotalAppointmentsCard from '../../../Components/AdminComponents/TotalAppointmentsCard';
import PatientSurveysCard from '../../../Components/AdminComponents/PatientSurveysCard';
import TopCasesCard from '../../../Components/AdminComponents/TopCasesCard';


function Dashboard() {
    const totalAppointments = 150;
    const surveyCount = 50;
    const topCases = ['Case 1', 'Case 2', 'Case 3', 'Case 4', 'Case 5'];
  
    return (
        <>
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
        </>
    )
}

export default Dashboard