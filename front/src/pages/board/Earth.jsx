import { Route } from "react-router-dom";
import RecoverBoard from "./Recover";
import EarthMain from "./Main";
import "../../styles/Earth.scss";

const Earth = () => {
  return (
    <div className="earth">
      <Route path="/earth/main" component={EarthMain} />
      <Route path="/earth/recover" component={RecoverBoard} />
    </div>
  );
};

export default Earth;
