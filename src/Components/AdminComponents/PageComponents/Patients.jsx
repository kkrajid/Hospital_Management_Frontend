import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectDashboard } from '../../../Redux/Actions/selectDashboardActions'
import Table from '../Table'
import { useQuery } from '@tanstack/react-query';
import { get_all_patients } from "../../../api/user";
import { Link} from "react-router-dom";
function Patients() {
  const dispatch = useDispatch()
  const { data, error, isLoading } = useQuery(['patients'], get_all_patients);
  console.log(data);

  return (
    <>
      <div className=''>
        <h1 className='flex flex-col shadow bg-gray-200 rounded-lg h-[50px] items-center justify-center uppercase'>Patients</h1>
        <div className=' flex flex-col  justify-between '>
          <div className="bg h-[220px] my-2 bg-[#4338CA] rounded-lg">

          </div>
          <div className="overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-white dark:text-gray-400">
              <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Patient Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Phone
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                  <th scope="col" className="px-6 py-3">

                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.patients
                  .slice()
                  .reverse()
                  .map((doctor, index) => (
                    <tr
                      key={index}
                      className="bg-white border-b dark:bg-white-800 dark:border-white-700 hover:bg-gray-50 dark:hover:bg-red-300"
                    >
                      <td className="px-6 py-4 font-medium whitespace-nowrap">
                        {doctor.full_name}
                      </td>
                      <td className="px-6 py-4">{doctor.email}</td>
                      <td className="px-6 py-4">{doctor.phone}</td>
                      <td className="px-6 py-4"><button className='p-2 bg-red-500 rounded-lg text-white font-bold'>BLOCK </button></td>

                      <td className="px-6 py-4 text-right">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          View
                        </a>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='flex mt-3'>
          <Link to={"addpatient"} className="bg-red-400 rounded p-3 text-white font-bold">Add Patient</Link>
          </div>
        </div>


      </div>
    </>
  )
}

export default Patients