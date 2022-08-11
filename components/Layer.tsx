import {
  Box,
  Button,
  FormLabel,
  Input,
  ListItem,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
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
import React, { useContext, useMemo, useRef, useState } from "react";
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
  const bsColor = useRef("#000000");

  function onRotationScubberChange(value: number) {
    setRotation(value % 360);
    setElementPropertyRotation((value % 360) + "deg", idx);
  }
  function onBsOffsetYChange(value: number) {
    setBsOffsetY(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor.current,
      idx
    );
  }
  function onBsOffsetXChange(value: number) {
    setBsOffsetX(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor.current,
      idx
    );
  }
  function onBsBlurChange(value: number) {
    setBsBlur(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor.current,
      idx
    );
  }
  function onBsSpreadChange(value: number) {
    setBsSpread(value);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor.current,
      idx
    );
  }
  function onBsColorChange(value: string) {
    bsColor.current = value;
    console.log(bsColor.current);
    setElementPropertyBoxShadow(
      bsOffsetX,
      bsOffsetY,
      bsBlur,
      bsSpread,
      bsColor.current,
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
  return useMemo(
    () => (
      <ListItem
        w={"100%"}
        borderBottom="1px"
        p={"2"}
        display="flex"
        alignItems={"center"}
        gap="2"
        cursor={"pointer"}
        _hover={{ backgroundColor: "var(--chakra-colors-blackAlpha-50)" }}
      >
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
                  <NumberInput
                    value={bsOffsetY}
                    onChange={(value) => onBsOffsetYChange(parseInt(value))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <FormLabel>OffsetX</FormLabel>
                  <NumberInput
                    value={bsOffsetX}
                    onChange={(value) => onBsOffsetXChange(parseInt(value))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormLabel>Blur</FormLabel>
                  <NumberInput
                    value={bsBlur}
                    onChange={(value) => onBsBlurChange(parseInt(value))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormLabel>Spread</FormLabel>
                  <NumberInput
                    value={bsSpread}
                    onChange={(value) => onBsSpreadChange(parseInt(value))}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <FormLabel>Color</FormLabel>
                  <input
                    defaultValue={bsColor.current}
                    type="color"
                    onChange={(e) => onBsColorChange(e.target.value)}
                  />
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
      </ListItem>
    ),
    [idx, rotation, bsOffsetX, bsOffsetY, bsBlur, bsSpread]
  );
}
