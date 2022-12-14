import React from "react";

export default function RotateIcon({
  width,
  height,
  color,
}: {
  width?: string | number;
  height?: string | number;
  color?: string;
}) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 8 8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z"
        fillRule="evenodd"
        fillOpacity="1"
        fill={color || "black"}
        stroke="none"
      />
    </svg>
  );
}
