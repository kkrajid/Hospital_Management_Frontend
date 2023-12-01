import React, { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { doctor_get_detail_appointments_view, getPrescriptions, createPrescription,Doctor_Manage_Appointment_Status } from "../../../api/user";
import { useParams } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {websocketbaseUrl} from '../../../api/UseAxios'
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
function Doctor_Appointmetn_detail_vew() {
    const [appointData, setAppointmentData] = useState(null)
    const [activeComponent, setActiveComponent] = useState('prescription');
    const { appointmentId } = useParams();
    const [status, setStatus] = useState('Pending');
    const [icuImportant, setIcuImportant] = useState('')
    const [icuStatus, setIcuStatus] = useState("ICU Not Needed")
    

    const appointment_date = appointData?.appointment_datetime.split("T")[0] ?? '1990-09-01'


    const showPrescription = () => {
        setActiveComponent('prescription');
    }

    const showChat = () => {
        setActiveComponent('chat');
    }
    const showMedical_Background = () => {
        setActiveComponent('Medical_Background');
    }


    const { data: AppointmentData, isLoading, error ,refetch} = useQuery(
        ['doctor_get_detail_appointments_view', appointmentId],
        () => doctor_get_detail_appointments_view(appointmentId)
    );
console.log(AppointmentData,"aaaa");

    useEffect(() => {
        if (!isLoading && !error) {
            setAppointmentData(AppointmentData);
            setStatus(AppointmentData?.appointment_status);
            setIcuImportant(AppointmentData?.icu_selected)

        }
    }, [AppointmentData, isLoading, error]);
    console.log(appointData,"dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    const room_name_for_chat = appointData?.doctor_profile?.user?.id + appointData?.patient?.id + appointData?.id
    const room_name_ = 'asd' + room_name_for_chat

    const appointmentStatusMutation = useMutation({
        mutationFn: () => Doctor_Manage_Appointment_Status(appointmentId, { appointment_status: status,icu_selected:icuImportant,icu_status:icuStatus,icu_admitted_date:appointment_date }),
        onSuccess: (response) => {
            toast.success(
                <div>
                    Done
                </div>,
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "none",
                        width: "100%",
                        textAlign: "center",
                    },
                }
            );

            refetch();
        },

        onError: (error) => {
            console.log(error.message);
        },

    });

      


    const handleAccept = () => {
        setStatus('Accepted');
        appointmentStatusMutation.mutate();
    };

    const handleCancel = () => {
        setStatus('Cancelled');
        appointmentStatusMutation.mutate();
    };

    const handleComplete = () => {
        setStatus('Completed');
        appointmentStatusMutation.mutate();
    };
    const handle_admite_Icu = ()=>{
        setIcuImportant(!icuImportant)
        if (!icuImportant){
            setIcuStatus("ICU Admitted")
        }
        else{
            setIcuStatus("ICU Not Needed")
        }
        appointmentStatusMutation.mutate();
    }

    return (
        <div className='w-full h-full p-2 rounded-[10px] bg-gray-200'>
            <div className='w-full h-1/6 flex items-center'>
                <div className='w-full shadow-lg h-3/4 bg-white '>

                </div>
            </div>
            <div className='w-full h-5/6 bg-white rounded-b-[10px] relative'>
                <div className='w-full  bg-[#1AACAC] h-2/5 rounded-t-[5px]'>

                </div>
                <div className='w-full h-5/6 bg-transparent absolute bottom-0 flex flex-col md:flex-row    py-2 px-3 gap-2'>
                    <div className='h-full w-1/5 bg-transparent py-2 flex justify-center'>
                        <div className='w-full h-full bg-gray-200 shadow-lg rounded-[8px] shadow-lg py-2'>
                            <div className='w-full h-full'>
                                <div className='w-full h-2/5  flex items-center justify-center p-1'>
                                    <div className=' w-6/12 h-5/6 flex items-center justify-center'>
                                        <img src={appointData?.Patient_profile?.profile_pic} alt="" className='w-24 h-24 rounded-full shadow-lg' />
                                    </div>
                                </div>
                                <div className='w-full h-3/5 '>
                                    <div className='w-full h-full  p-1 flex flex-col'>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-500 font-mono'>{appointData?.patient?.full_name}</p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center text-sm'>
                                            <p>{appointData?.patient?.email}  </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p>{appointData?.patient?.date_of_birth} </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p>{appointData?.time_slot?.start_time}-{appointData?.time_slot?.end_time }</p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p >{appointData?.appointment_status}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='h-full  w-4/5 bg-transparent py-2 px-2 flex justify-center'>
                        <div className='w-full h-full bg-gray-200 rounded-[8px] shadow-lg p-2'>
                            <div className=' w-full h-full '>
                                <div className='w-full h-1/6 bg-gray-200 rounded-t-[10px] border-gray-300 shadow-lg p-2 flex'>
                                    <div className='w-10/12 h-full shadow-lg flex gap-1 p-1 '>
                                        {/* <button className='w-36 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showMedical_Background}>
                                            <p className=' font-semibold'>Medical Background</p>
                                        </button> */}
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showPrescription}>
                                            <p className=' font-semibold'>Prescription</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white' onClick={showChat}>
                                            <p className=' font-semibold '>Chat</p>
                                        </button>
                                       
                                        <button className={` ${icuImportant?"bg-orange-400 text-white ":""} w-36 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white`} onClick={handle_admite_Icu}>
                                            <p className=' font-semibold '>Start ICU Treatment</p>
                                        </button>
                                    </div>
                                    <div className='w-2/12 h-full flex gap-1 p-1'>
                                        {(status === 'Accepted' && status !== 'Cancelled') && (
                                            <button
                                                className='w-24 h-full px-2 shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white'
                                                onClick={handleComplete}
                                            >
                                                <p className='font-semibold'>Completed</p>
                                            </button>
                                        )}

                                        {status !== 'Completed' && status !== 'Accepted' && status !== 'Cancelled' && (
                                            <button
                                                className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-green-600 active:text-white hover:bg-green-600 hover:text-white'
                                                onClick={handleAccept}
                                            >
                                                <p className='font-semibold'>Accept</p>
                                            </button>
                                        )}

                                        {status !== 'Completed' && status !== 'Cancelled' && (
                                            <button
                                                className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-red-600 active:text-white hover:bg-red-600 hover:text-white'
                                                onClick={handleCancel}
                                            >
                                                <p className='font-semibold'>Cancel</p>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='bg-gray-100 w-full h-5/6 rounded-b-[10px]'>

                                    {/* {activeComponent === 'Medical_Background' && <Medical_Background />} */}
                                    {activeComponent === 'prescription' && <Prescription appointmentId={appointmentId} Data={appointData} />}
                                    {activeComponent === 'chat' && <DoctorChat room={room_name_} id={appointData?.doctor_profile?.user?.id} />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}




function Prescription({ appointmentId,Data }) {


    const generateStyledMedicalPrescription = () => {
        const doc = new jsPDF();
        doc.setFont('helvetica');
        doc.setFontSize(10);
        doc.text('PRESCRIPTION ', 90, 20);
        doc.text(`Dr. ${Data?.doctor_profile?.user.full_name}`, 20, 50);
        doc.text(`Specialization: ${Data?.doctor_profile?.specialization} `, 20, 55);
        doc.text(`Contact: ${Data?.doctor_profile?.user.phone}`, 20, 60);
        doc.text(`Name:${Data?.patient?.full_name} `, 160, 50);
        doc.text(`Address: `, 160, 55);
        doc.text(`Date of Birth:${Data?.patient?.date_of_birth}`, 160, 60);
        const prescriptionsData = prescriptions.map((prescription) => [
            prescription.medications,
            prescription.dosage,
            prescription.duration,
            prescription.quantity,
            prescription.instructions,
          ]);
        
          doc.autoTable({
            startY: 70,
            head: [['Medications', 'Dosage', 'Duration', 'Quantity', 'Instructions']],
            body: prescriptionsData,
          });
        
          doc.save('prescription.pdf');
      };
      
      

    
    const [prescriptionData, setPrescriptionData] = useState({
        appointment: appointmentId,
        medications: '',
        dosage: '',
        duration: '',
        quantity: '',
        instructions: '',
    });

    const [isAddPrescriptionOpen, setIsAddPrescriptionOpen] = useState(false);

    const { data, error, isLoading, refetch } = useQuery(['prescriptions', appointmentId], () => getPrescriptions(appointmentId));

    const [prescriptions, setPrescriptions] = useState([]);

    const handleInputChange = (field, value) => {
        setPrescriptionData({
            ...prescriptionData,
            [field]: value,
        });
    };

    useEffect(() => {
        if (data) {
            setPrescriptions(data);
        }
    }, [data]);



    const Add_new_prescription_addMutation = useMutation({
        mutationFn: () => createPrescription(prescriptionData),
        onSuccess: (response) => {
            toast.success(
                <div>
                    Prescription added successfully!
                </div>,
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        backgroundColor: "#4CAF50",
                        color: "white",
                        fontSize: "16px",
                        fontWeight: "bold",
                        border: "none",
                        width: "100%",
                        textAlign: "center",
                    },
                }
            );

            setPrescriptionData({
                appointment: appointmentId,
                medications: '',
                dosage: '',
                duration: '',
                quantity: '',
                instructions: '',
            });

            refetch();
        },

        onError: (error) => {
            console.log(error.message);
        },

    });

    const handleSubmitPrescription = (event) => {
        event.preventDefault();
        Add_new_prescription_addMutation.mutate();
        setIsAddPrescriptionOpen(false);
    };


    return (
        <div className='w-full h-full  rounded-b-[10px]'>
            <div className='w-full h-1/6 bg-gray-200 flex justify-end'>

                <div className='w-2/6 h-full  flex items-center justify-center gap-2 '>
                <button
  type="button"
  className='py-2 px-3 rounded-[5px] border-blue-600 shadow-lg bg-gray-300 text-gray-600 text-sm active:bg-blue-600 active:text-white'
  onClick={() => generateStyledMedicalPrescription()}
>
  Download
</button>

                    <button className='py-2 px-3 rounded-[5px] border-blue-600 shadow-lg bg-gray-300 text-gray-600 text-sm active:bg-blue-600 active:text-white' onClick={() => setIsAddPrescriptionOpen(true)}>Create Prescription</button>
                </div>
            </div>
            <div className='w-full h-5/6 bg-gray-200 shadow-lg border-2 rounded-b-[10px] overflow-y-auto'>
                <table class="w-full border-collapse">
                    <thead className=' bg-gray-500 text-white'>
                        <tr>
                            <th className="py-2 px-4 border-b">Medications</th>
                            <th className="py-2 px-4 border-b">Dosage</th>
                            <th className="py-2 px-4 border-b">Duration</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Instructions</th>
                        </tr>
                    </thead>
                    <tbody className=''>

                        {prescriptions.map((prescription, index) => (

                            <tr key={prescription.id} className={`${index % 2 === 0 ? "" : "bg-blue-200"} w-full h-[50px]  `}>
                                <td className="py-2 px-4 border-b text-center ">{prescription.medications}</td>
                                <td className="py-2 px-4 border-b text-center">{prescription.dosage}</td>
                                <td className="py-2 px-4 border-b text-center ">{prescription.duration}</td>
                                <td className="py-2 px-4 border-b text-center ">{prescription.quantity}</td>
                                <td className="py-2 px-4 border-b text-center ">{prescription.instructions}</td>
                            </tr>
                        ))}
                      

                    </tbody>
                </table>
            </div>


            <div className="relative">
                {isAddPrescriptionOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 shadow  ">
                        <div
                            className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[3px]"
                            onClick={() => setIsAddPrescriptionOpen(false)}
                        ></div>
                        <div className="bg-white p-2 rounded-[1rem] shadow-lg z-10 w-[34rem] h-[30rem]">
                            <div className="w-full h-5/6 bg-gray-300 rounded-[10px] ">
                                <div className="w-full h-1/6  flex items-center justify-center ">
                                    <div className="flex items-center justify-center ">
                                        <h1 className="text-2xl font-bold ">Create Prescription</h1>
                                    </div>
                                </div>
                                <div className="w-full h-5/6 bg-gray-200 ">
                                    <div className="flex flex-col gap-2 p-3 ">
                                        <div className="flex gap-3 ">
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.medications}
                                                    onChange={(e) =>
                                                        handleInputChange('medications', e.target.value)
                                                    }
                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Medications
                                                </label>
                                            </div>
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.dosage}
                                                    onChange={(e) =>
                                                        handleInputChange('dosage', e.target.value)
                                                    }
                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Dosage
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-3 ">
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.duration}
                                                    onChange={(e) =>
                                                        handleInputChange('duration', e.target.value)
                                                    }
                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Duration
                                                </label>
                                            </div>
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.quantity}
                                                    onChange={(e) =>
                                                        handleInputChange('quantity', e.target.value)
                                                    }
                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Quantity
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full h-[180px] ">
                                            <div className="relative h-full w-full min-w-[150px] ">
                                                <textarea
                                                    value={prescriptionData.instructions}
                                                    onChange={(e) =>
                                                        handleInputChange('instructions', e.target.value)
                                                    }
                                                    className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                ></textarea>
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                    style={{ left: '50%', transform: 'translateX(-50%)' }}
                                                >
                                                    Instructions
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full h-1/6 ">
                                    <div className="w-full h-full flex items-center justify-center ">
                                        <button
                                            onClick={handleSubmitPrescription}
                                            className="bg-green-500 px-3 py-2 text-center text-white rounded-[6px] "
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


