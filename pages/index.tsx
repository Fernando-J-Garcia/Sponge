import type { NextPage } from "next";
import Canvas from "../components/Canvas";
import { CanvasProvider } from "../components/CanvasProvider";
import Toolbar from "../components/Toolbar";

const Home: NextPage = () => {
  return (
    <div className="home">
      <CanvasProvider>
        <Toolbar />
        <Canvas />
      </CanvasProvider>
    </div>
  );
};

export default Home;
