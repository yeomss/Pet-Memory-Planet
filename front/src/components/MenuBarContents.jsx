import { useState } from "react";
import "../styles/Menu.scss";
import { Link } from "react-router-dom";
const MenuBarContents = ({ isClicked }) => {
  // useEffect(() => {
  //   const render = () => {
  //     console.log(isClicked);
  //   };

  //   render();
  // }, []);

  const user = localStorage.getItem("login");
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLogInModalOpen, setIsLogInModalOpen] = useState(false);

  const onClickBtnSignUp = () => {
    setIsSignUpModalOpen(!isSignUpModalOpen);
  };

  const getIsModalOpenSignUp = (isSignUpModalOpen) => {
    setIsSignUpModalOpen(isSignUpModalOpen);
  };

  const onClickBtnLogIn = () => {
    setIsLogInModalOpen(!isLogInModalOpen);
  };

  const getIsModalOpenLogIn = (isLogInModalOpen) => {
    setIsLogInModalOpen(isLogInModalOpen);
  };

  return (
    <div>
      <div
        className={
          isClicked
            ? "MenucontentsBox MenuopenContentsBox"
            : "MenucontentsBox MenucloseContentsBox"
        }
      >
        <div
          className={
            isClicked
              ? "Menucontents OpenMenucontents"
              : "Menucontents CloseMenucontents"
          }
        >
          {user ? (
            <>
              <ul className="MenucontentsList">
                <Link to="/petloss">
                  <li className="Menucontents4">펫로스 증후군이란 ?</li>
                </Link>
                <Link to="/newplanet/info">
                  <li className="Menucontents3">행성 띄우기</li>
                </Link>
                <Link to="/myplanet">
                  <li className="Menucontents1">나의 추모행성</li>
                </Link>

                <Link to="/earth/main">
                  <li className="Menucontents5">To Earth</li>
                </Link>
                <Link to="/mypage/user">
                  <li className="Menucontents5">설정</li>
                </Link>
              </ul>
            </>
          ) : (
            <>
              <ul className="MenucontentsList">
                <Link to="/petloss">
                  <li className="Menucontents4">펫로스 증후군이란 ?</li>
                </Link>
                <Link to="/signup">
                  <li className="Menucontents3">회원가입</li>
                </Link>
                <Link to="/login">
                  <li className="Menucontents1">로그인</li>
                </Link>
                <Link to="/earth/main">
                  <li className="Menucontents5">To Earth</li>
                </Link>
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBarContents;
