import Canvas from "./canvas";

export default function DrawingArea({ handleDrawingSend }) {
  return (
    <div>
      <Canvas handleDrawingSend={handleDrawingSend}></Canvas>
    </div>
  );
}
