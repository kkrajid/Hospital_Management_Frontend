import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faCalendar, faComments, faEnvelope, faSignOutAlt, faUserMd,faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useAuthStore} from '../../../Store/auth'


function PatientSideBar({ child }) {
  const navigate = useNavigate();

  return (
    <div className=''>
      
      <div className="w-full h-screen p-2 bg-gray-700 border-b flex " >

        <div className="bg-gray-600 rounded-[22px] w-full h-full md:max-w-[1480px] max-w-[600px] p-4 m-auto ">
          <div className="rounded-[22px] bg-gray-800 w-full h-full m-auto flex shadow-lg ">
            <div className="flex m-2 md:flex-row  w-full ">
              <div className="mx-5 my-3 rounded-[20px] bg-[#C0C0C0] w-[10px] px-9 flex justify-center shadow-lg ">
                <div className='flex flex-col justify-between my-12'>
                  <div className='flex flex-col my-12 gap-6'>
                    <Link className='bg-[#EEEEEE] flex items-center justify-center rounded-[10px] p-2 hover:bg-white' to='/patient/profile'>
                      <FontAwesomeIcon icon={faHome} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE]  flex items-center justify-center rounded-[10px] p-2 hover:bg-white' to='/patient/doctors'>
                      <FontAwesomeIcon icon={faUserMd} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE]  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/patient/appointments'>
                      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE]  flex justify-center items-center rounded-[10px] p-2 hover.bg-white' to='/patient/wallet'>
                      <FontAwesomeIcon icon={faWallet} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE]  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/patient/messages'>
                      <FontAwesomeIcon icon={faEnvelope} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                  </div>
                  <div className='bg-[#EEEEEE]  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' onClick={() => useAuthStore.getState().logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-gray-500 hover:text-blue-500" />
                  </div>
                </div>
              </div>
              <div className='flex flex-col p-2  my-3  w-full  rounded-[10px]  '>
                {child}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientSideBar;
