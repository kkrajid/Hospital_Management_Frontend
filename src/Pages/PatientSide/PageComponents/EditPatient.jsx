import React, { useState } from 'react';

function EditPatient() {
  const [editedData, setEditedData] = useState("" || {});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleSave = () => {
    // Handle the save logic here, e.g., send editedData to the server
    console.log('Edited Data:', editedData);
  };

  return (
    <div className="mx-4 mb-0 bg-yellow-400 h-full p-9 rounded-[10px]">
      <div>
        <h1 className="text-2xl font-semibold mb-4">Edit Patient Information</h1>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <div className="w-1/3 bg-white shadow p-3 rounded-md">
              <h1 className="text-gray-500">Name:</h1>
            </div>
            <input
              type="text"
              name="name"
              value={editedData.name || ''}
              onChange={handleInputChange}
              className="w-full bg-white shadow p-3 rounded-md"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="w-1/3 bg-white shadow p-3 rounded-md">
              <h1 className="text-gray-500">DOB:</h1>
            </div>
            <input
              type="text"
              name="dob"
              value={editedData.dob || ''}
              onChange={handleInputChange}
              className="w-full bg-white shadow p-3 rounded-md"
            />
          </div>
          {/* Add similar blocks for other properties like Age, Email, etc. */}
        </div>
        <button
          onClick={handleSave}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default EditPatient;
