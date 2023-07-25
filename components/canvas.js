import { useEffect, useRef } from "react";

export default function Canvas({ handleDrawingSend }) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const offscreenCanvasRef = useRef(null);

  const draw = (ctx, x, y) => {
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.strokeStyle = "black";
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

    handleDrawingSend(dataURL);
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
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const offscreenContext = offscreenCanvasRef.current.getContext("2d");
    offscreenContext.drawImage(canvas, 0, 0);
  }, [isDrawingRef.current]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        height={300}
        width={400}
        style={{ border: "1px solid black", backgroundColor: "white" }}
      ></canvas>
      <button onClick={handleSendDrawing}>Send Drawing</button>
    </div>
  );
}
