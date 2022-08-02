import {
  AspectRatio,
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  List,
  ListItem,
} from "@chakra-ui/react";
import { jsx } from "@emotion/react";
import React, { useContext, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { CanvasContext } from "./CanvasProvider";
import Rect from "./Rect";

const rgbToHex = (rgb) =>
  "#" +
  rgb
    .match(/\d+/g)
    .map(function (x) {
      x = parseInt(x).toString(16);
      return x.length == 1 ? "0" + x : x;
    })
    .join("");

export default function Toolbar() {
  const [rectList, setRectList] = useState<JSX.Element[]>([]);
  const {
    addElement,
    elements,
    currentColor,
    setCurrentColor,
    elementPropertiesList,
    setElementPropertyColor,
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
        {/* <GridItem>
          <Button colorScheme={"twitter"} color="white" w={"100%"}>
            Square
          </Button>
        </GridItem>
        <GridItem>
          <Button colorScheme={"twitter"} color="white" w={"100%"}>
            Square
          </Button>
        </GridItem> */}
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
            {elemProperty.getAttribute("data-element")}
            <input
              type={"color"}
              defaultValue={rgbToHex(elemProperty.style.backgroundColor)}
              onChange={(e) => setElementPropertyColor(e.target.value, idx)}
            />
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
