import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { authAxios } from '../../../api/UseAxios';
import { get_admin_doctor_detail_view,adminUpdateDoctorCharge} from '../../../api/user';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '../../../Components/LoadingSpinner';

function AdminDoctorDetailView() {
  const { admin_side_doctor_id } = useParams();

  const [doctor, setDoctor] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpenForS, setisModalOpenForS] = useState(false);
  const [serviceCharge, setServiceCharge] = useState('');

  
  console.log(doctor, 'doctor data');
  const { data: get_data, error: queryError, isLoading, refetch } = useQuery(
    ['get_admin_doctor_detail_view', admin_side_doctor_id],
    () => get_admin_doctor_detail_view(admin_side_doctor_id)
    );
    
    useEffect(() => {
      if (!isLoading) {
      setDoctor(get_data);
      setLoading(false);
    }
  }, [isLoading, get_data]);

  const update_doctor_charge_mutation = useMutation({
    mutationFn: () => adminUpdateDoctorCharge({id:admin_side_doctor_id,service_charge:serviceCharge}),
    onSuccess: (response) => {
      toast.success(
        <div>
          <strong>Success:</strong> Service Charge Updated Successfully
        </div>,
        {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          style: {
            backgroundColor: '#4CAF50',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            width: '100%',
            textAlign: 'center',
          },
        }
      );
      
        setServiceCharge(" ")
        refetch();

    },
    onError: (error) => {
        console.log(error.message);
    },
});
  const handleSubmitServiceCharge = () => {
    update_doctor_charge_mutation.mutate();
    console.log('Service charge submitted:', serviceCharge);
  };

  const data = [
    { name: 'Category A', priceUsd: 100 },
    { name: 'Category B', priceUsd: 150 },
    { name: 'Category C', priceUsd: 80 },
    { name: 'Category A', priceUsd: 100 },
    { name: 'Category B', priceUsd: 150 },
    { name: 'Category C', priceUsd: 80 },
  ];

  const rpmReading = 10;

  const calculateColor = () => {
    if (rpmReading > 80) {
      return 'bg-blue-600';
    } else if (rpmReading > 30) {
      return 'bg-green-500';
    } else {
      return 'bg-yellow-600';
    }
  };

  if (loading || isLoading || update_doctor_charge_mutation.isLoading) {
    return  <LoadingSpinner/>;
  }

  if (error || queryError) {
    return <p>Error: {error || queryError}</p>;
  }




  return (
    <div className='w-full h-full bg-gray-300 rounded-l-[10px]'>
      <div className='w-full h-full flex '>
        <div className="w-4/6 h-full ">
          <div className='w-full h-2/6  p-2 gap-2  '>
            <div className='w-full h-1/6  '>
            </div>
            <div className='w-full h-5/6  flex flex-col'>
              <div className='w-full h-1/6  flex justify-end px-3'>
                <button className='p-2 bg-blue-500 text-center text-white flex items-center justify-center rounded-lg active:bg-blue-600' onClick={() => setisModalOpenForS(true)}>Update Charge</button>
              </div>
              <div className='w-full h-5/6  flex gap-2 items-center px-2'>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
                <div className="w-2/6 h-5/6 bg-white shadow-xl rounded-xl">

                </div>
              </div>
            </div>
          </div>
          <div className='w-full h-4/6 p-3 flex items-center justify-center'>
            <div className="w-full h-full bg-white shadow-xl rounded-xl p-2">
              <div className='bg-gray-300 w-full h-full rounded-xl p-2 '>
                <div className='bg-blue-200 w-full h-full rounded-xl'>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                      data={data}
                      margin={{
                        top: 30,
                        right: 30,
                        left: 20,
                        bottom: 0,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar
                        dataKey="priceUsd"
                        fill="#3581F5"
                        barSize={30}
                        radius={[10, 10, 0, 0]}
                        label={{ position: "top" }}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className='w-2/6 h-full px-3 pl-5  pt-11 pb-3'>
          <div className="w-full bg-gray-300 h-full shadow-xl rounded-xl flex flex-col p-1">
            <div className="w-full h-4/6 bg-white rounded-t-xl p-1">
              <div className='w-full h-full  rounded-t-xl shadow-xl'>
                <div className='w-full h-5/6 '>
                  <div className='w-full h-2/6  flex items-center justify-center '>
                    <img src={doctor.profile_pic} className='w-[32%] h-[90%] rounded-full border-2' alt="" />
                  </div>
                  <div className='w-full h-4/6 flex flex-col  gap-2 px-6 p-4'>
                    <div className='w-full h-2/6 bg-red-200 flex flex-col items-center justify-center rounded-xl '>
                      <h1 className='text-lg'>Dr. {doctor.user.full_name}</h1>
                      <p>{doctor.specialization}</p>
                    </div>
                    <div className='w-full h-2/6 bg-red-200 rounded-xl flex gap-3 items-center justify-center '>
                      <h1 className='text-sm'>Email :</h1>
                      <h1 className='text-sm'>{doctor.user.email}</h1>
                    </div>
                    <div className='w-full h-2/6 bg-red-200 rounded-xl flex gap-3 items-center justify-center '>
                      <h1 className='text-sm'>Phone :</h1>
                      <h1 className='text-sm'>{doctor.user.phone}</h1>
                    </div>
                    <div className='w-full h-2/6 bg-red-200 rounded-xl flex gap-3 items-center justify-center '>
                      <h1 className='text-sm'>Licence No :</h1>
                      <h1 className='text-sm'>{doctor.license_number}</h1>
                    </div>
                    <div className='w-full h-2/6 bg-red-200 rounded-xl flex gap-3 items-center justify-center '>
                      <h1 className='text-sm'>Charge:</h1>
                      <h1 className='text-sm'>{doctor.service_charge}</h1>
                    </div>
                    <div className='w-full h-2/6 bg-red-200 rounded-xl flex gap-3 items-center justify-center '>
                      <h1 className='text-sm'>Status :</h1>
                      <h1 className='text-sm'>{doctor.is_blocked?"Blocked":"Active"}</h1>
                    </div>
                  </div>
                </div>
                <div className='w-full h-1/6   '>
                  <div className="w-full h-3/6 ">

                  </div>
                  <div className="w-full h-3/6 ">
                    <div className='w-full h-5/6'>

                    </div>
                    <div className="w-full h-1/6  ">
                      <MyComponent fillPercentage={100} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full h-2/6 bg-gray-200 rounded-b-xl flex items-center justify-center">
              <div className='w-[64%] h-[99%]  rounded-full p-5 '>
                <div className={`w-full h-full rounded-full p-2 shadow-xl ${calculateColor()}`}>
                  <div className='w-full h-full bg-white rounded-full flex items-center justify-center shadow-xl'>
                    <div>
                      <h1 className='font-bold text-blue-400 text-2xl'>
                        {`${rpmReading}%`}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative">
        {isModalOpenForS && (
          <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
            <div
              className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"
              onClick={() => setisModalOpenForS(false)}
            ></div>
            <div className="bg-white p-4 rounded-[1rem] shadow-lg z-10 w-2/6">
              <h2 className="text-lg font-semibold mb-4 text-center">Update Service Charge</h2>
              <div>
                <label htmlFor="serviceCharge" className="block text-sm font-medium text-gray-700">
                  Service Charge:
                </label>
                <input
                  type="text"
                  id="serviceCharge"
                  name="serviceCharge"
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                  // Add state and onChange handler to update the service charge value
                  value={serviceCharge}
                  onChange={(e) => setServiceCharge(e.target.value)}
                />
              </div>
              <div className="mt-4 flex justify-center">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4"
                  onClick={() => {
                    // Add logic to submit the service charge (e.g., call an API or update state)
                    handleSubmitServiceCharge();
                    setisModalOpenForS(false);
                  }}
                >
                  Submit
                </button>
                <button
                  className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md"
                  onClick={() => setisModalOpenForS(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}



const MyComponent = ({ fillPercentage }) => {
  const containerStyle = {
    height: '10px',
    position: 'relative',
  };

  const filledStyle = {
    height: '100%',
    width: `${fillPercentage}%`,
    background: '#4ec64a',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  return (
    <div className='bg-gray-400 shadow-xl border-1 border-gray-300 ' style={containerStyle}>
      <div className=' rounded-r-[4px] ' style={filledStyle}></div>
    </div>
  );
};


export default AdminDoctorDetailView