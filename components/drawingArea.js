import io from "socket.io-client";
import Canvas from "./canvas";

const serverURL = "http://localhost:3000";

export default function DrawingArea() {
  const socket = io(serverURL);

  const handleDrawingSend = (dataURL) => {
    socket.emit("message", `<img src="${dataURL}" />`);
  };

  return (
    <div>
      <Canvas handleDrawingSend={handleDrawingSend}></Canvas>
    </div>
  );
}
