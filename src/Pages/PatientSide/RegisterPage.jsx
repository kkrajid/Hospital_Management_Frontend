import { useNavigate, Link, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { registerRequest } from "../../api/user";
import { useDispatch } from 'react-redux'
import { otpVerificationAction } from '../../Redux/Actions/otpVerificationAction'
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useAuthStore } from "../../Store/auth";
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    password: "",
    phone: "",
    date_of_birth: "",
    address: " ",
    agreeToTerms: false,
    gender: "",
    role: "Patient"

  });

  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { isAuth } = useAuthStore();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const registerMutations = useMutation({
    mutationFn: () => registerRequest(formData),
    onSuccess: (response) => {
      toast.success(
        <div>
          <strong>Success:</strong> Verify User Account
          <br />
          <small>Redirecting to verification...</small>
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


      dispatch(otpVerificationAction(response.data.id))
      navigate("/patient/verification");

    },
    onError: (error) => {
      const firstErrorKey = Object.keys(error.response.data.errors)[0];
      const firstErrorMessage = error.response.data.errors[firstErrorKey];

      toast.error(
        <div>
          {firstErrorMessage}
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
  });


  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const nameRegex = /^[a-zA-Z\s]+$/;
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  const phoneRegex = /^(\d)(?!\1+$)\d{9}$/;

  // const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{2}$/;
  // const addressRegex = /\S+/;

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate name field
    if (!nameRegex.test(formData.full_name)) {
      toast.error("Invalid name format");
      return;
    }

    // Validate email field
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }

    // Validate password field
    if (!passwordRegex.test(formData.password)) {
      toast.error(
        "Password must contain at least 8 characters, one uppercase letter, and one number"
      );
      return;
    }

    // Validate date of birth field
    // if (!dateRegex.test(formData.date_of_birth)) {
    //   toast.error("Invalid date format (MM/DD/YYYY)");
    //   return;
    // }

    // Validate address field
    // if (!addressRegex.test(formData.address)) {
    //   toast.error("Address field cannot be empty");
    //   return;
    // }

    // Validate gender field
    if (!nameRegex.test(formData.gender)) {
      toast.error("Invalid gender format");
      return;
    }

    // Validate phone number field
    if (!phoneRegex.test(formData.phone)) {
      toast.error("Invalid phone number (must be 10 digits)");
      return;
    }

    // Validate checkbox for terms and conditions
    if (!formData.agreeToTerms) {
      toast.error("You must agree to the terms and conditions");
      return;
    }

    // If all validations pass, proceed with registration
    registerMutations.mutate();
  };

  useEffect(() => {
    return () => {
      registerMutations.reset();
      setFormData({
        email: "",
        full_name: "",
        password: "",
        phone: "",
        date_of_birth: "",
        address: "",
        agreeToTerms: false,
        gender: "",
        role: "Patient"
      });
    };
  }, []);

  if (registerMutations.isLoading) {
    return <LoadingSpinner />;
  }
  if (isAuth) return <Navigate to="/" />;
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-200 px-20">
      <div className="box-area w-100 p-6 bg-white rounded-lg shadow-xl">
        <div className="flex flex-col md:flex-row space-y-6 md:space-x-6">
          <div className="md:w-1/2 bg-[#4CAEC8] rounded-lg p-6">
            <div className="mb-3">
              {/* <img src="images/1.png" alt="Hospital Logo" className="w-48 mx-auto" /> */}
            </div>
          </div>

          <form className="md:w-1/2 p-6" onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">Patient Registration</h2>
              <p>Welcome to our hospital. Please provide your information below.</p>
            </div>
            <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Full Name"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}

            />
            <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <input
              type="date"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Date of Birth (MM/DD/YYYY)"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleInputChange}
              max={getCurrentDate()} // Set the max attribute dynamically
            />
            <select
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}

            /> */}
            <input
              type="text"
              className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-100"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <div className="flex justify-between items-center mb-5">
              <label htmlFor="formCheck" className="text-secondary text-sm">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  id="formCheck"
                  name="agreeToTerms"
                  value={formData.agreeToTerms}
                  onChange={handleInputChange}

                />
                <span className="ml-1">I agree to the hospital's terms and conditions</span>
              </label>
            </div>
            <button
              className={`bg-[#4CAEC8] hover:bg-[#4CAEC8] active:bg-[#4CAEC8] text-white w-full py-3 text-sm ${formData.agreeToTerms ? '' : 'opacity-50 cursor-not-allowed'
                }`}
              disabled={!formData.agreeToTerms}
            >Register</button>
            <div className="mt-2">
              <small>Already a patient? <Link to={'/login'}>Log In</Link></small>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
