import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { doctor_get_detail_appointments_view, Doctor_Manage_Appointment_Status } from "../../../api/user";
import { useParams } from 'react-router-dom';
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import AppointmentCancelModal from './AppointmentCancelModal';
import AppointmentConfirmationModal from './AppointmentConfirmationModal';
import PatientConfirmationModal from './PatientConfirmationModal';
import DoctorChat from './DoctorChat';
import Prescription from './Prescription';
function Doctor_Appointmetn_detail_vew() {
    const [appointData, setAppointmentData] = useState(null)
    const [activeComponent, setActiveComponent] = useState('prescription');
    const { appointmentId } = useParams();
    const [status, setStatus] = useState('Pending');
    const [icuImportant, setIcuImportant] = useState('')
    const [icuStatus, setIcuStatus] = useState("Not Needed")


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


    const { data: AppointmentData, isLoading, error, refetch } = useQuery(
        ['doctor_get_detail_appointments_view', appointmentId],
        () => doctor_get_detail_appointments_view(appointmentId)
    );
    console.log(AppointmentData, "aaaa");

    useEffect(() => {
        if (!isLoading && !error) {
            setAppointmentData(AppointmentData);
            setStatus(AppointmentData?.appointment_status);
            setIcuImportant(AppointmentData?.icu_selected)

        }
    }, [AppointmentData, isLoading, error]);
    console.log(appointData, "dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    const room_name_for_chat = appointData?.doctor_profile?.user?.id + appointData?.patient?.id + appointData?.id
    const room_name_ = 'asd' + room_name_for_chat

    const appointmentStatusMutation = useMutation({
        mutationFn: () => Doctor_Manage_Appointment_Status(appointmentId, { appointment_status: status, icu_selected: icuImportant, icu_status: icuStatus, icu_admitted_date: appointment_date }),
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
        setAppointmetnCancel(false);
        setStatus('Cancelled');
        appointmentStatusMutation.mutate();
    };

    const handleComplete = () => {
        setStatus('Completed');
        setAppointmentConform(false);
        appointmentStatusMutation.mutate();
    };
    const handle_admite_Icu = () => {
        setIcuImportant(!icuImportant)
        if (!icuImportant) {
            setIcuStatus("Admitted")
            setModalOpen(!isModalOpen)
        }
        else {
            setIcuStatus("Not Needed")
        }
        appointmentStatusMutation.mutate();
    }
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    const [isAppointmentConform, setAppointmentConform] = useState(false);

    const handleOpenModalForConformAppointment = () => {
        setAppointmentConform(true);
    };

    const handleCloseModalForConformAppointment = () => {
        setAppointmentConform(false);
    };

    const [AppointmetnCancel, setAppointmetnCancel] = useState(false);

    const handleOpenAppointmentCancel = () => {
        setAppointmetnCancel(true);
    };

    const handleCloseAppointmentCancel = () => {
        setAppointmetnCancel(false);
    };
    return (
        <div className='w-full h-full p-2 rounded-[10px] bg-gray-300'>
            <div className='w-full h-1/6 flex items-center'>
                <div className='w-full shadow-lg h-3/4 bg-white '>

                </div>
            </div>
            <div className='w-full h-5/6 bg-gray-300 rounded-b-[10px] relative'>
                <div className='w-full  bg-[#1AACAC] h-2/5 rounded-t-[5px]'>

                </div>
                <div className='w-full h-5/6 bg-transparent absolute bottom-0 flex flex-col md:flex-row    py-2 px-3 gap-2'>
                    <div className='h-full w-1/5 bg-transparent py-2 flex justify-center'>
                        <div className="flex items-center justify-center w-full h-full bg-gray-300 shadow-xl rounded-lg p-4">
                            <div className="flex flex-col items-center">
                                <div className="relative">
                                    <img
                                        src={appointData?.Patient_profile?.profile_pic}
                                        alt=""
                                        className="w-32 h-32 rounded-full object-cover shadow-lg"
                                    />
                                </div>
                                <div className="mt-4 text-center">
                                    <p className="text-gray-700 font-semibold text-xl">
                                        {appointData?.patient?.full_name}
                                    </p>
                                    <p className="text-gray-700 text-sm">{appointData?.patient?.email}</p>
                                    <p className="text-gray-700 text-sm">
                                        {appointData?.patient?.date_of_birth}
                                    </p>
                                    <p className="text-gray-700 text-xs">
                                        {appointData?.time_slot?.start_time}-{appointData?.time_slot?.end_time}
                                    </p>
                                    <p className="text-green-500 font-semibold mt-2 text-lg">
                                        {appointData?.appointment_status}
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='h-full  w-4/5 bg-transparent py-2 px-2 flex justify-center'>
                        <div className='w-full h-full bg-gray-200 rounded-[8px] shadow-lg p-2'>
                            <div className=' w-full h-full '>
                                <div className='w-full h-1/6 bg-gray-200 rounded-t-[10px] border-gray-300 shadow-lg p-2 flex'>
                                    <div className='w-10/12 h-full shadow-lg flex gap-1 p-1 '>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showPrescription}>
                                            <p className=' font-semibold'>Prescription</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white' onClick={showChat}>
                                            <p className=' font-semibold '>Chat</p>
                                        </button>

                                        <button className={` ${icuImportant ? "hidden " : ""} w-36 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white`} onClick={handleOpenModal} >
                                            <p className=' font-semibold '>Start ICU Treatment</p>
                                        </button>
                                        <div>
                                            <PatientConfirmationModal
                                                isOpen={isModalOpen}
                                                onClose={handleCloseModal}
                                                onAddPatient={handle_admite_Icu}
                                            />
                                            <AppointmentConfirmationModal
                                                isOpen={isAppointmentConform}
                                                onClose={handleCloseModalForConformAppointment}
                                                onCompleteAppointment={handleComplete}
                                            />
                                            <AppointmentCancelModal
                                                isOpen={AppointmetnCancel}
                                                onClose={handleCloseAppointmentCancel}
                                                onCancelAppointment={handleCancel}
                                            />
                                        </div>
                                    </div>
                                    <div className='w-2/12 h-full flex gap-1 p-1'>
                                        {(status === 'Accepted' && status !== 'Cancelled') && (
                                            <button
                                                className='w-24 h-full px-2 shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white'
                                                onClick={handleOpenModalForConformAppointment}
                                            >
                                                <p className='font-semibold' >Completed</p>
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
                                                onClick={handleOpenAppointmentCancel}
                                            >
                                                <p className='font-semibold'>Cancel</p>
                                            </button>
                                        )}
                                    </div>
                                </div>
                                <div className='bg-gray-100 w-full h-5/6 rounded-b-[10px]'>
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

export default Doctor_Appointmetn_detail_vew

