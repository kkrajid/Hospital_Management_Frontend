import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { get_doctor_all_alert_from_icu_patients, fetchNotificationUsers } from '../../../api/user';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Link, useNavigate } from 'react-router-dom';
function DoctorNotifications() {
  const [allNotifications, setAllNotifications] = useState([]);
  const [userIDs, setUserIDs] = useState([]);
  const navigate = useNavigate();

  const { data, isLoading, error } = useQuery(
    ['get_doctor_all_alert_from_icu_patients'],
    () => get_doctor_all_alert_from_icu_patients()
  );
  console.log(data);
  useEffect(() => {
    if (data) {
      const userIDsSet = new Set(data?.map((dataItem) => dataItem?.user_id));
      const uniqueUserIDs = Array.from(userIDsSet);
      setUserIDs(uniqueUserIDs);
      fetchNotificationUsers(uniqueUserIDs);
      setAllNotifications(data);
    }
  }, [data]);

  const { data: users, isLoading: notificationUsersLoading, isError: notificationUsersError } = useQuery(
    ['notificationUsers', userIDs],
    () => fetchNotificationUsers(userIDs),
    {
      enabled: !!userIDs.length,
    }
  );

  if (isLoading || notificationUsersLoading && userIDs.length !==0) {
    return <LoadingSpinner/>;
  }

  if (error || notificationUsersError) {
    return <p>Error loading data</p>;
  }
  console.log(users,"sfsf",userIDs);

  const namesObject = {};

  if (Array.isArray(users)) {
    users.forEach((user) => {
      const id = user.id.toString();
      console.log(id, 'id');
    
      if (userIDs.includes(id)) {
        const fullName = user.patient?.full_name;
        namesObject[id] = fullName;
      }
    });
  }
  console.log(namesObject);
  
  console.log(namesObject);
  

  return (
    <div className='w-full h-full bg-gray-300 rounded-xl py-3 px-3 flex flex-col gap-5'>
      <div className='w-full h-[10%] flex items-center'>
        <div className='w-full h-full shadow-lg border bg-[#1AACAC] rounded-lg'>
          <div className='flex w-full h-full justify-between py-2 px-3 '>
            <div className='flex items-center justify-center '>
              <p className='uppercase text-white font-bold'>Notifications</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[90%] bg-gradient-to-r from-[#1AACAC] to-[#138D8D] rounded-xl p-1 overflow-y-auto flex flex-col gap-2 '>
        {allNotifications.map((notification, index) => (
          <Link
            className='w-[100%] h-[20%] bg-gradient-to-r from-[#138D8D] to-[#106F6F] flex items-center justify-center mx-auto rounded-lg px-2'
            key={index}
            to={`/doctor/icu/${notification.user_id}`}
          >
            <div className='text-white text-center'>
              <p className='font-bold  mb-2'>Critical Condition Alert!</p>
              <p>
                {notification.user_id in namesObject?namesObject[notification.user_id]:""} heart rate is greater than 100. Immediate attention is
                required.
              </p>
              <p className='mt-2 text-sm'>
                Contact the medical team for further assessment.
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DoctorNotifications;
