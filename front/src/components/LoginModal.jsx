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
    var data = {
      isLoginModalOpen: false,
    };
    dispatch(loginModalClose(data));
  }, []);

  // 로그인 확인 버튼 onClick
  const onClickLoginCheck = useCallback(() => {
    var data = { email: email, password: password };
    dispatch(logIn(data));
  }, [email, password]);

  return (
    <div className="login-modal">
      <div onClick={LoginModalClose}>
        <span className="material-icons">clear</span>
      </div>

      <div className="layer">
        <div className="title">반가워요</div>

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
