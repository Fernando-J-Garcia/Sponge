import React, { useRef, useEffect } from "react";

export default function Rect() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  const style = {
    width: "100px",
    height: "100px",
    top: "0px",
    left: "0px",
    position: "absolute",
    backgroundColor: "red",
    resize: "both",
  };
  let offsetLeft = 0;
  let offsetTop = 0;
  function handleMouseMove(e: MouseEvent) {
    if (ref.current === null) return;
    const rectStyle = getComputedStyle(ref.current);

    if (offsetLeft === 0) offsetLeft = e.clientX - parseInt(rectStyle.left);
    if (offsetTop === 0) offsetTop = e.clientY - parseInt(rectStyle.top);

    console.log(e.clientX, parseInt(rectStyle.left));
    ref.current.style.left = e.clientX - offsetLeft + "px";
    ref.current.style.top = e.clientY - offsetTop + "px";
  }
  function handleMouseUp() {
    document.removeEventListener("mousemove", handleMouseMove);
    offsetLeft = 0;
    offsetTop = 0;
  }
  function handleMouseDown() {
    document.addEventListener("mousemove", handleMouseMove);
  }
  return (
    <div
      style={style}
      onMouseUp={handleMouseUp}
      ref={ref}
      onMouseDown={handleMouseDown}
    >
      Rect
    </div>
  );
}
