import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { all_user_appointments,CancelAppointmentApi } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function PatientAppointment() {
  const [appointData, setAppointmentData] = useState(null)
  const { data: AppointmentData, isLoading, error,refetch } = useQuery(
    ['all_user_appointments'],
    all_user_appointments
  );


  useEffect(() => {
    if (!isLoading && !error) {
      setAppointmentData(AppointmentData);
    }
  }, [AppointmentData, isLoading, error]);
  console.log(appointData);
  
  const [openDropdowns, setOpenDropdowns] = useState({});
  
  const toggleMenu = (index) => {
    setOpenDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [index]: !prevDropdowns[index],
    }));
  };



  const cancelAppointmentMutation =useMutation({
    mutationFn: (id) => CancelAppointmentApi(id),
    onSuccess: (response) => { 
      refetch();
    },
    onError: (error) => {
        console.log(error.message);
    },
  });

  const handleCancelAppointment = (index) => {
    console.log(`Cancel appointment at index ${index}`);
    cancelAppointmentMutation.mutate(index);
  };


  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (cancelAppointmentMutation.isLoading) {
    return <LoadingSpinner />;
  }
  return (
    <div className='max-w-[1480px] bg-gray-800 w-full h-full   rounded-[10px] py-3 shadow-lg  '>
      <div className='w-full h-[60px] p-2 shadow-lg bg-gray-600 rounded-md '>
        <div className='w-full h-full  rounded-t-[10px] shadow-l-lg'>

        </div>
      </div>
      <div className='w-full h-5/6  rounded-b-[10px]   '>
        <div className='w-full py-3 bg-[#B0B0B0]  shadow-lg  my-2 px-14'>
          <div className='w-full  flex gap-4 pl-4 flex-evenly'>
            <div className='w-1/6 h-full flex justify-center text-white items-center'>
              <p>Image</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-white'>Doctor Name</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-white'>Specialization</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-white'>Date</p>
            </div>
            <div className='w-1/6 h-full flex items-center justify-center'>
              <p className='font-semibold text-white '>Time</p>
            </div>
            <div className='w-1/6 h-full flex items-center flex gap-10 justify-center'>
              <p className='font-semibold text-white '>Status</p>
              <p className='font-semibold text-gray-600'> </p>
            </div>
          </div>
        </div>
        <div className='overflow-y-auto w-full h-[100%] px-1 bg-gray-700 rounded-md py-2'>

          {appointData?.map((data, index) => (
            <div key={index} className='w-full h-1/8  bg-[#E0E0E0] rounded-[5px] shadow-xl py-2 mb-2 px-20 flex items-center justify-center '>
              <div className='w-full h-full flex gap-4  flex-evenly items-center '>
                <div className='w-1/6 h-full flex justify-center items-center'>
                  <img src={data.doctor_profile.profile_pic} alt="" className='w-14 h-14 border-2 border-gray-300 rounded-full ' />
                </div>
                <div className='w-1/6 h-full flex items-center justify-center'>
                  <p className='font-semibold text-sm text-gray-400'>{data.doctor_profile.user.full_name}</p>
                </div>
                <div className='w-1/6 h-full flex items-center justify-center'>
                  <p className='font-semibold text-sm text-gray-400'>{data.doctor_profile.specialization}</p>
                </div>
                <div className='w-1/6 h-full flex items-center justify-center'>
                  <p className='font-semibold text-gray-400 text-sm'>{data.time_slot.date}</p>
                </div>
                <div className='w-1/6 h-full flex items-center justify-center'>
                  <p className='font-semibold text-gray-400 text-sm'>{data.time_slot.start_time}-{data.time_slot.end_time}</p>
                </div>
                <div className='w-1/6 h-full flex items-center flex gap-10 justify-center'>
                  <p className='font-semibold text-gray-400'>{data.appointment_status}</p>
                  {/* <p className='font-semibold text-gray-600'> <FontAwesomeIcon icon={faEllipsisV} /></p> */}
                  <div className="relative inline-block text-left">
                <button
                  onClick={() => toggleMenu(index)}
                  type="button"
                  className="inline-flex items-center p-2 text-sm font-medium text-center  rounded-lg focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-white-800 dark:hover-bg-gray-700 dark:focus-ring-gray-600"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>

                {openDropdowns[index] && (
                  <div
                    className="absolute right-0 z-10 bg-gray-600 divide-y divide-gray-100 rounded-lg shadow w-44 dark-bg-gray-700 dark-divide-gray-600"
                    aria-labelledby={`dropdownMenuIconHorizontalButton${index}`}
                  >
                    <ul className="py-2 text-sm text-gray-700 text-white">
                      <li>
                        <Link to={`/patient/appointments/${data.id}`} className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 ">
                          View
                        </Link>
                      </li>
                      <li>
                        <button onClick={() => handleCancelAppointment(data.id)} href="#" className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white" >
                          Cancel
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
                </div>
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