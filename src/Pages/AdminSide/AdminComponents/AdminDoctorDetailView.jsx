import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';

function AdminDoctorDetailView() {
  return (
    // <div className='w-full h-full p-2'>
    //   <div className="w-full h-full flex p-4">
    //     <div className="w-2/6 h-full ">
    //       <div className="w-full h-3/6  p-4">
    //         <div className='w-full h-full flex flex-col  items-center justify-center '>
    //           <div className='w-full h-4/6 text-center bg-white'>
    //             <div className='w-full h-4/6 '>
    //               <div className='w-full h-full bg-white flex items-center justify-center '>
    //                 <img src="https://th.bing.com/th/id/OIP.1rg0qdyQCRFVXcRB5ViEOAHaE8?pid=ImgDet&rs=1" className='w-[30%] h-[64%] shadow-lg border-2 border-gray-200 rounded-[20%]' alt="" />
    //               </div>
    //             </div>
    //             <div className='w-full h-1/6  text-center '>
    //               name
    //             </div>
    //             <div className='w-full h-1/6  text-center '>
    //               specialization
    //             </div>
    //           </div>
    //           <div className='w-full h-2/6 text-center flex gap-2 py-2 '>
    //             <div className='w-3/6 h-3/6 bg-[#44BC8E] flex items-center justify-center rounded-[10px] '>
    //               <FontAwesomeIcon icon={faPenToSquare} />
    //             </div>
    //             <div className='w-3/6 h-3/6 bg-red-300 flex items-center justify-center rounded-[10px]  '>
    //               <FontAwesomeIcon icon={faLock} />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="w-4/6 h-full bg-green-300">
    //       <div className="w-full h-3/6 bg-red-300">

    //       </div>
    //     </div>
    //   </div>
    // </div>4
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