import React from "react";

import UnLogged from "../UnLoggedView";
import Logged from "../LoggedView";

import "../../styles/Home.scss";

const Home = () => {
  const inToken = sessionStorage.getItem("userToken");

  return <div className="home">{inToken ? <Logged /> : <UnLogged />}</div>;
};

export default Home;
