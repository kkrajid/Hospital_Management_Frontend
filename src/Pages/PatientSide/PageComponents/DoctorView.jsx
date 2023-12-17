import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You need to import FontAwesomeIcon if you haven't already
import { faCalendarCheck, faTimes } from '@fortawesome/free-solid-svg-icons'; // You also need to import the specific icon you want to use
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    patient_side_doctore_complete_details,
    patient_side_doctor_time_slot,
    make_patient_appointment
} from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useAuthStore } from '../../../Store/auth'
import jwt_decode from "jwt-decode";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const decodeUserInformation = () => {
    const { access } = useAuthStore()


    try {
        const decodedToken = jwt_decode(access);
        return decodedToken.name;
    } catch (error) {
        console.error("Error decoding JWT token:", error);
        return "";
    }
};


function formatDate(date) {
    if (!(date instanceof Date && !isNaN(date))) {
        date = new Date(); // Set to the current date or another default date
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-based
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}
function getCurrentDateString() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
}

// ... rest of your code



function DoctorView() {
    const { page } = useParams();
    const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
    const [date, setDate] = useState(formatDate(new Date()));
    const [storeIndex, setStoreIndex] = useState('');
    const userInformation_ = decodeUserInformation()
    const [appId, setappId] = useState(null)
    const navigate = useNavigate();


    const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery(
        ['patient_side_doctor_complete_details', page],
        () => patient_side_doctore_complete_details(page)
    );

    const { data: doctorTimeSlotData, isLoading: timeSlotLoading, error: doctorTimeSlotError } = useQuery(
        ['patient_side_doctor_time_slot', page, date],
        () => patient_side_doctor_time_slot(page, date),
        {
            enabled: !!page && !!date, // Ensure the query runs when page and date are defined
        }
    );



    const timeslot = doctorTimeSlotData
        ? doctorTimeSlotData.map((item) => {
            const itemStartTime = item.start_time.substring(0, 5);
            const itemEndTime = item.end_time.substring(0, 5);
            const timeSlotObj = {
                startTime: itemStartTime,
                endTime: itemEndTime,
                aval: item.available,
                id: item.id,
            };
            return timeSlotObj;
        })
        : [];


    const handleDateChange = (newDate) => {
        const year = newDate.getFullYear();
        const month = String(newDate.getMonth() + 1).padStart(2, '0');
        const day = String(newDate.getDate()).padStart(2, '0');
        const newFormattedDate = `${year}-${month}-${day}`;
        setDate(newFormattedDate);
    };


    const [formData, setFormData] = useState({
        doctor_id: "",
        patient_id: "",
        time_slot: ""
    })
    console.log(profileData?.user['id']);
    const MakeAppointmentMutation = useMutation({
        mutationFn: () => make_patient_appointment(formData),
        onSuccess: (response) => {
            console.log(response.data.id);
            navigate(`/patient/payment/${response.data.id}`);
           
        },
        onError: (error) => {
            const firstErrorMessage = error.response.data.message
            console.log(error);

        },
    });


    const handleSubmit = () => {
        setFormData({
            doctor_id: profileData?.user['id'],
            time_slot: storeIndex,
        });
        MakeAppointmentMutation.mutate();
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (profileLoading || timeSlotLoading || MakeAppointmentMutation.isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2  h-screen  rounded-[10px]'>
            <div className='flex items-center shadow-lg bg-gradient-to-r from-[#B0B0B0] to-[#B0B0B0] w-full h-[180px] rounded-[10px]'>
                <div className='flex justify-between items-center w-full px-10'>
                    <div className='flex items-center'>
                        <img src={profileData?.profile_pic} alt="" placeholder='image' className='rounded-full w-24 h-24 border-2 border-white' />
                        <div className='ml-4'>
                            <div className='flex flex-col'>
                                <h1 className='text-white font-semibold text-3xl'>{profileData?.user['full_name']}</h1>
                                <h1 className='text-white rounded-[10px] p-2 border border-2 border-blue-600 uppercase mt-2'>{profileData?.specialization}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={`py-2 px-3 bg-blue-600 rounded-[10px] text-white hover:bg-yellow-500 active:bg-yellow-600 ${!storeIndex ? 'opacity-80 cursor-not-allowed' : ''}`} disabled={!storeIndex} onClick={openModal}>Book Appointment</button>
                    </div>
                </div>
            </div>

            <div className='w-full bg-gray-800 max-h-[400px]  h-full rounded-[10px]  flex items-center px-4'>
                <div className='flex flex-col gap-4 items-center w-full max-h-[300px] h-full'>
                    <div className='w-full'>
                        <h2 className=" border-t-1 border-b-1 py-2 bg-[#B0B0B0] border-gray-600 font-semibold text-center text-white uppercase mb-4 rounded-md">Appointment Slots</h2>
                    </div>
                    <div className='w-full h-1/6 flex items-center'>
                        <div className="p-4 flex flex-col gap-2 justify-center items-center rounded-[10px]">

                            <input
                                type="date"
                                value={date} // Assuming you have a function formatDate to convert the date to the required format
                                onChange={(e) => handleDateChange(new Date(e.target.value))}
                                min={getCurrentDateString()} // Assuming you have a function getCurrentDateString to get the current date in the required format
                                max={null} // If you don't want to set a max date, you can remove this attribute
                                className="rounded-[10px] border-gray-300 border-6 border-2 p-2"
                            />
                        </div>

                    </div>
                    <div className="bg-gray-700 h-full w-full rounded-md">

                        <div className="overflow-y-auto max-h-[250px]">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 p-3 ">
                                {timeslot?.map(({ startTime, endTime, aval, id }) => (
                                    <button
                                        key={id}
                                        className={`rounded-md overflow-hidden ${aval
                                            ? ' '
                                            : 'text-red-700 border-red-700 opacity-80 cursor-not-allowed'
                                            } ${id === storeIndex
                                                ? '  border-2 text-green-500 border-green-500  transform scale-105'
                                                : 'border-2 border-gray-500'
                                            } w-full h-11 p-2 flex items-center justify-center focus:outline-none`} // Reduced the height to h-16
                                        disabled={!aval}
                                        onClick={() => {
                                            if (id === storeIndex) {
                                                setStoreIndex(null);
                                                setSelectedTimeSlot(null);
                                            } else {
                                                setStoreIndex(id);
                                                setSelectedTimeSlot(`${startTime} - ${endTime}`);
                                            }
                                        }}
                                    >
                                        <span className="text-lg font-semibold">
                                            {startTime} - {endTime}
                                        </span>
                                    </button>
                                ))}

                            </div>
                        </div>




                        <div className="relative">

                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                    <div
                                        className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"
                                        onClick={closeModal}
                                    ></div>
                                    <div className="bg-white p-2 rounded-[1rem] shadow-lg z-10 w-[28rem] h-[20rem]">
                                        <div className="w-full h-5/6 bg-gray-200 rounded-[10px]">
                                            <div className="w-full h-1/6 flex items-center justify-center">
                                                <div className="flex items-center justify-center">
                                                    <h1 className="text-2xl font-bold uppercase">Confirm Appointment</h1>
                                                </div>
                                            </div>
                                            <div className="w-full h-5/6 bg-gray-200 flex items-center justify-center">
                                                <div className="flex flex-col gap-2 p-3 ">
                                                    <div className='flex items-center w-full justify-center flex-col'>
                                                        <h1 className='flex items-center text-3xl text-gray-500 my-2'>
                                                        Dr.{profileData?.user['full_name']}
                                                        </h1>

                                                        <h1 className=' mt-2 font-bold text-2xl'>
                                                            {selectedTimeSlot}  
                                                           
                                                        </h1>
                                                        <h1 className='mta-2 text-gray-500 font-bold'>{date}</h1>

                                                    </div>

                                                </div>
                                            </div>
                                            <div className="w-full h-1/6">
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <button
                                                        onClick={handleSubmit}
                                                        className="bg-[#60CAE3] px-3 py-2 text-center text-white rounded-[6px]"
                                                    >
                                                        Make Appointment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorView