import React, { useState, useEffect, useRef } from 'react';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useQuery } from '@tanstack/react-query';
import { get_detail_appointments_view } from "../../../api/user";
import { useParams } from 'react-router-dom';
function Patient_Appointmetn_detail_vew() {
    const [appointData, setAppointmentData] = useState(null)
    const [activeComponent, setActiveComponent] = useState('Medical_Background');
    const { appointmentId } = useParams();
    console.log(appointmentId,444444444444444444);

    const appointment_date = appointData?.appointment_datetime.split("T")[0] ?? 'date'


    const showPrescription = () => {
        setActiveComponent('prescription');
    }

    const showChat = () => {
        setActiveComponent('chat');
    }
    const showMedical_Background = () => {
        setActiveComponent('Medical_Background');
    }

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
        <div className='w-full h-full p-2 rounded-[10px] bg-gray-200'>
            <div className='w-full h-1/6 flex items-center'>
                <div className='w-full shadow-lg h-3/4 bg-white '>

                </div>
            </div>
            <div className='w-full h-5/6 bg-white rounded-b-[10px] relative'>
                <div className='w-full  bg-blue-400 h-2/5 rounded-t-[5px]'>

                </div>
                <div className='w-full h-5/6 bg-transparent absolute bottom-0 flex p-4 gap-2'>
                    <div className='h-full w-1/5 bg-transparent py-2 px-2 flex justify-center'>
                        <div className='w-full h-full bg-white rounded-[8px] shadow-lg p-2'>
                            <div className='w-full h-full'>
                                <div className='w-full h-2/5  flex items-center justify-center p-1'>
                                    <div className=' w-6/12 h-5/6 flex items-center justify-center'>
                                        <img src="https://img.freepik.com/free-photo/pleased-young-female-doctor-wearing-medical-robe-stethoscope-around-neck-standing-with-closed-posture_409827-254.jpg?size=626&ext=jpg" alt="" className='w-24 h-24 rounded-full shadow-lg' />
                                    </div>
                                </div>
                                <div className='w-full h-3/5 '>
                                    <div className='w-full h-full  p-1 flex flex-col'>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p className='text-gray-500 font-mono'>{appointData?.doctor_profile?.user?.full_name}</p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center text-sm'>
                                            <p>{appointData?.doctor_profile?.specialization}  </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p>{appointment_date} </p>
                                        </div>
                                        <div className='w-full h-1/6  flex items-center justify-center'>
                                            <p>{appointData?.time_slot?.start_time }-{appointData?.time_slot?.end_time }</p>
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
                                <div className='w-full h-1/6 bg-white rounded-t-[10px] border-gray-300 shadow-lg p-2'>
                                    <div className='w-full h-full shadow-lg flex gap-1 p-1'>
                                        <button className='w-36 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showMedical_Background}>
                                            <p className=' font-semibold'>Medical Background</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white' onClick={showPrescription}>
                                            <p className=' font-semibold'>Prescription</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px] text-gray-400 text-sm active:bg-blue-600 active:text-white  hover:bg-blue-600 hover:text-white' onClick={showChat}>
                                            <p className=' font-semibold '>Chat</p>
                                        </button>
                                        <button className='w-24 h-full shadow-lg border rounded-[5px]  text-gray-400 text-sm active:bg-blue-600 active:text-white hover:bg-blue-600 hover:text-white'>
                                            <p className=' font-semibold'>Download</p>
                                        </button>
                                    </div>
                                </div>
                                <div className='bg-gray-100 w-full h-5/6 rounded-b-[10px]'>

                                    {activeComponent === 'Medical_Background' && <Medical_Background />}
                                    {activeComponent === 'prescription' && <Prescription />}
                                    {activeComponent === 'chat' && <Chat  room={room_name_}  />}
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





