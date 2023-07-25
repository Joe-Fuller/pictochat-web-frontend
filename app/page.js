"use client";

import Chat from "@/components/chat";
import { useState, useEffect } from "react";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const user = prompt("Enter your username:");
    setUsername(user);
  }, []);

  return (
    <div>
      <h1>PictoChat</h1>
      <Chat username={username}></Chat>
    </div>
  );
}
