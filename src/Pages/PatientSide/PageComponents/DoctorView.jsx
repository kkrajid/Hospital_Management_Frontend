import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function DoctorView() {
    const [date, setDate] = useState(new Date());

    const handleDateChange = (newDate) => {
        setDate(newDate);
        console.log(date);
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
                        <button className='py-2 px-3 bg-blue-600 rounded-[10px] text-white hover:bg-green-500 active:bg-green-600'>Appointment</button>
                    </div>
                </div>
            </div>
            <div className='w-full bg-gray-100 max-h-[400px]  h-full rounded-[10px] mt-3 flex items-center px-4'>
                <div className='flex flex-row gap-4 items-center w-full max-h-[300px] h-full'>
                    <div>
                        <div className="p-4 flex flex-col gap-2 justify-center items-center bg-green-100 rounded-[10px]">
                            <h2 className="text-xl font-semibold">Select Appointment Date:</h2>
                            <Calendar value={date} onChange={handleDateChange} className='rounded-[10px] border-blue-400 border-2' />

                        </div>
                    </div>
                    <div className='w-full bg-red-400 h-full'>
                        sdfsf
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorView