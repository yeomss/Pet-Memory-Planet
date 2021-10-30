import { BrowserRouter, Route } from "react-router-dom";
import Earth from "./views/Boards/Earth";
import Home from "./views/Main/HomeView";
import SignUp from "./views/Main/SignUpView";
import MyPage from "./views/Main/MyPage";
import MyPlanet from "./views/Planet/MyPlanet";
import NewPlanet from "./views/Planet/NewPlanet";
import Petloss from "./views/Boards/Petloss";
import Search from "./views/Main/Search";
// import MyPlanetZoom from "./views/Planet/MyPlanetZoom";
// import MyPlanetInside from "./views/Planet/MyPlanetInside";

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
        {/* <Route path="/myplanetZoom/:planetId" component={MyPlanetZoom} /> */}
        {/* <Route path="/myplanetInside/:planetId" component={MyPlanetInside} /> */}
      </BrowserRouter>
    </div>
  );
};

export default App;
