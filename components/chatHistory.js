import { useEffect, useState, useReducer, useRef } from "react";
import io from "socket.io-client";
import Message from "./message";

const serverURL = "https://alike-easy-nightingale.glitch.me/";

const colourPairs = [
  { borderColour: "border-[#4b7b6f]", bgColour: "bg-[#d0f8ef]" },
  { borderColour: "border-[#5b5156]", bgColour: "bg-[#f6f1ea]" },
  { borderColour: "border-[#606c38]", bgColour: "bg-[#fbfffe]" },
  { borderColour: "border-[#af6c3e]", bgColour: "bg-[#fff5e1]" },
  { borderColour: "border-[#36413e]", bgColour: "bg-[#e8ffc1]" },
  { borderColour: "border-[#9e4f2b]", bgColour: "bg-[#fff7ec]" },
  { borderColour: "border-[#6b2e2f]", bgColour: "bg-[#fddfdf]" },
  { borderColour: "border-[#3b2e5a]", bgColour: "bg-[#fbf3fe]" },
];

const userColoursReducer = (state, action) => {
  switch (action.type) {
    case "SET_COLOUR":
      return {
        ...state,
        [action.nickname]: action.colourPair,
      };
    default:
      return state;
  }
};

export default function ChatHistory() {
  const [chatMessages, setChatMessages] = useState([]);
  const [userColours, dispatch] = useReducer(userColoursReducer, {});
  const chatContainerRef = useRef(null);
  const lastMessageRef = useRef(null);

  useEffect(() => {
    const socket = io(serverURL);

    socket.on("message", (message) => {
      setChatMessages((prevMessages) => [...prevMessages, message]);

      const { nickname } = message;
      if (!userColours[nickname]) {
        const randIndex = Math.floor(Math.random() * colourPairs.length);
        const colourPair = colourPairs[randIndex];
        dispatch({ type: "SET_COLOUR", nickname, colourPair });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [userColours]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <div ref={chatContainerRef} className="overflow-y-scroll">
      <ul>
        {chatMessages.map((message, index) => (
          <li key={index}>
            <Message
              message={message}
              colours={userColours[message.nickname]}
            ></Message>
            {index === chatMessages.length - 1 && <div ref={lastMessageRef} />}
          </li>
        ))}
      </ul>
    </div>
  );
}
