import { useEffect, useState } from "react";
import io from "socket.io-client";

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
          <li key={index} dangerouslySetInnerHTML={{ __html: message }}></li>
        ))}
      </ul>
    </div>
  );
}
