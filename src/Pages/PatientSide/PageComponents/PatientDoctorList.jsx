import React, { useState, useEffect } from 'react';
import { faSearch ,faAddressBook   } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DoctorList from './DoctorList';
import { useQuery } from '@tanstack/react-query';
import { all_doctors_Profile_patientside  } from "../../../api/user";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { ListGroup } from 'react-bootstrap';


function PatientDoctorList() {
    const [doctorProfiles, setDoctorProfiles] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [listOfSpecialization, setlistOfSpecialization] = useState([])
    const { data, error, isLoading } = useQuery(['all_doctors_Profile_patientside'], all_doctors_Profile_patientside);
    let arr=[]

    useEffect(() => {
        if (data && !isLoading) {
            setDoctorProfiles(data);
        }
        doctorProfiles?.forEach((item)=>arr.push(item?.specialization))
        setlistOfSpecialization([...Array.from(new Set(arr))])
    }, [data, isLoading, error,doctorProfiles]);
    
    const filteredDoctors = doctorProfiles.filter((doctor) =>
    (doctor.user.full_name?.toLowerCase().includes(searchInput.toLowerCase()) ||
     doctor.specialization?.toLowerCase().includes(searchInput.toLowerCase()))
);

    if (isLoading) {
    
        return <LoadingSpinner/>;
      }
    return (
        <div className='flex flex-col shadow-lg bg-gray-300 max-w-[1480px] w-full px-1 py-2  h-screen border-b rounded-[10px]'>
            <div className='flex flex-row shadow max-w-[600px]  bg-white md:max-w-[1480px] w-full  h-[50px] rounded-[2px] py-1 px-4'>
                <div className='hidden md:flex flex-row justify-between items-center w-full'>
                    <div>
                        <h1 className='text-gray-400'>Doctors</h1>
                    </div>
                    <div className='flex flex-row bg-white justify-between items-center rounded-[10px] p-1'>
                        <input type="text" placeholder=' Search Doctor'
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                         className='text-gray-400 px-1 outline-none' />
                        <FontAwesomeIcon icon={faSearch} className='text-gray-300' />
                    </div>
                </div>
            </div>
            <div className='flex flex-row mt-2 shadow-lg bg-[#474EDB] max-w-[600px] md:max-w-[1480px] w-full max-h-[50px] h-full'>
                <ul className='flex flex w-full justify-evenly items-center text-white'>
                <button onClick={() => setSearchInput("")} >
                            All
                        </button>
                       

                        {listOfSpecialization.slice(0, 4).map((item,index)=>(
                        <button key={index} onClick={() => setSearchInput(item)} >
                            {item}
                        </button>

                        ))}
                        
                </ul>
            </div>

            <div className=' md:max-w-[700px]w-full max-h-[560px] bg-gray-300 h-full flex  mt-2 overflow-y-auto bg-gray-100 p-2'>
                <div className='gap-2 grid md:grid-cols-5 grid-cols-2 mx-auto'>
                   
              
                {filteredDoctors.map((profile) => (
                            <DoctorList child={profile} />

                        ))}
            
                </div> 
            </div>
        </div>

    )
}

export default PatientDoctorList