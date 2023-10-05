import React from 'react';

function NotFound() {
  return (
    <div className="bg-blue-300 min-h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-md p-20 max-w-md w-full">
        <img src={"https://image.freepik.com/free-vector/no-data-concept-illustration_114360-626.jpg"} className='w-md flex justify-center' alt="" />
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-4">
          404 - Not Found
        </h2>
        <p className="text-center text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
