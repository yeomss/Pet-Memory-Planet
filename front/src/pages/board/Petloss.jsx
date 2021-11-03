/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState, useRef } from "react";
import { Route } from "react-router";
import "../../styles/Petloss.scss";
import logo from "../../assets/logo-background.png";

export const Petloss = () => {
  const [height, setHeight] = useState(window.innerHeight);
  const refs = useRef([]);

  useEffect(() => {
    // 화면 resize
    window.addEventListener("resize", () => {
      resizeHeight();
    });

    // cure 부분 div 애니메이션
    window.addEventListener("load", animation);
    window.addEventListener("scroll", animation);
    return () => {};
  }, [height]);

  // 화면 resize 이벤트
  const resizeHeight = () => {
    setHeight(window.innerHeight);
  };

  // 애니메이션
  const animation = () => {
    for (var i = 0; i < refs.current.length; i++) {
      var el = refs.current[i];
      if (el) {
        if (!el.classList.contains("show")) {
          if (window.innerHeight > el.getBoundingClientRect().top) {
            el.classList.add("show");
          }
        }
      }
    }
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
          <a href="#cure">극복하는 방법</a>
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
      {/* <div
        className="cure-title sa sa-right"
        ref={(el) => (refs.current[4] = el)}
      >
        극복하는 방법
      </div> */}
      <div id="cure" style={{ height: height }}>
        <div className="sa sa-up" ref={(el) => (refs.current[0] = el)}>
          <p>
            <img
              className="img"
              src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/apple/285/speak-no-evil-monkey_1f64a.png"
            />
          </p>
          <p>감추지 마세요</p>
        </div>
        <div className="sa sa-up" ref={(el) => (refs.current[1] = el)}>
          <img
            className="rainbow"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/samsung/306/rainbow_1f308.png"
          />
          <p>추억을 표현해요</p>
        </div>
        <div
          className="img"
          className="sa sa-up"
          ref={(el) => (refs.current[2] = el)}
        >
          <img
            className="img"
            src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/304/palms-up-together_1f932.png"
          />
          <p>놓아줘요</p>
        </div>
      </div>

      {/* 추억 그리고 행성 소개 */}
      <div id="planet" style={{ height: height }}>
        <img src={logo} />
        <div className="sa sa-down text" ref={(el) => (refs.current[3] = el)}>
          “추억 그리고 행성” 에서
          <br />
          이제 당신의 마음을 추스리세요
        </div>
      </div>
    </div>
  );
};

export default Petloss;
