import { useState, useEffect, useRef } from "react";

export default function Canvas({ handleDrawingSend }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const offscreenCanvasRef = useRef(null);
  const [selectedColour, setSelectedColour] = useState("black");
  const [lineWidth, setLineWidth] = useState(4);

  const draw = (ctx, x, y) => {
    ctx.lineWidth = lineWidth;
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

  const handleSelectLineWidth = (newLineWidth) => {
    setLineWidth(newLineWidth);
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
  }, [selectedColour, lineWidth]);

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

  const lineWidthOptions = [2, 4, 6, 8, 10, 12, 14, 16, 18];

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
      <div className="flex-col">
        {lineWidthOptions.map((width) => (
          <div
            key={width}
            className={`w-8 h-8 rounded cursor-pointer  ${
              selectedColour === "white" || selectedColour === "yellow"
                ? "bg-black"
                : "bg-white"
            } ${width === lineWidth ? "border-2 border-black" : ""}`}
            onClick={() => handleSelectLineWidth(width)}
          >
            <div
              className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              style={{
                width: `${width}px`,
                height: `${width}px`,
                borderRadius: "50%",
                backgroundColor: selectedColour,
              }}
            />
          </div>
        ))}
      </div>

      <button onClick={handleSendDrawing}>Send Drawing</button>
    </div>
  );
}
