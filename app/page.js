"use client";

import ChatHistory from "@/components/chatHistory";
import MessageInput from "@/components/messageInput";
import { useState, useEffect } from "react";

export default function Home() {
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const nick = prompt("Enter your nickname:");
    setNickname(nick);
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen mobile:min-h-full overflow-hidden">
      <h1 className="text-2xl font-bold py-4">PictoChat</h1>
      <ChatHistory />
      <div className="flex-grow"> </div>
      <MessageInput nickname={nickname} className="bg-white p-4" />
    </div>
  );
}
