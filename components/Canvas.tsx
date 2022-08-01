import React, { useContext } from "react";
import { CanvasContext } from "./CanvasProvider";

export default function Canvas() {
  const { elements, setElements } = useContext(CanvasContext);
  return <div id="canvas">{elements}</div>;
}
