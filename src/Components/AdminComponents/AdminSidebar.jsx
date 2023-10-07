import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTachometerAlt, faUserMd, faUsers, faBed, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(-1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    { icon: faTachometerAlt, label: 'Dashboard' },
    { icon: faUserMd, label: 'Doctors' },
    { icon: faUsers, label: 'Patients' },
    { icon: faBed, label: 'ICU' },
    { icon: faCog, label: 'Settings' },
    { icon: faSignOutAlt, label: 'Logout' },
  ];

  return (
    <div className={`flex absolute mt-0 ${isSidebarOpen ? 'w-1/3' : 'w-16'}`} style={{ zIndex: 2 }}>
      {/* Sidebar */}
      <div className={`bg-[#129FBD] flex flex-col h-screen py-5 transition-all duration-300`}>
        <div className="flex items-center justify-between px-4">
          <button onClick={toggleSidebar} className="text-white" aria-label="Toggle Sidebar">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>
        </div>

        <div className="mt-4">
          <ul className="text-white">
            {sidebarItems.map((item, index) => (
              <li
                key={index}
                className={`py-2 px-4 my-8 cursor-pointer flex items-center ${
                  isSidebarOpen ? '' : 'justify-center' // Center align items when sidebar is closed
                } ${
                  index === hoveredItemIndex && isSidebarOpen ? 'bg-white text-[#129FBD]' : '' // Apply hover effect
                }`}
                onMouseEnter={() => setHoveredItemIndex(index)} // Handle hover
                onMouseLeave={() => setHoveredItemIndex(-1)} // Remove hover effect
                onClick={() => {
                  
                }}
              >
                <FontAwesomeIcon icon={item.icon} size="lg" className="mr-2" />
                {isSidebarOpen && (
                  <span className="transition-all duration-300">
                    {item.label}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
       
      </div>
    </div>
  );
}

export default AdminSidebar;
