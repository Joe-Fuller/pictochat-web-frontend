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
    <div>
      <h1>PictoChat</h1>
      <ChatHistory></ChatHistory>
      <MessageInput nickname={nickname}></MessageInput>
    </div>
  );
}
