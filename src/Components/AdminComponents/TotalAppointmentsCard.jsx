import React from 'react';

function TotalAppointmentsCard({ totalAppointments }) {
  return (
    <div className="bg-white shadow-md p-4 rounded-lg  h-[300px] w-full m-0">
      <h2 className="text-lg font-semibold">Total Appointments</h2>
      <p className="text-3xl font-bold text-blue-500">{totalAppointments}</p>
    </div>
  );
}

export default TotalAppointmentsCard;
