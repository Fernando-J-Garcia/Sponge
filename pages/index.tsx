import {
  Box,
  Button,
  IconButton,
  LightMode,
  useColorMode,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import Canvas from "../components/Canvas";
import { CanvasProvider } from "../components/CanvasProvider";
import Toolbar from "../components/Toolbar";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function downloadInnerHtml(filename: string, elId: string, mimeType: string) {
  var el = document.getElementById(elId);
  if (el === null) {
    console.error("No Element found with id ", elId);
    return;
  }
  const elHtml = el.innerHTML;
  var link = document.createElement("a");
  mimeType = mimeType || "text/plain";

  link.setAttribute("download", filename);
  link.setAttribute(
    "href",
    "data:" + mimeType + ";charset=utf-8," + encodeURIComponent(elHtml)
  );
  link.click();
}
const filename = "canvas.html";

const Home: NextPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div className="home">
      <Box top={1} right={1} pos="absolute">
        <IconButton
          aria-label={
            colorMode === "light"
              ? "switch to dark mode"
              : "switch to light mode"
          }
          icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          mr={2}
          onClick={() => toggleColorMode()}
        />
        <Button
          onClick={() => downloadInnerHtml(filename, "canvas", "text/html")}
          colorScheme="linkedin"
        >
          Download HTML
        </Button>
      </Box>
      <CanvasProvider>
        <Toolbar />
        <Canvas />
      </CanvasProvider>
    </div>
  );
};

export default Home;
