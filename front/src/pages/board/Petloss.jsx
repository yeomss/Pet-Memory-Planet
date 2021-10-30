import React from "react";
import { Route } from "react-router";
import HomeBtn from "../../components/HomeBtn";
import "../../styles/Petloss.scss";

export const Petloss = () => {
  return (
    <div className="petloss">
      <div className="menu">
        <p>
          <a href="#content">펫로스 증후군이란 ?</a>
        </p>
        | <p>하이루</p> |<p>하이루</p>
        <HomeBtn />
      </div>
      <div className="head">펫로스 헤더</div>
      <div id="content">펫 로스 컨텐트</div>
      <div className="footer">펫 로스 푸터</div>
    </div>
  );
};

export default Petloss;
