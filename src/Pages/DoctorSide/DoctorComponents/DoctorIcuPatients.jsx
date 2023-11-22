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
    const [firebaseDeviceList, setFirebaseDeviceList] = useState(null);
    const [selectedPatient, setSelectedPatient] = useState('');
    const [unconnectedPatientsList, setUnconnectedPatients] = useState(null);
    const [deviceCon, setDeviceCon] = useState(null);
    const [selectedValues, setSelectedValues] = useState({
        device: '',
        patient: '',
    });
    const [formData, setFormData] = useState({
        admintDate: new Date().toISOString().split('T')[0],
        appointmentId: '',
    });
    const [IcuAddedPatientList, setIcuAddedPatientList] = useState(null);
    const [IcuNotAddedPatients, setIcuNotAddedPatients] = useState(null);

    const { data: All_icu_Patient, isLoading, error, refetch } = useQuery(
        ['doctor_get_all_icu_patients'],
        () => doctor_get_all_icu_patients()
    );

    const add_icu_patient_mutation = useMutation({
        mutationFn: () => Doctor_submitICUPatient(formData),
        onSuccess: () => {
            refetch();
            closeAddPatient();
        },
        onError: (error) => {
            console.error('Error adding ICU patient:', error);
            toast.error('Failed to add ICU patient');
        },
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (All_icu_Patient) {
                    const filteredICUPatients = All_icu_Patient.filter((patient) => patient?.icu_selected === true);
                    setIcuAddedPatientList(filteredICUPatients);

                    const filteredNotAddedICUPatients = All_icu_Patient.filter(
                        (patient) => patient?.icu_selected === false && patient?.appointment_status === 'Accepted'
                    );
                    setIcuNotAddedPatients(filteredNotAddedICUPatients);
                }
            } catch (error) {
                console.error('Error fetching ICU patients:', error);
                toast.error('Failed to fetch ICU patients');
            }
        };

        fetchData();
    }, [All_icu_Patient, add_icu_patient_mutation.isLoading]);

    useEffect(() => {
        const rootRef = ref(db);

        const rootListener = onValue(rootRef, (snapshot) => {
            if (snapshot.exists()) {
                const firebaseArray = Object.entries(snapshot.val()).map(([key, value]) => ({ id: key, ...value }));
                setDeviceCon(firebaseArray);

                const filteredArray = firebaseArray.filter((item) => item.is_connected === false);
                setFirebaseDeviceList(filteredArray);

                const unAvai = firebaseArray.filter((item) => item.is_connected === true);
                const userIdArray = unAvai.map((item) => item.user_id);

                const afterFilterUnconnectedPatient = IcuAddedPatientList?.filter(
                    (item) => !userIdArray.includes(item.id.toString())
                );
                setUnconnectedPatients(afterFilterUnconnectedPatient);
            }
        });

        return () => {
            rootListener();
        };
    }, [setDevicelistView, IcuAddedPatientList]);

    const openAddPatient = () => {
        setAddPatient(true);
    };

    const closeAddPatient = () => {
        setAddPatient(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!selectedPatient) {
            toast.error('Please select a patient');
            return;
        }

        setFormData((prevData) => ({
            ...prevData,
            appointmentId: selectedPatient,
        }));

        add_icu_patient_mutation.mutate();
        setSelectedPatient('');
    };

    const handleSubmitDevice = (e) => {
        e.preventDefault();

        if (!selectedValues.device || !selectedValues.patient) {
            toast.error('Please select a device and a patient');
            return;
        }

        update(ref(db, `/${selectedValues['device']}`), { user_id: selectedValues['patient'], is_connected: true });
        setDevicelistView(!devicelistView);
    };

    return (
        <div className='w-full h-full bg-[#E5E7EB] p-1'>
            <div className='w-full h-full rounded-[10px]' >
                <div className='w-full h-1/8  flex items-center py-4'>
                    <div className='w-full h-full shadow-lg border bg-[#D1D5DB] '>
                        <div className='flex w-full h-full justify-between px-3'>
                            <div className='flex items-center justify-center '>
                                <p className='uppercase text-gray-500 font-bold'>
                                    ICU Patients
                                </p>
                            </div>
                            <div className='p-2'>
                                <div className='flex gap-2'>
                          
                                        <button className='py-2 px-3 border-blue-600 rounded-[5px] text-blue-500 shadow active:bg-blue-400 active:text-white' onClick={() => setDevicelistView(true)}>Device config</button>
                                        <button className='py-2 px-3 border-blue-600 rounded-[5px] text-blue-500 shadow active:bg-blue-400 active:text-white' onClick={openAddPatient}> +
                                            Add Patient</button>
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
                                <li className='h-full w-1/12     flex items-center justify-center'>
                                    <div className=''>
                                        <p className='  '>Age</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/6   flex items-center justify-center'>
                                    <div className=''>
                                        <p className='  '>Last Visit</p>
                                    </div>
                                </li>
                                <li className='h-full w-1/12   flex items-center justify-center'>
                                    <div className=''>
                                        <p className=' '>Status</p>
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
                            {IcuAddedPatientList?.map((val, index) => {
                                return (
                                    <div className='w-full h-1/6  py-2   ' key={index}>
                                        <ul className='w-full h-full bg-gray-300 shadow-lg flex gap-1 text-gray-600 '>
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <label className="inline-flex items-center">
                                                    <input type="checkbox" className=" w-[15px] h-[15px] " />
                                                </label>
                                            </li>
                                            <li className='h-full w-1/4    flex items-center gap-4 px-3'>
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
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>{val?.id}</p>
                                                </div>
                                            </li>
                                            <li className='h-full w-1/6   flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>2023-10-23</p>
                                                </div>
                                            </li>
                                            {/* {deviceCon?.map(item => {
                                               
                                                if (item.user_id == val?.id) {
                                                    return (
                                                    <li key={item.user_id} className='h-full w-1/12 flex items-center justify-center'>
                                                        <div>
                                                        <p className='text-sm'>rdrert</p>
                                                        </div>
                                                    </li>
                                                    );
                                                }else{
                                                    return(
                                                        <li key={item.user_id} className='h-full w-1/12 flex items-center justify-center'>
                                                        <div>
                                                        <p className='text-sm'>rdrert</p>
                                                        </div>
                                                    </li>
                                                    );
                                                }
                                                })} */}

                                            {/* <li className='h-full w-1/12 flex items-center justify-center'>
                                                <div>
                                                    {deviceCon?.find(item => item?.user_id == val?.id) ? (
                                                        <p className='text-sm'>{'item?.HeartRate'}</p>
                                                    ) : (
                                                        <p className='text-sm'>Not Connected</p>
                                                    )}
                                                </div>
                                            </li> */}
                                            <li className='h-full w-1/12 flex items-center justify-center'>
                                                <div>
                                                    <p className='text-sm'>
                                                        {deviceCon?.find(item => item?.user_id == val?.id) ? 'Connected' : 'Not Connected'}
                                                    </p>
                                                </div>

                                            </li>

                                            {/* {deviceCon?.find(item => {

                                                                console.log(item,"wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww");
                                                                    return (
                                                                    <li key={item.someUniqueIdentifier} className='h-full w-1/12 flex items-center justify-center'>
                                                                        <div>
                                                                            {item?.user_id === val?.id ? (
                                                                                <p className='text-sm'>{item?.HeartRate}</p>
                                                                            ) : (
                                                                                <p className='text-sm'>Not Connected</p>
                                                                            )}
                                                                        </div>
                                                                    </li>)
                                                                })} */}



                                            {/* <li className='h-full w-1/12 flex items-center justify-center'>
                                                <div>
                                                    {deviceCon?.find(data => data.user_id == val?.id) ? (
                                                        <p className='text-sm'>{data?.HeartRate}</p>
                                                    ) : (
                                                        <p className='text-sm'></p>
                                                    )}
                                                </div>
                                            </li> */}
                                            <li className='h-full w-1/12    flex items-center justify-center'>
                                                <div className=''>
                                                    <p className='text-sm '>{val?.id}</p>
                                                </div>
                                            </li>

                                        </ul>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className="relative">
                        {AddPatient && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[1px]" onClick={closeAddPatient}></div>
                                <form
                                    className="bg-white p-4 rounded-[12px] shadow-lg z-10 max-w-[400px] w-full h-[200px] overflow-auto"
                                    onSubmit={handleSubmit}
                                >
                                    <div className='w-full h-1/5 flex items-center justify-center '>
                                        <h1>ADD ICU Patient</h1>
                                    </div>
                                    <div className='h-3/5 w-full'>
                                        <select

                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                            value={selectedPatient}
                                            onChange={(e) => {
                                                setSelectedPatient(e.target.value);
                                                setFormData({
                                                    ...formData,
                                                    appointmentId: e.target.value,
                                                });
                                            }}
                                        >
                                            <option value="" disabled selected>
                                                Choose a Patient
                                            </option>
                                            {IcuNotAddedPatients?.map((data, index) => (
                                                <option key={data.id} value={data.id}>
                                                    {data.id} {") "} {data.patient.full_name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='h-1/5 w-full flex items-center justify-center'>
                                        <button type="submit" className='py-2 px-3 bg-green-500 rounded-[5px] text-white'>
                                            Submit
                                        </button>
                                    </div>
                                </form>

                            </div>
                        )}
                    </div>
                    <div className="relative">
                        {devicelistView && (
                            <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                                <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[1px]" onClick={() => setDevicelistView(!devicelistView)}></div>
                                <div className='bg-white p-4 rounded-[12px] shadow-lg z-10 max-w-[400px] w-full h-[24a0px] overflow-auto'>
                                    <form onSubmit={handleSubmitDevice}>
                                        <div className='bg-white p-4 rounded-[12px] z-10 max-w-[400px] w-full h-[200px] '>
                                            <div>
                                                <div className='h-3/5 w-full'>
                                                    <select
                                                        id="deviceSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        value={selectedValues.device}
                                                        onChange={(e) => setSelectedValues({ ...selectedValues, device: e.target.value })}
                                                    >
                                                        <option value="" disabled selected>
                                                            Choose a Device
                                                        </option>
                                                        {firebaseDeviceList?.map((data, index) => (
                                                            <option key={data.id} value={data.id}>
                                                                {data.id}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className='h-3/5 w-full mt-2'>
                                                    <select
                                                        id="patientSelect"
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  w-full p-2.5"
                                                        value={selectedValues.patient}
                                                        onChange={(e) => setSelectedValues({ ...selectedValues, patient: e.target.value })}
                                                    >
                                                        <option value="" disabled selected>
                                                            Choose a Patient
                                                        </option>
                                                        {unconnectedPatientsList?.map((data, index) => (
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
                                                    className={`py-2 px-3 bg-green-500 rounded-[5px] text-white ${firebaseDeviceList === null || firebaseDeviceList.length === 0 ? "bg-gray-400 cursor-not-allowed" : ""}`}
                                                    disabled={firebaseDeviceList === null || firebaseDeviceList.length === 0}
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