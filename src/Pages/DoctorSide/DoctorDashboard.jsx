import React from 'react';
import AdminNavBar from '../../Components/AdminComponents/AdminNavBar';
import DoctorNavBar from '../../Components/DoctorSideComponents/doctorNavBar';

function DoctorDashboard() {
  return (
    <div className="flex flex-col ">
      <DoctorNavBar/>
      <div className="flex flex-row  overflow-x-auto ">
        <div className=" p-4 mt-12 ml-20 w-full">
          <div className="">
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
