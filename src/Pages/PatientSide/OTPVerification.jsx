import React, { useState, useEffect } from 'react';
import {useDispatch,useSelector } from 'react-redux'
import {otpVerificationAction} from '../../Redux/Actions/otpVerificationAction'
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate} from "react-router-dom";
import { otpValidationRequest } from "../../api/user";
import LoadingSpinner from "../../Components/LoadingSpinner";


function OTPVerification() {
  const [otp, setOTP] = useState('');

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const user_id = useSelector(state => state.otpVerification.user_id);


  const requestData = {
    user_id: user_id,
    otp: otp,
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };




  const registerMutations = useMutation({
    mutationFn: () => otpValidationRequest(requestData),
    onSuccess: (response) => {
      toast.success(
        <div>
          <strong>Success:</strong> OTP Verification Successful
        </div>,
        {
          position: 'top-center',
          autoClose: 5000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#4CAF50', 
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            width: '100%',
            textAlign: 'center',
          },
        }
      );

      dispatch(otpVerificationAction(""))
      navigate("/login");
    },
    onError: (error) => {
     
      const firstErrorMessage = error.response.data.message;
      
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

  const handleVerifyOTP = () => {
    registerMutations.mutate()
  };


  useEffect(() => {
    if (!user_id) {
      navigate('/login');
    }
  }, [user_id, navigate]);

  if (registerMutations.isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-20 max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">
          OTP Verification
        </h2>
        <p className="text-center text-gray-600 mb-6">
          Enter the OTP sent to your email 
        </p>
        <input
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
          className="form-input mb-4 w-full py-3 px-4 text-sm bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={handleVerifyOTP}
          className="bg-indigo-600 text-white w-full py-3 text-sm rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400"
        >
          Verify
        </button>
      </div>
    </div>
  );
}

export default OTPVerification;
