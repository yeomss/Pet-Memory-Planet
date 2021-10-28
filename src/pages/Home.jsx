import React from "react";

import UnLogged from "./Logged/UnLogged";
import Logged from "./Logged/Logged";

import "../styles/Home.scss";

const Home = () => {
  const inToken = sessionStorage.getItem("userToken");

  return <div className="home">{inToken ? <Logged /> : <UnLogged />}</div>;
};

export default Home;
