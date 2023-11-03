import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You need to import FontAwesomeIcon if you haven't already
import { faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // You also need to import the specific icon you want to use
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { all_user_appointments } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function PatientAppointment() {
  const [appointData, setAppointmentData] = useState(null)
  const { data: AppointmentData, isLoading, error } = useQuery(
    ['all_user_appointments'],
    all_user_appointments
  );


  useEffect(() => {
    if (!isLoading && !error) {
      setAppointmentData(AppointmentData);
    }
  }, [AppointmentData, isLoading, error]);
  console.log(appointData);
  return (
    <div className='max-w-[1480px] bg-[#F2F3F5] w-full h-full  border rounded-[10px] py-3 shadow-lg  '>
      <div className='w-full h-[60px] p-2 shadow-lg bg-white  '>
        <div className='w-full h-full  rounded-t-[10px] shadow-l-lg'>

        </div>
      </div>
      <div className='w-full h-5/6  rounded-b-[10px]  px-4 '>
        <div className='w-full p-3 bg-white  shadow-lg  my-2'>
          <div className='w-full  flex gap-4 pl-3 flex-evenly'>
            <div className='w-1/6 h-full flex justify-center items-center'>
              <p>Image</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-gray-600'>Doctor Name</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-gray-600'>Specialization</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-gray-600'>Date</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-gray-600'>Time</p>
            </div>
            <div className='w-1/6 h-full flex items-center flex gap-10 justify-center'>
              <p className='font-semibold text-gray-600'>Status</p>
              <p className='font-semibold text-gray-600'>****</p>
            </div>
          </div>
        </div>
        <div className='overflow-y-auto w-full h-5/6'>

        {appointData?.map((data, index) => (
          <div key={index} className='w-full h-1/5 bg-white rounded-[15px] shadow-lg p-4 mb-2'>
            <div className='w-full h-full flex gap-4 pl-3 flex-evenly'>
              <div className='w-1/6 h-full flex justify-center items-center'>
                <img src={data.doctor_profile.profile_pic} alt="" className='w-17 h-16 border-2 border-gray-300 rounded-[10px]' />
              </div>
              <div className='w-1/6 h-full flex items-center justify-center'>
                <p className='font-semibold text-sm text-gray-600'>{data.doctor_profile.user.full_name}</p>
              </div>
              <div className='w-1/6 h-full flex items-center justify-center'>
                <p className='font-semibold text-sm text-gray-600'>{data.doctor_profile.specialization}</p>
              </div>
              <div className='w-1/6 h-full flex items-center justify-center'>
                <p className='font-semibold text-gray-600 text-sm'>{data.time_slot.date}</p>
              </div>
              <div className='w-1/6 h-full flex items-center justify-center'>
                <p className='font-semibold text-gray-600 text-sm'>{data.time_slot.start_time}-{data.time_slot.end_time }</p>
              </div>
              <div className='w-1/6 h-full flex items-center flex gap-10 justify-center'>
                <p className='font-semibold text-gray-600'>{data.appointment_status}</p>
                <p className='font-semibold text-gray-600'>****</p>
              </div>
            </div>
          </div>
        ))}
        </div>

      </div>

    </div>
  )
}

export default PatientAppointment