// function Chat({ room }) {


//     const roomName = 'DP' + room
//     const userName = 'Doctor';
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const chatSocket = useRef(null);
//     const chatMessagesRef = useRef(null);
//     const chatMessageInputRef = useRef(null);

//     useEffect(() => {
//         // console.log('Connecting to WebSocket...');
//         // "https://medcare.site/backend/api/"
//         // "medcare.site/backend"

//         // chatSocket.current = new WebSocket(
//         //     'wss://medcare.site/api/ws/' + roomName + '/'
//         // );

//         chatSocket.current = new WebSocket(
//             `ws://${websocketbaseUrl}/ws/` + roomName + '/'
//         );

//         // chatSocket.current.onclose = function (e) {
//         //     console.log('WebSocket connection closed');
//         // };

//         chatSocket.current.onmessage = function (e) {
//             const data = JSON.parse(e.data);

//             if (data.message) {
//                 setMessages((prevMessages) => [
//                     ...prevMessages,
//                     { username: data.username, message: data.message },
//                 ]);
//                 scrollToBottom();
//             }
//         };

//         chatMessageInputRef.current.focus();

//         return () => {
//             chatSocket.current.close();
//             console.log('Closed WebSocket...');

//         };
//     }, [roomName]);

//     const handleInputKeyUp = (e) => {
//         if (e.keyCode === 13) {
//             handleSendMessage(e);
//         }
//     };

