import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faCalendar, faComments, faEnvelope, faSignOutAlt, faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useAuthStore} from '../../../Store/auth'


function PatientSideBar({ child }) {
  const navigate = useNavigate();

  return (
    <div className=''>
      
      <div className="w-full h-screen p-2 bg-[#D0D5FF] border-b flex " >

        <div className="bg-[#e0e3ee] rounded-[22px] w-full h-full md:max-w-[1480px] max-w-[600px] p-4 m-auto ">
          <div className="rounded-[22px] bg-white w-full h-full m-auto flex shadow-lg ">
            <div className="flex m-2 md:flex-row  w-full ">
              <div className="mx-5 my-3 rounded-[20px] bg-[#474EDB] w-[10px] px-9 flex justify-center shadow-lg ">
                <div className='flex flex-col justify-between my-12'>
                  <div className='flex flex-col my-12 gap-6'>
                    <Link className='bg-white flex items-center justify-center rounded-[10px] p-2 hover:bg-white' to='/patient/dashboard'>
                      <FontAwesomeIcon icon={faHome} size="lg" className="text-[#859AC0] hover:text-blue-500" />
                    </Link>
                    <Link className='bg-white  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/patient/doctors'>
                      <FontAwesomeIcon icon={faUserMd} size="lg" className="text-[#859AC0] hover:text-blue-500" />
                    </Link>
                    <Link className='bg-white  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/patient/appointments'>
                      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-[#859AC0] hover:text-blue-500" />
                    </Link>
                    <Link className='bg-white  flex justify-center items-center rounded-[10px] p-2 hover.bg-white' to='/patient/chat'>
                      <FontAwesomeIcon icon={faComments} size="lg" className="text-[#859AC0] hover:text-blue-500" />
                    </Link>
                    <Link className='bg-white  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/patient/messages'>
                      <FontAwesomeIcon icon={faEnvelope} size="lg" className="text-[#859AC0] hover:text-blue-500" />
                    </Link>
                  </div>
                  <div className='bg-white  flex justify-center items-center rounded-[10px] p-2 hover:bg-white' onClick={() => useAuthStore.getState().logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-[#859AC0] hover:text-blue-500" />
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
