import React,{useEffect,useState} from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { LineChart } from 'recharts';
import LineChart1 from './LineChart';
import { admin_dashboard_data } from '../../../api/user';
import { useQuery } from '@tanstack/react-query';


function AdminDashboard() {
  // Registering required elements for Chart.js
  ChartJS.register(ChartDataLabels);
  ChartJS.register(ArcElement, Tooltip, Legend);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const { data, isLoading, isError, refetch } = useQuery(['admin_dashboard_data'], admin_dashboard_data);
  console.log(data);
  useEffect(() => {
    try {
      if (data) {
        setDoctorAppointments(data?.doctors);
        setDashboardData(data?.dashboard_data)
      }
    } catch (error) {
      console.error('Error setting patients:', error);
    }
  }, [data]);
  console.log(data,'wewew');
 

  // Extracting labels and data from the response array
  const labels = doctorAppointments.map((item) => item.doctor_name);
  const dataValues = doctorAppointments.map((item) => item.appointment_count);

  // Example data for the Doughnut chart
  const datas = {
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
        {dashboardData && Object.entries(dashboardData).map(([key, value]) => (
        <div key={key} className='w-2/6 h-full px-4 py-11'>
          <div className='w-full h-full bg-white shadow-lg rounded-[10px] flex flex-col items-center justify-center gap-2 '>
          <p className='uppercase text-sm '>{key.replace(/_count/g, '').replace(/_/g, ' ')}</p>
            <p>{value}</p>
          </div>
        </div>
      ))}
        </div>
      </div>
      <div className='w-full h-4/6  px-8 py-9'>
        <div className='w-full h-full  rounded-[10px] flex '>
          <div className='w-4/6 h-full rounded-t-[10px] p-2 '>
            <div className='w-full h-full  bg-white shadow-lg rounded-[10px]  flex items-center justify-center'>
            <div className='flex flex-col text-center '>
            <LineChart1 child={doctorAppointments} />

            </div>

            </div>
          </div>
          <div className='w-2/6 h-full p-2  '>
            <div className='w-full h-full bg-white shadow-lg border  rounded-[10px] p-6 '>

            <Doughnut data={datas} options={options} />
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
