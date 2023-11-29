import React,{useEffect} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LineChart } from 'recharts';
import LineChart1 from './LineChart';



function AdminDashboard() {
  // Registering required elements for Chart.js
  ChartJS.register(ChartDataLabels);
  ChartJS.register(ArcElement, Tooltip, Legend);

  const response = [
    { doctor_name: 'Dr. Smith', appointment_count: 10 },
    { doctor_name: 'Dr. Johnson', appointment_count: 15 },
    { doctor_name: 'Dr. Brown', appointment_count: 8 },
    { doctor_name: 'Dr. White', appointment_count: 20 },
    { doctor_name: 'Dr. Davis', appointment_count: 12 },
    { doctor_name: 'Ahamed Thashrif', appointment_count: 18 },
  ];

  // Extracting labels and data from the response array
  const labels = response.map((item) => item.doctor_name);
  const dataValues = response.map((item) => item.appointment_count);

  // Example data for the Doughnut chart
  const data = {
    labels: labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: ['#3498db', '#2980b9', '#1abc9c', '#16a085', '#3498db', '#2c3e50'],
        hoverBackgroundColor: ['#3498db', '#2980b9', '#1abc9c', '#16a085', '#3498db', '#2c3e50'],
        
    
        borderWidth: 2,
        borderColor: '#fff', // Border color for each segment
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%', // You can adjust the size of the hole in the center
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        color: 'white',
        display: true,
        formatter: (value, context) => {
          const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
          const percentage = ((value / total) * 100).toFixed(2) + '%';
          return percentage;
        },
      },
    },
  };
  
  return (
    <div className='w-full h-full   bg-[#D1D5DB] '>
      <div className='w-full h-2/6 flex '>
        <div className='w-full h-full flex px-4 '>
          <div className='w-2/6 h-full  px-4 py-11 '>
            <div className='w-full h-full bg-white shadow-lg  rounded-[10px] '>

            </div>
          </div>
          <div className='w-2/6 h-full  px-4 py-11 '>
            <div className='w-full h-full bg-white shadow-lg rounded-[10px] '>

            </div>
          </div>
          <div className='w-2/6 h-full  px-4 py-11 '>
            <div className='w-full h-full bg-white shadow-lg rounded-[10px] '>

            </div>
          </div>
          <div className='w-2/6 h-full  px-4 py-11 '>
            <div className='w-full h-full bg-white shadow-lg rounded-[10px] '>

            </div>
          </div>

        </div>
      </div>
      <div className='w-full h-4/6  px-8 py-9'>
        <div className='w-full h-full  rounded-[10px] flex '>
          <div className='w-4/6 h-full rounded-t-[10px] p-2 '>
            <div className='w-full h-full  bg-white shadow-lg rounded-[10px]  flex items-center justify-center'>
            <div className='flex flex-col text-center '>
            <LineChart1/>

            </div>

            </div>
          </div>
          <div className='w-2/6 h-full p-2  '>
            <div className='w-full h-full bg-white shadow-lg border  rounded-[10px] p-6 '>

            <Doughnut data={data} options={options} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
