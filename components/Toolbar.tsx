import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CanvasContext } from "./CanvasProvider";
import Rect from "./Rect";

export default function Toolbar() {
  const [rectList, setRectList] = useState<JSX.Element[]>([]);
  const {
    addElement,
    elements,
    currentColor,
    setCurrentColor,
    elementPropertiesList,
  } = useContext(CanvasContext);

  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    addElement(<Rect key={elements?.length} />);
  }
  return (
    <Box
      bg="gray.100"
      w={"fit-content"}
      h="100vh"
      display={"flex"}
      flexDir="column"
      gap={"8"}
      py={"4"}
    >
      <List px={5}>
        <ListItem paddingBottom={2}>
          <Button
            colorScheme={"twitter"}
            color="white"
            onClick={handleClickRect}
          >
            Rect
          </Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button colorScheme={"twitter"} color="white">
            Square
          </Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button colorScheme={"twitter"} color="white">
            Square
          </Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button colorScheme={"twitter"} color="white">
            Square
          </Button>
        </ListItem>
      </List>
      {/*Layers*/}
      <List overflow={"auto"}>
        <ListItem w={"100%"} borderBottom="1px" p={"2"} fontWeight={"bold"}>
          Layers
        </ListItem>
        {elementPropertiesList.map((elemProperty, idx) => (
          <ListItem w={"100%"} borderBottom="1px" p={"2"}>
            {elemProperty.getAttribute("data-element")}
          </ListItem>
        ))}
      </List>
      {/*Color Picker*/}
      <Box display={"flex"} flexDir="row" gap={"2"}>
        <label>Color</label>
        <input
          type={"color"}
          onChange={(e) => setCurrentColor(e.target.value)}
        />
      </Box>
    </Box>
  );
}
