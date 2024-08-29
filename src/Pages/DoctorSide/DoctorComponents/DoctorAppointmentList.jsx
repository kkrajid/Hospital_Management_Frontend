import React, { useEffect, useState } from 'react'
import { faSearch, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { all_user_appointments_for_doctor } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from '../../../Components/LoadingSpinner';

function DoctorAppointmentList() {
  const [dataa, setData] = useState({
    appointment_id: "",
    status_val: ""
  })
  const datas = JSON.stringify(dataa);
  const [appointData, setAppointmentData] = useState(null)
  const { data: AppointmentData, isLoading, error,refetch } = useQuery(['all_user_appointments_for_doctor', datas], () => all_user_appointments_for_doctor(datas));
  const [search, setSearch] = useState('');

  const filteredAppointments = appointData?.filter((appointment) => {
    const patientData = appointment.patient;
    return (
      Object.values(patientData).some((field) =>
        field.toString().toLowerCase().includes(search.toLowerCase())
      ) ||
      appointment.time_slot.date.toLowerCase().includes(search.toLowerCase()) ||
      appointment.time_slot.start_time.toLowerCase().includes(search.toLowerCase()) ||
      appointment.appointment_status.toLowerCase().includes(search.toLowerCase())
    );
  });

  useEffect(() => {
    if (!isLoading && !error) {
      setAppointmentData(AppointmentData);
    }
    refetch();
  }, [AppointmentData, isLoading, error, dataa, datas]);
  console.log(appointData);

  if (isLoading) {
    return <LoadingSpinner/>;
  }
  return (
    <div className='w-full h-full bg-[#c7cbd2] rounded-[10px] border shadow-lg p-1 '>
      <div className='w-full h-1/8  flex items-center py-4'>
        <div className='w-full h-full shadow-lg border bg-[#1AACAC] rounded-lg'>
          <div className='flex w-full h-full justify-between px-3'>
            <div className='flex items-center justify-center '>
              <div>
              <h1 className="text-xl font-semibold text-white">Appointments</h1>
            </div>
            </div>
            <div className='p-2'>
              <div className='flex items-center justify-center gap-2 bg-white px-2 rounded-[10px] border'>
                <div className='flex items-center justify-center'>
                  <input type="text" className=' py-2 px-4  outline-none'
                    placeholder='Search Appointments'

                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-5/6 p-1'>
        <div className='w-full h-full rounded-lg overflow-y-auto flex flex-col gap-2'>
          <div className='w-full h-1/6 flex items-center  '>
            <div className='w-full h-[48px] '>
              <ul className='w-full h-full bg-[#00BFBF] shadow-lg border flex items-center justify-evenly rounded-lg shadow-lg '>
                <li className='flex items-center justify-center w-1/6'>Image</li>
                <li className='flex items-center justify-center w-1/6'>Patient Name</li>
                <li className='flex items-center justify-center w-1/6'>Date</li>
                <li className='flex items-center justify-center w-1/6'>Time Slot</li>
                <li className='flex items-center justify-center w-1/6'>Status</li>
                <li className='flex items-center justify-center w-1/6'>Action</li>
              </ul>
            </div>
          </div>
          <div className='h-5/6 w-full px-2 overflow-y-auto flex flex-col gap-1'>
            {filteredAppointments?.map((data, index) => {
              const isCancelable = data?.appointment_status !== "Cancelled" && new Date(data?.time_slot?.date + "T" + data?.time_slot?.start_time) > new Date();

              return (
                <div className='w-full h-1/8 flex items-center mb-1' key={index}>
                  <div className='w-full h-full  '>
                    <ul className='w-full h-full bg-gray-200 rounded-[4px] border-1 shadow-lg   py-2 flex items-center justify-evenly'>
                      <li className='flex items-center justify-center w-1/6'>
                        <img src={data?.Patient_profile?.profile_pic} className='w-12 h-12 rounded-full border border-2 border-gray-200' alt="" />
                      </li>
                      <li className='flex items-center justify-center w-1/6 text-gray-800 font-semibold'>{data?.patient?.full_name}</li>
                      <li className='flex items-center justify-center w-1/6 text-gray-800'>{data?.time_slot?.date}</li>
                      <li className='flex items-center justify-center w-1/6 text-gray-800'>{data?.time_slot?.start_time}-{data?.time_slot?.end_time}</li>
                      <li className='flex items-center justify-center w-1/6 text-gray-800'>{data?.appointment_status}</li>
                      <li className='flex items-center justify-center w-1/6'>
                        <div className='flex items-center w-[320px] h-full gap-2'>
                          <div className='w-1/3'>
                            <button
                              className={`${data?.appointment_status === "Cancelled" || data?.appointment_status === "Completed" || data?.appointment_status === "Accepted" ? "bg-gray-400 px-2 cursor-not-allowed pointer-events-none rounded-md" : "bg-green-500 p-1 px-2 text-sm text-white rounded-md hover:bg-green-400 focus:outline-none focus:ring focus:border-blue-300"}`}
                              onClick={() => setData({ appointment_id: data?.id, status_val: "Accepted" })}
                            >
                              Accept
                            </button>
                          </div>
                          <div className='w-1/3'>
                            <button
                              className={`${data?.appointment_status === "Completed"
                                ? "bg-gray-400 px-2 cursor-not-allowed rounded-md"
                                : ""
                                } ${isCancelable
                                  ? "bg-yellow-500 p-1 px-2 text-sm text-white rounded-md hover:bg-yellow-400 focus:outline-none focus:ring focus:border-blue-300"
                                  : "bg-gray-400 px-2 pointer-events-none rounded-md"
                                }`}
                              onClick={() => setData({ appointment_id: data?.id, status_val: "Cancelled" })}
                            >
                              Cancel
                            </button>


                          </div>
                          <div className='w-1/3'>
                            <Link
                              to={`/doctor/appointments/${data?.id}`}
                              className={`${isCancelable || data?.appointment_status === "Accepted" || data?.appointment_status === "Completed" ? "" : "bg-gray-400 cursor-not-allowed pointer-events-none "} bg-blue-500 p-1 text-sm text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring focus:border-blue-300`}
                            >
                              View
                            </Link>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  )
}


export default DoctorAppointmentList



