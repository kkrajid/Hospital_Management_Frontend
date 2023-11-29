import React from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';


const pdata = [
  { doctor_name: 'Dr. Smith', appointment_count: 10 },
  { doctor_name: 'Dr. Johnson', appointment_count: 15 },
  { doctor_name: 'Dr. Brown', appointment_count: 8 },
  { doctor_name: 'Dr. White', appointment_count: 20 },
  { doctor_name: 'Dr. Davis', appointment_count: 12 },
  { doctor_name: 'Ahamed Thashrif', appointment_count: 18 },
];

function LineChart1() {
  return (
<>
    <div className="chart-container">
      <h1 className="text-heading">
      
      </h1>
      <ResponsiveContainer width={800} height={400}>
        <LineChart data={pdata} margin={{ top: 20, right: 100, bottom: 10, left: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="doctor_name" interval={'preserveStartEnd'} />
          <YAxis />
          <Legend />
          <Tooltip />
          <Line type="monotone" dataKey="appointment_count" stroke="#8884d8" fill="#8884d8" name="Appointment " />
        </LineChart>
      </ResponsiveContainer>
    </div>

</>
  );
}

export default LineChart1;
