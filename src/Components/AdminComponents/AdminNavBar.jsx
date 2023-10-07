import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import avatar from '../../assets/avatar.png'

function AdminNavBar() {
  // Placeholder values for avatar and name
  // const avatar = 'placeholder_avatar_url'; // Replace with the actual avatar URL
  const name = 'Admin'; // Replace with the actual admin's name
  // bg-[#1C45EF] 
  return (
    <div className="px-4 py-2 flex items-center justify-between shadow-lg bg-blue-500 bg-opacity-50" style={{ zIndex: 1 }}>

      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-1xl uppercase font-bold md:ml-5 '>Hospital</h1>
      </div>
      <div className="flex items-center">
        <div className="mr-4">
          <FontAwesomeIcon icon={faBell} className="text-white" size="lg" />
        </div>
        <div className="flex items-center">
          <img src={avatar} alt="Admin Avatar" className="w-10 h-10 rounded-full " />
        </div>

        <span className="text-white text-lg">{name}</span>
      </div>
    </div>
  );
}

export default AdminNavBar;
