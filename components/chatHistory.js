import { useEffect, useState } from "react";
import io from "socket.io-client";
import Message from "./message";

const serverURL = "http://localhost:3000";

export default function ChatHistory() {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const socket = io(serverURL);

    socket.on("message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      <ul>
        {chatMessages.map((message, index) => (
          <Message key={index} message={message}></Message>
        ))}
      </ul>
    </div>
  );
}
