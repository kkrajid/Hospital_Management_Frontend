import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import dashboardIcon from '../../assets/dashboard.png';
import doctorIcon from '../../assets/medical-team.png';
import PatientIcon from '../../assets/examination.png';
import ICUPatientIcon from '../../assets/hospitalization.png';
import SettingsIcon from '../../assets/settings.png';
import LogoutIcon from '../../assets/power-off.png';
function AdminSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-[#1C45EF] ${isSidebarOpen ? 'w-1/2 md:w-1/3 lg:w-1/5' : 'w-16'
          } flex flex-col h-screen py-5 transition-all duration-300`}
      >
        <div className="flex items-center justify-between px-4">
          <button onClick={toggleSidebar} className="text-white" aria-label="Toggle Sidebar">
            <FontAwesomeIcon icon={faBars} size="lg" />
          </button>

        </div>

        {!isSidebarOpen && (
          <div className="mt-4 ">
            {/* <h1 className="text-white ml-2 text-2xl flex justify-center mb-3 ">Hospital Dashboard</h1> */}
            <ul className="text-white">

              <li className="py-2 px-4 my-5 cursor-pointer hover:bg-blue-600">  <img
                src={dashboardIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
              <li className="py-2 px-4 mb-6 cursor-pointer hover:bg-blue-600"> <img
                src={doctorIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
              <li className="py-2 px-4 mb-6 cursor-pointer hover:bg-blue-600"> <img
                src={PatientIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
              <li className="py-2 px-4 mb-6 cursor-pointer hover:bg-blue-600"> <img
                src={ICUPatientIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
              <li className="py-2 px-4 mb-6 cursor-pointer hover:bg-blue-600"> <img
                src={SettingsIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
              <li className="py-2 px-4 mb-6 cursor-pointer hover:bg-blue-600"> <img
                src={LogoutIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
              </li>
            </ul>
          </div>
        )}
        {isSidebarOpen && (
          <div className="mt-4">
            {/* <h1 className="text-white ml-2 text-2xl flex justify-center mb-3 ">Hospital Dashboard</h1> */}
            <ul className="text-white">

              <li className="py-2 px-4 my-5 cursor-pointer hover:bg-blue-600 flex"> <img
                src={dashboardIcon}
                alt="Dashboard Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                Dashboard</li>

              <li className="py-2 px-4 my-5 cursor-pointer hover:bg-blue-600 flex"> <img
                src={doctorIcon}
                alt="Doctors Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                Doctors</li>

              <li className="py-2 px-4 my-6 cursor-pointer hover:bg-blue-600 flex"> <img
                src={PatientIcon}
                alt="Patients Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                Patients</li>

              <li className="py-2 px-4 my-6 cursor-pointer hover:bg-blue-600 flex"> <img
                src={ICUPatientIcon}
                alt="ICU Patients Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                ICU</li>


              <li className="py-2 px-4 my-6 cursor-pointer hover:bg-blue-600 flex"> <img
                src={SettingsIcon}
                alt="Settings Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                Settings</li>

              <li className="py-2 px-4 my-6 cursor-pointer hover:bg-blue-600 flex"> <img
                src={LogoutIcon}
                alt="Settings Icon"
                className="mr-2 h-6 w-6 filter brightness-0 invert" // Add filter styles
              />
                Logout</li>


            </ul>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-grow p-4">
        {/* Add your main content here */}
      </div>
    </div>
  );
}

export default AdminSidebar;
