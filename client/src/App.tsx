import { useState } from "react";
import "./App.css";
import { io } from "socket.io-client";
import Chat from "./Chat";

const socket = io("http://localhost:3000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joiChatContainer">
          <h3>Join Chat</h3>
          <input
            type="text"
            placeholder="send here..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="room id..."
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={joinRoom}>Join a Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room}></Chat>
      )}
    </div>
  );
}

export default App;
