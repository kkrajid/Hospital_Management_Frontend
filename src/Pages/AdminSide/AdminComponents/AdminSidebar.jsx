import React from 'react'
import { useAuthStore } from '../../../Store/auth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link} from "react-router-dom";
import { faChartLine, faUserMd, faUsers,faSignOutAlt,faCog } from '@fortawesome/free-solid-svg-icons';
function AdminSidebar({child}) {
  return (
    <div className=' max-w-[1480px] w-full  m-auto h-screen '>
    <div className=' w-full h-full p-3 bg-[#E2E8F8] '>
      <div className='flex flex-row h-full'>
        <div className='w-2/12 bg-[#3581F5] h-full shadow-lg rounded-l-[1.5rem]'>
          <div className='w-full h-full'>
            <div className='flex flex-col  items-center h-full '>
              <div className='my-[2rem]'>
                <p className='text-2xl text-white font-mono font-semibold'>eHospital</p>
              </div>
              <div className='flex flex-col items-center h-full my-1'>
                <ul className='grid grid-cols-1 gap-8'>
                  <Link className='text-white flex items-center gap-5 p-3 px-10 hover:bg-white hover:text-black hover:rounded-[.6rem] active:bg-blue-600  active:text-white' to={`/admin`} >
                    <FontAwesomeIcon icon={faChartLine} />
                    <p>Dashboad</p>
                  </Link>
                  <Link className='text-white flex items-center gap-6 p-3 px-10 hover:bg-white hover:text-black hover:rounded-[.6rem] active:bg-blue-600  active:text-white' to={`/admin/doctors`}>
                    <FontAwesomeIcon icon={faUserMd} />
                    <p>Doctors</p>
                  </Link>
                  <Link className='text-white flex items-center gap-4 p-3 px-10 hover:bg-white hover:text-black hover:rounded-[.6rem] active:bg-blue-600  active:text-white' to={`/admin/patients`}>
                    <FontAwesomeIcon icon={faUsers} />
                    <p>Patients</p>
                  </Link>
                  <Link className='text-white flex items-center gap-4 p-3 px-10 hover:bg-white hover:text-black hover:rounded-[.6rem] active:bg-blue-600  active:text-white' to={`/admin/settings`}>
                    <FontAwesomeIcon icon={faCog } />
                    <p>Settings</p>
                  </Link>

                </ul>
              </div>
              <div className='my-[3rem]'>
                <button className='flex items-center gap-5  text-white p-3 px-12 hover:bg-white hover:text-black hover:rounded-[.6rem] active:bg-blue-600  active:text-white' onClick={()=>useAuthStore.getState().logout()}>
                  <FontAwesomeIcon icon={faSignOutAlt} />
                  <p>Logout</p>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-10/12 bg-white  h-full rounded-r-[1.5rem] shadow-lg'>
          {child}
        </div>
      </div>
    </div>
  </div>
  )
}

export default AdminSidebar