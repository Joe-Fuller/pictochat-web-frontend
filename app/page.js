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
    <div className="flex flex-col justify-center h-screen items-center">
      <h1 className="text-2xl font-bold py-4">PictoChat</h1>
      <div className="flex-1 overflow-y-scroll w-1/3">
        <ChatHistory />
      </div>
      <MessageInput nickname={nickname} className="bg-white p-4 w-1/3" />
    </div>
  );
}
