import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPrescriptions, createPrescription } from "../../../api/user";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

function Prescription({ appointmentId, Data }) {

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

        const prescriptionsData = prescriptions.map((prescription, index) => [
            index + 1, // Row number
            prescription.medications,
            prescription.dosage,
            prescription.duration,
            prescription.quantity,
            prescription.instructions,
        ]);

        const columnStyles = {
            0: { columnWidth: 10, halign: 'center' },  // Row number
            1: { columnWidth: 30, halign: 'center' },  // Medications
            2: { columnWidth: 18, halign: 'center' },  // Dosage
            3: { columnWidth: 18, halign: 'center' },  // Duration
            4: { columnWidth: 18, halign: 'center' },  // Quantity
            5: { columnWidth: 100, halign: 'center' }, // Instructions
        };

        doc.autoTable({
            startY: 70,
            head: [['No', 'Medications', 'Dosage', 'Duration', 'Quantity', 'Instructions']],
            body: prescriptionsData,
            columnStyles: columnStyles,
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
                <table className="w-full border-collapse" style={{ tableLayout: 'fixed' }}>
                    <thead className='bg-teal-600 text-white'>
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
                            <tr key={prescription.id} className={`${index % 2 === 0 ? "bg-gray-300" : "bg-gray-600 text-white"} w-full h-[50px]`}>
                                <td className="py-2 px-4 border-b text-center break-all">{prescription.medications}</td>
                                <td className="py-2 px-4 border-b text-center break-all">{prescription.dosage}</td>
                                <td className="py-2 px-4 border-b text-center break-all">{prescription.duration}</td>
                                <td className="py-2 px-4 border-b text-center break-all">{prescription.quantity}</td>
                                <td className="py-2 px-4 border-b text-center break-all">{prescription.instructions}</td>
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
                        <div className="bg-white p-2 rounded-[1rem] shadow-lg z-10 w-[34rem] h-[22rem]">
                            <div className="w-full h-5/6 bg-gray-300 rounded-[10px] ">
                                <div className="w-full h-1/6  flex items-center justify-center ">
                                    <div className="flex items-center justify-center ">
                                        <h1 className="text-2xl font-bold ">Create Prescription</h1>
                                    </div>
                                </div>
                                <div className="w-full h-[85%] bg-gray-300 ">
                                    <div className="flex flex-col gap-2 p-3 ">
                                        <div className="flex gap-3 ">
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.medications}
                                                    onChange={(e) =>
                                                        handleInputChange('medications', e.target.value)
                                                    }
                                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
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
                                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Dosage
                                                </label>
                                            </div>
                                        </div>
                                        <div className="flex gap-3   ">
                                            <div className="relative h-10 w-full min-w-[150px] ">
                                                <input
                                                    type="text"
                                                    value={prescriptionData.duration}
                                                    onChange={(e) =>
                                                        handleInputChange('duration', e.target.value)
                                                    }
                                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
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
                                                    className="peer bg-white h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
                                                    placeholder=" "
                                                />
                                                <label
                                                    className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 "
                                                >
                                                    Quantity
                                                </label>
                                            </div>
                                        </div>
                                        <div className="w-full h-[120px]  "> {/* Adjust the height here */}
                                            <div className="relative h-full w-full min-w-[150px] ">
                                            <textarea
    value={prescriptionData.instructions}
    onChange={(e) => {
        const value = e.target.value;
        const wordLimit = 20;

        const truncatedValue = value
            .split(/\s+/)
            .slice(0, wordLimit)
            .join(' ');

        handleInputChange('instructions', truncatedValue);
    }}
    className="peer h-full w-full rounded-[7px] bg-white border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 "
    placeholder=" "
    rows="3" // Adjust the number of visible rows
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

export default Prescription