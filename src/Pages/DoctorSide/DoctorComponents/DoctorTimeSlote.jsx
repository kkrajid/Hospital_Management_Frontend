import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "react-hot-toast";
import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Doctor_time_slote_create,Doctor_all_time_slote_ } from "../../../api/user";
function DoctorTimeSlote() {

    const currentDate = new Date().toISOString().split('T')[0];
    const [datas, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const { data, error, isLoading } = useQuery(['Doctor_all_time_slote_', date], () => Doctor_all_time_slote_(date));

    useEffect(() => {
        if (data && !isLoading) {
            
            const filteredData = data.filter(item => item.date === date);
            
            
            const timeRanges = filteredData.map(item => {
                const itemStartTime = item.start_time.substring(0, 5);
                const itemEndTime = item.end_time.substring(0, 5);
                return `${itemStartTime} - ${itemEndTime}`;
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

            toast.success(
                'Time Slot Created',
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
        onError: (error) => {
            toast.error(
                error.message, // Access the error message here
                {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    style: {
                        backgroundColor: "#ff4d4f",
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

    if (timeSlotMutation.isLoading) {
        return <LoadingSpinner />;
    }

    const handleItemToggle = (index) => {
        const newSelectedItems = [...selectedItems];

        if (newSelectedItems.includes(index)) {
            const itemIndex = newSelectedItems.indexOf(index);
            newSelectedItems.splice(itemIndex, 1);
        } else {
            newSelectedItems.push(index);
        }

        setSelectedItems(newSelectedItems);
    };

    const handleDelete = () => {
        const newDataFiltered = datas.filter((val, index) => !selectedItems.includes(index));
        setSelectedItems([]);
        setData(newDataFiltered);
    };
    if (isLoading) {
        return <LoadingSpinner/>;
    }

    return (
        <>
            <div className='max-w-[1480px] w-full h-full bg-gray-100 rounded-[10px] px-1'>
                <div className='p-3 w-full '>
                    <div className='flex bg-white justify-evenly itmes-center  px-6 py-3 rounded-[10px]'>
                        <div>
                            <label>Date:</label>
                            <input
                                type="date"
                                id="dateInput"
                                name="dateInput"
                                value={date}
                                onChange={(e)=> setDate(e.target.value)}
                                min={currentDate}
                                className="p-1 rounded-[3px] bg-[#FFFFFF]"
                            />
                        </div>
                        <div>
                            <label>Start Time:</label>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e)=> setStartTime(e.target.value)}
                                placeholder="HH:mm"
                                className="border border-gray-300 rounded p-1 w-32 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div>
                            <label>End Time:</label>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e)=>setEndTime(e.target.value)}
                                placeholder="HH:mm"
                                className="border border-gray-300 rounded p-1 w-32 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className='flex gap-2'>
                            <button onClick={handleSubmit} className="bg-blue-500 text-white p-1 rounded px-2">
                                Create Time Slots
                            </button>
                            <button onClick={handleDelete} className='p-1 px-2 bg-red-600 text-white  rounded-[7px]'>Delete</button>
                        </div>

                    </div>

                    <div className='  w-full h-[380px] bg-white  mt-2 rounded-[10px] p-3 flex justify-center overflow-y-auto'>

                        <div className=''>
                            <ul className='flex grid grid-cols-6 p-3 gap-3 '>
                                {datas.map((val, index) => (


                                    <li key={index} className='rounded-[3px] p-2 border-red-300 border-2 flex items-center justify-center '>
                                        <div
                                            className={`${selectedItems.includes(index) ? 'bg-red-500' : ''
                                                } border-red-300 border-2 w-[15px] h-[16px] rounded-[10px] mr-2`}
                                            onClick={() => handleItemToggle(index)}>
                                        </div>
                                        <p className='flex '>{val}</p>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorTimeSlote