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




function LineChart1({child}) {
  return (
<>
    <div className="chart-container">
      <h1 className="text-heading">
      
      </h1>
      <ResponsiveContainer width={800} height={400}>
        <LineChart data={child} margin={{ top: 20, right: 100, bottom: 10, left: 30 }}>
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