function Medical_Background() {
    return (
        <div className='w-full h-full  p-2'>
            <div className='w-full h-full  bg-[#FAFAFA] rounded-[5px] p-1'>
                <div className='w-full h-full flex '>
                    <div className='w-full h-3/6  flex gap-3 '>
                        <div className='w-full h-full flex gap-2'>
                            <div className='h-full w-full flex flex-col '>
                                <div className='   flex items-center my-2'>
                                    <p className='text-bold px-2 text-gray-400 font-mono capitalize '>Allergies : </p>
                                </div>
                                <div className=' h-full rounded-[5px] py-2 flex items-center justify-center bg-white shadow-lg '>
                                    <p className='p-3'>

                                    </p>
                                </div>
                            </div>
                            <div className=' flex flex-col h-full w-full '>
                                <div className='   flex items-center my-2'>
                                    <p className='text-bold px-2 text-gray-400 font-mono capitalize '>Problems : </p>
                                </div>
                                <div className=' h-full rounded-[5px] py-2 flex items-center justify-center bg-white shadow-lg '>
                                    <p className='p-3'>

                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

function Prescription() {
    return (
        <div className='w-full h-full  p-2'>
            <div className='w-full h-full  rounded-[5px] p-1 flex flex-col gap-1  '>

                <div className='w-full h-3/6 flex flex-col gap-1 overflow-y-auto'>
                    <div className='w-full h-2/6 bg-white flex gap-1  shadow-lg rounded-[5px]'>
                        <div className='w-1/6 h-full  flex items-center justify-center p-3'>
                            <div className=' w-full h-full flex items-center justify-center '>
                                2
                            </div>
                        </div>
                        <div className='w-5/6 h-full shadow-lg  flex items-center justify-center'>
                            medicine
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            dose
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            day
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            fr
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center '>
                            status
                        </div>
                    </div>
                    <div className='w-full h-2/6 bg-white flex gap-1  shadow-lg rounded-[5px]'>
                        <div className='w-1/6 h-full  flex items-center justify-center p-3'>
                            <div className=' w-full h-full flex items-center justify-center '>
                                2
                            </div>
                        </div>
                        <div className='w-5/6 h-full shadow-lg  flex items-center justify-center'>
                            medicine
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            dose
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            day
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center'>
                            fr
                        </div>
                        <div className='w-1/6 h-full shadow-lg flex items-center justify-center '>
                            status
                        </div>
                    </div>


                </div>
                <div className='w-full h-3/6 bg-gray-100 shadow-lg rounded-lg border border-2 p-5'>
                    <p className='w-full h-full border border-1 p-3 rounded-[10px] border-blue-200'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione est quos eum! Eum consectetur iusto fugit assumenda quas tenetur ad quae velit pariatur, dicta rerum asperiores ipsa deleniti cupiditate! Molestiae?
                    </p>
                </div>
            </div>
        </div>
    )
}



function Chat({room}) {
    
  
    const roomName ='DP'+room
    const userName ='Patient';
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatSocket = useRef(null);
    const chatMessagesRef = useRef(null);
    const chatMessageInputRef = useRef(null);

    useEffect(() => {
        console.log('Connecting to WebSocket...');

          // "https://medcare.site/backend/api/"
        // "medcare.site/backend"

        chatSocket.current = new WebSocket(
            'wss://medcare.site/api/ws/' + roomName + '/'
        );
        
        // chatSocket.current = new WebSocket(
        //     'ws://127.0.0.1:8000/ws/' + roomName + '/'
        // );

        // chatSocket.current.onclose = function (e) {
        //     console.log('WebSocket connection closed');
        // };

        chatSocket.current.onmessage = function (e) {
            const data = JSON.parse(e.data);

            if (data.message) {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { username: data.username, message: data.message },
                ]);
                scrollToBottom();
            } else {
                alert('The message was empty!');
            }
        };

        chatMessageInputRef.current.focus();
        
        return () => {
            chatSocket.current.close();
            console.log('Closed WebSocket...');

        };
    }, [roomName]);

    const handleInputKeyUp = (e) => {
        if (e.keyCode === 13) {
            handleSendMessage(e);
        }
    };

    const handleSendMessage = (e) => {
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
            <div className='w-full h-full bg-white rounded-[5px] flex flex-col'>
                <div className='w-full bg-gray-100 h-5/6 overflow-y-auto'>
                    <div className="flex-1 chat-messages">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`${message.username === userName
                                        ? 'flex flex-col items-start' 
                                        : 'flex flex-col items-end'  
                                    } mb-2 max-w-2/6 p-2 rounded-lg bg-white shadow`}
                            >
                                <span className={`font-semibold text-${message.username === userName
                                        ? 'blue'  
                                        : 'green' 
                                    }-500`}>
                                    {message.username}:
                                </span>
                                <p>{message.message}</p>
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
                                    onKeyUp={handleInputKeyUp}
                                    ref={chatMessageInputRef}
                                />
                            </div>
                            <button className='w-1/6 h-full py-1 bg-blue-600 shadow-lg rounded-r-[10px]' onClick={handleSendMessage}>
                                <div className='h-full flex items-center justify-center bg-blue-600 text-white rounded-r-[10px]'>
                                    <FontAwesomeIcon icon={faPaperPlane} />
                                </div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

