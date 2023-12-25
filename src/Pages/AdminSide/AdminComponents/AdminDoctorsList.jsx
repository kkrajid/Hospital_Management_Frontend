import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlus, faTrash, faTimes } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-hot-toast';
import { all_doctors_Profile, add_new_doctor_ } from '../../../api/user';

import AdminDoctors from './AdminDoctors';
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Link } from 'react-router-dom';
const getToastConfig = () => ({
    duration: 4000,
    position: 'top-right',
    style: {
        background: '#333',
        color: '#fff',
    },
});


function AdminDoctorsList() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [listOfSpecialization, setListOfSpecialization] = useState([]);
    const [blockuser, setBlockuser] = useState(false);
    const [formData, setFormData] = useState({
        user: {
            full_name: '',
            email: '',
            date_of_birth: '',
            gender: '',
            phone: '',
            password: '',
            role: 'Doctor',
        },
        specialization: '',
        license_number: '',
        service_charge: '0',
        address: {
            street_address: '',
            city: '',
            state: '',
            zip_code: '',
            country: '',
        },
        profile_pic: " ",
    });

    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const { data, error, isLoading, refetch } = useQuery(['all_doctors_Profile'], all_doctors_Profile);



    const handleAddDoctorSuccess = (response) => {
        console.log(response);
        toast.success('Doctor added successfully!', getToastConfig());
        refetch();
        resetFormDataAndModal();
    };

    const handleAddDoctorError = (error) => {
        console.error(error.message);
        toast.error('Failed to add the doctor. Please try again.', getToastConfig());
    };

    const add_new_doctor_addMutation = useMutation({
        mutationFn: (formData) => add_new_doctor_(formData),
        onSuccess: handleAddDoctorSuccess,
        onError: handleAddDoctorError,
    });

    const updateDoctorProfiles = () => {
        if (data && !isLoading) {
            setDoctorProfiles(data);
        }
        const arr = doctorProfiles?.map((item) => item?.specialization);
        setListOfSpecialization([...new Set(arr)]);
    };

    useEffect(() => {
        updateDoctorProfiles();
    }, [data, isLoading, error, doctorProfiles]);


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
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        add_new_doctor_addMutation.mutate(formData);
    };

    const resetFormDataAndModal = () => {
        setFormData({
            user: {
                full_name: '',
                email: '',
                date_of_birth: '',
                gender: '',
                phone: '',
                password: '',
                role: 'Doctor',
            },
            specialization: '',
            license_number: '',
            service_charge: '0',
            address: {
                street_address: '',
                city: '',
                state: '',
                zip_code: '',
                country: '',
            },
            profile_pic: null,
        });
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        resetFormDataAndModal();
    };

    const filteredDoctors = doctorProfiles.filter(
        (doctor) =>
            doctor.user.full_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
            doctor.specialization?.toLowerCase().includes(searchInput.toLowerCase())
    );

    if (isLoading || add_new_doctor_addMutation.isLoading) {
        return <LoadingSpinner />;
    }


    return (
        <div className='px-2 py-3 h-full w-full '>
            <div className='flex flex-col shadow-lg max-w-[1480px] w-full px-1 py-2  h-full  border-b rounded-[10px]'>
                <div className='flex flex-row shadow max-w-[600px] md:max-w-[1480px] w-full  h-[50px] rounded-[1rem] py-1 px-4'>
                    <div className='hidden md:flex flex-row justify-between items-center w-full'>
                        <div>
                            <h1 className='text-gray-400'>Doctors</h1>
                        </div>
                        <div className='flex flex-row bg-white justify-between items-center rounded-[10px] p-1'>
                            <button className='mx-2 rounded-full shadow-sm  text-gray-400 p-1 px-2' onClick={openModal}>
                                <FontAwesomeIcon icon={faPlus} />
                            </button>
                            <div className='mr-12 rounded-full shadow-sm  text-gray-400 p-1 px-2' onClick={() => setBlockuser(!blockuser)}>
                                <FontAwesomeIcon icon={faTrash} />
                            </div>
                            <input
                                type="text"
                                placeholder="Search Doctor"
                                className="text-gray-400 px-1 outline-none"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faSearch} className="text-gray-300" />

                        </div>
                    </div>
                </div>
                <div className='flex flex-row my-2 bg-[#3581f5] py-4 shadow-lg max-w-[600px] md:max-w-[1480px] w-full max-h-[50px] h-full'>
                    <ul className='flex w-full justify-evenly items-center text-white'>
                        <button onClick={() => setSearchInput("")} >
                            All
                        </button>


                        {listOfSpecialization.slice(0, 4).map((item, index) => (
                            <button key={index} onClick={() => setSearchInput(item)} >
                                {item}
                            </button>

                        ))}


                    </ul>
                </div>

                <div className=' w-full  bg-gray-300 h-5/6 rounded-b-[10px] flex  mt-2 overflow-y-auto bg-gray-100 p-2'>
                    <div className='gap-2 grid md:grid-cols-5 grid-cols-2 mx-auto'>
                        {filteredDoctors.map((profile, index) => (

                            <AdminDoctors child={profile} key={index} blockuser={blockuser} refetch={refetch} />

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
                                                    className={`form-input border mb-2 w-full py-3 px-6 text-sm rounded-md  `}
                                                    placeholder="Full Name"
                                                    name="full_name"
                                                    value={formData?.user?.full_name}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, full_name: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md`}
                                                    placeholder="Email"
                                                    name="email"
                                                    value={formData?.user?.email}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, email: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="date"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md`}
                                                    placeholder="DOB"
                                                    name="date_of_birth"
                                                    value={formData?.user?.date_of_birth}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, date_of_birth: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Gender"
                                                    name="gender"
                                                    value={formData?.user?.gender}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, gender: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Mobile"
                                                    name="phone"
                                                    value={formData?.user?.phone}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, phone: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Specialization"
                                                    name="specialization"
                                                    value={formData?.specialization}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Street Address"
                                                    name="street_address"
                                                    value={formData?.address?.street_address}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, street_address: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="City"
                                                    name="city"
                                                    value={formData?.address?.city}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, city: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="State"
                                                    name="state"
                                                    value={formData?.address?.state}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, state: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Country"
                                                    name="country"
                                                    value={formData?.address?.country}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, country: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='grid grid-cols-2 gap-2 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Pin Code"
                                                    name="zip_code"
                                                    value={formData?.address?.zip_code}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, address: { ...prevUserData.address, zip_code: e.target.value } }))}
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="Password"
                                                    name="password"
                                                    value={formData?.user?.password}
                                                    onChange={(e) => setFormData((prevUserData) => ({ ...prevUserData, user: { ...prevUserData.user, password: e.target.value } }))}
                                                />
                                            </div>
                                        </div>
                                        <div className='flex items-center justify-center gap-3 my-2 px-12 '>
                                            <div>
                                                <input
                                                    type="text"
                                                    className={`form-input mb-2 w-full py-3 px-6 text-sm border rounded-md `}
                                                    placeholder="license number"
                                                    name="license_number"
                                                    value={formData?.license_number}
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


