import React from 'react'
import { faSearch ,faAddressBook   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DoctorList from './DoctorList';

function PatientDoctorList() {
    return (
        <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2  h-screen border-b rounded-[10px]'>
            <div className='flex flex-row shadow max-w-[600px] md:max-w-[1480px] w-full  h-[50px] rounded-[2px] py-1 px-4'>
                <div className='hidden md:flex flex-row justify-between items-center w-full'>
                    <div>
                        <h1 className='text-gray-400'>Doctors</h1>
                    </div>
                    <div className='flex flex-row bg-white justify-between items-center rounded-[10px] p-1'>
                        <input type="text" placeholder=' Search Doctor' className='text-gray-400 px-1 outline-none' />
                        <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
                    </div>
                </div>
            </div>
            <div className='flex flex-row mt-2 shadow-lg max-w-[600px] md:max-w-[1480px] w-full max-h-[50px] h-full'>
                <ul className='flex flex w-full justify-evenly items-center text-gray-400'>
                    <li>
                        All
                    </li>
                    <li>
                        special 1
                    </li>
                    <li>
                        special 1
                    </li>
                    <li>
                        special 1
                    </li>
                    <li>
                        special 1
                    </li>
                    <li>
                        special 1
                    </li>
                </ul>
            </div>

            <div className=' md:max-w-[700px]w-full max-h-[430px] h-full flex  mt-2 overflow-y-auto bg-gray-100 p-2'>
                <div className='flex   gap-2 grid grid-cols-4 m-auto'>
                    {/* <div className='max-w-[220px] rounded-lg h-[300px] bg-white shadow p-2'>
                        <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=626&ext=jpg" alt="" className="w-full rounded-lg" />
                        <div className='flex justify-center items-center my-1'>
                            <p className='text-gray-600 font-semibold'>Dr. Anu</p>
                        </div>
                        <div className='flex justify-center items-center my-2'>
                            <p className='text-gray-400'>1288 Nutill Brook Apt. 934</p>
                        </div>
                        <div className='flex justify-center items-center'>
                            <p className='bg-blue-100 py-1 px-4 rounded-full uppercase text-blue-600 font-semibold'>Cardio</p>
                        </div>
                        <div className='mt-2 p-2 rounded bg-[#806BF8] '>
                            <div className='flex justify-center items-center gap-3'>
                            <FontAwesomeIcon icon={faAddressBook  } className='text-gray-200' />
                            <h1 className='text-white'>Avilability</h1>
                            </div>
                        </div>
                    </div>*/}
                <DoctorList/>
                <DoctorList/>
                <DoctorList/>
                <DoctorList/>
                <DoctorList/>
            
                </div> 
            </div>
        </div>

    )
}

export default PatientDoctorList