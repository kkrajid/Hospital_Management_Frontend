import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTachometerAlt, faUserMd, faUsers, faBed, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { selectDashboard } from '../../Redux/Actions/selectDashboardActions';
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuthStore } from "../../Store/auth";

function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [hoveredItemIndex, setHoveredItemIndex] = useState(-1);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const filed_type = useSelector(state => state.adminDashboardSelectionButton.filed_type);
  console.log(filed_type);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const sidebarItems = [
    { icon: faTachometerAlt, label: 'Dashboard', path: '/admin' },
    { icon: faUserMd, label: 'Doctors', path: '/admin/doctors' },
    { icon: faUsers, label: 'Patients', path: '/admin/patients' },
    { icon: faBed, label: 'ICU', path: '/admin/icu' },
    { icon: faCog, label: 'Settings', path: '/admin/settings' },
  ];


  return (
    <div className={`flex fixed left-0 top-0 bottom-0 mt-0 ${isSidebarOpen ? 'w-1/3' : 'w-16'}`}>
      {/* Sidebar */}
      <div className={`bg-[#4338CA] flex flex-col h-screen py-5 transition-all duration-300`}>
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
                className={`py-2 px-4 my-8 cursor-pointer flex items-center ${isSidebarOpen ? '' : 'justify-center'
                  } ${index === hoveredItemIndex && isSidebarOpen ? 'bg-white text-[#129FBD]' : ''
                  }`}
                onMouseEnter={() => setHoveredItemIndex(index)}
                onMouseLeave={() => setHoveredItemIndex(-1)}
              >
                <Link to={item.path} className="flex items-center">
                  <FontAwesomeIcon icon={item.icon} size="lg" className="mr-2" />
                  {isSidebarOpen && (
                    <span className="transition-all duration-300">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
            <li
              className={`py-2 px-4 my-8 cursor-pointer flex items-center ${isSidebarOpen ? '' : 'justify-center'} ${isSidebarOpen ? 'bg-white text-[#129FBD]' : ''}`}
            >
              <button onClick={() => useAuthStore.getState().logout()} className="flex items-center">
                <FontAwesomeIcon icon={faSignOutAlt} size="lg" className="mr-2" />
                {isSidebarOpen && (
                  <span className="transition-all duration-300">
                    Logout
                  </span>
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4"></div>
    </div>
  );
}

export default AdminSidebar;
