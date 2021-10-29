import { Route } from "react-router-dom";
import RecoverBoard from "./Boards/Recover";
import EarthMain from "./Boards/Main";
import "../styles/Earth.scss";

const Earth = () => {
  return (
    <div className="earth">
      <Route path="/earth/main" component={EarthMain} />
      <Route path="/earth/recover" component={RecoverBoard} />
    </div>
  );
};

export default Earth;
