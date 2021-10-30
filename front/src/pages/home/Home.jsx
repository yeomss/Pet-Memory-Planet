import React from "react";
import UnLogged from "../UnLogged";
import Logged from "../Logged";
import HomeBtn from "../../components/HomeBtn";

import "../../styles/Home.scss";

const Home = () => {
  const inToken = sessionStorage.getItem("userToken");

  return (
    <div className="home">
      {inToken ? <Logged /> : <Logged />} <HomeBtn />
    </div>
  );
};

export default Home;
