import React, { useRef, useEffect, useContext } from "react";
import { CanvasContext } from "./CanvasProvider";

export default function Rect() {
  const { setFocusedElement, currentColor } = useContext(CanvasContext);
  const ref = useRef<HTMLDivElement>(null);
  const backgroundColor = useRef(currentColor);
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  let offsetLeft = 0;
  let offsetTop = 0;
  function handleMouseMove(e: MouseEvent) {
    if (ref.current === null) return;
    const rectStyle = getComputedStyle(ref.current);

    if (offsetLeft === 0) offsetLeft = e.clientX - parseInt(rectStyle.left);
    if (offsetTop === 0) offsetTop = e.clientY - parseInt(rectStyle.top);

    //console.log(e.clientX, parseInt(rectStyle.left));
    ref.current.style.left = e.clientX - offsetLeft + "px";
    ref.current.style.top = e.clientY - offsetTop + "px";
  }
  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
    offsetLeft = 0;
    offsetTop = 0;
  }
  function handleMouseDown(e) {
    document.addEventListener("mouseup", handleMouseUp);
    if (ref.current === null) return;
    const position = ref.current.getBoundingClientRect();
    console.log({ mouseX: e.clientX });
    console.log({ squareX: position.right });
    if (position.right < e.clientX + 20 && position.top < e.clientY + 20)
      return;

    document.addEventListener("mousemove", handleMouseMove);
  }
  return (
    <div
      //onMouseUp={handleMouseUp}
      ref={ref}
      onMouseDown={handleMouseDown}
      data-element="rect"
      style={{ backgroundColor: backgroundColor.current }}
    >
      Rect
    </div>
  );
}
