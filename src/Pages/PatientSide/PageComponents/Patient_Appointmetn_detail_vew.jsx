import React, { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { get_detail_appointments_view,getPrescriptions } from "../../../api/user";
import { useParams } from 'react-router-dom';
import {websocketbaseUrl,baseURL} from '../../../api/UseAxios'
function Patient_Appointmetn_detail_vew() {
    const [appointData, setAppointmentData] = useState(null)
    const [activeComponent, setActiveComponent] = useState('prescription');
    const { appointmentId } = useParams();
 

    const appointment_date = appointData?.appointment_datetime.split("T")[0] ?? 'date'


    const showPrescription = () => {
        setActiveComponent('prescription');
    }

    const showChat = () => {
        setActiveComponent('chat');
    }
    // const showMedical_Background = () => {
    //     setActiveComponent('Medical_Background');
    // }

    const { data: AppointmentData, isLoading, error } = useQuery(
        ['get_detail_appointments_view', appointmentId],
        () => get_detail_appointments_view(appointmentId)
      );
      
  
    useEffect(() => {
      if (!isLoading && !error) {
        setAppointmentData(AppointmentData);
      }
    }, [AppointmentData, isLoading, error]);
    console.log(appointData);

    const room_name_for_chat = appointData?.doctor_profile?.user?.id+appointData?.patient?.id+appointData?.id
    const room_name_ = 'asd'+room_name_for_chat
    return (
        <div className='w-full h-full p-2 rounded-[10px] bg-gray-800'>
            <div className='w-full h-1/6 flex items-center py-3 '>
                <div className='w-full shadow-lg h-3/4 bg-gray-700 rounded-md  '>

                </div>
            </div>
            <div className='w-full h-5/6 bg-gray-700 rounded-xl relative'>
                <div className='w-full  bg-[#B0B0B0] h-2/5 rounded-t-xl'>

                </div>
                <div className='w-full h-5/6 bg-transparent absolute bottom-0 flex p-4 gap-2'>
                    <div className='h-full w-1/5 bg-transparent py-2 px-2 flex justify-center'>
                        <div className='w-full h-full bg-gray-700 rounded-xl shadow-lg p-2'>
                            <div className='w-full h-full'>
                                <div className='w-full h-2/5  flex items-center justify-center p-1'>
                                    <div className=' w-6/12 h-5/6 flex items-center justify-center'>
                                    
                                        <img src={appointData?.doctor_profile?.profile_pic} alt="" className='w-24 h-24 rounded-full shadow-lg' />
                                    </div>
                                </div>
                                <div className='w-full h-3/5 '>
                                    <div className='w-full h-full  p-1 flex flex-col'>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-400 font-mono'>Dr.{appointData?.doctor_profile?.user?.full_name}</p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center text-sm'>
                                            <p className='text-gray-400'>{appointData?.doctor_profile?.specialization}  </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-400'>{appointment_date} </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-400'>{appointData?.time_slot?.start_time }-{appointData?.time_slot?.end_time }</p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-400' >{appointData?.appointment_status}</p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='h-full  w-4/5 bg-transparent py-2 px-2 flex justify-center'>
                        <div className='w-full h-full bg-gray-700 rounded-xl shadow-lg p-2'>
                            <div className=' w-full h-full '>
                                <div className='w-full h-1/6 bg-gray-600 rounded-t-xl border-gray-300 shadow-lg p-2'>
                                    <div className='w-full h-full shadow-lg flex gap-1 p-1'>
                                        {/* <button className='w-36 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showMedical_Background}>
                                            <p className=' font-semibold'>Medical Background</p>
                                        </button> */}
                                        <button className='w-24 h-full shadow-lg bg-gray-700  rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showPrescription}>
                                            <p className=' font-semibold'>Prescription</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg bg-gray-700 rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white' onClick={showChat}>
                                            <p className=' font-semibold '>Chat</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg bg-gray-700 rounded-[5px]  text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white'>
                                            <p className=' font-semibold'>Download</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='bg-gray-100 w-full h-5/6 rounded-b-xl'>

                                    {/* {activeComponent === 'Medical_Background' && <Medical_Background />} */}
                                    {activeComponent === 'prescription' && <Prescription appointmentId={appointmentId} />}
                                    {activeComponent === 'chat' && <PatientChat  room={room_name_} id={appointData?.patient?.id}  />}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Patient_Appointmetn_detail_vew





// function Medical_Background() {
//     return (
//         <div className='w-full h-full  p-2'>
//             <div className='w-full h-full  bg-[#FAFAFA] rounded-[5px] p-1'>
//                 <div className='w-full h-full flex '>
//                     <div className='w-full h-3/6  flex gap-3 '>
//                         <div className='w-full h-full flex gap-2'>
//                             <div className='h-full w-full flex flex-col '>
//                                 <div className='   flex items-center my-2'>
//                                     <p className='text-bold px-2 text-gray-400 font-mono capitalize '>Allergies : </p>
//                                 </div>
//                                 <div className=' h-full rounded-[5px] py-2 flex items-center justify-center bg-white shadow-lg '>
//                                     <p className='p-3'>

//                                     </p>
//                                 </div>
//                             </div>
//                             <div className=' flex flex-col h-full w-full '>
//                                 <div className='   flex items-center my-2'>
//                                     <p className='text-bold px-2 text-gray-400 font-mono capitalize '>Problems : </p>
//                                 </div>
//                                 <div className=' h-full rounded-[5px] py-2 flex items-center justify-center bg-white shadow-lg '>
//                                     <p className='p-3'>

//                                     </p>
//                                 </div>
//                             </div>

//                         </div>

//                     </div>

//                 </div>
//             </div>
//         </div>
//     )
// }

function Prescription({appointmentId}) {
    const { data, error, isLoading, refetch } = useQuery(['prescriptions', appointmentId], () => getPrescriptions(appointmentId));
    const [prescriptions, setPrescriptions] = useState([]);
    useEffect(() => {
        if (data) {
            setPrescriptions(data);
        }
    }, [data]);
    return (
        <div className='w-full h-full  rounded-b-xl'>
        <div className='w-full h-full bg-gray-600 shadow-lg  rounded-b-xl overflow-y-auto'>
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

                    {prescriptions?.map((prescription, index) => (

                        <tr key={prescription.id} className={`${index % 2 === 0 ? "bg-gray-400" : "bg-blue-200"} w-full h-[50px]  `}>
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
    </div>
    )
}




function PatientChat({ room,id }) {
    const roomName = 'DP' + room;
    const userName = id;

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatSocket = useRef(null);
    const chatMessagesRef = useRef(null);
    const chatMessageInputRef = useRef(null);

    useEffect(() => {
        chatSocket.current = new WebSocket(`wss://${websocketbaseUrl}/ws/` + roomName + '/');

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
            const response = await fetch(`${baseURL}messages/${roomName}/`);
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
                                        ~{message.username === userName?"You":"Doctor"}
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



// function Chat({room}) {
    
  
//     const roomName ='DP'+room
//     const userName ='Patient';
//     const [messages, setMessages] = useState([]);
//     const [messageInput, setMessageInput] = useState('');
//     const chatSocket = useRef(null);
//     const chatMessagesRef = useRef(null);
//     const chatMessageInputRef = useRef(null);

//     useEffect(() => {
//         console.log('Connecting to WebSocket...');

//           // "https://medcare.site/backend/api/"
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
//         <div className='w-full h-full pb-3 bg-[#D6D3D1] rounded-[5px] flex flex-col'>
//             <div className='w-full bg-[#D6D3D1]  rounded-[10px] h-5/6 overflow-y-auto'>
//                 <div className="flex-1 chat-messages px-6">
//                     {messages.map((message, index) => (
//                         <div
//                             key={index}
//                             className={`${message.username === userName
//                                 ? 'flex flex-col items-end '
//                                 : 'flex flex-col items-start'
//                                 } mb-2 max-w-1/6 p-2 rounded-lg  `}
//                         >
//                             <div className='bg-white w-3/6 rounded-[8px] p-2 shadow-lg'>
//                                 <span className={`text-sm font-semibold font-mono text-${message.username === userName
//                                     ? 'red'
//                                     : 'blue'
//                                     }-500`}>
//                                     ~{message.username}
//                                 </span>
//                                 <p className='px-3 '>{message.message}</p>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             <div className='w-full h-1/6 px-3 py-1'>
//                 <div className='w-full h-full flex justify-center items-center'>
//                     <form onSubmit={handleSendMessage} className='w-full h-full flex justify-center items-center'>
//                         <div className='w-5/6 h-full bg-white shadow-lg p-1 rounded-l-[10px]'>
//                             <input
//                                 type="text"
//                                 name="content"
//                                 value={messageInput}
//                                 onChange={(e) => setMessageInput(e.target.value)}
//                                 id="chat-message-input"
//                                 className='w-full h-full px-3 py-1 outline-none'
//                                 placeholder="Type a message..."
//                                 onKeyUp={handleInputKeyUp}
//                                 ref={chatMessageInputRef}
//                             />
//                         </div>
//                         <button className='w-1/6 h-full py-1 bg-blue-600 shadow-lg rounded-r-[10px]' onClick={handleSendMessage}>
//                             <div className='h-full flex items-center justify-center bg-blue-600 text-white rounded-r-[10px]'>
//                                 <FontAwesomeIcon icon={faPaperPlane} />
//                             </div>
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>
//     )
// }

