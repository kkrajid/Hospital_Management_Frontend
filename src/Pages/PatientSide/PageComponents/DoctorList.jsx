import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You need to import FontAwesomeIcon if you haven't already
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'; // You also need to import the specific icon you want to use

function DoctorList() {
  return (
    <div className='max-w-[220px] rounded-lg h-[300px] bg-white shadow p-2'>
      <img
        src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=626&ext=jpg" // Replace with a valid image URL
        alt=""
        className="w-full rounded-lg"
      />
      <div className='flex justify-center items-center my-1'>
        <p className='text-gray-600 font-semibold'>Dr. Anu</p>
      </div>
      <div className='flex justify-center items-center my-2'>
        <p className='text-gray-400'>1288 Nutill Brook Apt. 934</p>
      </div>
      <div className='flex justify-center items-center'>
        <p className='bg-blue-100 py-1 px-4 rounded-full uppercase text-blue-600 font-semibold'>Cardio</p>
      </div>
      <div className='mt-2 p-2 rounded bg-[#806BF8] hover:bg-green-400  active:bg-green-500'>
        <Link className='flex justify-center items-center gap-3 ' to={`/patient/doctors/${1}`} >
          <FontAwesomeIcon icon={faAddressBook} className='text-gray-200' />
          <h1 className='text-white'>Availability</h1>
        </Link>
      </div>
    </div>
  );
}

export default DoctorList;