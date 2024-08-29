
import PatientSideBar from './PageComponents/PatientSideBar'
import PatientChat from './PageComponents/PatientChat'
import React, { useState } from 'react';


function PatientChatPage() {
  const [roomName, setRoomName] = useState('');
  const [userName, setUserName] = useState('');
  const [enteredRoom, setEnteredRoom] = useState(false);

  const handleRoomNameChange = (event) => {
    setRoomName(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEnterRoom = () => {
    // Check if both roomName and userName are set before entering the room
    if (roomName && userName) {
      setEnteredRoom(true);
    }
  };

  return (
    <div>
      {!enteredRoom ? (
        <div>
          <div>
            <label htmlFor="roomName">Room Name:</label>
            <input
              type="text"
              id="roomName"
              value={roomName}
              onChange={handleRoomNameChange}
            />
          </div>
          <div>
            <label htmlFor="userName">Username:</label>
            <input
              type="text"
              id="userName"
              value={userName}
              onChange={handleUserNameChange}
            />
          </div>
          <button onClick={handleEnterRoom}>Enter Room</button>
        </div>
      ) : (
        <PatientSideBar child={<PatientChat roomName={roomName} userName={userName} />} />
      )}
    </div>
  );
}

export default PatientChatPage;
