import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { useQuery } from '@tanstack/react-query';
import { doctor_get_all_icu_patients, Doctor_submitICUPatient } from '../../../api/user';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

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
        // console.log(allIcuPatients, 12121);

    }, [allIcuPatients]);

    useEffect(() => {
       
        if (error) {
            console.error('Error fetching data:', error);
        }
    }, [error]);

    const [datas, setData] = useState({});

    useEffect(() => {
      const rootRef = ref(db);
  
    
      const unsubscribe = onValue(rootRef, (snapshot) => {
        const newData = []
        for(let k in snapshot.val() ){
            newData.push(snapshot.val()[k])
        }
        // const firebaseArray = Object.entries(newData).map(([key, value]) => ({ id: key, ...value }));
        
        setData(newData);
        hey()
      });
  
      
      return () => {
        unsubscribe();
      }
    }, [db]);


    function hey(){
        let resData = datas.filter((x) => x.is_connected)
        console.log(resData,'++');
        console.log('rrraaajidddd')
    }

    // datas = fireData.filter(element => element.is_connected);f
    // fireData.forEach(element =>console.log(element,'@@##'));


    // for(let i = 0 ; i < fireData.length ; i++){
    // datas = fireData.filter(element => element.is_connected);
    //     if(fireData[i].is_connected) resData.push(fireData[i])
    // }




   
    

   

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
                    <div className='w-full h-full '>
                        <div className='w-full h-1/6  py-6 '>
                            <ul className='w-full h-full bg-[#1AACAC] shadow-lg flex gap-1'>
                                <li className='h-full w-1/12  flex items-center justify-center'>
                                    <label className="inline-flex items-center">
                                        <input type="checkbox" className=" w-[15px] h-[15px] " />
                                    </label>
                                </li>
                                <li className='h-full w-1/4   flex items-center pl-16'>
                                    <div className=''>
                                        <p className='  '>Patient Name</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/6    flex items-center justify-center'>
                                    <div className=''>
                                        <p className=' '>Email</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/12      flex items-center justify-center'>
                                    <div className=''>
                                        <p className=' '>Gender</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/6   flex items-center justify-center'>
                                    <div className=''>
                                        <p className='  '>Date of Birth</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/12     flex items-center justify-center'>
                                    <div className=''>
                                        <p className='  '>Admitted Date</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/12   flex items-center justify-center'>
                                    <div className=''>
                                        <p className=' '>ICU Status</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/12    flex items-center justify-center'>
                                    <div className=''>
                                        <p className='   '>Actions</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className='w-full   pt-1 h-5/6 flex flex-col  shadow-lg'>
                            {allIcuPatients?.map((val, index) => {
                                const date =val?.icu_admitted_date
                                let change = date.split("T")[0]
                                return (
                                    <div className='w-full h-1/6  py-2   ' key={index}>
                                        <ul className='w-full h-full bg-gray-300 shadow-lg flex gap-1 text-gray-600 '>
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className=" w-[15px] h-[15px] " />
                                                </label>
                                            </li>
                                            <li className='h-full w-1/4    flex items-center gap-4 px-16'>
                                                <div>
                                                    <img src={val?.Patient_profile?.profile_pic} className='w-10 h-10 rounded-[10px]' alt="" />
                                                </div>
                                                <div className=''>
                                                    <p className='  text-sm'>{val?.patient?.full_name}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/6    flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>{val?.patient?.email}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <div className=''>
                                                    <p className=' text-sm'>{val?.patient?.gender}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/6   flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>{val?.patient?.date_of_birth}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>{change}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/12 flex items-center justify-center'>
                                                <div>
                                                    <p className='text-sm'>
                                                        {val?.icu_status}
                                                    </p>
                                                </div>

                                            </li>

                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <div className=''>
                                                    <button className=' text-sm bg-blue-500 px-2 py-2 rounded-lg text-white active:bg-blue-400'>View</button>
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
                                    <form onSubmit={'handleSubmitDevice'}>
                                        <div className='bg-white p-4 rounded-[12px] z-10 max-w-[400px] w-full h-[200px] '>
                                            <div>
                                                <div className='h-3/5 w-full'>
                                                    <select
                                                        id="deviceSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        // value={selectedValues.device}
                                                        // onChange={(e) => setSelectedValues({ ...selectedValues, device: e.target.value })}
                                                    >
                                                        <option value="" disabled selected>
                                                            Choose a Device
                                                        </option>
                                                        {/* {firebaseDeviceList?.map((data, index) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.id}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>
                                                <div className='h-3/5 w-full mt-2'>
                                                    <select
                                                        id="patientSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        // value={selectedValues.patient}
                                                        // onChange={(e) => setSelectedValues({ ...selectedValues, patient: e.target.value })}
                                                    >
                                                        <option value="" disabled selected>
                                                            Choose a Patient
                                                        </option>
                                                        {/* {unconnectedPatientsList?.map((data, index) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.id} --{data?.patient?.full_name}
                                                            </option>
                                                        ))} */}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className='mt-4 w-full flex items-center justify-center'>
                                                <button
                                                    type="submit"
                                                    className={`py-2 px-3 bg-green-500 rounded-[5px] text-white ${'firebaseDeviceList === null || firebaseDeviceList.length === 0' ? "bg-gray-400 cursor-not-allowed" : ""}`}
                                                    // disabled={firebaseDeviceList === null || firebaseDeviceList.length === 0}
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