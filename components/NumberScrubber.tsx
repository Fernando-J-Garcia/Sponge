import React, { Children, useEffect, useRef } from "react";

interface INumberScrubber {
  children: any;
  callback: (value: number) => void;
}

export default function NumberScrubber({
  children,
  callback,
}: INumberScrubber) {
  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);
  const mouseEvents = useRef<HTMLDivElement>(null);
  let startingPosX = 0;
  const mouseDown = useRef(false);
  const startingValue = useRef(0);
  const value = useRef(0);

  function handleMouseDown(e: React.MouseEvent<HTMLDivElement>) {
    mouseDown.current = true;
    startingPosX = e.clientX;
    startingValue.current = value.current;
    if (mouseEvents.current) {
      mouseEvents.current.style.display = "block";
    }
  }
  function handleMouseUp(e: MouseEvent) {
    mouseDown.current = false;
    if (mouseEvents.current) {
      mouseEvents.current.style.display = "none";
    }
  }
  function handleMouseMove(e: MouseEvent) {
    if (mouseDown.current) {
      value.current = startingValue.current + e.clientX - startingPosX;
      callback(value.current);
    }
  }
  return (
    <div
      onMouseDown={handleMouseDown}
      datatype="number-scrubber"
      style={{ userSelect: "none" }}
    >
      {children}
      <div
        ref={mouseEvents}
        id="number-scrubber-mouse-events"
        style={{
          display: "none",
          position: "absolute",
          left: "0",
          top: "0",
          width: "100vw",
          height: "100vh",
          zIndex: "9999",
          cursor: "e-resize",
        }}
      />
    </div>
  );
}
