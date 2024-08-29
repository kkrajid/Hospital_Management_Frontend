import React, { useState, useEffect,useRef  } from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctor_profile_detail, DoctorProfile_add_or_update } from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { useMutation } from "@tanstack/react-query";
import jwt_decode from "jwt-decode";
import { Link } from 'react-router-dom';
import { toast } from "react-hot-toast";
function DoctorProfile() {
    const fileInputRef = useRef(null);
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

    const { data, error, isLoading,refetch } = useQuery(['doctor_profile_detail'], doctor_profile_detail);

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

    const handleImageClick = () => {
        fileInputRef.current.click();
      };
  
 
    return (
        <div className="w-full bg-[#c7cbd2] rounded-[10px] h-full p-2 overflow-y-auto">
            <div className="w-full h-[98%] flex flex-col gap-6" >
                <div className="w-full h-[60px] shadow-lg bg-[#1AACAC] rounded-lg flex items-center my-2">
                    <div className="flex justify-between items-center py-2 px-4 w-full ">
                        <div>
                            <h1 className="text-xl font-semibold text-white">Profile</h1>
                        </div>
                        <Link to={`/doctor/profile`}>
                            <img src={  formData?.profile_pic || data?.profile_pic } className="w-10 h-10 shadow-lg rounded-full" alt="" />
                        </Link>
                    </div>
                </div>
                <div className="flex md:flex-row flex-col w-full h-5/6 rounded-[10px]">
                    {/* Left Section */}
                    <div className="md:max-w-xs w-full h-full p-3">
                        <div className="w-full h-full bg-[#00BFBF]  shadow-lg px-5 py-2 rounded-[10px]">
                            <div className="w-full h-full p-3">
                                <div className="flex flex-col items-center justify-center py-3 gap-4">
                                <div>
                                    <img
                                        src={formData?.profile_pic || data?.profile_pic}
                                        className="w-20 h-20 shadow-lg border-2 border-white rounded-full"
                                        alt=""
                                        onClick={handleImageClick}
                                    />

                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                    />

                                    {/* {newProfilePic && (
                                        <button onClick={handleSave}>Save</button>
                                    )} */}
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <h1 className="text-2xl font-serif font-extrabold text-white">
                                            {data.user?.full_name}
                                        </h1>
                                        <p className="p-1 px-2 text-white bg-#1AACAC rounded-[10px] text-sm my-1">
                                            Active
                                        </p>
                                    </div>
                                    <Link
                                        className="text-md py-2 bg-white px-4  rounded-[10px] hover:bg-#FF6347 active:bg-#CD3700"
                                        to="/doctor/timeslote"
                                    >
                                        Create Time Slot
                                    </Link>
                                </div>
                                <div className="grid grid-cols-1 flex gap-2">
                                    <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                                        <p className="text-sm text-gray-600 font-serif">Email</p>
                                        <p className="text-sm font-serif font-semibold">{data?.user?.email}</p>
                                    </div>
                                    <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                                        <p className="text-sm text-gray-600 font-serif">Mobile</p>
                                        <p className="text-sm font-serif font-semibold">{data.user?.phone}</p>
                                    </div>
                                    <div className="bg-gray-200 py-2 px-4 rounded-[10px]">
                                        <p className="text-sm text-gray-600 font-serif">Gender</p>
                                        <p className="text-sm font-serif font-semibold">{data?.user?.gender}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Section */}
                    <div className="w-full h-full p-3">
                        <div className="w-full h-full rounded-[10px] bg-[#00BFBF] shadow-xl flex flex-col gap-2 p-3">
                            <div className="w-full">
                                <form className="w-full" onSubmit={handleSubmit}>
                                    {/* Form Inputs */}
                                    <div className="grid grid-cols-2 px-5">
                                        {/* Input 1 */}
                                        <div className="flex flex-col px-4">
                                            <label htmlFor="" className="text-white ">
                                                Full Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
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
                                        {/* Input 2 */}
                                        <div className="flex flex-col px-4">
                                            <label htmlFor="" className="text-white ">
                                                Mobile
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
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
                                    {/* Input 3 */}
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                Insurance No
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="license_number"
                                                value={formData?.license_number}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, license_number: e.target.value })
                                                }
                                            />
                                        </div>
                                        {/* Input 4 */}
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                Specialization
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="specialization"
                                                value={formData?.specialization}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, specialization: e.target.value })
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Input 5 */}
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                DOB
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="date_of_birth"
                                                value={formData?.user?.date_of_birth}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, date_of_birth: e.target.value })
                                                }
                                            />
                                        </div>
                                        {/* Input 6 */}
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                Street Address
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
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
                                    {/* Input 7 */}
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                City
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="city"
                                                value={formData?.address?.city}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, city: e.target.value } })
                                                }
                                            />
                                        </div>
                                        {/* Input 8 */}
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                State
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="state"
                                                value={formData?.address?.state}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, state: e.target.value } })
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Input 9 */}
                                    <div className="flex grid grid-cols-2 my-2 px-5">
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                Pin code
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="zip_code"
                                                value={formData?.address?.zip_code}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, zip_code: e.target.value } })
                                                }
                                            />
                                        </div>
                                        {/* Input 10 */}
                                        <div className="flex flex-col px-4">
                                        <label htmlFor="" className="text-white ">
                                                Country
                                            </label>
                                            <input
                                                type="text"
                                                className="form-input w-full py-2 px-4 text-sm rounded-[5px] border-2 border-gray-300"
                                                name="country"
                                                value={formData?.address?.country}
                                                onChange={(e) =>
                                                    setFormData({ ...formData, address: { ...formData.address, country: e.target.value } })
                                                }
                                            />
                                        </div>
                                    </div>
                                    {/* Submit Button */}
                                    <div className="flex ml-2 my-2 px-7">
                                        <button className="bg-blue-600 p-2 rounded-[5px] text-white">
                                            Submit
                                        </button>
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
