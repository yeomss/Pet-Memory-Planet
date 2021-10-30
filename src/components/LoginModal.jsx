import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { loginModalClose } from "../actions/modal";
import { logIn } from "../actions/user";
import useInput from "../hooks/useInput";
import "../styles/Modal.scss";

const LoginModal = () => {
  const [email, onChangeEmail] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();

  // 로그인 모달창 close
  const LoginModalClose = useCallback(() => {
    console.log("클릭");
    dispatch(
      loginModalClose({
        isLoginModalOpen: false,
      })
    );
  }, []);

  // 로그인 확인 버튼 onClick
  const onClickLoginCheck = useCallback(() => {
    dispatch(
      logIn({
        email: email,
        password: password,
      })
    );
  }, [email, password]);

  return (
    <div className="login-modal">
      <div onClick={LoginModalClose}>
        <span className="material-icons">clear</span>
      </div>

      <div className="layer">
        <div className="title">LOGIN</div>

        <div className="content">
          <div>Email</div>
          <input
            type="text"
            value={email}
            onChange={onChangeEmail}
            placeholder="EMAIL"
          />
          <div>Password</div>
          <input
            type="password"
            value={password}
            onChange={onChangePassword}
            placeholder="PASSWORD"
          />
        </div>

        <button onClick={onClickLoginCheck}>Check</button>
      </div>
    </div>
  );
};

export default LoginModal;
