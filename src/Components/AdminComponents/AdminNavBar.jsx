import React from 'react';
import adminImage from '../../assets/user-gear.png'; // Replace with the actual path to your admin image
import notificationIcon from '../../assets/notification.png'; // Replace with the actual path to your notification icon

function AdminNavBar() {
  return (
    <div className='h-[50px] border bg-[#000099]  shadow-lg flex items-center justify-between px-4'>
      <div className="hidden md:flex items-center space-x-4 mr-2 ml-auto"> 
        <img src={notificationIcon} alt="Notifications" className="w-6 h-6 cursor-pointer" />
      </div>
      <div className="hidden md:flex items-center space-x-4">
        <img src={adminImage} alt="Admin" className="w-8 h-8 rounded-full" />
        <span className="">Admin Name</span>
      </div>
    </div>
  );
}

export default AdminNavBar;
