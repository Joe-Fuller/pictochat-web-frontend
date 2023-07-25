"use client";

import { useEffect, useState } from "react";
import io from "socket.io-client";

const serverURL = "http://localhost:3000";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const socket = io(serverURL);

  useEffect(() => {
    const messageListener = (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("message", messageListener);

    return () => {
      socket.off("message", messageListener);
    };
  }, []);

  const handleMessageSend = () => {
    socket.emit("message", inputValue);
    setInputValue("");
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
      <div>
        <input
          className="text-black"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        ></input>
        <button onClick={handleMessageSend}>Send</button>
      </div>
    </div>
  );
}
