import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function AdminDoctorDetailView() {

  const data = [
    { name: 'Category A', priceUsd: 100 },
    { name: 'Category B', priceUsd: 150 },
    { name: 'Category C', priceUsd: 80 },
    { name: 'Category A', priceUsd: 100 },
    { name: 'Category B', priceUsd: 150 },
    { name: 'Category C', priceUsd: 80 },
  ];


  const rpmReading = 10;
  const calculateColor = () => {

    if (rpmReading > 80) {
      return 'bg-blue-600';
    } else if (rpmReading > 30) {
      return 'bg-green-500';
    } else {
      return 'bg-yellow-600';
    }
  };


  return (
    <div className='w-full h-full bg-gray-300 rounded-l-[10px]'>
      <div className='w-full h-full flex '>
        <div className="w-4/6 h-full ">
          <div className='w-full h-2/6  p-2 gap-2  '>
            <div className='w-full h-1/6  '>
            </div>
            <div className='w-full h-5/6  flex flex-col'>
              <div className='w-full h-1/6  flex justify-end px-3'>
                <button className='p-2 bg-blue-500 text-center text-white flex items-center justify-center rounded-lg active:bg-blue-600'>Update Charge</button>
              </div>
              <div className='w-full h-5/6  flex gap-2 items-center px-2'>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-4/6 p-3 flex items-center justify-center'>
            <div className="w-full h-full bg-white shadow-xl rounded-xl p-2">
              <div className='bg-gray-300 w-full h-full rounded-xl p-2 '>
                <div className='bg-blue-200 w-full h-full rounded-xl'>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="priceUsd"
                        fill="#3581F5"
                        barSize={30} 
                        radius={[10, 10, 0, 0]} 
                        label={{ position: "top" }} 
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='w-2/6 h-full px-3 pl-5  pt-11 pb-3'>
          <div className="w-full bg-gray-300 h-full shadow-xl rounded-xl flex flex-col p-1">
            <div className="w-full h-4/6 bg-white rounded-t-xl p-1">
              <div className='w-full h-full bg-blue-200 rounded-t-xl shadow-xl'>
                <div className='w-full h-5/6 '>

                </div>
                <div className='w-full h-1/6   '>
                  <div className="w-full h-3/6 ">

                  </div>
                  <div className="w-full h-3/6 ">
                    <div className='w-full h-5/6'>

                    </div>
                    <div className="w-full h-1/6  ">
                      <MyComponent fillPercentage={65} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-2/6 bg-gray-200 rounded-b-xl flex items-center justify-center">
              <div className='w-[64%] h-[99%]  rounded-full p-5 '>
                <div className={`w-full h-full rounded-full p-2 shadow-xl ${calculateColor()}`}>
                  <div className='w-full h-full bg-white rounded-full flex items-center justify-center shadow-xl'>
                    <div>
                      <h1 className='font-bold text-blue-400 text-2xl'>
                        {`${rpmReading}%`}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



const MyComponent = ({ fillPercentage }) => {
  const containerStyle = {
    height: '10px',
    position: 'relative',
  };

  const filledStyle = {
    height: '100%',
    width: `${fillPercentage}%`,
    background: '#4ec64a',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  return (
    <div className='bg-gray-400 shadow-xl border-1 border-gray-300 ' style={containerStyle}>
      <div className=' rounded-r-[4px] ' style={filledStyle}></div>
    </div>
  );
};


export default AdminDoctorDetailView