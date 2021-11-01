import { BrowserRouter, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import SignUp from "./pages/home/SignUp";
import MyPage from "./pages/home/MyPage";
import Search from "./pages/home/Search";

import Earth from "./pages/board/Earth";
import Petloss from "./pages/board/Petloss";

import MyPlanet from "./pages/planet/MyPlanet";
import NewPlanet from "./pages/planet/NewPlanet";
// import MyPlanetZoom from "./pages/planet/MyPlanetZoom";
// import MyPlanetInside from "./pages/planet/MyPlanetInside";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/mypage" component={MyPage} />
        <Route path="/earth" component={Earth} />
        <Route path="/petloss" component={Petloss} />
        <Route path="/search" component={Search} />
        <Route path="/newplanet" component={NewPlanet} />

        <Route path="/myplanet" component={MyPlanet} />
        {/* <Route path="/myplanetZoom/:planetId" component={MyPlanetZoom} /> */}
        {/* <Route path="/myplanetInside/:planetId" component={MyPlanetInside} /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
