import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from '@tanstack/react-query';
import { adminunblockDoctor } from '../../../api/user';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../../Components/LoadingSpinner';
function AdminDoctors({ child, blockuser,refetch }) {
  const [isBlocked, setIsBlocked] = useState(child.is_blocked);
  console.log(child.is_blocked,323232);
  console.log(child.user.id);

  const blockDoctorMutation = useMutation({
    mutationFn: () => adminunblockDoctor(child?.user?.id,child?.is_blocked),
    onSuccess: (response) => {
      // const action = child.is_blocked ? 'unblocked' : 'blocked';
  
      toast.success(
        <div>
          <strong>Success:</strong> Done
        </div>,
      );
      refetch();
      setIsBlocked(!isBlocked);
    },
    onError: (error) => {

    },
  });

  const handleCheckboxChange = async () => {
    const result = await Swal.fire({
      title: `Are you sure you want to ${isBlocked ? 'unblock' : 'block'} ${child.user.full_name}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3490dc',
      cancelButtonColor: '#718096',
      confirmButtonText: 'Yes',
      customClass: {
        container: 'rounded-md shadow-md',
        title: 'text-xl font-bold mb-4',
        content: 'text-base mb-6',
        actions: 'flex justify-end space-x-2',
        confirmButton: 'px-4 py-2 rounded bg-blue-500 text-white focus:outline-none hover:bg-blue-700',
        cancelButton: 'px-4 py-2 rounded bg-gray-500 text-white focus:outline-none hover:bg-gray-700',
      },
    });
    
    
    
  
    if (result.isConfirmed) {
      blockDoctorMutation.mutate();
    }
  };


  if (blockDoctorMutation.isLoading) {
    return (
      <div className='max-w-[220px] rounded-lg h-[310px] bg-white shadow p-2 relative'>
     
      <div className='w-full h-full flex items-center justify-center '>
      <div className="loading-spinner"></div>
      </div>
      </div>
    );
  }



  return (
    <div className='max-w-[220px] rounded-lg h-[310px] bg-white shadow p-2 relative'>
     
    {blockuser && (
      <input
        type="checkbox"
        className="absolute top-3 left-3 z-10"
        checked={isBlocked}
        onChange={handleCheckboxChange}
      />
    )}
    <div className="relative">
      <img
        src={child.profile_pic}
        alt=""
        style={{ width: '626px', height: '140px' }}
        className={`w-full rounded-lg ${child.is_blocked ? 'filter grayscale' : ''}`}
      />
      {child.is_blocked && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-3xl  font-semibold opacity-100 z-20 ">
          BLOCKED
        </div>
      )}
    </div>
  
    <div className='flex justify-center items-center my-1'>
      <p className='text-gray-600 font-semibold'>{child.user.full_name}</p>
    </div>
    <div className='flex justify-center items-center my-2'>
      <p className='text-gray-400'>{child.address.street_address}, {child.address.city}</p>
    </div>
    <div className='flex justify-center items-center'>
      <p className='bg-blue-100 py-1 px-4 rounded-full uppercase text-blue-600 font-semibold'>{child.specialization}</p>
    </div>
    <div className='mt-2 p-2 rounded bg-[#35b1f5] hover:bg-green-400 active:bg-green-500'>
      <Link className='flex justify-center items-center gap-3' to={`/admin/doctors/${child.id}`}>
        <FontAwesomeIcon icon={faEye} className='text-gray-200' />
        <h1 className='text-white'>View</h1>
      </Link>
    </div>
  </div>
  
  );
}

export default AdminDoctors;