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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <TotalAppointmentsCard totalAppointments={totalAppointments} />
                <PatientSurveysCard surveyCount={surveyCount} />
                <TopCasesCard topCases={topCases} />
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-400 h-[150px]  mt-2 rounded-lg">

            </div>
       
        </>
    )
}

export default Dashboard