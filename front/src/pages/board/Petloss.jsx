import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import HomeBtn from "../../components/HomeBtn";
import "../../styles/Petloss.scss";

export const Petloss = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeHeight();
    });
    return () => {};
  }, [height]);

  const resizeHeight = () => {
    setHeight(window.innerHeight);
  };

  return (
    <div className="petloss">
      {/* nav */}
      <div className="menu">
        <p>
          <a href="#head">펫로스 증후군이란 ?</a>
        </p>
        |
        <p>
          <a href="#cure">치료법</a>
        </p>
        |
        <p>
          <a href="#planet">추억 그리고 행성</a>
        </p>
        |
        <p>
          <a href="/">홈으로</a>
        </p>
      </div>

      {/* 헤더 */}
      <div id="head" style={{ height: height }}>
        <h1>펫로스 증후군</h1>
      </div>

      {/* 치료법 */}
      <div id="cure">치료법</div>

      {/* 추억 그리고 행성 소개 */}
      <div id="planet">추억 그리고 행성 소개</div>
    </div>
  );
};

export default Petloss;