//     const handleSendMessage = (e) => {
//         e.preventDefault();

//         chatSocket.current.send(
//             JSON.stringify({
//                 message: messageInput,
//                 username: userName,
//                 room: roomName,
//             })
//         );

//         setMessageInput('');
//     };

//     const scrollToBottom = () => {
//         chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
//     };
//     return (
//         <div className='w-full h-full p-2'>
//             <div className='w-full h-full pb-3 bg-[#D6D3D1] rounded-[5px] flex flex-col'>
//                 <div className='w-full bg-[#D6D3D1]  rounded-[10px] h-5/6 overflow-y-auto'>
//                     <div className="flex-1 chat-messages px-6">
//                         {messages.map((message, index) => (
//                             <div
//                                 key={index}
//                                 className={`${message.username === userName
//                                     ? 'flex flex-col items-end '
//                                     : 'flex flex-col items-start'
//                                     } mb-2 max-w-1/6 p-2 rounded-lg  `}
//                             >
//                                 <div className='bg-white w-3/6 rounded-[8px] p-2 shadow-lg'>
//                                     <span className={`text-sm font-semibold font-mono text-${message.username === userName
//                                         ? 'red'
//                                         : 'blue'
//                                         }-500`}>
//                                         ~{message.username}
//                                     </span>
//                                     <p className='px-3 '>{message.message}</p>
//                                 </div>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className='w-full h-1/6 px-3 py-1'>
//                     <div className='w-full h-full flex justify-center items-center'>
//                         <form onSubmit={handleSendMessage} className='w-full h-full flex justify-center items-center'>
//                             <div className='w-5/6 h-full bg-white shadow-lg p-1 rounded-l-[10px]'>
//                                 <input
//                                     type="text"
//                                     name="content"
//                                     value={messageInput}
//                                     onChange={(e) => setMessageInput(e.target.value)}
//                                     id="chat-message-input"
//                                     className='w-full h-full px-3 py-1 outline-none'
//                                     placeholder="Type a message..."
//                                     onKeyUp={handleInputKeyUp}
//                                     ref={chatMessageInputRef}
//                                 />
//                             </div>
//                             <button className='w-1/6 h-full py-1 bg-blue-600 shadow-lg rounded-r-[10px]' onClick={handleSendMessage}>
//                                 <div className='h-full flex items-center justify-center bg-blue-600 text-white rounded-r-[10px]'>
//                                     <FontAwesomeIcon icon={faPaperPlane} />
//                                 </div>
//                             </button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>

