import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Doctor_Dashboard,Doctor_Dashboard_all } from '../../../api/user';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Link } from 'react-router-dom';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faBed, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
const DoctorDashboard = () => {
  const { data: allDashboardData, error: allDashboardError, isLoading: allDashboardLoading } = useQuery(['Doctor_Dashboard_all'], Doctor_Dashboard_all);
  const { data: dashboardData, error: dashboardError, isLoading: dashboardLoading } = useQuery(['Doctor_Dashboard'], Doctor_Dashboard);



  console.log(allDashboardData);
  useEffect(() => { }, []);

  if (dashboardLoading ||allDashboardLoading ) {
    return <LoadingSpinner />;
  }

  return (
    <div className="max-w-[1480px] w-full bg-[#c7cbd2] rounded-[10px] h-full p-2 overflow-y-auto">
      <div className="w-full h-[88%]">
        <div className="w-full h-[60px] shadow-lg bg-[#1AACAC] rounded-lg flex items-center my-2">
          <div className="flex justify-between items-center py-2 px-4 w-full ">
            <div>
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
            </div>
            <Link to={`/doctor/profile`}>
              <img src={dashboardData?.profile_pic} className="w-10 h-10 shadow-lg rounded-full" alt="" />
            </Link>
          </div>
        </div>

        <div className="flex md:flex-row flex-col w-full h-full">
          {/* Left Section */}
          <div className="md:max-w-xs w-full h-full p-3">
            <div className="w-full h-full bg-[#00BFBF]  shadow-lg px-5 py-2 rounded-[10px]">
              <div className="w-full h-full p-3">
                <div className="flex flex-col items-center justify-center py-3 gap-4">
                  <img
                    src={dashboardData?.profile_pic}
                    className="w-20 h-20 shadow-lg border-2 border-white rounded-full"
                    alt=""
                  />
                  <div className="flex flex-col items-center justify-center">
                    <h1 className="text-2xl font-serif font-extrabold text-white">
                      {dashboardData.user?.full_name}
                    </h1>
                    <p className="p-1 px-2 text-white bg-#1AACAC rounded-[10px] text-sm my-1">
                      Active
                    </p>
                  </div>
                  <Link
                    className="text-md py-2 bg-white px-4  rounded-[10px] hover:bg-#FF6347 active:bg-#CD3700"
                    to="/doctor/timeslote"
                  >
                    Create Time Slot
                  </Link>
                </div>
                <div className="grid grid-cols-1 flex gap-2">
                  <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                    <p className="text-sm text-gray-600 font-serif">Email</p>
                    <p className="text-sm font-serif font-semibold">{dashboardData?.user?.email}</p>
                  </div>
                  <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                    <p className="text-sm text-gray-600 font-serif">Mobile</p>
                    <p className="text-sm font-serif font-semibold">{dashboardData?.user?.phone}</p>
                  </div>
                  <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                    <p className="text-sm text-gray-600 font-serif">Gender</p>
                    <p className="text-sm font-serif font-semibold">{dashboardData?.user?.gender}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Right Section */}
          <div className="w-full h-full p-4">
            <div className="w-full h-full rounded-[10px] flex flex-col gap-2">
              <div className="flex gap-2 grid grid-cols-3 w-full h-2/6">
                <div className="bg-[#00BFBF] rounded-[15px] shadow-lg">
                  <div className="flex flex-row py-3 px-4 justify-between">
                    <div className="flex flex-col p-2">
                      <h1 className="text-white text-4xl">{allDashboardData?.total_patients}</h1>
                      <p className="text-gray-200 font-mono text-base">Total paid patients</p>
                      <p className="text-gray-200 font-mono text-base"></p>
                    </div>
                    <div className="pt-10">
                      <FontAwesomeIcon icon={faUsers} className="ml-2 text-white" size="2x" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#00BFBF] rounded-[15px] shadow-lg">
                  <div className="flex flex-row py-3 px-4 justify-between">
                    <div className="flex flex-col p-2">
                      <h1 className="text-white text-4xl">{allDashboardData?.icu_patients}</h1>
                      <p className="text-gray-200 font-mono text-base">ICU Patients</p>
                      <p className="text-gray-200 font-mono text-base"></p>
                    </div>
                    <div className="pt-10">
                      <FontAwesomeIcon icon={faBed} className="ml-2 text-white" size="2x" />
                    </div>
                  </div>
                </div>

                <div className="bg-[#00BFBF] rounded-[15px] shadow-lg">
                  <div className="flex flex-row py-3 px-4 justify-between">
                    <div className="flex flex-col p-2">
                      <h1 className="text-white text-4xl font-italic">{allDashboardData?.total_appointments}</h1>
                      <p className="text-gray-200 font-mono text-base">Appointments</p>
                      <p className="text-gray-200 font-mono text-base"></p>
                    </div>
                    <div className="pt-10">
                      <FontAwesomeIcon icon={faCalendarCheck} className="ml-2 text-white" size="2x" />
                    </div>
                  </div>
                </div>

              </div>

              <div className="w-full h-4/6 bg-gray-100 shadow-lg rounded-[10px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    width={500}
                    height={300}
                    data={[
                      { name: 'Total Patients', value: allDashboardData?.total_patients },
                      { name: 'ICU Patients', value: allDashboardData?.icu_patients },
                      { name: 'Appointments', value: allDashboardData?.total_appointments },
                    ]}
                    margin={{ top: 45, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#d3d3d3" />
                    <XAxis dataKey="name" stroke="#333333" />
                    <YAxis stroke="#333333" />
                    <Tooltip />
                    <Legend wrapperStyle={{ color: '#333333' }} />
                    <Bar dataKey="value" fill="#00BFBF" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;
