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


const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

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
            toast.success(
                <div>
                  <strong>{response.message}</strong> 
                  
                </div>,
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: {
                    backgroundColor: "#4CAF50",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    width: "100%",
                    textAlign: "center",
                  },
                }
              );
           
            
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

    if (profileLoading || timeSlotLoading || MakeAppointmentMutation.isLoading  ) {
        return <LoadingSpinner />;
    }

    return (
        <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2  h-screen border-b rounded-[10px]'>
            <div className='flex items-center  shadow-lg bg-gradient-to-r from-[#6859F3] to-green-300 w-full h-[180px] rounded-[10px]'>
                <div className='flex justify-between items-center  w-full px-10'>
                    <div className='  flex items-center '>
                        <img src={profileData?.profile_pic} alt="" placeholder='image' className='rounded-full w-20 h-20' />
                        <div>
                            <div className='flex flex-col mx-2'>
                                <h1 className='text-white font-semibold capitalize text-2xl'>{profileData?.user['full_name']}</h1>
                                <h1 className='text-white rounded-[10px] p-2 border border-2 border-blue-600 uppercase'>{profileData?.specialization}</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className={`py-2 px-3 bg-blue-600 rounded-[10px] text-white hover:bg-green-500 active:bg-green-600  ${!storeIndex ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!storeIndex} onClick={openModal} >Book Appointment</button>
                    </div>
                </div>
            </div>
            <div className='w-full bg-gray-100 max-h-[400px]  h-full rounded-[10px] mt-3 flex items-center px-4'>
                <div className='flex flex-row gap-4 items-center w-full max-h-[300px] h-full'>
                    <div>
                        <div className="p-4 flex flex-col gap-2 justify-center items-center  rounded-[10px]">
                            <Calendar value={date}
                                onChange={handleDateChange}
                                minDate={new Date()}
                                maxDate={null}
                                className='rounded-[10px] border-white border-6 border-2' />

                        </div>
                    </div>
                    <div className=' bg-gray-100 h-full w-full '>
                        <h2 className="text-xl font-semibold flex justify-center ">Appointment slote</h2>
                        <div className='overflow-y-auto max-h-[300px]'> {/* Set a max height to enable scrolling */}
                            <div className='flex flex-wrap md:grid md:grid-cols-5 gap-1  '>
                                {/* {timeslot?.map((slot, index) => {
                                    // Split the slot into its components
                                    const [timePart, numberPart] = slot.split('+');
                                    
                                    console.log(numberPart['aval'],'*****',numberPart['id']);

                                    return (
                                        <ul className='w-full sm:w-1/2 md:w-auto' key={index}>
                                            <button
                                                className={` ${storeIndex === storeIndex ? 'bg-blue-600 border-blue-600 text-white' : ''} border-blue-400 border-2 p-1 px-2 rounded-[3px] flex justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-800 active:border-blue-800 ${!storeIndex ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!storeIndex} 
                                                onClick={() => {
                                                    setStoreIndex(storeIndex);
                                                    setSelectedTimeSlot(timePart)

                                                }}
                                            >
                                                {timePart}
                                            </button>
                                        </ul>
                                    );
                                })} */}
                                {timeslot?.map((slot, index) => {
                                    // Extract the properties from the time slot object
                                    const { startTime, endTime, aval, id } = slot;

                                    return (
                                        <ul className='w-full sm:w-1/2 md:w-auto' key={index}>
                                            <button
                                                className={`${aval ? '' : 'bg-red-600 text-white border-red-600'
                                                    } ${id === storeIndex ? 'bg-blue-600 text-white ' : ''
                                                    } border-blue-400 border-2 p-1 px-2 rounded-[3px] flex justify-center   active:border-blue-800 ${!aval ? 'opacity-50 cursor-not-allowed' : ''
                                                    }`}
                                                disabled={!aval}
                                                onClick={() => {
                                                    setStoreIndex(id); // Assuming `setStoreIndex` is a function that sets the selected store index
                                                    setSelectedTimeSlot(`${startTime} - ${endTime}`); // Assuming `setSelectedTimeSlot` is a function to set the selected time slot
                                                }}
                                            >
                                                {startTime} - {endTime}
                                            </button>
                                        </ul>
                                    );
                                })}



                            </div>
                        </div>

                        <div className="relative">
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                    <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"></div>
                                    <div className="bg-white p-4 rounded shadow-lg z-10 w-[350px] h-[400px]">
                                        <div className='flex flex-row w-full justify-between '>
                                            <div>

                                            </div>
                                            <button className='uppercase text-gray-400 text-1xl' onClick={closeModal}><FontAwesomeIcon icon={faTimes} className='text-blue-300 w-6 h-6' /></button>
                                        </div>
                                        <div className='flex w-full justify-center mt -3 p-3 items-center'>
                                            <FontAwesomeIcon icon={faCalendarCheck} className='w-[80px] h-[80px] text-green-400' />
                                        </div>
                                        <div className='flex items-center w-full justify-center flex-col'>
                                            <h1 className='flex items-center text-2xl text-gray-500 my-2'>
                                                {userInformation_}
                                            </h1>
                                            <p className='text-[20px] text-gray-500'>Confirm for Your Appointment</p>
                                            <h1 className=' mt-2 font-bold '>
                                                {selectedTimeSlot} | {profileData?.user['full_name']}
                                            </h1>
                                            <h1 className='mta-2 text-gray-500 font-bold'>{date}</h1>
                                            <button className='py-3 px-5 rounded-[30px] bg-[#60CAE3] mt-7 text-white font-semibold uppercase active:bg-blue-500' onClick={handleSubmit}>Make Appointment</button>
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