import {
  Box,
  Button,
  FormLabel,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { CanvasContext } from "./CanvasProvider";
import NumberScrubber from "./NumberScrubber";
import RotateIcon from "./svgs/RotateIcon";
import ShadowIcon from "./svgs/ShadowIcon";

export default function Layer({ elemProperty, idx }: any) {
  const {
    setElementPropertyColor,
    setElementPropertyRotation,
    setElementPropertyBoxShadow,
  } = useContext(CanvasContext);
  const [rotation, setRotation] = useState(0);

  const [bsOffsetX, setBsOffsetX] = useState(0);
  const [bsOffsetY, setBsOffsetY] = useState(0);
  const [bsBlur, setBsBlur] = useState(0);
  const [bsSpread, setBsSpread] = useState(0);
  const [bsColor, setBsColor] = useState("#000000");

  function onRotationScubberChange(value: number) {
    setRotation(value % 360);
    setElementPropertyRotation((value % 360) + "deg", idx);
  }
  function onBsOffsetYScrubberChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor,
      idx
    );
  }
  function onBsOffsetXScrubberChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor,
      idx
    );
  }
  function onBsBlurScrubberChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor,
      idx
    );
  }
  function onBSpreadScrubberChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor,
      idx
    );
  }
  function onBsColorScrubberChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor,
      idx
    );
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
      <Popover>
        <PopoverTrigger>
          <Button>
            <ShadowIcon
              width={"2ch"}
              height={"2ch"}
              color={"var(--chakra-colors-blackAlpha-600)"}
            />
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>Shadow Properties</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Stack>
                <FormLabel>OffsetY</FormLabel>
                <Input defaultValue={bsOffsetY} />
                <FormLabel>OffsetX</FormLabel>
                <Input defaultValue={bsOffsetX} />
                <FormLabel>Blur</FormLabel>
                <Input defaultValue={bsBlur} />
                <FormLabel>Spread</FormLabel>
                <Input defaultValue={bsSpread} />
                <FormLabel>Color</FormLabel>
                <input defaultValue={bsColor} type="color" />
              </Stack>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <NumberScrubber callback={onRotationScubberChange}>
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
