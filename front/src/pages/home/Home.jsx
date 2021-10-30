import React from "react";
import UnLogged from "../UnLogged";
import Logged from "../Logged";
import HomeBtn from "../../components/HomeBtn";

import "../../styles/Home.scss";

const Home = () => {
  const inToken = localStorage.getItem("login");

  return (
    <div className="home">
      {inToken ? <Logged /> : <UnLogged />} <HomeBtn />
    </div>
  );
};

export default Home;
