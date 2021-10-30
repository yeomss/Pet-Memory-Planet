import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut, openMypage } from "../actions/user";
import useInput from "../hooks/useInput";
import axios from "axios";

import P5Wrapper from "react-p5-wrapper";
import particles from "../components/particles";
import earthBtn from "../styles/images/SVG/earth-btn.svg";
import Search from "./home/Search";
import MenuBar from "../components/MenuBar";
import Loading from "../components/Loading";

import "../styles/global.scss";
import "../styles/Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("login");
  const user = JSON.parse(localStorage.getItem("signup"));
  const planet = JSON.parse(localStorage.getItem("planet"));

  const [selected, onChangeSelected] = useInput("행성 번호"); // 검색 유형
  const [search, onChangeSearch] = useInput(""); // 검색 내용
  const [searchResult, setSearchResult] = useState(""); // 검색해서 나오는 결과

  // 행성 만들기 가용행성 수 확인
  const onClickNewPlanet = useCallback(() => {
    var nowNum = planet.length; // 현재 planet의 수
    var num = Number(user.data.numOfPets);

    if (num <= nowNum) {
      alert("가용할 수 있는 추모 행성이 없습니다.");
      window.location.reload();
    }

    /* 서버 코드
    axios
      .get(`http://52.78.18.110:8000/createplanetcheck?userToken=${token}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        window.location.replace("/");
        alert("더이상의 추모 행성을 만들 수 없습니다.");
      });*/
  }, [token]);

  // 검색 클릭 이벤트
  const onClickSearch = useCallback(() => {
    /*
    let url = `http://52.78.18.110:8000/searchPlanet?select=${selected}&content=${search}`;

    axios
      .get(url)
      .then((res) => {
        setSearchResult(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("검색 행성이 존재하지 않습니다.");
      });*/
  }, [selected, search, searchResult]);

  // 검색 엔터
  const onKeyPressSearch = useCallback(
    (e) => {
      if (e.key === "Enter") {
        onClickSearch();
      }
    },
    [search]
  );

  // 로그아웃 이벤트
  const onClickLogOut = useCallback(() => {
    dispatch(logOut());
    alert("로그아웃 성공!");
    window.location.replace("/");
  }, []);

  return (
    <div className={searchResult ? "home-search" : "home"}>
      {/* 1열 */}
      <div className={searchResult ? "none" : "first"}>
        {/* 마이 행성 페이지 */}
        <Link to="/myplanet">
          <div className="myplanet-btn">
            <div className="myplanet-title">추모행성</div>
          </div>
        </Link>
      </div>

      {/* 2열 */}
      <div className="second">
        {/* 새 행성 만들기 페이지 */}
        <Link to="/newplanet/info">
          <div
            className={searchResult ? "none" : "newplanet-btn"}
            onClick={onClickNewPlanet}
          >
            {/* <span className="material-icons">add</span> */}
            <div className="newplanet-title">
              행성
              <br />
              띄우기
            </div>
          </div>
        </Link>
        {/* 지구 게시판 페이지 */}
        <Link to="/earth/main">
          <div className={searchResult ? "none" : "earth-title"}>To Earth</div>
          <img className={searchResult ? "none" : "earth-btn"} src={earthBtn} />
        </Link>
        {/* 검색 */}
        <div className="search-area">
          <select
            placeholder="검색"
            value={selected}
            onChange={onChangeSelected}
          >
            <option value="행성 번호">행성 번호</option>
            <option value="행성 이름">행성 이름</option>
            <option value="사용자">사용자</option>
          </select>
          <input
            type="text"
            value={search}
            onChange={onChangeSearch}
            onKeyPress={onKeyPressSearch}
            placeholder="추억 그리고 행성"
          />
          <button onClick={onClickSearch}>검색</button>
        </div>
        {/* 로그아웃 페이지 */}
        <div
          className={searchResult ? "none" : "logout-btn"}
          onClick={onClickLogOut}
        >
          <div className="logout-title" style={{ color: "white" }}>
            로그아웃
          </div>
        </div>
      </div>

      {/* 3열 */}
      <div className={searchResult ? "none" : "third"}>
        {/* 마이 페이지 */}
        <Link to="/mypage/user">
          <div className={searchResult ? "none" : "mypage-btn"}>
            <div className="mypage-title">설정</div>
          </div>
        </Link>
      </div>

      {/* 검색 내용 */}
      {searchResult ? <Search data={searchResult} /> : null}

      {/* 메뉴 바 */}
      <MenuBar />
      <P5Wrapper sketch={particles} />
    </div>
  );
};

export default Home;
