import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/avatar.png'
import { useAuthStore } from "../../Store/auth";
function DoctorNavBar() {
  const name = 'Doctor'; 
  // bg-[#1C45EF] 
  return (
    <div className="px-4  py-2 pl-10 pr-20 flex items-center justify-between shadow-lg bg-gray-500 fixed w-full ">

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-1xl uppercase font-bold md:ml-5 '>Doctor Dashboard</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <FontAwesomeIcon icon={faBell} className="text-white" size="lg" />
        </div>
        <div className="flex items-center">
          <img src={avatar} alt="Admin Avatar" className="w-10 h-10 rounded-full " />
        </div>

        <span className="text-white text-lg text-center ml-2" onClick={()=>(useAuthStore.getState().logout())}> Logout</span>
      </div>
    </div>
  );
}

export default DoctorNavBar;
