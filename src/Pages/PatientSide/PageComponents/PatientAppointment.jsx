import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faTimes, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
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
  
  const [openDropdowns, setOpenDropdowns] = useState({});
  
  const toggleMenu = (index) => {
    setOpenDropdowns((prevDropdowns) => ({
      ...prevDropdowns,
      [index]: !prevDropdowns[index],
    }));
  };
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
              <p className='font-semibold text-gray-600'> </p>
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
                  <p className='font-semibold text-gray-600 text-sm'>{data.time_slot.start_time}-{data.time_slot.end_time}</p>
                </div>
                <div className='w-1/6 h-full flex items-center flex gap-10 justify-center'>
                  <p className='font-semibold text-gray-600'>{data.appointment_status}</p>
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
                    className="absolute right-0 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark-bg-gray-700 dark-divide-gray-600"
                    aria-labelledby={`dropdownMenuIconHorizontalButton${index}`}
                  >
                    <ul className="py-2 text-sm text-gray-700 dark-text-gray-200">
                      <li>
                        <Link to={`/patient/appointments/${data.id}`} className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white">
                          View
                        </Link>
                      </li>
                      <li>
                        <a href="#" className="block px-4 py-2 hover-bg-gray-100 dark-hover-bg-gray-600 dark-hover-text-white">
                          Cancel
                        </a>
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