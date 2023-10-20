import React from 'react'

function PatientHome() {
    return (
        <>
            <div className='mx-4 mb-0 bg-gradient-to-r from-blue-400 to-green-100 h full p-9 rounded-[10px]  '>
                <div className="flex flex-row justify-between items-center ">
                    <img
                        src="https://carlbettosi.com/assets/img/prof_pic.jpg"
                        className="h-[140px] w-[130px] rounded-[10px] border-white border-[3px] shadow-lg"
                        alt=""
                    />
                    <div className="flex flex-row  font-semibold gap-3">
                        <p className='text-white bg-green-500 flex justify-center items-center rounded-[10px] p-2 font-semibold uppercase '>Active</p>
                        <p className='text-white bg-blue-500 flex justify-center items-center rounded-[10px] p-2 font-semibold uppercase '>EDIT</p>
                    </div>
                </div>
            </div>
            <div className='flex md:flex-row flex-col w-full p-3'>
                <div className='flex md:flex-row flex-col  w-full pt-4 px-2 '>
                    <div className='  mt-[10px]  w-full p-1 mb-2 shadow '>
                        <div className='flex flex-col gap-2 mt-3'>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Name :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        Rajid K K
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        DOB :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        16/07/1997
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Age :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        26
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Email :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        rajidkk34@gmail.com
                                    </h1>
                                </div>
                            </div>
                            
                            
                        </div>
                    </div>
                    <div className='rounded-[5px]  mt-[10px]  w-full  p-1 mb-2 shadow '>
                        <div className='flex flex-col gap-2 mt-3'>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Adress :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                       address
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Pin Code :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        670650
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Blood Group :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        A+
                                    </h1>
                                </div>
                            </div>
                            <div className='flex flex-row gap-2'>
                                <div className='shadow p-3 flex justify-center w-1/3  items-center bg-white'>
                                    <h1 className='text-gray-500'>
                                        Mobile :
                                    </h1>
                                </div>
                                <div className='shadow p-3 flex justify-center items-center bg-white w-full'>
                                    <h1 className='text-gray-500'>
                                        +917593808546
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PatientHome