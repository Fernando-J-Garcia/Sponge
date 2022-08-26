import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  List,
  ListItem,
  useColorMode,
} from "@chakra-ui/react";
import React, { memo, useContext, useEffect, useRef, useState } from "react";
import { CanvasContext } from "./CanvasProvider";
import Eclipse from "./Eclipse";
import Layer from "./Layer";
import Rect from "./Rect";

export default function Toolbar() {
  const {
    addElement,
    elements,
    currentColor,
    setCurrentColor,
    elementPropertiesList,
  } = useContext(CanvasContext);
  const mount = useRef(false);
  const layerCount = useRef(0);
  const rectBtnRef = useRef<HTMLButtonElement>(null);
  const eclipseBtnRef = useRef<HTMLButtonElement>(null);
  const mouseCoords = { x: 0, y: 0 };
  useEffect(() => {
    if (mount.current) return;
    if (!mount.current) {
      mount.current = true;
    }
    const handleMouseMove = (e: MouseEvent) => {
      mouseCoords.x = e.pageX;
      mouseCoords.y = e.pageY;
    };
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousemove", handleMouseMove);
  }, []);

  const { colorMode, toggleColorMode } = useColorMode();

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === "q") {
      handleAddRect(mouseCoords.x, mouseCoords.y);
    }
    if (e.key === "w") {
      handleAddEclipse(mouseCoords.x, mouseCoords.y);
    }
  }

  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    handleAddRect(e.pageX, e.pageY);
  }
  function handleClickEclipse(e: React.MouseEvent<HTMLButtonElement>) {
    handleAddEclipse(e.pageX, e.pageY);
  }
  function handleAddRect(x: number, y: number) {
    layerCount.current++;
    if (!rectBtnRef.current) return;
    const width = rectBtnRef.current.clientWidth;
    const height = rectBtnRef.current.clientHeight;
    const startingPosX = x - width / 2;
    const startingPosY = y - height / 2;
    addElement(
      <Rect
        key={layerCount.current}
        startingPosX={startingPosX}
        startingPosY={startingPosY}
      />
    );
  }
  function handleAddEclipse(x: number, y: number) {
    layerCount.current++;
    if (!eclipseBtnRef.current) return;
    const width = eclipseBtnRef.current.clientWidth;
    const height = eclipseBtnRef.current.clientHeight;
    const startingPosX = x - width / 2;
    const startingPosY = y - height / 2;
    addElement(
      <Eclipse
        key={layerCount.current}
        startingPosX={startingPosX}
        startingPosY={startingPosY}
      />
    );
  }

  return (
    <Box
      bg={colorMode === "light" ? "gray.100" : "gray.600"}
      w={"300px"}
      h="100vh"
      display={"flex"}
      flexDir="column"
      gap={"8"}
      py={"4"}
    >
      <Grid px={5} templateColumns="repeat(2,1fr)" gap={"2"}>
        <GridItem>
          <AspectRatio ratio={1} maxW={"200px"}>
            <Button
              colorScheme={"twitter"}
              color="white"
              backgroundColor={"white"}
              borderColor="twitter.400"
              border={"2px"}
              variant="outline"
              onClick={handleClickRect}
              w="100%"
              ref={rectBtnRef}
            ></Button>
          </AspectRatio>
          <Box textAlign={"center"}>q</Box>
        </GridItem>
        <GridItem>
          <AspectRatio ratio={1} maxW="200px">
            <Button
              colorScheme={"twitter"}
              color="white"
              width={"100%"}
              backgroundColor={"white"}
              borderColor="twitter.400"
              border={"2px"}
              borderRadius="50%"
              variant="outline"
              onClick={handleClickEclipse}
              ref={eclipseBtnRef}
            ></Button>
          </AspectRatio>
          <Box textAlign={"center"}>w</Box>
        </GridItem>
      </Grid>
      {/*Layers*/}
      <List overflow={"auto"}>
        <ListItem w={"100%"} borderBottom="1px" p={"2"} fontWeight={"bold"}>
          Layers
        </ListItem>
        {elementPropertiesList.map((elemProperty, idx) => (
          <Layer elemProperty={elemProperty} idx={idx} key={`layer-${idx}`} />
        ))}
      </List>
      {/*Color Picker*/}
      <Box display={"flex"} flexDir="row" gap={"2"} px={2}>
        <label>Color</label>
        <input
          type={"color"}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </Box>
    </Box>
  );
}
