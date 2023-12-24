import React, { useState, useEffect, useRef } from 'react';
import { websocketbaseUrl, baseURL } from '../../../api/UseAxios';

function DoctorChat({ room, id }) {
    const roomName = 'DP' + room;
    const userName = id;

    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const chatSocket = useRef(null);
    const chatMessagesRef = useRef(null);
    const chatMessageInputRef = useRef(null);

    const MAX_MESSAGE_LENGTH = 200; // Adjust the maximum length as needed

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

        const trimmedMessage = messageInput.trim();

        if (trimmedMessage === "") {
            // Do not send empty messages
            return;
        }

        const limitedMessage = trimmedMessage.substring(0, MAX_MESSAGE_LENGTH);

        chatSocket.current.send(
            JSON.stringify({
                message: limitedMessage,
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
                                <div className='bg-white w-3/6 rounded-[8px] p-2 shadow-lg' style={{
                                    overflowWrap: 'break-word',
                                    borderTopLeftRadius: message.username === userName ? '0' : '8px',
                                }}>
                                    <span className={`text-sm font-semibold font-mono ${message.username === userName ? 'text-red-500' : ''
                                        }`}>
                                        ~{message.username === userName ? "You" : "Patient"}
                                    </span>
                                    <p className='px-3'>
                                        {message.message.includes('http') ? (
                                            <a href={message.message} className='text-blue-500' target='_blank' rel='noopener noreferrer'>
                                                {message.message}
                                            </a>
                                        ) : (
                                            message.message
                                        )}
                                    </p>
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



export default DoctorChat