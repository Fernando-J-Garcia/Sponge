import React, { useRef, useEffect, useContext } from "react";
import { CanvasContext } from "./CanvasProvider";

interface IRectProps {
  startingPosX: number;
  startingPosY: number;
}

export default function Rect({ startingPosX, startingPosY }: IRectProps) {
  const { setFocusedElement, currentColor, addElementProperty } =
    useContext(CanvasContext);
  const ref = useRef<HTMLDivElement>(null);
  const onMount = useRef(true);
  const backgroundColor = useRef(currentColor);
  useEffect(() => {
    if (onMount.current === false) {
      return;
    }
    onMount.current = false;
    if (ref.current === null) return;
    ref.current.style.left = startingPosX + "px";
    ref.current.style.top = startingPosY + "px";

    addElementProperty(ref.current);
    setFocusedElement(ref.current);
  }, []);
  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    if (ref.current === null) return;
    const position = ref.current.getBoundingClientRect();
    if (position.right < e.clientX + 20 && position.top < e.clientY + 20)
      return;
    setFocusedElement(ref.current);
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      ref={ref}
      data-element="rect"
      style={{ backgroundColor: backgroundColor.current }}
    ></div>
  );
}
