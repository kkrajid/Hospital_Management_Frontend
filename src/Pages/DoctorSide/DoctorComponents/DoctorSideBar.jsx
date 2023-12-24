import React, { useEffect,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { faHome, faCalendar, faComments, faEnvelope, faSignOutAlt, faClock, faBedPulse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuthStore } from '../../../Store/auth';
import { useQuery } from '@tanstack/react-query';
import { get_doctor_all_alert_from_icu_patients } from '../../../api/user';

function DoctorSideBar({ child }) {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useQuery(
    ['get_doctor_all_alert_from_icu_patients'], 
    () => get_doctor_all_alert_from_icu_patients(), 
    {
      staleTime: 5000,
      refetchInterval: 5000,
    }
  );
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [refetch]);

  useEffect(() => {
    if (data && Array.isArray(data)) {
      setDataLength(data.length);
    }
  }, [data]);

  const notificationCount = dataLength;

  console.log(data);
  console.log(`Length of data: ${dataLength}`);


  return (
    <div className=''>

      <div className="w-full h-screen p-2 bg-[#bcc3ff] border-b flex " >

        <div className="bg-[#E3E6FF] rounded-[22px] w-full h-full md:max-w-[1480px] max-w-[600px] p-4 m-auto ">
          <div className="rounded-[22px] bg-gray-200 w-full h-full m-auto flex">
            <div className="flex m-2 md:flex-row  w-full ">
              <div className="mx-5 my-3 rounded-[20px] bg-[#1AACAC] w-[10px] px-9 flex justify-center ">
                <div className='flex flex-col justify-between my-12'>
                  <div className='flex flex-col my-12 gap-6'>
                    <Link className='bg-[#EEEEEE] flex items-center justify-center rounded-[10px] p-2 hover:bg-white' to='/doctor'>
                      <FontAwesomeIcon icon={faHome} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/doctor/timeslote'>
                      <FontAwesomeIcon icon={faClock} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/doctor/appointments'>
                      <FontAwesomeIcon icon={faCalendar} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    <Link className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/doctor/icu'>
                      <FontAwesomeIcon icon={faBedPulse} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link>
                    {/* <Link className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover.bg-white' to='/doctor/chat'>
                      <FontAwesomeIcon icon={faComments} size="lg" className="text-gray-500 hover:text-blue-500" />
                    </Link> */}
                    <Link className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover:bg-white' to='/doctor/notifications'>
                      <FontAwesomeIcon icon={faEnvelope} size="lg" className="text-gray-500 hover:text-blue-500" />
                      <div className="relative top-0 right-0  ">
                        {notificationCount > 0 && (
                          <span className="absolute bottom-0 left-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                            {notificationCount}
                          </span>
                        )}
                      </div>
                    </Link>

                  </div>
                  <div className='bg-[#EEEEEE] flex justify-center items-center rounded-[10px] p-2 hover:bg-white' onClick={() => useAuthStore.getState().logout()}>
                    <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="text-gray-500 hover:text-blue-500" />
                  </div>
                </div>
              </div>
              <div className='flex flex-col p-2  my-3   w-full  rounded-[10px]  '>
                {child}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSideBar;
