import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientProfile } from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import {useAuthStore} from '../../../Store/auth'
function DoctorHome() {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        mobile: '',
    });

    const { data, error, isLoading } = useQuery(['patientProfile'], patientProfile); 

    useEffect(() => {
      if (data && !isLoading) {
        setUserData({
          name: data.user['full_name'],
          email: data.user['email'],
          address: data.profile_data['address'],
          mobile: data.user['phone'],
        });
      }
    }, [data, isLoading]);
    
    if (data && data.profile_data) {
        console.log(data.profile_data);
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <>
            <div className='mx-4 mb-0 bg-gradient-to-r from-blue-400 to-green-100 h full p-9 rounded-[10px]  '>
                <div className="flex flex-row justify-between items-center ">
                    <div className='h-[100px]'>

                    </div>
                    <div className="flex flex-row  font-semibold gap-3">
                       
                    </div>
                </div>
            </div>
            <div className='flex md:flex-row flex-col w-full p-3'>
                
                  
            </div>
        </>
    )
}

export default DoctorHome