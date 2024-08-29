import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientDashboard } from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import {useAuthStore} from '../../../Store/auth'
import { Link, useNavigate } from 'react-router-dom';

function PatientDashboard() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    profile_pic:'',
    gender:'data',
});

const { data, error, isLoading } = useQuery(['patientDashboard'], patientDashboard); 

useEffect(() => {
  if (data && !isLoading) {
    setUserData({
      name: data.user['full_name'],
      email: data.user['email'],
      mobile: data.user['phone'],
       profile_pic:data.profile_data?data.profile_data['profile_pic']:' '
    });
  }
}, [data, isLoading]);
// useAuthStore.getState().logout()


if (isLoading) {
    return <LoadingSpinner />;
}
  return (
    <div className='max-w-[1480px] w-full bg-gray-100 rounded-[10px] h-full p-2 overflow-y-auto'>
      <div className='w-full h-[450px]'>
        <div className='w-full h-[60px] shadow-lg bg-white rounded-[3px] flex items-center my-2'>
          <div className='flex justify-between items-center py-2 px-4 w-full '>
            <div>
              <h1>Dashboard</h1>
            </div>
            <Link to={`/patient/profile`}>
              <img src={userData.profile_pic?userData.profile_pic:""} className='w-10 h-10 shadow-lg rounded-full' alt="" />
            </Link>
          </div>
        </div>
        <div className='flex md:flex-row flex-col w-full h-full'>
          <div className='md:max-w-xs w-full  h-full p-3'>
            <div className='w-full h-full bg-white shadow-lg px-5 py-2 rounded-[10px]'>
              <div className='w-full h-full  p-3'>
                <div className='flex flex-col items-center justify-center py-3  gap-4'>
                  <img src={userData.profile_pic?userData.profile_pic:""} className='w-20 h-20 shadow-lg border-1 border-white rounded-full' alt="" />
                  <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-1xl font-mono font-semibold text-gray-400'>{userData.name}</h1>
                    <p className='p-1 px-2 text-green-400 bg-green-100 rounded-[10px] text-xs my-1'>Active</p>
                  </div>
                  <button className='text-sm py-2 bg-[#38A2FF] px-4 text-white rounded-[10px] hover:bg-blue-500 active:bg-blue-600' >Add New Appointment</button>
                </div>
                <div className='grid grid-cols-1 flex gap-2'>
                  <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                    <p className='text-xs text-gray-500 font-mono'>Email</p>
                    <p className='text-xs font-mono font-semibold'>{userData.email}</p>
                  </div>
                  <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                    <p className='text-xs text-gray-500 font-mono'>Mobile</p>
                    <p className='text-xs font-mono font-semibold'>{userData.mobile}</p>
                  </div>
                  <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                    <p className='text-xs text-gray-500 font-mono'>Gender</p>
                    <p className='text-xs font-mono font-semibold'>{userData.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=' w-full  h-full p-4'>
            <div className='w-full h-full  rounded-[10px]  flex flex-col gap-2'>
              <div className='flex gap-2 grid grid-cols-3 w-full h-2/6'>
                <div className='bg-white rounded-[15px] shadow-lg'>
                  <div className='flex flex-row py-3 px-4 justify-between'>
                    <div className='flex flex-col  p-2 '>
                      <h1 className='text-blue-500 text-4xl'>
                        5
                      </h1>
                      <p className='text-gray-400 font-mono text-base'>All bookings</p>
                      <p className='text-gray-400 font-mono text-base'>35.67%</p>
                    </div>
                    <div className='pt-10'>
                      <img src="https://th.bing.com/th/id/OIP.BU7qeY_oiiqDfvdQHaG4DwHaHa?pid=ImgDet&rs=1" alt="" className='w-10 h-10 bg-blue-400' />
                    </div>
                  </div>
                </div>
                <div className='bg-white rounded-[15px] shadow-lg'>
                  <div className='flex flex-row py-3 px-4 justify-between'>
                    <div className='flex flex-col  p-2 '>
                      <h1 className='text-purple-500 text-4xl'>
                        2
                      </h1>
                      <p className='text-gray-400 font-mono text-base'>Completed</p>
                      <p className='text-gray-400 font-mono text-base'>25.67%</p>
                    </div>
                    <div className='pt-10'>
                      <img src="https://th.bing.com/th/id/OIP.BU7qeY_oiiqDfvdQHaG4DwHaHa?pid=ImgDet&rs=1" alt="" className='w-10 h-10 bg-blue-400' />
                    </div>
                  </div>
                </div>
                <div className='bg-white rounded-[15px] shadow-lg'>
                  <div className='flex flex-row py-3 px-4 justify-between'>
                    <div className='flex flex-col  p-2 '>
                      <h1 className='text-red-500 text-4xl font-italic'>
                        5
                      </h1>
                      <p className='text-gray-400 font-mono text-base'>Cancelled</p>
                      <p className='text-gray-400 font-mono text-base'>35.67%</p>
                    </div>
                    <div className='pt-10'>
                      <img src="https://th.bing.com/th/id/OIP.BU7qeY_oiiqDfvdQHaG4DwHaHa?pid=ImgDet&rs=1" alt="" className='w-10 h-10 bg-blue-400' />
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full h-4/6 bg-white shadow-lg rounded-[10px] '>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard