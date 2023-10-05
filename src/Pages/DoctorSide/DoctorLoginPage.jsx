import React from 'react';

function DoctorLoginPage() {
  const containerStyle = {
    backgroundColor: '#F3F4F6',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const formContainerStyle = {
    backgroundColor: '#FFFFFF',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    maxWidth: '400px',
    width: '90%',
  };

  const logoStyle = {
    width: '150px',
    margin: '0 auto',
    display: 'block',
  };

  return (
    <div style={containerStyle}>
      <div style={formContainerStyle}>
        <div className="mb-4 text-center">
          <img src="images/1.png" alt="Hospital Logo" style={logoStyle} />
        </div>
        <h2 className="text-2xl font-semibold text-center text-indigo-600 mb-4">Doctor Login</h2>
        <p className="text-center text-gray-600 mb-6">Welcome back, Doctor! Please sign in to access your account.</p>
        <div className="mb-4">
          <input
            type="text"
            className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Email Address"
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            className="form-input mb-2 w-full py-3 px-4 text-sm bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Password"
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label htmlFor="formCheck" className="text-secondary text-sm">
            <input
              type="checkbox"
              className="form-checkbox"
              id="formCheck"
            />
            <span className="ml-1 text-gray-600">Remember Me</span>
          </label>
          <div className="forgot">
            <small>
              <a href="#" className="text-indigo-600">Forgot Password?</a>
            </small>
          </div>
        </div>
        <button className="bg-indigo-600 text-white w-full py-3 text-sm rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400">
          Login
        </button>
      </div>
    </div>
  );
}

export default DoctorLoginPage;