//     )
// }


// export default Doctor_Appointmetn_detail_vew



function DoctorChat({ room, id }) {
    const roomName = 'DP' + room;
    const userName = id;

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatSocket = useRef(null);
    const chatMessagesRef = useRef(null);
    const chatMessageInputRef = useRef(null);

    useEffect(() => {
        chatSocket.current = new WebSocket(`ws://${websocketbaseUrl}/ws/` + roomName + '/');

        chatSocket.current.onmessage = function (e) {
            const data = JSON.parse(e.data);

            if (data.message) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { username: data.username, message: data.message },
                ]);
                scrollToBottom();
            }
        };

        fetchMessages();

        chatMessageInputRef.current.focus();

        return () => {
            chatSocket.current.close();
            console.log('Closed WebSocket...');
        };
    }, [roomName]);

    const fetchMessages = async () => {
        try {
            const response = await fetch(`http://${websocketbaseUrl}/api/messages/${roomName}/`);
            const data = await response.json();
            setMessages(data);
            scrollToBottom();
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();

        chatSocket.current.send(
            JSON.stringify({
                message: messageInput,
                username: userName,
                room: roomName,
            })
        );

        setMessageInput('');
    };

    const scrollToBottom = () => {
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    };

    return (
        <div className='w-full h-full p-2'>
            <div className='w-full h-full pb-3 bg-[#D6D3D1] rounded-[5px] flex flex-col'>
                <div className='w-full bg-[#D6D3D1]  rounded-[10px] h-5/6 overflow-y-auto' ref={chatMessagesRef}>
                    <div className="flex-1 chat-messages px-6">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${message.username === userName
                                    ? 'flex flex-col items-end '
                                    : 'flex flex-col items-start'
                                    } mb-2 max-w-1/6 p-2 rounded-lg  `}
                            >
                                <div className='bg-white w-3/6 rounded-[8px] p-2 shadow-lg'>
                                    <span className={`text-sm font-semibold font-mono text-${message.username === userName
                                        ? 'red'
                                        : 'blue'
                                        }-500`}>
                                        ~{message.username === userName?"You":"Patient"}
                                    </span>
                                    <p className='px-3 '>{message.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='w-full h-1/6 px-3 py-1'>
                    <div className='w-full h-full flex justify-center items-center'>
                        <form onSubmit={handleSendMessage} className='w-full h-full flex justify-center items-center'>
                            <div className='w-5/6 h-full bg-white shadow-lg p-1 rounded-l-[10px]'>
                                <input
                                    type="text"
                                    name="content"
                                    value={messageInput}
                                    onChange={(e) => setMessageInput(e.target.value)}
                                    id="chat-message-input"
                                    className='w-full h-full px-3 py-1 outline-none'
                                    placeholder="Type a message..."
                                    ref={chatMessageInputRef}
                                />
                            </div>
                            <button className='w-1/6 h-full py-1 bg-blue-600 shadow-lg rounded-r-[10px]' onClick={handleSendMessage}>
                                <div className='h-full flex items-center justify-center bg-blue-600 text-white rounded-r-[10px]'>
                                    Send
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}



export default Doctor_Appointmetn_detail_vew