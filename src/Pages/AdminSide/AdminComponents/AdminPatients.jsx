import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function AdminPatients() {
  return (
    <div className='w-full h-full bg-[#E1E2E6] p-1 rounded-r-[10px]'>
      <div className='w-full h-full bg-gray-100 rounded-[10px] shadow-lg'>
        <div className='w-full h-1/6 bg-[#EEEFF0] rounded-t-[10px] flex items-center px-1'>
          <div className='w-full flex items-center px-2 px-5'>
            <div className='w-3/5 bg-white py-1 px-4 rounded-[22px] flex gap-2 items-center'>
              <FontAwesomeIcon icon={faSearch} className='text-blue-500 text-xl' />
              <input type="text" placeholder='Search patients...' className='w-full py-2 px-4 rounded-[18px] outline-none' />
            </div>
          </div>
        </div>
        <div className='w-full h-2/6 bg-[#EEEFF0]  p-2'>
          <div className='w-full h-1/6 px-3  text-xl font-semibold'>
            <p>dgd</p>
          </div>
          <div className='w-full h-5/6   flex p-1 py-4 gap-3'>
            <div className='w-1/5 h-full bg-white shadow-lg rounded-[10px]'>

            </div>
            <div className='w-1/5 h-full bg-white shadow-lg rounded-[10px]'>

            </div>
            <div className='w-1/5 h-full bg-white shadow-lg rounded-[10px]'>

            </div>
            <div className='w-1/5 h-full bg-white shadow-lg rounded-[10px]'>

            </div>
            <div className='w-1/5 h-full bg-white shadow-lg rounded-[10px]'>

            </div>
          </div>
        </div>
        <div className='w-full h-2/4 bg-[#EEEFF0] rounded-b-[10px] p-1'>
          <div className='w-full h-full'>
            <div className='w-full h-1/6 '>
              <ul className='w-full h-full bg-white flex gap-1'>
                <li className='h-full w-1/12 shadow-lg  flex items-center justify-center'>
                  <label class="inline-flex items-center">
                    <input type="checkbox" class=" w-[15px] h-[15px] " />
                  </label>
                </li>
                <li className='h-full w-1/4 shadow-lg   flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  text-gray-600'>Patient Name</p>
                  </div>
                </li>
                <li className='h-full w-1/6 shadow-lg    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold text-gray-600'>Email</p>
                  </div>
                </li>
                <li className='h-full w-1/12 shadow-lg     flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  text-gray-600'>Gender</p>
                  </div>
                </li>
                <li className='h-full w-1/12 shadow-lg    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  text-gray-600'>Age</p>
                  </div>
                </li>
                <li className='h-full w-1/6 shadow-lg   flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  text-gray-600'>Last Visit</p>
                  </div>
                </li>
                <li className='h-full w-1/12 shadow-lg    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  text-gray-600'>Status</p>
                  </div>
                </li>
                <li className='h-full w-1/12 shadow-lg   flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold   text-gray-600'>Actions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className='w-full  mt-1 pt-1 h-5/6 flex flex-col gap-1'>
              <div className='w-full h-1/4 shadow-lg '>
                <ul className='w-full h-full bg-white flex gap-1 text-gray-600 hover:bg-blue-500 hover:text-white'>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                  <label class="inline-flex items-center">
                    <input type="checkbox" class=" w-[15px] h-[15px] " />
                  </label>
                  </li>
                  <li className='h-full w-1/4    flex items-center gap-4 px-3'>
                    <div>
                      <img src="https://th.bing.com/th/id/OIP.1rg0qdyQCRFVXcRB5ViEOAHaE8?pid=ImgDet&rs=1" className='w-10 h-10 rounded-[10px]' alt="" />
                    </div>
                    <div className=''>
                      <p className='  text-sm'>Shivani Anilkumar</p>
                    </div>
                  </li>
                  <li className='h-full w-1/6    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>shivani@gmail.com</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className=' text-sm'>Female</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>23</p>
                    </div>
                  </li>
                  <li className='h-full w-1/6   flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>2023-10-23</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>Status</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12   flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>Actions</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className='w-full h-1/4 shadow-lg  '>
                <ul className='w-full h-full bg-white flex gap-1 hover:bg-blue-500 text-gray-600 hover:text-white'>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                  <label class="inline-flex items-center">
                    <input type="checkbox" class=" w-[15px] h-[15px] " />
                  </label>
                  </li>
                  <li className='h-full w-1/4    flex items-center gap-4 px-3'>
                    <div>
                      <img src="https://th.bing.com/th/id/OIP.1rg0qdyQCRFVXcRB5ViEOAHaE8?pid=ImgDet&rs=1" className='w-10 h-10 rounded-[10px]' alt="" />
                    </div>
                    <div className=''>
                      <p className='  text-sm'>Shivani Anilkumar</p>
                    </div>
                  </li>
                  <li className='h-full w-1/6    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>shivani@gmail.com</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className=' text-sm'>Female</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>23</p>
                    </div>
                  </li>
                  <li className='h-full w-1/6   flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>2023-10-23</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12    flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>Status</p>
                    </div>
                  </li>
                  <li className='h-full w-1/12   flex items-center justify-center'>
                    <div className=''>
                      <p className='text-sm '>Actions</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminPatients