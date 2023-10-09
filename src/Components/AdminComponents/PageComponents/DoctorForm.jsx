import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast'; 
import LoadingSpinner from "../../LoadingSpinner";
import { useMutation } from "@tanstack/react-query";
import { admin_add_new_doctor } from "../../../api/user";
import { useAuthStore } from "../../../Store/auth";
import {useSelector,useDispatch } from 'react-redux'
import { selectDashboard } from '../../../Redux/Actions/selectDashboardActions'
function DoctorForm() {
  const dispatch = useDispatch()
  const [doctor, setDoctor] = useState({
    full_name: '',
    gender: '',
    date_of_birth: '',
    speciality: '',
    email: '',
    phone: '',
    license_number: '',
    password: "",
    role: "Doctor"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const admin_add_new_doctorMutations = useMutation(
    (data) => admin_add_new_doctor(data), // Pass the doctor object as an argument
    {
      onSuccess: (response) => {
        dispatch(selectDashboard("Doctors"))
        console.log(response);
        toast.success(
          <div>
            <strong>Success:</strong> Doctor added successfully
          </div>,
          {
            position: "top-center",
            duration: 5000,
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
        const firstErrorKey = Object.keys(error.response.data)[0];
        const firstErrorMessage = error.response.data[firstErrorKey];

        toast.error(
          <div>
            {firstErrorMessage}
          </div>,
          {
            position: "top-center",
            duration: 5000,
            style: {
              backgroundColor: "#ff4d4f",
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
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!doctor.full_name || !doctor.email || !doctor.phone) {
      toast.error('Please fill out all required fields.', {
        position: 'top-center',
        duration: 5000,
      });
      return;
    }

    // Additional validation logic for specific fields can be added here
    if (!isValidPhoneNumber(doctor.phone)) {
      toast.error('Please enter a valid phone number.', {
        position: 'top-center',
        duration: 5000,
      });
      return;
    }

    admin_add_new_doctorMutations.mutate(doctor); 
  };

  if (admin_add_new_doctorMutations.isLoading) {
    return <LoadingSpinner />;
  }

 
  const isValidPhoneNumber = (phone) => {
    const phoneNumberRegex = /^[0-9]{10}$/;
    return phoneNumberRegex.test(phone);
  };


  return (
    <div className="container-flex mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <h2 className="text-2xl font-semibold uppercase py-4 rounded shadow items-center  text-center">
            Add a Doctor
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="md:flex md:space-x-4">
            <div className="md:flex-grow">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Doctor's Name
              </label>
              <input
                type="text"
                id="name"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Doctor's Name"
                name="full_name"
                value={doctor.full_name}
                onChange={handleChange}
              />
            </div>
            <div className="md:flex-grow">
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Gender
              </label>
              <input
                type="text"
                id="gender"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Gender"
                name="gender"
                value={doctor.gender}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:flex-grow">
              <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
                speciality
              </label>
              <input
                type="text"
                id="specialty"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="speciality"
                name="speciality"
                value={doctor.speciality}
                onChange={handleChange}
              />
            </div>
            <div className="md:flex-grow">
              <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                id="dateOfBirth"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Date of Birth"
                name="date_of_birth"
                value={doctor.date_of_birth}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:flex-grow">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Email Address"
                name="email"
                value={doctor.email}
                onChange={handleChange}
              />
            </div>
            <div className="md:flex-grow">
              <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Phone Number"
                name="phone"
                value={doctor.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="md:flex md:space-x-4">
            <div className="md:flex-grow">
              <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
                License Number
              </label>
              <input
                type="text"
                id="licenseNumber"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="License Number"
                name="license_number"
                value={doctor.license_number}
                onChange={handleChange}
              />
            </div>
            <div className="md:flex-grow">
              <label htmlFor="Password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-input py-3 px-4 text-sm rounded-md shadow-sm w-full"
                placeholder="Password"
                name="password"
                value={doctor.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="">
            <button
              className="bg-blue-500 hover:bg-blue-700 active:bg-blue-900 text-white py-2 px-4 text-sm rounded-md shadow-md"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorForm;
