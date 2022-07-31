import { Box, Button, Container, List, ListItem } from "@chakra-ui/react";
import React from "react";

export default function Toolbar() {
  return (
    <Box p={5} bg="gray.100" w={"fit-content"} h="100vh">
      <List>
        <ListItem paddingBottom={2}>
          <Button>Square</Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button>Square</Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button>Square</Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button>Square</Button>
        </ListItem>
        <ListItem paddingBottom={2}>
          <Button>Square</Button>
        </ListItem>
      </List>
    </Box>
  );
}
