import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctor_profile_detail,DoctorProfile_add_or_update } from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { toast } from "react-hot-toast";
function DoctorProfile() {
    const [formData, setFormData] = useState({
        user: {
            full_name: "",
            date_of_birth: "",
            gender: "",
            phone: "",
            password: "",
            role: "Doctor"
        },
        specialization: "",
        license_number: "",
        address: {
            street_address: "",
            city: "",
            state: "",
            zip_code: "",
            country: ""
        },
        profile_pic: ""
    });

    const { data, error, isLoading } = useQuery(['doctor_profile_detail'], doctor_profile_detail);

    useEffect(() => {
        if (data && !isLoading) {
            console.log(data);
            setFormData(data);
        }
    }, [data, isLoading]);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    profile_pic: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const update_or_addMutation = useMutation({
        mutationFn: () => DoctorProfile_add_or_update(formData),
        onSuccess: (response) => {
            toast.success(
                <div>
                  {response.message}
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
        <div className=' w-full bg-[#dcdfe4] rounded-[10px] h-full px-1 overflow-y-auto'>
            <div className='w-full   ' style={{height:"96%"}}>
                <div className='w-full h-1/6 flex items-center my-2'>
                    <div className='flex justify-between items-center py-3 px-4 px-4 w-full  shadow-lg bg-white  rounded-[3px] '>
                        <div>
                            <h1>Profile</h1>
                        </div>
                        <div>
                            <img src={formData?.profile_pic} className='w-10 h-10 shadow-lg rounded-full' alt="" />
                        </div>
                    </div>
                </div>
                <div className='flex md:flex-row flex-col w-full h-5/6  rounded-[10px]'>
                    <div className='md:max-w-xs w-full  h-full p-3'>
                        <div className='w-full h-full bg-white shadow-lg px-5 py-2 rounded-[10px]'>
                            <div className='w-full h-full  p-3'>
                                <div className='flex flex-col items-center justify-center py-3  gap-4'>
                                    <div className='flex relative'>
                                        <img src={formData && formData.profile_pic ? formData.profile_pic : ''} className='w-20 h-20 shadow-lg border-1 border-white rounded-full ' alt="" />
                                        <span className='py-1 px-2 bg-blue-600 rounded-full text-xs bottom-0 right-0 absolute '>
                                            <input type="file" className="image-input w-2 h-2 rounde-full bg-blue-400" onChange={handleFileChange}></input>
                                        </span>
                                    </div>
                                    <div className='flex flex-col items-center justify-center'>
                                        <h1 className='text-1xl font-mono font-semibold text-gray-400'>{formData && formData.user ? formData.user.full_name : ''}</h1>
                                        <p className='p-1 px-2 text-green-400 bg-green-100 rounded-[10px] text-xs my-1'>Active</p>
                                    </div>
                                </div>
                                <div className='grid grid-cols-1  gap-2'>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Email</p>
                                        <p className='text-xs font-mono font-semibold'>{data && data.user ? data.user.email : ''}</p>
                                    </div>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Mobile</p>
                                        <p className='text-xs font-mono font-semibold'>{formData && formData.user ? formData.user.phone : ''}</p>
                                    </div>
                                    <div className='bg-gray-100 py-2 px-4 rounded-[10px]'>
                                        <p className='text-xs text-gray-500 font-mono'>Gender</p>
                                        <p className='text-xs font-mono font-semibold'>{formData && formData.user ? formData.user.gender : ''}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full  h-full p-3'>
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
                                                value={formData.user.full_name}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        user: { ...formData.user, full_name: e.target.value },
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Mobile</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="mobile"
                                                value={formData.user.phone}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        user: { ...formData.user, phone: e.target.value },
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className='flex grid grid-cols-2 my-2 px-5'>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Insurance No</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="license_number"
                                                value={formData?.license_number}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, license_number: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Specialization</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="specialization"
                                                value={formData?.specialization}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, specialization: e.target.value })
                                                }
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
                                                value={formData?.user?.date_of_birth}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, date_of_birth: e.target.value })
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Street Address</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="street_address"
                                                value={formData?.address?.street_address}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        address: { ...formData.address, street_address: e.target.value },
                                                    })
                                                }
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
                                                value={formData?.address?.city}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>State</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="state"
                                                value={formData?.address?.state}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                                                }
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
                                                value={formData?.address?.zip_code}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, zip_code: e.target.value } })
                                                }
                                            />
                                        </div>
                                        <div className='flex flex-col px-4'>
                                            <label htmlFor="" className='text-gray-400 font-mono'>Country</label>
                                            <input
                                                type="text"
                                                className="form-input  w-full py-2 px-4 text-sm  rounded-[5px] border-2 border-gray-300 "
                                                name="country"
                                                value={formData?.address?.country}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })
                                                }
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
    );
}

export default DoctorProfile;
