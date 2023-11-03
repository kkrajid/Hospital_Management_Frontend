
import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { all_doctors_Profile, add_new_doctor_ } from "../../../api/user";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrash, faTimes, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";
import AdminDoctors from './AdminDoctors';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { toast } from "react-hot-toast";
function AdminDoctorsList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const { data, error, isLoading } = useQuery(['all_doctors_Profile'], all_doctors_Profile);

    useEffect(() => {
        if (data && !isLoading) {
            setDoctorProfiles(data);

        }
    }, [data, isLoading, error]);

    const [formData, setFormData] = useState({
        user: {
          full_name: "",
          email: "",
          date_of_birth: "",
          gender: "",
          phone: "",
          password: "",
          role:"Doctor"
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


    console.log(formData);
    const [errors, setErrors] = useState({
        full_name: '',
        email: '',
        date_of_birth: '',
        gender: '',
        phone: '',
        specialization: '',
        street_address: '',
        city: '',
        state: '',
        country: '',
        zip_code: '',
        password: '',

    });

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setFormData((prevUserData) => ({
                    ...prevUserData,
                    profile_pic: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        add_new_doctor_addMutation.mutate();
    };




    const add_new_doctor_addMutation = useMutation({
        mutationFn: () => add_new_doctor_(formData),
        onSuccess: (response) => {
            console.log(response);
            toast.success(
                <div>
                    <strong>Success:</strong> Doctor Added Successfully
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
              setFormData({})
        },
        onError: (error) => {
            console.log(error.message);

        },
    });








    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    if (isLoading) {
        return <LoadingSpinner />;
    }
    return (
        <div className='px-2 py-3  '>
            <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2   border-b rounded-[10px]'>
                <div className='flex flex-row shadow max-w-[600px] md:max-w-[1480px] w-full  h-[50px] rounded-[1rem] py-1 px-4'>
                    <div className='hidden md:flex flex-row justify-between items-center w-full'>
                        <div>
                            <h1 className='text-gray-400'>Doctors</h1>
                        </div>
                        <div className='flex flex-row bg-white justify-between items-center rounded-[10px] p-1'>
                            <button className='mx-2 rounded-full shadow-sm  text-gray-400 p-1 px-2' onClick={openModal}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <div className='mr-12 rounded-full shadow-sm  text-gray-400 p-1 px-2'>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <input type="text" placeholder=' Search Doctor' className='text-gray-400 px-1 outline-none' />
                            <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
                        </div>
                    </div>
                </div>
                <div className='flex flex-row my-2 bg-[#3581f5] py-4 shadow-lg max-w-[600px] md:max-w-[1480px] w-full max-h-[50px] h-full'>
                    <ul className='flex w-full justify-evenly items-center text-white'>
                        <li>
                            All
                        </li>
                        <li>
                            special 1
                        </li>
                        <li>
                            special 1
                        </li>
                        <li>
                            special 1
                        </li>
                        <li>
                            special 1
                        </li>
                        <li>
                            special 1
                        </li>
                    </ul>
                </div>

                <div className=' md:max-w-[700px]w-full max-h-[430px] h-full flex  mt-2 overflow-y-auto bg-gray-100 p-2'>
                    <div className='gap-2 grid md:grid-cols-4 grid-cols-2 m-auto'>
                        {doctorProfiles.map((profile) => (
                            <AdminDoctors child={profile} />

                        ))}
                    </div>

                </div>
            </div>
            <div className="relative">
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                        <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"></div>
                        (
                        <div className="bg-white p-2 rounded-[1rem] shadow-lg z-10 w-[34rem] h-[38rem]">
                            <div className='flex flex-row w-full justify-between '>
                                <div></div>
                                <button className='uppercase text-gray-400 text-1xl' onClick={closeModal}>
                                    <FontAwesomeIcon icon={faTimes} className='text-gray-300 w-6 h-6' />
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} >
                                <div className='flex flex-col bg-gray-100 h-5/6'>
                                    <div className='flex px-6 justify-center items-center my-4 py-1'>
                                        <h1 className='text-xl font-semibold'>Add New Doctor</h1>
                                    </div>
                                    <div className='flex flex-col items-center justify-center gap-2'>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input border mb-2 w-full py-3 px-6 text-sm rounded-md ${errors.full_name ? ' border-2 border-red-600' : ''} `}
                                                    placeholder="Full Name"
                                                    name="full_name"
                                                    value={formData.user.full_name}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, full_name: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.email ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData.user.email}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, email: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="date"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.date_of_birth ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="DOB"
                                                    name="date_of_birth"
                                                    value={formData.user.date_of_birth}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, date_of_birth: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.gender ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Gender"
                                                    name="gender"
                                                    value={formData.user.gender}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, gender: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.phone ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Mobile"
                                                    name="phone"
                                                    value={formData.user.phone}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, phone: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.specialization ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Specialization"
                                                    name="specialization"
                                                    value={formData.specialization}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.street_address ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Street Address"
                                                    name="street_address"
                                                    value={formData.address.street_address}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, street_address: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.city ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="City"
                                                    name="city"
                                                    value={formData.address.city}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, city: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.state ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="State"
                                                    name="state"
                                                    value={formData.address.state}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, state: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.country ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Country"
                                                    name="country"
                                                    value={formData.address.country}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, country: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.zip_code ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Pin Code"
                                                    name="zip_code"
                                                    value={formData.address.zip_code}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, zip_code: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.password ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData.user.password}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, password: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center gap-3 my-2 px-12 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md ${errors.password ? ' border-2 border-red-600' : ''}`}
                                                    placeholder="license number"
                                                    name="license_number"
                                                    value={formData.license_number}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    name="image"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-center gap-3 my-3'>
                                    <button className='px-3 py-2 rounded-lg bg-blue-600 text-white' type="submit">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>

    )
}

export default AdminDoctorsList


