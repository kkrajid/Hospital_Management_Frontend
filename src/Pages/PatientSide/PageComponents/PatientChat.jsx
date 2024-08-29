import React, { useState, useEffect, useRef } from 'react';
import { websocketbaseUrl } from '../../../api/UseAxios'
function PatientChat(props) {
  const { roomName, userName } = props;
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const chatSocket = useRef(null);
  const chatMessagesRef = useRef(null);
  const chatMessageInputRef = useRef(null);

  useEffect(() => {
    chatSocket.current = new WebSocket(`wss://${websocketbaseUrl}/ws/` + roomName + '/');
    // chatSocket.current = new WebSocket(
    //   'ws://127.0.0.1:8000/ws/' + roomName + '/'
    // );

    chatSocket.current.onclose = function (e) {
      console.log('WebSocket connection closed');
    };

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
    <div className="flex flex-col h-screen bg-white">
    <header className="p-4 bg-blue-500">
      <h1 className="text-2xl text-white">Hospital Chat</h1>
    </header>
    <div className="flex-1 flex overflow-hidden">
      <div className="lg:w-2/3 bg-gray-200 flex flex-col justify-end p-4">
        <div className="flex-1 overflow-y-auto chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${
                message.username === userName ? 'flex flex-col items-start' : 'flex flex-col items-end'
              } mb-2 max-w-2/6 p-2 rounded-lg bg-white shadow`}
            >
              <span className={`font-semibold text-${message.username === userName ? 'blue' : 'green'}-500`}>
                {message.username}:
              </span>
              <p>{message.message}</p>
            </div>
          ))}
        </div>
        <div className="p-4">
          <form onSubmit={handleSendMessage} className="flex">
            <input
              type="text"
              name="content"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              className="flex-1 mr-2 p-2 rounded-lg border"
              placeholder="Type a message..."
              id="chat-message-input"
              onKeyUp={handleInputKeyUp}
              ref={chatMessageInputRef}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              id="chat-message-submit"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </form>
        </div>
      </div>
  
      <aside className="lg:w-1/3 bg-gray-300 p-4">
        <h2 className="text-xl font-semibold">Hospital Info</h2>
        <p className="text-gray-600">
          Location: Main Hospital Building<br />
          Doctor on Call: Dr. Smith<br />
          Emergency Contact: 123-456-7890
        </p>
      </aside>
    </div>
  </div>
  

  );
}

export default PatientChat;
