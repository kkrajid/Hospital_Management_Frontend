import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { user_refund_amount_api } from "../../../api/user";
function PatientWallet() {

    const { data, isLoading, error } = useQuery(['user_refund_amount_api'],user_refund_amount_api);
    console.log(data);
    return (
        <div className='w-full h-full bg-gray-800'>
            <div className='w-full h-1/6 p-1'>
                <div className='w-full h-4/6 bg-gray-600 shadow-lg  rounded-lg  flex items-center justify-start px-3 '>
                    <h1 className='font-bold text-xl text-gray-400'>My Wallets</h1>
                </div>
            </div>
            <div className='w-full h-5/6  flex px-2'>
                <div className='w-2/6 h-full  p-2 '>
                    <div className='w-full h-full bg-gray-700 rounded-[20px] shadow-xl px-6 py-6'>
                        <div className='w-full h-full flex flex-col gap-2'>
                            <div className='w-full h-2/6 bg-green-300 rounded-xl'>
                                <div className='w-full h-full flex items-center justify-center '>
                                <h1 className='text-2xl font-bold '>Rs.{data?.user_refunded_amount}</h1>
                                </div>
                            </div>
                            <div className='w-full h-4/6 bg-blue-300 rounded-xl'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-4/6 h-full p-2 '>
                    <div className='w-full h-full bg-gray-700 rounded-[20px] shadow-xl'>
                        <div className="w-full h-1/6  ">
                            <div className="w-full h-5/6 bg-gray-700 shadow-xl  flex justify-start items-center px-4 rounded-t-xl">
                                <h1 className='text-lg font-bold text-gray-400'>
                                    All Refunds
                                </h1>
                            </div>
                        </div>
                        <div className='w-full h-5/6 bg-gray-700 overflow-y-auto rounded-b-xl px-1 '>
                        <div className="w-full h-1/6 bg-gray-800 shadow-xl my-2 rounded-md"></div>
                      
                      
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PatientWallet