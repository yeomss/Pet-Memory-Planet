import React, { useCallback } from "react";
import { Link, Route } from "react-router-dom";
import HomeBtn from "../../components/HomeBtn";
import MyDelete from "../../components/MyDelete";
import MyPlanetInfo from "../../components/MyPlanetInfo";
import MyUserInfo from "../../components/MyUserInfo";
import "../../styles/MyPage.scss";

const MyPage = () => {
  return (
    <div className="mypage">
      <HomeBtn />

      <div className="mypage-container">
        <div className="menu-area">
          <div className="title">My Page</div>

          <Link to="/mypage/user">
            <div className="user-info">회원정보 수정</div>
          </Link>

          <Link to="/mypage/planet">
            <div className="planet-info">행성정보 수정</div>
          </Link>

          <Link to="/mypage/delete">
            <div className="delete">회원탈퇴</div>
          </Link>
        </div>

        <div className="content-area">
          <Route path="/mypage/user" component={MyUserInfo}></Route>
          <Route path="/mypage/planet" component={MyPlanetInfo}></Route>
          <Route path="/mypage/delete" component={MyDelete}></Route>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
