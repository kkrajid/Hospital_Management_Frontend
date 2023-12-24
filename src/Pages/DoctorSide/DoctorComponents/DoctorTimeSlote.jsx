import { useMutation } from "@tanstack/react-query";
import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { toast } from "react-hot-toast";

import LoadingSpinner from '../../../Components/LoadingSpinner';
import { Doctor_time_slote_create, Doctor_all_time_slote_, Doctor_delete_time_slot } from "../../../api/user";
function DoctorTimeSlote() {
    const [TimeSlotView, setTimeSlotView] = useState(false);
    const currentDate = new Date().toISOString().substring(0, 10);
    const [datas, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [tempData, settempData] = useState([])
    

    const { data, error, isLoading,refetch } = useQuery(['Doctor_all_time_slote_', date ||currentDate], () =>
        Doctor_all_time_slote_(date || currentDate)
    );


    useEffect(() => {
        if (data && !isLoading) {
            const filteredData = data.filter(item => item.date === date);
            settempData([...data])
            setSelectedItems(new Set())
            const timeRanges = filteredData?.map(item => {
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
            // response.forEach((item) => {
            //     const itemStartTime = item.start_time.substring(0, 5);
            //     const itemEndTime = item.end_time.substring(0, 5);
            //     const timeRange = `${itemStartTime} - ${itemEndTime}`;

            //     if (!datas.includes(timeRange)) {
            //         setData(prevData => [...prevData, timeRange]);
            //     }
            // });
            refetch();
            setTimeSlotView(!TimeSlotView)
            toast.success('Time Slot Created', toastConfig);

        },
        onError: (error) => {
            toast.error(error.message, toastConfig);
        },
    });
    const delete_time_slot = Array.from(selectedItems)
    

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
    console.log(selectedItems,"dsfdsfdf");
    return (
        <div className='w-full h-full bg-[#c7cbd2] rounded-[10px] border shadow-lg  p-2'>
            <div className='w-full h-1/8  flex items-center py-4'>
                <div className='w-full h-full shadow-lg border bg-[#1AACAC] rounded-lg '>
                    <div className='flex w-full h-full justify-between py-2 px-3 '>
                        <div className='flex items-center justify-center '>
                        <div>
                            <h1 className="text-xl font-semibold text-white">Time slot</h1>
                        </div>
                        </div>
                        <div className='flex gap-2'>
                            <button className='py-2 px-3 bg-white border-blue-600 rounded-[5px]  shadow active:bg-blue-400 active:text-white' onClick={() => setTimeSlotView(true)} >Create slot</button>
                            <button onClick={handleDelete} className={`p-1 px-2 ${selectedItems.size === 0 ?"bg-gray-600 opacity-50 cursor-not-allowed'":"bg-red-600"} text-white  rounded-[7px]`} disabled={selectedItems.size === 0 } >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-full h-5/6 bg-gray-300  mt-1 rounded-[10px] p-3 flex justify-center overflow-y-auto'>
                <div>
                    <ul className='flex grid grid-cols-7 p-3 gap-3 '>
                        {datas?.map((val, indexs) => {
                            const time_data = val?.split('+');
                            const index = time_data[1];
                            
                            const result = tempData?.find(item => item.id == index);
                            console.log(result,1111111111111111111111111111);
                            let status_time 
                        if(result){
                            status_time = result['available'] 
                        }else{
                            status_time=true
                        }
                         
                            return (
                                <button
                                key={indexs}
                                className={`${
                                  !status_time
                                    ? 'cursor-not-allowed pointer-events-none border-[#1AACAC] text-white bg-[#1AACAC]'
                                    : ''
                                } ${
                                  selectedItems.has(index)
                                    ? 'border-red-800 text-white bg-red-500 active:opacity-[0.85]'
                                    : ''
                                } rounded-[6px] p-2 border-gray-700 border-2 text-gray-700 flex items-center justify-center active:opacity-[0.85] transition duration-300 transform hover:scale-105`}
                                onClick={() => handleItemToggle(index)}
                              >
                                <div
                                  className={`${
                                    selectedItems.has(index) ? 'bg-red-500' : ''
                                  } border-gray-700 border-2 w-[15px] h-[16px] rounded-[10px] mr-2`}
                                  onClick={() => handleItemToggle(index)}
                                ></div>
                                <p className="flex font-semibold font-mono">{time_data[0]}</p>
                              </button>
                              
                              
                              
                            );
                        })}
                    </ul>
                </div>
            </div>

            <div className="relative">
                {TimeSlotView && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 shadow">
                        <div className="absolute inset-0 bg-gray-600 bg-opacity-25 backdrop-blur-[1px]" onClick={() => setTimeSlotView(!TimeSlotView)}></div>
                        <div className="bg-white flex items-center justify-center rounded-[12px] shadow-lg z-10 max-w-[400px] w-full h-[340px] py-3 overflow-auto">
                      
                                <div className="bg-white px-6 py-4 rounded-[12px] z-10 max-w-[400px] w-full flex flex-col items-center justify-center gap-3">
                                    <div className="h-10 w-full my-2 p-3 flex items-center justify-center ">
                                        <h1 className="text-xl ">Create Time Slot</h1>
                                    </div>
                                    <div className="relative h-10 w-full min-w-[150px]">
                                        <input
                                            type="date"
                                            id="dateInput"
                                            name="dateInput"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            min={currentDate}
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        />
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            Date
                                        </label>
                                    </div>

                                    <div className="relative h-10 w-full min-w-[150px]">

                                        <input
                                            type="time"
                                            value={startTime}
                                            onChange={(e) => setStartTime(e.target.value)}
                                            placeholder="HH:mm"
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        />
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            Start Time
                                        </label>
                                    </div>

                                    <div className="relative h-10 w-full min-w-[150px]">

                                        <input
                                            type="time"
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            placeholder="HH:mm"
                                            className="peer h-full w-full rounded-[7px] border border-blue-gray-600 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-1 outline-gray-300 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-indigo-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                        />
                                        <label
                                            className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-indigo-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-indigo-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-indigo-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            End Time
                                        </label>
                                    </div>

                                    <div className="flex gap-2">
                                        <button onClick={handleSubmit} className="bg-[#1AACAC] text-white py-2 rounded px-3">
                                            Create  Slots
                                        </button>
                                    </div>
                                </div>
                          
                        </div>
                    </div>
                )}
            </div>


        </div>
    );
}

export default DoctorTimeSlote