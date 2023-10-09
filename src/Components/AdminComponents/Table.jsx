import React from 'react';

function Table({ data }) {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-white dark:text-gray-400">
        <thead className="text-xs text-white uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Doctor Name
            </th>
            <th scope="col" className="px-6 py-3">
              Specialization
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              License Number
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
            <th scope="col" className="px-6 py-3">
           
            </th>
          </tr>
        </thead>
        <tbody>
        {data?.doctors
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
      <td className="px-6 py-4">{doctor.speciality}</td>
      <td className="px-6 py-4">{doctor.email}</td>
      <td className="px-6 py-4">{doctor.phone}</td>
      <td className="px-6 py-4">{doctor.license_number}</td>
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
  );
}

export default Table;
