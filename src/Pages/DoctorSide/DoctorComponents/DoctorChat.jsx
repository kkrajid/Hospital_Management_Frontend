import React from 'react'
import { faSearch, faAddressBook } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
function DoctorChat() {
    return (
        <div className='w-full h-full bg-gray-100  p-1 rounded-[10px]' >
            <div className='w-full h-full  rounded-[10px] flex '>
                <div className='h-full w-1/5 '>
                    <div className='h-full w-full '>
                        <div className='w-full  h-1/6 flex flex-col'>
                            <div className='w-full h-2/4 flex items-center justify-center'>
                                <p className='text-2xl font-semibold '>Chat</p>
                            </div>
                            <div className='w-full h-2/4 p-1  rounded-[5px]'>
                                <div className='w-full h-full flex bg-white border rounded-[5px] items-center px-2 justify-center'>
                                    <input type="text" placeholder='Search' className='  outline-none ' />
                                    <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-5/6 p-1 border-2 rounded-[5px] flex flex-col gap-1'>
                            <div className='w-full h-[50px] bg-white border rounded-[5px]'>

                            </div>
                            <div className='w-full h-[50px] bg-white border rounded-[5px]'>

                            </div>
                            <div className='w-full h-[50px] bg-white border  rounded-[5px]'>

                            </div>
                            <div className='w-full h-[50px] bg-white border rounded-[5px]'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='h-full w-4/5 border-2 rounded-r-[5px]'>
                    <div className='w-full max-h-[60px] h-full bg-white shadow-lg border rounded-[5px]'>
                        <div className='w-full h-full flex justify-between items-center px-6'>
                            <div className='flex gap-4 items-center w-full'>
                                <img src="https://th.bing.com/th/id/OIP.JJxXAqkEgzy-r70pFyvJ1QHaE7?pid=ImgDet&rs=1" className='w-10 h-10 rounded-full' alt="" />
                                <p>Name</p>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                    <div className='w-full max-h-[400px] h-full bg-[#F3F4F6]'>

                    </div>
                    <div className='w-full  max-h-[65px] h-full p-2 rounded-[6px]'>
                        <div className='w-full h-full  flex border rounded-[6px]'>
                            <input type="text" className='w-5/6 outline-none py-1 px-3 bg-[#F3F4F6]' placeholder='Enter text' />
                            <button className='w-1/6 h-full flex items-center justify-center p-1 bg-blue-400 text-white active:bg-blue-600 rounded-r-lg'>Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DoctorChat