import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctor_get_all_icu_patients, Doctor_submitICUPatient } from '../../../api/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { Link, useNavigate } from 'react-router-dom';
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'https://hospitalmgnt-default-rtdb.asia-southeast1.firebasedatabase.app/',
    storageBucket: 'YOUR_STORAGE_BUCKET',
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const DoctorIcuPatients = () => {
    const [AddPatient, setAddPatient] = useState(false);
    const [devicelistView, setDevicelistView] = useState(false);
    const [allIcuPatients, setAllIcuPatients] = useState([]);
    const [firebaseFirebase, setFirebaseFirebase] = useState(null)
    const [icuAddPosiblePatient, seticuAddPosiblePatient] = useState([])

    const { data, error, isLoading, refetch } = useQuery(['doctor_get_all_icu_patients'], doctor_get_all_icu_patients);

    useEffect(() => {
        if (data && data.length > 0) {
            setAllIcuPatients(data);
        }
        return () => {
            setAllIcuPatients([]);
        }
    }, [data]);

    useEffect(() => {
      
      

    }, [allIcuPatients]);

    useEffect(() => {

        if (error) {
            console.error('Error fetching data:', error);
        }
    }, [error]);
    console.log(allIcuPatients[0]?.doctor?.id)
    useEffect(() => {
        const updatedPatientList = [];
        allIcuPatients.forEach((Patient) => {

            if (Patient.icu_status === 'Admitted')
                updatedPatientList.push(Patient);
           

        });
        seticuAddPosiblePatient(updatedPatientList);



    }, [allIcuPatients])



    const [disconnectedNodes, setDisconnectedNodes] = useState([]);
    const [connectedNodes, setConnectedNodes] = useState([]);
    

    useEffect(() => {
        // Fetch disconnected nodes on component mount
        getDisconnectedNodes();

        // Set up a Firebase listener to update the frontend when data changes
        const nodesRef = ref(db, '/');
        const unsubscribe = onValue(nodesRef, (snapshot) => {
            const updatedNodes = [];
            const connectNodes = [];
            if (snapshot && snapshot.exists()) {
                snapshot.forEach((childSnapshot) => {
                    const nodeName = childSnapshot.key; // Get the key name (Node1, Node2, etc.)
                    const node = { id: nodeName, ...childSnapshot.val(), nodeName };

                    // Check if 'is_connected' is false before adding to the list
                    if (node.is_connected === false) {

                        updatedNodes.push(node);
                    }else if(node.is_connected === true){
                        connectNodes.push(node);
                    }
                });
                setConnectedNodes(connectNodes)
                setDisconnectedNodes(updatedNodes);
            }
        });

        // Clean up Firebase listener on component unmount
        return () => {
            unsubscribe();
        };
    }, [db]); // Include 'db' as a dependency to useEffect if it's dynamic

    const getDisconnectedNodes = () => {
        const nodesRef = ref(db, '/');
        onValue(nodesRef, (snapshot) => {
            const disconnectedNodes = [];
            const connectNodes = [];
            snapshot.forEach((childSnapshot) => {
                const node = childSnapshot.val();
                if (node.is_connected === false) {
                    const nodeName = childSnapshot.key;
                    if (nodeName) {
                        disconnectedNodes.push({ id: nodeName, ...node, nodeName });
                    }
                }else if(node.is_connected === true){
                    connectNodes.push(node);
                }
            });
            setConnectedNodes(connectNodes)
            setDisconnectedNodes(disconnectedNodes);
        });
    };


    const [selectedData, setSelectedData] = useState({
        device: '',
        patient: '',
    });


    const handleUpdateUser = (event) => {
        event.preventDefault();

        if (selectedData.device && selectedData.patient.trim() !== '') {
            const nodeRef = ref(db, `/${selectedData.device}`);
            update(nodeRef, { user_id: selectedData.patient,is_connected:true,HeartRate:0,Temperature:0,  doctor_id:allIcuPatients[0]?.doctor?.id          })
                .then(() => {
                    // Refresh the list after updating user_id
                    getDisconnectedNodes();
                    // Clear selectedNode and newUserId after update
                    setSelectedData({
                        device: '',
                        patient: '',
                    });
                    setDevicelistView(false)
                })
                .catch((error) => {
                    console.error('Error updating user_id:', error);
                });
        }
        // Perform your submission logic here
     
    };

    const handleDeviceChange = (e) => {
        setSelectedData({ ...selectedData, device: e.target.value });
    };

    const handlePatientChange = (e) => {
        setSelectedData({ ...selectedData, patient: e.target.value });
    };

    // Determine whether the submit button should be disabled
    const isSubmitDisabled = !selectedData.device || !selectedData.patient;
   
    


    return (
        <div className='w-full h-full bg-[#E5E7EB] p-1'>
            <div className='w-full h-full rounded-[10px]' >
                <div className='w-full h-1/8  flex items-center py-4'>
                    <div className='w-full h-full shadow-lg border bg-[#D1D5DB] '>
                        <div className='flex w-full h-full justify-between px-3'>
                            <div className='flex items-center justify-center '>
                                <p className='uppercase text-gray-500 font-bold'>
                                    ICU Patients
                                    {/* <pre>{JSON.stringify(datas,null,2)}</pre> */}
                                </p>
                            </div>
                            <div className='p-2'>
                                <div className='flex gap-2'>

                                    <button className='py-2 px-3 border-blue-600 rounded-[5px] text-blue-500 shadow active:bg-blue-400 active:text-white' onClick={() => setDevicelistView(true)}>Device config</button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-5/6  rounded-b-[10px]'>
                <div className='w-full h-full'>
  <div className='w-full h-1/6 py-6'>
    <ul className='w-full h-full bg-[#1AACAC] shadow-lg flex gap-1 '>
      <li className='h-full w-1/4 flex items-center pl-16'>
        <div>
          <p className='text-white'>Patient Name</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white'>Email</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white pl-6'>Gender</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white pl-6'>Date of Birth</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white pl-6'>Admitted Date</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white pl-6'>Device Status</p>
        </div>
      </li>
      <li className='h-full w-1/6 flex items-center justify-center'>
        <div>
          <p className='text-white pl-6'>ICU Status</p>
        </div>
      </li>
      <li className='h-full w-1/12 flex items-center justify-center'>
        <div>
          <p className='text-white'>Discharged</p>
        </div>
      </li>
      <li className='h-full w-1/12 flex items-center justify-center'>
        <div>
          <p className='text-white'>Actions</p>
        </div>
      </li>
    </ul>
  </div>
  <div className='w-full pt-1 h-5/6 flex flex-col shadow-lg'>
    {allIcuPatients?.map((val, index) => {
      const date = val?.icu_admitted_date;
      let change = date.split('T')[0];
      return (
        <div className='w-full h-1/6 py-2' key={index}>
          <ul className='w-full h-full bg-gray-300 shadow-lg flex gap-1 text-gray-600'>
            <li className='h-full w-1/4 flex items-center gap-4 px-16'>
              <div>
                <img
                  src={val?.Patient_profile?.profile_pic}
                  className='w-10 h-10 rounded-[10px]'
                  alt=''
                />
              </div>
              <div>
                <p className='text-sm'>{val?.patient?.full_name}</p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>{val?.patient?.email}</p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>{val?.patient?.gender}</p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>{val?.patient?.date_of_birth}</p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>{change}</p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>
                  {connectedNodes.find((data) => data.user_id == val?.id)
                    ? 'Connected'
                    : 'Not Connected'}
                </p>
              </div>
            </li>
            <li className='h-full w-1/6 flex items-center justify-center'>
              <div>
                <p className='text-sm'>{val?.icu_status}</p>
              </div>
            </li>
            <li className='h-full w-1/12 flex items-center justify-center'>
              <div>
                <p className='text-sm'>
                  {val?.icu_status ==="Discharged" ? 'Yes' : 'No'}
                </p>
              </div>
            </li>
            <li className='h-full w-1/12 flex items-center justify-center'>
              <div>

                <Link
                  className='text-sm bg-blue-500 px-2 py-2 rounded-lg text-white active:bg-blue-400'
                  to={`/doctor/icu/${val?.id}`}
                >
                  View
                </Link>
              </div>
            </li>
          </ul>
        </div>
      );
    })}
  </div>
</div>

                    <div className="relative">
                        {devicelistView && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[1px]" onClick={() => setDevicelistView(!devicelistView)}></div>
                                <div className='bg-white p-4 rounded-[12px] shadow-lg z-10 max-w-[400px] w-full h-[24a0px] overflow-auto'>
                                    <form onSubmit={handleUpdateUser}>
                                        <div className='bg-white p-4 rounded-[12px] z-10 max-w-[400px] w-full h-[200px] '>
                                            <div>
                                                <div className='h-3/5 w-full'>
                                                    <select
                                                        id="deviceSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        onChange={handleDeviceChange}
                                                        value={selectedData.device}
                                                    >
                                                        <option value="" disabled>
                                                            Choose a Device
                                                        </option>
                                                        {disconnectedNodes?.map((data, index) => (
                                                            <option key={index} value={data.nodeName}>
                                                                {data.nodeName}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='h-3/5 w-full mt-2'>
                                                    <select
                                                        id="patientSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        onChange={handlePatientChange}
                                                        value={selectedData.patient}
                                                    >
                                                        <option value="" disabled>
                                                            Choose a Patient
                                                        </option>
                                                        {icuAddPosiblePatient?.map((data) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.id} --{data?.patient?.full_name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='mt-4 w-full flex items-center justify-center'>
                                                <button
                                                    type="submit"
                                                    className={`py-2 px-3 rounded-[5px] text-white ${isSubmitDisabled ? " bg-gray-500" : " bg-green-500"}`}
                                                    disabled={isSubmitDisabled}
                                                >
                                                    Submit
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>


                            </div>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}



export default DoctorIcuPatients