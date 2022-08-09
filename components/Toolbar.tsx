import {
  AspectRatio,
  Box,
  Button,
  Grid,
  GridItem,
  List,
  ListItem,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { CanvasContext } from "./CanvasProvider";
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

  function handleClickRect(e: React.MouseEvent<HTMLButtonElement>) {
    addElement(<Rect key={elements?.length} />);
  }
  return (
    <Box
      bg="gray.100"
      w={"200px"}
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
            ></Button>
          </AspectRatio>
        </GridItem>
        <GridItem>
          <AspectRatio ratio={1} maxW="100px">
            <Button
              colorScheme={"twitter"}
              color="white"
              width={"100%"}
              backgroundColor={"white"}
              borderColor="twitter.400"
              border={"2px"}
              borderRadius="50%"
              variant="outline"
            ></Button>
          </AspectRatio>
        </GridItem>
      </Grid>
      {/*Layers*/}
      <List overflow={"auto"}>
        <ListItem w={"100%"} borderBottom="1px" p={"2"} fontWeight={"bold"}>
          Layers
        </ListItem>
        {elementPropertiesList.map((elemProperty, idx) => (
          <ListItem
            key={`layer-${idx}`}
            w={"100%"}
            borderBottom="1px"
            p={"2"}
            display="flex"
            alignItems={"center"}
            gap="2"
            cursor={"pointer"}
            _hover={{ backgroundColor: "var(--chakra-colors-blackAlpha-50)" }}
          >
            <Layer elemProperty={elemProperty} idx={idx} />
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
