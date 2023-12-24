import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { patientProfile, patientProfile_add_or_update } from '../../../api/user';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useAuthStore } from '../../../Store/auth';
import { useMutation } from '@tanstack/react-query';
import jwt_decode from 'jwt-decode';
import { toast } from "react-hot-toast";

const CustomInput = ({ label, name, type, value, onChange, placeholder }) => {
    return (
        <div className="relative h-11 w-full min-w-[200px]">
            <input
                className="peer h-full w-full border-b border-blue-gray-200 bg-gray-600 shadow-lg pt-4 pb-1.5 font-sans text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                type={type || "text"}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder || " "}
            />
            <label
                className="after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-300 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
            >
                {label}
            </label>
        </div>
    );
};


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
            country: '',
        },
    });

    const { data, error, isLoading,refetch } = useQuery(['patientProfile'], patientProfile);
    console.log(data);
    useEffect(() => {
        if (data && !isLoading) {
            setUserData({
                full_name: data.user['full_name'],
                email: data.user['email'],
                phone: data.user['phone'],
                insurance_info: data.profile_data ? data.profile_data['insurance_info'] : ' ',
                emergency_contact: data.profile_data ? data.profile_data['emergency_contact'] : ' ',
                date_of_birth: data.user['date_of_birth'],
                profile_pic: data.profile_data ? data.profile_data['profile_pic'] : ' ',
                address: data.profile_data ? data.profile_data['address'] : ' ',
                gender:data.user['gender']
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
            toast.success(
                <div>
                  <strong>Success:</strong> Profile Updated Successfully
                </div>,
                {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  style: {
                    backgroundColor: "#4CAF50",
                    color: "white",
                    fontSize: "16px",
                    fontWeight: "bold",
                    border: "none",
                    width: "100%",
                    textAlign: "center",
                  },
                }
              );
              refetch();
              
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
        <div className="max-w-[1480px] w-full bg-gray-800 rounded-[10px] h-full p-2 ">
            <div className="w-full h-full flex flex-col justify-evenly ">

                <div className=" h-1/8 flex justify-between items-center py-2 px-4 w-full shadow-lg bg-[#B0B0B0]  rounded-xl">
                    <div>
                        <h1 className='text-gray-300'>Profile</h1>
                    </div>
                    <div>
                        <img src={userData.profile_pic} className="w-10 h-10 shadow-lg rounded-full" alt="" />
                    </div>
                </div>
                <div className="flex md:flex-row flex-col w-full h-5/6 bg-gray-800  rounded-b-[10px] px-3 py-4 gap-3">
                    <div className=" w-[25%]  h-full ">
                        <div className="w-full h-full bg-gray-600 shadow-lg px-5 py-2 rounded-[10px]">
                            <div className="w-full h-full  p-3">
                                <div className="flex flex-col items-center justify-center py-3  gap-4">
                                    <div className="flex relative">
                                        <img src={userData.profile_pic} className="w-20 h-20 shadow-lg border-1 border-white rounded-full " alt="" />
                                        <span className="py-1 px-2 bg-[#209ABB] rounded-full text-xs bottom-0 right-0 absolute ">
                                            <input type="file" className="image-input w-2 h-2 rounde-full bg-[#209ABB] " onChange={handleFileChange}></input>
                                        </span>
                                    </div>
                                    <div className="flex flex-col items-center justify-center">
                                        <h1 className="text-1xl font-mono font-semibold text-gray-400">{userData.full_name}</h1>
                                        <p className="p-1 px-2 text-green-400 bg-green-100 rounded-[10px] text-xs my-1">Active</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1  gap-2">
                                    <div className="bg-gray-500 py-2 px-4 rounded-[10px]">
                                        <p className="text-xs text-gray-300 font-mono">Email</p>
                                        <p className="  font-semibold text-gray-200">{userData.email}</p>
                                    </div>
                                    <div className="bg-gray-500 py-2 px-4 rounded-[10px]">
                                        <p className="text-xs text-gray-300 font-mono">Mobile</p>
                                        <p className=" font-semibold text-gray-200 ">{userData.phone}</p>
                                    </div>
                                    <div className="bg-gray-500 py-2 px-4 rounded-[10px]">
                                        <p className="text-xs text-gray-300 font-mono">Gender</p>
                                        <p className=" font-semibold text-gray-200">{userData?.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[75%] h-full ">
                        <div className="w-full h-full  rounded-[10px]  bg-gray-600 shadow-lg  flex flex-col gap-2 p-3">
                            <div className="w-full full flex items-center justify-center  py-2 ">
                                <form className="w-full h-full grid grid-cols-1 gap-7 " onSubmit={handleSubmit}>
                                    <div className=" grid grid-cols-2  px-5">
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Full Name"
                                                name="full_name"
                                                value={userData.full_name}
                                                onChange={(e) => setUserData({ ...userData, full_name: e.target.value })}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Mobile"
                                                name="mobile"
                                                value={userData.phone}
                                                onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                                                placeholder=" "
                                            />
                                        </div>
                                    </div>
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="DOB"
                                                name="date_of_birth"
                                                type="date"  // Add type attribute for date input
                                                value={userData.date_of_birth}
                                                onChange={(e) => setUserData({ ...userData, date_of_birth: e.target.value })}
                                                placeholder=" "
                                            />

                                        </div>

                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Emergency Contact"
                                                name="emergency_contact"
                                                value={userData.emergency_contact}
                                                onChange={(e) => setUserData({ ...userData, emergency_contact: e.target.value })}
                                                placeholder=" "
                                            />
                                        </div>
                                    </div>
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Insurance No"
                                                name="insurance_info"
                                                value={userData.insurance_info}
                                                onChange={(e) => setUserData({ ...userData, insurance_info: e.target.value })}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Street Address"
                                                name="street_address"
                                                value={userData?.address?.street_address}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, street_address: e.target.value } }))}
                                                placeholder=" "
                                            />
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="City"
                                                name="city"
                                                value={userData?.address?.city}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, city: e.target.value } }))}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="State"
                                                name="state"
                                                value={userData?.address?.state}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, state: e.target.value } }))}
                                                placeholder=" "
                                            />
                                        </div>
                                    </div>
                                    <div className=" grid grid-cols-2 mt-2 px-5">
                                        <div className="flex flex-col px-4">

                                            <CustomInput
                                                label="Pin code"
                                                name="zip_code"
                                                value={userData?.address?.zip_code}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, zip_code: e.target.value } }))}
                                                placeholder=" "
                                            />
                                        </div>
                                        <div className="flex flex-col px-4">
                                            <CustomInput
                                                label="Country"
                                                name="country"
                                                value={userData?.address?.country}
                                                onChange={(e) => setUserData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, country: e.target.value } }))}
                                                placeholder=" "
                                            />
                                        </div>
                                    </div>
                                    <div className="flex ml-2   px-7">
                                        <button className="bg-[#209ABB] p-2 rounded-[5px] text-white">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PatientProfile;
