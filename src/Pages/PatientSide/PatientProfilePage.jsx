import React from 'react';

function PatientProfilePage() {
  // Replace the following sample data with actual patient information
  const patientInfo = {
    fullName: 'John Doe',
    emailAddress: 'johndoe@example.com',
    dateOfBirth: '01/15/1990',
    address: '123 Main St, City, State',
    phoneNumber: '123-456-7890',
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="box-area w-100 p-6 bg-white rounded-lg shadow-md">
        <div className="md:w-1/2 p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">Patient Profile</h2>
          </div>
          <div className="mb-2">
            <strong>Full Name:</strong> {patientInfo.fullName}
          </div>
          <div className="mb-2">
            <strong>Email Address:</strong> {patientInfo.emailAddress}
          </div>
          <div className="mb-2">
            <strong>Date of Birth:</strong> {patientInfo.dateOfBirth}
          </div>
          <div className="mb-2">
            <strong>Address:</strong> {patientInfo.address}
          </div>
          <div className="mb-2">
            <strong>Phone Number:</strong> {patientInfo.phoneNumber}
          </div>
          <button className="bg-blue-500 text-white w-full py-3 text-sm">
            Edit Profile
          </button>
          <div className="mt-2">
            <small>
              <a href="#">Change Password</a>
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientProfilePage;
