import React from 'react'
import sampleLandImage from '../assets/sampleLandImage.png'
function Sample() {
  return (
    <div className="bg-gray-500 h-screen md:w-full md:px-9">
        <div className='w-full h-full bg-white md:flex items-center justify-center '>
            <div className='md:w-3/6 w-full h-full flex flex-col justify-center bg-red-300 '>
                <div className='w-full border-2 h-3/6 px-7'>
                   <div >
                   <h1 className='md:text-9xl text-8xl font-bold text-[#1C1C1C]'>
                        Medical
                    </h1>
                    <h1 className='md:text-9xl text-8xl font-bold text-[#1C1C1C]' >
                        Healthcare
                    </h1>
                    <h1 className='md:text-9xl text-8xl font-bold text-[#1C1C1C] '>
                        Solutions
                    </h1>
                   </div>
                </div>
                <div className='w-full h-1/6 border-2 px-7 flex items-center justify-center '>
                   <p className='text-4xl font-semibold text-[#848181]'> Health is the condition of wisdom and the sign is cheerfulness</p>
                </div>
                <div className='w-full  h-1/6 border-2 flex gap-2 items-center '>
                    <div className='w-[60%] h-5/6 bg-black rounded-[60px] flex items-center justify-center '>
                        <h1 className='text-white text-3xl font-semibold'>BOOK AN APPOINTMENTS</h1>
                    </div>
                    <div className='w-1/6 h-4/6 bg-white flex items-center justify-center'>
                      <h1 className='text-2xl text-blue-600 font-bold'>  JOIN</h1>
                    </div>
                </div>
                <div className='w-full h-1/6 border-2'>

                </div>

            </div>
            <div className='md:w-3/6 w-full h-full  flex items-center justify-center'>
                <img src={sampleLandImage} alt="" className='w-[75%]' />
            </div>
        </div>
    </div>
  )
}

export default Sample