import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faLock, faUnlock } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { fetchAllPatients, adminblockUsers, adminunblockUsers } from "../../../api/user";
import { toast } from 'react-hot-toast';
import LoadingSpinner from '../../../Components/LoadingSpinner';
function AdminPatients() {
  const { data, isLoading, isError, refetch } = useQuery(['fetchAllPatients'], fetchAllPatients);
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedPatients, setSelectedPatients] = useState([]);
  console.log(patients, 323223);



  useEffect(() => {
    try {
      if (data) {
        setPatients(data.patients);
      }
    } catch (error) {
      console.error('Error setting patients:', error);
    }
  }, [data]);

  const handleCheckboxChange = (patientId) => {
    setSelectedPatients((prevSelectedPatients) => {
      if (prevSelectedPatients.includes(patientId)) {
        return prevSelectedPatients.filter((id) => id !== patientId);
      } else {
        return [...prevSelectedPatients, patientId];
      }
    });
  };

  const blockUsersMutation = useMutation({
    mutationFn: () => adminblockUsers(selectedPatients),
    onSuccess: (response) => {
      toast.success(
        <div>
          <strong>Success:</strong> User blocked
        </div>,
      );
      refetch();
      setSelectedPatients([])
    },
    onError: (error) => {

    },
  });


  const handleBlockPatients = () => {
    console.log('Blocking patients:', selectedPatients);
    blockUsersMutation.mutate();
  };

  const unblockUsersMutation = useMutation({
    mutationFn: () => adminunblockUsers(selectedPatients),
    onSuccess: (response) => {
      toast.success(
        <div>
          <strong>Success:</strong> User unblocked
        </div>,
      );
      refetch();
      setSelectedPatients([]);
    },
    onError: (error) => {
      console.error('Error unblocking users:', error);
    },
  });

  const handleUnblockPatients = () => {
    console.log('Unblocking patients:', selectedPatients);
    unblockUsersMutation.mutate();
  };

  const filteredPatients = patients.filter((patient) =>
    patient.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const currentPatients = filteredPatients;

  if (isLoading) {
    return <LoadingSpinner/>
  }

  if (isError) {
    return <div>Error fetching data. Please try again later.</div>;
  }

  return (
    <div className='w-full h-full bg-[#E1E2E6] p-1 rounded-r-[10px]'>
      <div className='w-full h-full bg-[#D1D5DB] rounded-[10px] shadow-lg'>
        <div className='w-full h-1/6 bg-[#D1D5DB] rounded-t-[10px] flex items-center px-1'>
          <div className='w-full flex items-center px-2 px-5 flex gap-[50%]'>
            <div className='w-[60%] bg-white py-1 pl-4 rounded-[22px] flex gap-2 items-center'>
              <FontAwesomeIcon icon={faSearch} className='text-blue-500 text-xl' />
              <input
                type="text"
                placeholder='Search patients...'
                className='w-full py-2 px-4 rounded-[18px] outline-none'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className='flex gap-2 w-1/6     '>
              <button
                className={` text-white p-3 rounded-full flex items-center justify-center ${selectedPatients.length === 0 ? 'disabled bg-gray-500' : 'bg-green-500'}`}
                onClick={handleUnblockPatients}
                disabled={selectedPatients.length === 0}
              >
                <FontAwesomeIcon icon={faUnlock} className="" />

              </button>

              <button
                className={` text-white p-3 rounded-full flex items-center justify-center ${selectedPatients.length === 0 ? 'disabled bg-gray-500' : ' bg-blue-500'}`}
                onClick={handleBlockPatients}
                disabled={selectedPatients.length === 0}
              >
                <FontAwesomeIcon icon={faLock} className="" />

              </button>
            </div>
          </div>
        </div>
        <div className='w-full h-2/4  rounded-b-[10px] p-1'>
          <div className='w-full h-full'>
            <div className='w-full h-1/6'>
              <ul className='w-full h-full bg-[#3581F5] flex gap-1  text-white'>
                <li className='h-full w-1/12    flex items-center justify-center'>
                  <label className="inline-flex items-center">
                    <input type="checkbox" className="w-[15px] h-[15px]" />
                  </label>
                </li>
                <li className='h-full w-1/4    flex items-center gap-4 px-3'>
                  <div>
                    <p className='font-mono font-semibold '>Patient Name</p>
                  </div>
                </li>
                <li className='h-full w-1/6    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold'>Email</p>
                  </div>
                </li>
                <li className='h-full w-1/12    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  '>Gender</p>
                  </div>
                </li>
                <li className='h-full w-1/12    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  '>Age</p>
                  </div>
                </li>
                <li className='h-full w-1/6   flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold '>Last Visit</p>
                  </div>
                </li>
                <li className='h-full w-1/12    flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold  '>BLOCKED</p>
                  </div>
                </li>
                <li className='h-full w-1/12   flex items-center justify-center'>
                  <div className=''>
                    <p className='font-mono font-semibold   '>Actions</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className='w-full mt-2 pt-1 h-5/6 flex flex-col gap-1'>
              {currentPatients.map((patient) => (
                <div className='w-full h-1/4 shadow-lg' key={patient.id}>
                  <ul className='w-full h-full bg-white flex gap-1 text-gray-600 hover:bg-blue-500 hover:text-white'>
                    <li className='h-full w-1/12 flex items-center justify-center'>
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          className="w-[15px] h-[15px]"
                          checked={selectedPatients.includes(patient.id)}
                          onChange={() => handleCheckboxChange(patient.id)}
                        />
                      </label>
                    </li>
                    <li className='h-full w-1/4    flex items-center gap-4 px-3'>
                      <div>
                        <img
                          src={patient.patient_profile?.profile_pic}
                          className='w-10 h-10 rounded-[10px]'
                          alt=""
                        />
                      </div>
                      <div className=''>
                        <p className='text-sm'>{patient.full_name}</p>
                      </div>
                    </li>
                    <li className='h-full w-1/6    flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>{patient.email}</p>
                      </div>
                    </li>
                    <li className='h-full w-1/12    flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>{patient.gender}</p>
                      </div>
                    </li>
                    <li className='h-full w-1/12    flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>23</p>
                      </div>
                    </li>
                    <li className='h-full w-1/6   flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>2023-10-23</p>
                      </div>
                    </li>
                    <li className='h-full w-1/12    flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>{patient.is_blocked ? "YES" : "NO"}</p>
                      </div>
                    </li>
                    <li className='h-full w-1/12   flex items-center justify-center'>
                      <div className=''>
                        <p className='text-sm'>Actions</p>
                      </div>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}

export default AdminPatients;
