import React, { useRef, useEffect, useContext } from "react";
import { CanvasContext } from "./CanvasProvider";

export default function Rect() {
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
    addElementProperty(ref.current);
    setFocusedElement(ref.current);
  }, []);
  function handleMouseDown(e) {
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
