import React from 'react'
import {useSelector,useDispatch } from 'react-redux'
import { selectDashboard } from '../../../Redux/Actions/selectDashboardActions'
import Table from '../Table'
import { useQuery } from '@tanstack/react-query';
import { get_all_doctor } from "../../../api/user";
import { Link} from "react-router-dom";
function Doctors() {
    const dispatch = useDispatch()
    const { data, error, isLoading } = useQuery(['doctors'], get_all_doctor);
    console.log(data);
    
  return (
    <>
    <div className=''>
        <h1 className='flex flex-col shadow bg-gray-200 rounded-lg h-[50px] items-center justify-center uppercase'>Doctores</h1>
        <div className='h-[220px] my-2 bg-[#4338CA] rounded-lg'>

        </div>

        <Table data={data}/>

        <div className=' flex  flex-row mt-2 justify-between'>
            <div>
            <Link to={"addDoctor"} className="bg-red-400 rounded p-3 text-white font-bold">Add Doctor</Link>
            </div>
            <div className=' '>
                
                </div>
        </div>
    </div>
    </>
  )
}

export default Doctors