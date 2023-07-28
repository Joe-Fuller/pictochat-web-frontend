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
    <div className="flex flex-col min-h-screen">
      <h1 className="text-2xl font-bold py-4 text-center fixed top-0 w-full">
        PictoChat
      </h1>
      <div className="flex flex-col flex-grow justify-center items-center">
        <ChatHistory />
      </div>
      <div className="flex-shrink-0 flex justify-center">
        <MessageInput
          nickname={nickname}
          className="bg-white p-4 overflow-hidden fixed bottom-0 left-0 right-0 w-full mobile:max-h-[70vh] mobile:overflow-y-auto"
        />
      </div>
    </div>
  );
}
