import { Box } from "@chakra-ui/react";
import React, { useState } from "react";
import NumberScrubber from "./NumberScrubber";
import RotateIcon from "./svgs/RotateIcon";
import ShadowIcon from "./svgs/ShadowIcon";

export default function Layer({
  elemProperty,
  idx,
  setElementPropertyRotation,
  setElementPropertyColor,
}: any) {
  const [rotation, setRotation] = useState(0);
  function onNumberScubberChange(value: number) {
    console.log(value % 360);
    setRotation(value % 360);
    setElementPropertyRotation((value % 360) + "deg", idx);
  }
  const rgbToHex = (rgb) =>
    "#" +
    rgb
      .match(/\d+/g)
      .map(function (x) {
        x = parseInt(x).toString(16);
        return x.length == 1 ? "0" + x : x;
      })
      .join("");
  return (
    <>
      {elemProperty.getAttribute("data-element")}
      <input
        type={"color"}
        defaultValue={rgbToHex(elemProperty.style.backgroundColor)}
        onChange={(e) => setElementPropertyColor(e.target.value, idx)}
      />
      <ShadowIcon
        width={"2ch"}
        height={"2ch"}
        color={"var(--chakra-colors-blackAlpha-600)"}
      />
      <NumberScrubber callback={onNumberScubberChange}>
        <Box
          display={"flex"}
          gap={"1"}
          alignItems={"center"}
          px={"2"}
          _hover={{ cursor: "e-resize", outline: "1px solid gray" }}
        >
          <RotateIcon
            width={"1.5ch"}
            height={"2ch"}
            color={"var(--chakra-colors-blackAlpha-600)"}
          />
          <span style={{ color: "var(--chakra-colors-blackAlpha-600)" }}>
            {rotation || 0}&#176;
          </span>
        </Box>
      </NumberScrubber>
    </>
  );
}
