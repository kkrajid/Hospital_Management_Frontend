import React, { useEffect, useState } from 'react'
import { faSearch, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { all_user_appointments_for_doctor } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function DoctorAppointmentList() {
  const [dataa, setData] = useState({
    appointment_id: "",
    status_val: ""
  })
  const datas = JSON.stringify(dataa);
  const [appointData, setAppointmentData] = useState(null)
  const { data: AppointmentData, isLoading, error } = useQuery(['all_user_appointments_for_doctor', datas], () => all_user_appointments_for_doctor(datas));
  useEffect(() => {
    if (!isLoading && !error) {
      setAppointmentData(AppointmentData);
    }
  }, [AppointmentData, isLoading, error, dataa, datas]);
  console.log(appointData);
  return (
    <div className='w-full h-full bg-[#F3F4F6] rounded-[10px] border shadow-lg '>
      <div className='w-full h-1/6 shadow-lg flex items-center py-4'>
        <div className='w-full h-full bg-white'>
          <div className='flex w-full h-full justify-between px-3'>
            <div className='flex items-center justify-center '>
              <p className='uppercase text-gray-500 font-bold'>
                Appointments
              </p>
            </div>
            <div className='p-2'>
              <div className='flex items-center justify-center gap-2 bg-white px-2 rounded-[10px] border'>
                <div className='flex items-center justify-center'>
                  <input type="text" className=' py-2 px-4  outline-none' placeholder='Search Appointments' />
                </div>
                <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-5/6 p-1'>
        <div className='w-full h-full rounded-[10px] overflow-y-auto flex flex-col gap-2'>
          <div className='w-full h-1/6 flex items-center py-3 '>
            <div className='w-full h-full bg-red-500'>
              <ul className='w-full h-full bg-green-400 shadow-lg border flex items-center justify-evenly'>
                <li className='flex items-center justify-center w-1/6'>Image</li>
                <li className='flex items-center justify-center w-1/6'>Patient Name</li>
                <li className='flex items-center justify-center w-1/6'>Date</li>
                <li className='flex items-center justify-center w-1/6'>Time Slot</li>
                <li className='flex items-center justify-center w-1/6'>Status</li>
                <li className='flex items-center justify-center w-1/6'>Action</li>
              </ul>
            </div>
          </div>
          {appointData?.map((data, index) => {
            const isCancelable = data?.appointment_status !== "Cancelled" && new Date(data?.time_slot?.date + "T" + data?.time_slot?.start_time) > new Date();

            return (
              <div className='w-full h-1/6 flex items-center ' key={index}>
                <div className='w-full h-full bg-red-500'>
                  <ul className='w-full h-full bg-white shadow-lg py-2 flex items-center justify-evenly'>
                    <li className='flex items-center justify-center w-1/6'>
                      <img src={data?.Patient_profile?.profile_pic} className='w-12 h-12 rounded-full border border-1' alt="" />
                    </li>
                    <li className='flex items-center justify-center w-1/6'>{data?.patient?.full_name}</li>
                    <li className='flex items-center justify-center w-1/6'>{data?.time_slot?.date}</li>
                    <li className='flex items-center justify-center w-1/6'>{data?.time_slot?.start_time}-{data?.time_slot?.end_time}</li>
                    <li className='flex items-center justify-center w-1/6'>{data?.appointment_status}</li>
                    <li className='flex items-center justify-center w-1/6'>
                      <div className='flex gap-2 '>
                        <button
                          className={`${  data?.appointment_status == "Cancelled" || data?.appointment_status == "Accepted"? "hidden":"bg-green-500 p-1 px-2 text-sm text-white rounded-[5px] active:bg-green-400" }`}
                          onClick={() => setData({ appointment_id: data?.id, status_val: "Accepted" })}
                        >
                          Accept
                        </button>
                        <button
                          className={`${isCancelable ? "bg-yellow-500 p-1 px-2 text-sm tex t-white rounded-[5px] active:bg-yellow-400" : "hidden"}`}
                          onClick={() => setData({ appointment_id: data?.id, status_val: "Cancelled" })}
                        >
                          Cancel
                        </button>
                        <Link  to={`/doctor/appointments/${data?.id}`} className='bg-blue-500 p-1 text-sm text-white rounded-[5px] active:bg-blue-400'>
                          View
                        </Link>
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
  )
}

export default DoctorAppointmentList



