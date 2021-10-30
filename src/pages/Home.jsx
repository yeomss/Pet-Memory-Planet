import React from "react";
import UnLogged from "./Logged/UnLogged";
import Logged from "./Logged/Logged";
import HomeBtn from "../components/HomeBtn";

import "../styles/Home.scss";

const Home = () => {
  const inToken = sessionStorage.getItem("userToken");

  return (
    <div className="home">
      {inToken ? <Logged /> : <UnLogged />} <HomeBtn />
    </div>
  );
  // return <div className="home">{inToken ? <UnLogged /> : <Logged />}</div>;
};

export default Home;
