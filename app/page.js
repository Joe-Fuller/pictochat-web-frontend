"use client";

import Canvas from "@/components/canvas";
import ChatHistory from "@/components/chatHistory";
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
      <Canvas></Canvas>
    </div>
  );
}
