import { useState, useEffect, useRef } from "react";

export default function Canvas({ handleDrawingSend }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const offscreenCanvasRef = useRef(null);
  const [selectedColour, setSelectedColour] = useState("black");

  const draw = (ctx, x, y) => {
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = selectedColour;
    ctx.beginPath();
    ctx.moveTo(lastPositionRef.current.x, lastPositionRef.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPositionRef.current = { x, y };
  };

  const startDrawing = (e) => {
    isDrawingRef.current = true;
    const { offsetX, offsetY } = e.nativeEvent ? e.nativeEvent : e;
    lastPositionRef.current = { x: offsetX, y: offsetY };
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
  };

  const handleDrawing = (e) => {
    if (!isDrawingRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const { offsetX, offsetY } = e.nativeEvent ? e.nativeEvent : e;
    draw(context, offsetX, offsetY);
  };

  const handleSendDrawing = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    handleDrawingSend(dataURL);
  };

  const handleSelectColour = (colour) => {
    setSelectedColour(colour);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    offscreenCanvasRef.current = document.createElement("canvas");
    offscreenCanvasRef.current.width = canvas.width;
    offscreenCanvasRef.current.height = canvas.height;

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", handleDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mousemove", handleDrawing);
    };
  }, [selectedColour]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenContext = offscreenCanvasRef.current.getContext("2d");
    offscreenContext.drawImage(canvas, 0, 0);
  }, [isDrawingRef.current]);

  const colourOptions = [
    "black",
    "white",
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet",
  ];

  return (
    <div className="flex">
      <div className="flex-col">
        {colourOptions.map((colour) => (
          <div
            key={colour}
            className={`w-8 h-8 rounded cursor-pointer ${
              colour === selectedColour
                ? colour === "white"
                  ? "border-2 border-black"
                  : "border-2 border-white"
                : ""
            }`}
            style={{ backgroundColor: colour }}
            onClick={() => handleSelectColour(colour)}
          />
        ))}
      </div>
      <canvas
        className="border-1 border-black bg-white"
        ref={canvasRef}
        height={300}
        width={500}
      ></canvas>
      <button onClick={handleSendDrawing}>Send Drawing</button>
    </div>
  );
}
