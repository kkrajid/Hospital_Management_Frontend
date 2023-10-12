import React from 'react';
import { faHome, faCalendar, faComments, faEnvelope, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function PatientProfilePage() {
  return (
    <div className="w-full h-screen p-2 bg-[#D0D5FF] border-b">
      <div className="bg-[#E3E6FF] rounded-[22px] w-full h-full md:max-w-[1480px] max-w-[600px] p-4 m-auto ">
        <div className="rounded-[22px] bg-[#272C4C] w-full h-full m-auto flex">
          <div className="flex m-2 md:flex-row  w-full">
            <div className="mx-5 my-3 rounded-[30px] bg-[#5E62F1] w-[10px] px-12 flex justify-center ">
              <div className='flex flex-col justify-between my-12'>
                <div className='flex flex-col my-12 gap-6'>
                  <div className='bg-[#9DA0F5] flex items-center justify-center rounded-[10px] p-2'>
                    <FontAwesomeIcon icon={faHome} size="lg" className="text-white" />
                  </div>
                  <div className='bg-[#9DA0F5] flex justify-center items-center rounded-[10px] p-2'>
                    <FontAwesomeIcon icon={faCalendar} size="lg" className="text-white" />
                  </div>
                  <div className='bg-[#9DA0F5] flex justify-center items-center rounded-[10px] p-2'>
                    <FontAwesomeIcon icon={faComments} size="lg" className="text-white" />
                  </div>
                  <div className='bg-[#9DA0F5] flex justify-center items-center rounded-[10px] p-2'>
                    <FontAwesomeIcon icon={faEnvelope} size="lg" className="text-white" />
                  </div>
                </div>
                <div className='bg-[#9DA0F5] flex justify-center items-center rounded-[10px] p-2'>
                  <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-white" />
                </div>
              </div>
            </div>
            <div className='flex my-3 bg-[#F8E4D9] max-w-[1040px] w-full rounded-[10px] justify-center'>
              <div className='flex md:flex-row flex-col w-full p-3'>
                <div className='flex flex-col bg-red-400 w-full h-full pt-4 px-2 '>
                  <div className='bg-yellow-400 h-[100px] rounded-[10px] '> 
                  <div className="flex items-center ml-5 mt-11">
                      <img
                        src="https://carlbettosi.com/assets/img/prof_pic.jpg"
                        className="h-[100px] w-[90px] rounded-[10px] border-white border-[3px] shadow-lg"
                        alt=""
                      />
                      <div className="flex mt-10 md:ml-2 font-semibold">
                        <h1>Mr. Anoop</h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col w-full bg-green-400 h-full'>
                  ds
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfilePage;
