import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CanvasContext } from "./CanvasProvider";
import Rect from "./Rect";

export default function Toolbar() {
  const [rectList, setRectList] = useState<JSX.Element[]>([]);
  const { addElement, elements, currentColor, setCurrentColor } =
    useContext(CanvasContext);

  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    addElement(<Rect key={elements?.length} />);
  }
  return (
    <Box
      p={5}
      bg="gray.100"
      w={"fit-content"}
      h="100vh"
      display={"flex"}
      flexDir="row"
      gap={"8"}
    >
      <List>
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
