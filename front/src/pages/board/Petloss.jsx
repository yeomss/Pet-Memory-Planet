import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import HomeBtn from "../../components/HomeBtn";
import "../../styles/Petloss.scss";

export const Petloss = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const saElementList = document.querySelector(".sa");

  console.log(saElementList);

  useEffect(() => {
    window.addEventListener("resize", () => {
      resizeHeight();
    });
    return () => {};
  }, [height]);

  const resizeHeight = () => {
    setHeight(window.innerHeight);
  };

  const animation = () => {};

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
        <div className="background"></div>
        <div className="text">
          <h1 className="title">펫로스 증후군(pet-loss 症候群):</h1>
          <p className="sub">
            반려동물들이 죽거나 교통사고 또는 도난 등을 당한 시점부터
            <br />
            생겨난 상실감을 계기로 일어나는 각종 질환 및 심신 증세
          </p>
        </div>
      </div>

      {/* 치료법 */}
      <div id="cure" style={{ height: height }}>
        <div className="sa sa-down">감추지마세요</div>
        <div className="sa sa-down">추억을 표현해요</div>
        <div className="sa sa-down">마음에 보관해요</div>
      </div>

      {/* 추억 그리고 행성 소개 */}
      <div id="planet" style={{ height: height }}>
        추억 그리고 행성 소개
      </div>
    </div>
  );
};

export default Petloss;
