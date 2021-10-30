import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginModalOpen } from "../../actions/modal";
import LoginModal from "../../components/LoginModal";

import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles";
import earthBtn from "../../styles/images/SVG/earth-btn.svg";

import "../../styles/global.scss";
import "../../styles/Home.scss";
import MenuBar from "../../components/MenuBar";
import MenuBarContents from "../../components/MenuBarContents";

const UnLogged = () => {
  const dispatch = useDispatch();
  const isLoginModalOpen = useSelector((state) => state.modal.isLoginModalOpen);

  // 로그인 모달 오픈
  const LoginModalOpen = useCallback(() => {
    dispatch(
      loginModalOpen({
        isLoginModalOpen: true,
      })
    );
  }, []);

  return (
    <div className="home">
      <div className="first">
        {/* 로그인 버튼 */}
        <div className="login-btn " onClick={LoginModalOpen}>
          <div className="login-title" style={{ color: "white" }}>
            Login
          </div>
        </div>
      </div>

      {/* 로그인 모달 창 뜨는 부분 */}
      {isLoginModalOpen ? (
        <div className="modal">
          <LoginModal />
        </div>
      ) : null}

      <div className="second">
        {/* 지구 게시판 */}
        <Link to="/earth/main">
          <div className="earth-title">To Earth</div>
          <img className="earth-btn" src={earthBtn} />
        </Link>
      </div>

      <div className="third">
        {/* 회원가입 버튼 */}
        <Link to="/signup">
          <div className="signup-btn">
            <div className="signup-title">SignUp</div>
          </div>
        </Link>
      </div>

      <MenuBar />
      <P5Wrapper sketch={particles} />
    </div>
  );
};

export default UnLogged;
