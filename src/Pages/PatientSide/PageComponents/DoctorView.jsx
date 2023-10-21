import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You need to import FontAwesomeIcon if you haven't already
import { faCalendarCheck,faTimes  } from '@fortawesome/free-solid-svg-icons'; // You also need to import the specific icon you want to use


function DoctorView() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        const year = newDate.getFullYear();
        const month = newDate.getMonth() + 1;
        const day = newDate.getDate();
        const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
        console.log(formattedDate);
        setDate(formattedDate);
    };


    const [indexval, setIndex] = useState('');
    const [selectedTimeSlot, setAddTimeSlot] = useState('');
    console.log((selectedTimeSlot));


    const timeSlots = ["10:30 - 10:45", "11:00 - 11:15", "11:30 - 11:45"];



    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };




    return (
        <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2  h-screen border-b rounded-[10px]'>
            <div className='flex items-center  shadow-lg bg-gradient-to-r from-[#6859F3] to-green-300 w-full h-[180px] rounded-[10px]'>
                <div className='flex justify-between items-center  w-full px-10'>
                    <div className='  flex items-center '>
                        <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=626&ext=jpg" alt="" placeholder='image' className='rounded-full w-32 h-32' />
                        <div>
                            <div className='flex flex-col mx-2'>
                                <h1 className='text-white font-semibold capitalize text-2xl'>Dr.anu</h1>
                                <h1 className='text-white rounded-[10px] p-2 border border-2 border-blue-600 '>Cardio</h1>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='py-2 px-3 bg-blue-600 rounded-[10px] text-white hover:bg-green-500 active:bg-green-600' onClick={openModal}>Book Appointment</button>
                    </div>
                </div>
            </div>
            <div className='w-full bg-gray-100 max-h-[400px]  h-full rounded-[10px] mt-3 flex items-center px-4'>
                <div className='flex flex-row gap-4 items-center w-full max-h-[300px] h-full'>
                    <div>
                        <div className="p-4 flex flex-col gap-2 justify-center items-center  rounded-[10px]">
                            <Calendar value={date} onChange={handleDateChange} className='rounded-[10px] border-white border-6 border-2' />

                        </div>
                    </div>
                    <div className=' bg-gray-100 h-full w-full '>
                        <h2 className="text-xl font-semibold flex justify-center ">Appointment slote</h2>
                        <div className='flex flex-wrap md:grid md:grid-cols-5 gap-1 m-auto mt-3'>
                            {timeSlots.map((slot, index) => (
                                <ul className='w-full sm:w-1/2 md:w-auto' key={index}>
                                    <button
                                        className={` ${indexval === index ? 'bg-blue-600 border-blue-600 text-white' : ''} border-blue-400 border-2 p-1 px-2 rounded-[3px] flex justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white active:bg-blue-800 active:border-blue-800`}
                                        onClick={() => {
                                            setAddTimeSlot(slot);
                                            setIndex(index);
                                        }}
                                    >
                                        {slot}
                                    </button>
                                </ul>
                            ))}
                        </div>

                        <div className="relative">
                            {isModalOpen && (
                                <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                    <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"></div>
                                    <div className="bg-white p-4 rounded shadow-lg z-10 w-[350px] h-[400px]">
                                        <div className='flex flex-row w-full justify-between '>
                                            <div>
                                                
                                            </div>
                                            <button  className='uppercase text-gray-400 text-1xl' onClick={closeModal}><FontAwesomeIcon icon={faTimes } className='text-blue-300 w-6 h-6' /></button>
                                        </div>
                                        <div className='flex w-full justify-center mt -3 p-3 items-center'>
                                        <FontAwesomeIcon icon={faCalendarCheck} className='w-[80px] h-[80px] text-green-400' />
                                        </div>
                                        <div className='flex items-center w-full justify-center flex-col'>
                                            <h1 className='flex items-center text-2xl text-gray-300 my-2'>
                                                John 
                                            </h1>
                                            <p className='text-[20px] text-gray-300'>Confirm for Your Appointment</p>
                                            <h1 className='text-2xl mt-2 font-semibold'>
                                                3.20 PM | Dr.Smith
                                            </h1>
                                            <h1 className='mta-2 text-gray-300'>16-07-2023</h1>
                                            <button className='py-3 px-5 rounded-[30px] bg-[#60CAE3] mt-7 text-white font-semibold uppercase active:bg-blue-500'>Make Appointment</button>
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