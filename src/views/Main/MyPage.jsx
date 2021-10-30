import React, { useCallback } from "react";
import { Link, Route } from "react-router-dom";
import MyDelete from "../../components/MyDelete";
import MyPlanetInfo from "../../components/MyPlanetInfo";
import MyUserInfo from "../../components/MyUserInfo";
import "../../styles/MyPage.scss";

const MyPage = () => {
  return (
    <div className="mypage">
      <div className="mypage-container">
        <div className="menu-area">
          <div className="title">메뉴</div>
          <div className="user-info">
            <Link to="/mypage/user">회원정보수정</Link>
          </div>
          <div className="planet-info">
            <Link to="/mypage/planet">행성정보수정</Link>
          </div>
          <div className="delete">
            <Link to="/mypage/delete">회원정보탈퇴</Link>
          </div>
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
