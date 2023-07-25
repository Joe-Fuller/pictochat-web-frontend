import { useEffect, useRef } from "react";
import io from "socket.io-client";
import Canvas from "./canvas";

const serverURL = "http://localhost:3000";

export default function DrawingArea() {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(serverURL);

    socket.current.on("drawing", (drawingData) => {});

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  const handleDrawing = (drawingData) => {
    socket.current.emit("drawing", drawingData);
  };

  return (
    <div>
      <Canvas></Canvas>
    </div>
  );
}
