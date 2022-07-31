import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";
import React from "react";

export default function Toolbar() {
  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    //TODO: Put into seperate component so that its really easy in the future
    //to add controls like resizing etc..
    const rect = document.createElement("div");
    rect.style.width = "100px";
    rect.style.height = "100px";
    rect.style.left = "0";
    rect.style.top = "0";
    rect.style.position = "absolute";
    rect.style.backgroundColor = "red";
    document.querySelector(".home")?.append(rect);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    function handleMouseMove(event: MouseEvent) {
      rect.style.left = event.clientX + "px";
      rect.style.top = event.clientY + "px";
    }
    function handleMouseUp() {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousemove", handleMouseMove);
    }
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
