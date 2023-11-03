
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientProfile ,patientProfile_add_or_update} from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useAuthStore } from '../../../Store/auth'
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";

function PatientProfile() {
    const [userData, setUserData] = useState({
        full_name: '',
        email: '',
        phone: '',
        profile_pic: '',
        gender: '',
        insurance_info: '',
        emergency_contact: '',
        date_of_birth: '',
        address: {
            street_address: '',
            city: '',
            state: '',
            zip_code: '',
            country: ''
        }
    });
   

    const { data, error, isLoading } = useQuery(['patientProfile'], patientProfile);

    useEffect(() => {
        if (data && !isLoading) {
            console.log(data);
            setUserData({
                full_name: data.user['full_name'],
                email: data.user['email'],
                phone: data.user['phone'],
                insurance_info:data.profile_data?data.profile_data['insurance_info']:' ',
                emergency_contact:data.profile_data?data.profile_data['emergency_contact']:' ',
                date_of_birth:data.user['date_of_birth'],
                profile_pic:data.profile_data?data.profile_data['profile_pic']:' ',
                address:data.profile_data?data.profile_data['address']:" "
            });
        }
    }, [data, isLoading]);
  
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserData((prevUserData) => ({
                    ...prevUserData,
                    profile_pic: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const update_or_addMutation = useMutation({
        mutationFn: () => patientProfile_add_or_update(userData),
        onSuccess: (response) => {
          alert(response)
        },
        onError: (error) => {
          console.log(error.message);

        },
      });
    
      
    
      const handleSubmit = (event) => {
        event.preventDefault();
        update_or_addMutation.mutate();
      };

      
   
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className='max-w-[1480px] w-full bg-gray-100 rounded-[10px] h-full p-2 '>
            <div className='w-full h-[450px]'>
                <div className='w-full h-[60px] shadow-lg bg-white rounded-[3px] flex items-center my-2'>
                    <div className='flex justify-between items-center py-2 px-4 w-full '>
                        <div>
                            <h1>Profile</h1>
                        </div>
                        <div>
                            <img src={userData.profile_pic} className='w-10 h-10 shadow-lg rounded-full' alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col w-full h-full'>
                    <div className='md:max-w-xs w-full  h-full p-3'>
                        <div className='w-full h-full bg-white shadow-lg px-5 py-2 rounded-[10px]'>
                            <div className='w-full h-full  p-3'>
                                <div className='flex flex-col items-center justify-center py-3  gap-4'>
                                    <div className='flex relative'>
                                        <img src={userData.profile_pic} className='w-20 h-20 shadow-lg border-1 border-white rounded-full ' alt="" />
                                        <span className='py-1 px-2 bg-blue-600 rounded-full text-xs bottom-0 right-0 absolute '><input type="file" class="image-input w-2 h-2 rounde-full bg-blue-400" onChange={handleFileChange}></input></span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <h1 className='text-1xl font-mono font-semibold text-gray-400'>{userData.full_name}</h1>
                                        <p className='p-1 px-2 text-green-400 bg-green-100 rounded-[10px] text-xs my-1'>Active</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1  gap-2'>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Email</p>
                                        <p className='text-xs font-mono font-semibold'>{userData.email}</p>
                                    </div>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Mobile</p>
                                        <p className='text-xs font-mono font-semibold'>{userData.phone}</p>
                                    </div>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Gender</p>
                                        <p className='text-xs font-mono font-semibold'>{userData.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=' w-full  h-full p-3'>
                        <div className='w-full h-full  rounded-[10px]  bg-white shadow-lg  flex flex-col gap-2 p-3'>
                            <div className='w-full '>
                                <form className='w-full  ' onSubmit={handleSubmit}>
                                    <div className=' grid grid-cols-2  px-5'>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="full_name"
                                                value={userData.full_name}
                                                onChange={(e)=>setUserData({ ...userData, full_name: e.target.value })}
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Mobile</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="mobile"
                                                value={userData.phone}
                                                onChange={(e)=>setUserData({ ...userData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex grid grid-cols-2 my-2 px-5'>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Insurance No</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="insurance_info"
                                                value={userData.insurance_info}
                                                onChange={(e)=>setUserData({ ...userData, insurance_info: e.target.value })}
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Emergency Contact</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="emergency_contact"
                                                value={userData.emergency_contact}
                                                onChange={(e)=>setUserData({ ...userData, emergency_contact: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex grid grid-cols-2 my-2 px-5'>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>DOB</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="date_of_birth"
                                                value={userData.date_of_birth}
                                                onChange={(e)=>setUserData({ ...userData, date_of_birth: e.target.value })}
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="street_address"
                                                value={userData?.address?.street_address}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, street_address: e.target.value } }))}
                                            />
                                        </div>
                                    </div>
                                    <div className=' grid grid-cols-2 my-2 px-5'>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>City</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="city"
                                                value={userData?.address?.city}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, city: e.target.value } }))}
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>State</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="state"
                                                value={userData?.address?.state}

                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, state: e.target.value } }))}
                                            />
                                        </div>
                                    </div>
                                    <div className=' grid grid-cols-2 my-2 px-5'>

                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Pin code</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="zip_code"
                                                value={userData?.address?.zip_code}
                                               
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, zip_code: e.target.value } }))}
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Country</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "

                                                name="country"
                                                value={userData?.address?.country}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, country: e.target.value } }))}
                                            />
                                        </div>
                                    </div>
                                    <div className='flex ml-2  my-2 px-7'>
                                        <button className='bg-blue-600 p-2 rounded-[5px] text-white'>Submit</button>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientProfile