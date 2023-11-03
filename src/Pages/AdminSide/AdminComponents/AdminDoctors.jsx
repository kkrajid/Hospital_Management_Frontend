import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // You need to import FontAwesomeIcon if you haven't already
import { faEye  } from '@fortawesome/free-solid-svg-icons'; // You also need to import the specific icon you want to use

function AdminDoctors({child}) {
  return (
    <div className='max-w-[220px] rounded-lg h-[310px] bg-white shadow p-2'>
      <img
        // src="https://img.freepik.com/free-photo/young-nurse-man-feeling-happy-relaxed-satisfied-showing-approval-with-okay-gesture-smiling_1194-250175.jpg?size=626&ext=jpg" 
        src={child.profile_pic} 
        alt=""
        style={{width:'626px', height:'140px'}}
        className="w-full rounded-lg"
      />
      <div className='flex justify-center items-center my-1'>
        <p className='text-gray-600 font-semibold'>{child.user.full_name}</p>
      </div>
      <div className='flex justify-center items-center my-2'>
        <p className='text-gray-400'>{child.address.street_address}, {child.address.city}</p>
      </div>
      <div className='flex justify-center items-center'>
        <p className='bg-blue-100 py-1 px-4 rounded-full uppercase text-blue-600 font-semibold'>{child.specialization}</p>
      </div>
      <div className='mt-2 p-2 rounded bg-[#35b1f5] hover:bg-green-400  active:bg-green-500'>
        <Link className='flex justify-center items-center gap-3 ' to={``} >
          <FontAwesomeIcon icon={faEye } className='text-gray-200' />
          <h1 className='text-white'>View</h1>
        </Link>
      </div>
    </div>
  );
}

export default AdminDoctors;