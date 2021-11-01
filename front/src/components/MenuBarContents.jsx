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
          <ul className="MenucontentsList">
            <Link to="/signup">
              <li className="Menucontents1">Sign Up</li>
            </Link>
            <Link to="/myplanet">
              <li className="Menucontents3">My Planet</li>
            </Link>
            <Link to="/newplanet">
              <li className="Menucontents4">행성 생성</li>
            </Link>
            <Link to="/earth">
              <li className="Menucontents5">지구</li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MenuBarContents;
