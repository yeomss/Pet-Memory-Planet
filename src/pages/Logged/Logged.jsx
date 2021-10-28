import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles";
import earthBtn from "../../styles/images/SVG/earth-btn.svg";

import "../../styles/global.scss";
import "../../styles/Home.scss";

import MenuBar from "../../components/MenuBar";
import { logOut, openMypage } from "../../actions/user";

const Home = () => {
  const dispatch = useDispatch();

  // 로그아웃 이벤트
  const onClickLogOut = useCallback(() => {
    dispatch(logOut());
    alert("로그아웃 성공!");
    sessionStorage.removeItem("userToken");
    sessionStorage.removeItem("planetToken");
    window.location.replace("/");
  }, []);

  // test
  const onTest = () => {
    let tmp = document.getElementsByClassName("search-btn");
    tmp[0].click();
    console.log("스크롤");
    console.log(tmp[0]);
  };

  //   // 마이페이지 userInfo 가져오기
  //   const onClickUserInfo = useCallback(() => {
  //     let token = sessionStorage.getItem("token");
  //     console.log(
  //       "url: ",
  //       `http://52.78.18.110:8000/showuserinfo?userToken=${token}`
  //     );

  //     axios
  //       .get(`http://52.78.18.110:8000/showuserinfo?userToken=${token}`)
  //       .then((res) => {
  //         console.log(res);

  //         dispatch(
  //           openMypage({
  //             userInfo: res.data,
  //           })
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  return (
    <div className="home" onWheel={onTest}>
      {/* 1열 */}
      <div className="first">
        {/* 마이 행성 페이지 */}
        <Link to="/myplanet">
          <div className="myplanet-btn">
            <div className="myplanet-title">
              <span>My</span>
              <br />
              <span>Planet</span>
            </div>
          </div>
        </Link>
      </div>

      {/* 2열 */}
      <div className="second">
        {/* 새 행성 만들기 페이지 */}
        <Link to="/newplanet/info">
          <div className="newplanet-btn">
            {/* <span className="material-icons">add</span> */}
            <div className="newplanet-title">
              <span>추모 행성</span>
            </div>
          </div>
        </Link>
        {/* 지구 게시판 페이지 */}
        <Link to="/earth/main">
          <div className="earth-title">To Earth</div>
          <img className="earth-btn" src={earthBtn} />
        </Link>
        {/* 로그아웃 페이지 */}
        <div className="logout-btn" onClick={onClickLogOut}>
          <div className="logout-title" style={{ color: "white" }}>
            LogOut
          </div>
        </div>
      </div>

      {/* 3열 */}
      <div className="third">
        {/* 마이 페이지 */}
        <Link to="/mypage/user">
          <div className="mypage-btn">
            <div className="mypage-title">
              <span>My</span>
              <br />
              <span>Page</span>
            </div>
          </div>
        </Link>
      </div>

      {/* temp 검색 페이지 */}
      <Link className="search-btn" to="search">
        <div>하이</div>
      </Link>

      {/* <MenuBar /> */}
      <P5Wrapper sketch={particles} />
    </div>
  );
};

export default Home;
