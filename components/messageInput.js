import { useState } from "react";
import io from "socket.io-client";
import DrawingArea from "./drawingArea";

const serverURL = "https://alike-easy-nightingale.glitch.me/";

export default function MessageInput({ nickname }) {
  const [inputValue, setInputValue] = useState("");
  const socket = io(serverURL);

  const handleMessageSend = () => {
    socket.emit("message", { nickname: nickname, message: inputValue });
    setInputValue("");
  };

  const handleDrawingSend = (dataURL) => {
    socket.emit("message", {
      nickname: nickname,
      message: `<img src="${dataURL}" />`,
    });
  };

  return (
    <div>
      {/* <input
        className="text-black"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={handleMessageSend}>Send</button> */}
      <DrawingArea handleDrawingSend={handleDrawingSend}></DrawingArea>
    </div>
  );
}
