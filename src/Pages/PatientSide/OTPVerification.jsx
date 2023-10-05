import React, { useState } from 'react';
import { toast } from 'react-toastify';

function OTPVerification() {
  const [otp, setOTP] = useState('');
  const [verificationSuccess, setVerificationSuccess] = useState(false);

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleVerifyOTP = () => {
    if (otp === '123456') {
      setVerificationSuccess(true);
      toast.success('OTP Verified Successfully');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

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
        {verificationSuccess && (
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-green-600">
              Verification Successful
            </h2>
            <p>Congratulations! You have been verified.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default OTPVerification;
