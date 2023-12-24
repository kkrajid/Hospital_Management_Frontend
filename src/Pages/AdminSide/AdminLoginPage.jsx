import { useNavigate, Navigate } from "react-router-dom";
import { AdminloginRequest } from "../../api/user";
import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthStore } from "../../Store/auth";
import LoadingSpinner from "../../Components/LoadingSpinner";


function AdminLoginPage() {
  const containerStyle = {
    backgroundColor: '#162447',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainerStyle = {
    backgroundColor: '#1f4068',
    borderRadius: '10px',
    boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.3)',
    padding: '30px',
    maxWidth: '400px',
    width: '90%',
    color: '#fff',
  };

  const logoStyle = {
    width: '150px',
    margin: '0 auto',
    display: 'block',
  };

  const buttonStyle = {
    backgroundColor: '#4caf50',
    color: '#fff',
    width: '100%',
    padding: '15px',
    fontSize: '16px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };


  const navigate = useNavigate();
  const { isAuth,role } = useAuthStore();
  const setToken = useAuthStore((state) => state.setToken);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleInputChange = (e) => {
    const { name, value} = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const AdminloginMutation = useMutation({
    mutationFn: () => AdminloginRequest(formData),
    onSuccess: (response) => {
      setToken(response.data.token);
      toast.success(
        <div>
          Login Successfull!
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
      navigate("/admin");
    },
    onError: (error) => {
      const firstErrorMessage = error.response.data.message
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
    AdminloginMutation.mutate();
  };

  if (AdminloginMutation.isLoading) {
    return <LoadingSpinner />;
  }
  if (isAuth) return <Navigate to="/admin" />;

  return (
    <div style={containerStyle}>
    <form style={formContainerStyle} onSubmit={handleSubmit}>
      <div className="mb-4 text-center">
        {/* Include your logo here if needed */}
        {/* <img src="images/hospital_logo.png" alt="Hospital Logo" style={logoStyle} /> */}
      </div>
      <h2 className="text-2xl font-semibold text-center text-green-400 mb-4">Hospital Admin Login</h2>
      <p className="text-center text-gray-300 mb-6">Welcome back, Hospital Admin! Please sign in to access your account.</p>
      <div className="mb-4">
        <input
          type="text"
          className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Email Address"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4">
        <input
          type="password"
          className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div className="forgot">
          <small>
            {/* Include a "Forgot Password" link if needed */}
            {/* <a href="#" className="text-green-400">Forgot Password?</a> */}
          </small>
        </div>
      </div>
      <button style={buttonStyle}>Login</button>
    </form>
  </div>
  );
}

export default AdminLoginPage;
