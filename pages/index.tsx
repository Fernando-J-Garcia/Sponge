import { Button } from "@chakra-ui/react";
import type { NextPage } from "next";
import Canvas from "../components/Canvas";
import { CanvasProvider } from "../components/CanvasProvider";
import Toolbar from "../components/Toolbar";

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
  return (
    <div className="home">
      <Button
        onClick={() => downloadInnerHtml(filename, "canvas", "text/html")}
        top="1"
        right="1"
        pos={"absolute"}
        colorScheme="linkedin"
      >
        Download HTML
      </Button>
      <CanvasProvider>
        <Toolbar />
        <Canvas />
      </CanvasProvider>
    </div>
  );
};

export default Home;
