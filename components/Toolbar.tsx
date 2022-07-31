import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import Rect from "./Rect";

export default function Toolbar() {
  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    const root = createRoot(document.getElementById("canvas")!);
    root.render(<Rect />);
  }
  return (
    <Box p={5} bg="gray.100" w={"fit-content"} h="100vh">
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
    </Box>
  );
}
