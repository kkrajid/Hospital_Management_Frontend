import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function AdminDoctorDetailView() {
  return (
    <div className='w-full h-full bg-red-400 '>
      <div className='w-full h-full flex flex-col '>
        <div className='w-full h-2/5 bg-green-300'>
          <div className='w-full h-full flex items-center justify-center  '>
            <div className='w-3/6 h-3/6 bg-blue-300 '>

            </div>
            <div className='w-3/6 h-3/6   bg-red-300 '>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDoctorDetailView