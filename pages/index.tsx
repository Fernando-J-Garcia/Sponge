import type { NextPage } from "next";
import Toolbar from "../components/Toolbar";

const Home: NextPage = () => {
  return (
    <div className="home">
      <Toolbar />
      <div id="canvas"></div>
    </div>
  );
};

export default Home;
