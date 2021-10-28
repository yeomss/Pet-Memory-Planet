import { BrowserRouter, Route } from "react-router-dom";
import Earth from "./pages/Earth";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";

import MyPage from "./pages/MyPage";
import MyPlanet from "./pages/MyPlanet";
import NewPlanet from "./pages/NewPlanet";
import Petloss from "./pages/Petloss";
import Search from "./pages/Search";
import MyPlanetZoom from "./pages/MyPlanetZoom";
import MyPlanetInside from "./pages/MyPlanetInside";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/myplanet" component={MyPlanet} />
        <Route path="/newplanet" component={NewPlanet} />
        <Route path="/earth" component={Earth} />
        <Route path="/petloss" component={Petloss} />
        <Route path="/search" component={Search} />
        <Route path="/mypage" component={MyPage} />
        <Route path='/myplanetZoom/:planetId' component={MyPlanetZoom}/>
        <Route path='/myplanetInside/:planetId' component={MyPlanetInside}/>
      </BrowserRouter>
    </div>
  );
};

export default App;
