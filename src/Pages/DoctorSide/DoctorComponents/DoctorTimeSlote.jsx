import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "react-hot-toast";

import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Doctor_time_slote_create, Doctor_all_time_slote_, Doctor_delete_time_slot } from "../../../api/user";
function DoctorTimeSlote() {

    const currentDate = new Date().toISOString().substring(0, 10);
    const [datas, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const { data, error, isLoading } = useQuery(['Doctor_all_time_slote_', date || currentDate], () =>
        Doctor_all_time_slote_(date || currentDate)
    );

    useEffect(() => {
        if (data && !isLoading) {
            const filteredData = data.filter(item => item.date === date);

            const timeRanges = filteredData.map(item => {
                const itemStartTime = item.start_time.substring(0, 5);
                const itemEndTime = item.end_time.substring(0, 5);
                const time_id = item.id;
                return `${itemStartTime} - ${itemEndTime}+${time_id}`;
            });

            setData(timeRanges);
        }
    }, [data, isLoading, date]);

    const requestData = {
        date: date,
        start_time: startTime,
        end_time: endTime,
    };

    const timeSlotMutation = useMutation({
        mutationFn: () => Doctor_time_slote_create(requestData),
        onSuccess: (response) => {
            response.forEach((item) => {
                const itemStartTime = item.start_time.substring(0, 5);
                const itemEndTime = item.end_time.substring(0, 5);
                const timeRange = `${itemStartTime} - ${itemEndTime}`;

                if (!datas.includes(timeRange)) {
                    setData(prevData => [...prevData, timeRange]);
                }
            });

            toast.success('Time Slot Created', toastConfig);
        },
        onError: (error) => {
            toast.error(error.message, toastConfig);
        },
    });
    const delete_time_slot = Array.from(selectedItems)
    console.log(delete_time_slot, 423432423432);

    const delete_timeSlotMutation = useMutation({
        mutationFn: () => Doctor_delete_time_slot(delete_time_slot),
        onSuccess: (response) => {
            toast.success(
                <div>
                    {response.message}
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
            setSelectedItems(new Set());
        },
        onError: (error) => {
            toast.error(
                <div>
                    {error.message}
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
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        timeSlotMutation.mutate();
    };

    const handleItemToggle = (index) => {
        const newSelectedItems = new Set(selectedItems);

        if (newSelectedItems.has(index)) {
            newSelectedItems.delete(index);
        } else {
            newSelectedItems.add(index);
        }

        setSelectedItems(newSelectedItems);
    };

    const handleDelete = () => {
        const newDataFiltered = datas.filter((val) => {
            const time_sl = val.split("+");
            return !selectedItems.has(time_sl[1]);
        });

        delete_timeSlotMutation.mutate();

        setData(newDataFiltered);
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    const toastConfig = {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        style: {
            backgroundColor: '',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            width: '100%',
            textAlign: 'center',
        },
    };


    return (
        <>
            <div className=' w-full h-full bg-gray-100 rounded-[10px] px-1'>
                <div className='p-3 w-full h-full'>
                    <div className='flex bg-white justify-evenly items-center h-1/6 px-6 py-3 rounded-[10px]'>
                        <div>
                            <label>Date:</label>
                            <input
                                type='date'
                                id='dateInput'
                                name='dateInput'
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                min={currentDate}
                                className='p-1 rounded-[3px] bg-[#FFFFFF] border'
                            />
                        </div>
                        <div>
                            <label>Start Time:</label>
                            <input
                                type='time'
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                placeholder='HH:mm'
                                className='border border-gray-300 rounded p-1 w-32 focus:outline-none focus:border-blue-500'
                            />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input
                                type='time'
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                placeholder='HH:mm'
                                className='border border-gray-300 rounded p-1 w-32 focus:outline-none focus:border-blue-500'
                            />
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={handleSubmit} className='bg-blue-500 text-white p-1 rounded px-2'>
                                Create Time Slots
                            </button>
                            <button onClick={handleDelete} className='p-1 px-2 bg-red-600 text-white  rounded-[7px]'>
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className='w-full h-5/6 bg-white  mt-1 rounded-[10px] p-3 flex justify-center overflow-y-auto'>
                        <div>
                            <ul className='flex grid grid-cols-7 p-3 gap-3 '>
                                {datas.map((val, indexs) => {
                                    const time_data = val.split('+');
                                    const index = time_data[1];

                                    return (
                                        <li key={indexs} className={`${selectedItems.has(index) ? 'border-red-500 text-red-500' : ''} rounded-[6px] p-2 border-blue-300 border-2 text-blue-500 flex items-center justify-center `} onClick={() => handleItemToggle(index)}>
                                            {/* <div
                                                className={`${selectedItems.has(index) ? 'bg-red-500' : ''} border-blue-400 border-2 w-[15px] h-[16px] rounded-[10px] mr-2`}
                                                onClick={() => handleItemToggle(index)}
                                            ></div> */}
                                            <p className='flex  font-semibold font-mono  '>{time_data[0]}</p>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DoctorTimeSlote