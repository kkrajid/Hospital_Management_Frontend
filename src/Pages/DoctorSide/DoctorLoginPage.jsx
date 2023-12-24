import { Link, useNavigate, Navigate } from "react-router-dom";
import { DoctorloginRequest } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../Store/auth";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useSelector } from 'react-redux';

function DoctorLoginPage() {
  const containerStyle = {
    backgroundColor: '#2C3E50',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainerStyle = {
    backgroundColor: '#34495E',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    width: '90%',
    color: '#ECF0F1',
  };

  const inputStyle = {
    marginBottom: '16px',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #3498DB',
    outline: 'none',
    color: 'black',
  };

  const logoStyle = {
    width: '150px',
    margin: '0 auto',
    display: 'block',
  };

  const navigate = useNavigate();
  const { isAuth } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const DoctorloginMutation = useMutation({
    mutationFn: () => DoctorloginRequest(formData),
    onSuccess: (response) => {
      setToken(response.data.token);
      toast.success(
        <div>
          Login Successful!
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
      navigate("/doctor");
    },
    onError: (error) => {
      const firstErrorMessage = error.response.data.message;
      console.log(error);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    DoctorloginMutation.mutate();
  };

  if (DoctorloginMutation.isLoading) {
    return <LoadingSpinner />;
  }
  if (isAuth) return <Navigate to="/" />;
  return (
    <div style={containerStyle}>
      <form style={formContainerStyle} onSubmit={handleSubmit}>
        <div className="mb-4 text-center">
          {/* <img src="images/1.png" alt="Hospital Logo" style={logoStyle} /> */}
        </div>
        <h2 className="text-2xl font-semibold text-center text-[#1AACAC] mb-4">Doctor Login</h2>
        <p className="text-center text-gray-300 mb-6">Welcome back, Doctor! Please sign in to access your account.</p>
        <div className="mb-4">
          <input
            type="text"
            style={inputStyle}
            placeholder="Email Address"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            style={inputStyle}
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="formCheck" className="text-secondary text-sm">
            {/* <input
              type="checkbox"
              className="form-checkbox"
              id="formCheck"
            />
            <span className="ml-1 text-gray-600">Remember Me</span> */}
          </label>
          <div className="forgot">
            <small>
              {/* <a href="#" className="text-orange-600">Forgot Password?</a> */}
            </small>
          </div>
        </div>
        <button className="bg-[#1AACAC] text-white w-full py-3 text-sm rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-400">
          Login
        </button>
      </form>
    </div>
  );
}

export default DoctorLoginPage;
