import React from 'react';

function TotalAppointmentsCard({ totalAppointments }) {
  return (
    <div className="flex shadow-md p-3 rounded-lg items-center justify-center  h-[150px] w-full m-0"style={{ background: 'linear-gradient(to right,  #0053E3, #35CD6B)' }}>
      <h2 className="text-lg font-semibold">Total Appointments</h2>
      <p className="text-3xl font-bold text-blue-500">{totalAppointments}</p>
    </div>
  );
}

export default TotalAppointmentsCard;
