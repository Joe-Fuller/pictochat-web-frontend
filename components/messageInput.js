import { useState } from "react";
import io from "socket.io-client";
import DrawingArea from "./drawingArea";

const serverURL = "http://localhost:3000";

export default function MessageInput({ nickname }) {
  const [inputValue, setInputValue] = useState("");
  const socket = io(serverURL);

  const handleMessageSend = () => {
    socket.emit("message", `${nickname}: ${inputValue}`);
    setInputValue("");
  };

  const handleDrawingSend = (dataURL) => {
    socket.emit("message", `${nickname}: <img src="${dataURL}" />`);
  };

  return (
    <div>
      <input
        className="text-black"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button>
      <DrawingArea handleDrawingSend={handleDrawingSend}></DrawingArea>
    </div>
  );
}
