import React, { useCallback } from "react";
import P5Wrapper from "react-p5-wrapper";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../actions/user";
import particles from "../components/particles";
import useInput from "../hooks/useInput";

const SignUp = () => {
  // const signUpSuccess = useSelector((state) => state.user.signUpData);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [numOfPets, onChangeNumOfPets] = useInput(1);

  // 회원가입 버튼
  const onClickSignUpCheck = useCallback(() => {
    console.log("회원 가입 버튼 클릭 -> ");
    console.log(email, password, nickname, numOfPets);

    dispatch(
      signUp({
        email: email,
        password: password,
        nickname: nickname,
        numOfPets: numOfPets,
      })
    );
  }, [email, password, nickname, numOfPets]);

  return (
    <div className="signup">
      <div className="title">SIGN UP</div>

      <div className="input-area">
        <div>Email</div>
        <input
          className="email"
          vlaue={email}
          onChange={onChangeEmail}
          type="text"
          placeholder="Made@kumoh.ac.kr"
        />
        <div>Nickname</div>
        <input
          className="nickname"
          value={nickname}
          onChange={onChangeNickname}
          type="text"
          placeholder="NICKNAME"
        />
        <div>Password</div>
        <input
          className="password"
          value={password}
          onChange={onChangePassword}
          type="password"
          placeholder="PASSWORD"
        />
        <div>Password Check</div>

        <input
          className="password-check"
          value={passwordCheck}
          onChange={onChangePasswordCheck}
          type="password"
          placeholder="PASSWORD"
        />
        <div>Number of Pets</div>
        <select
          className="numOfPet"
          value={numOfPets}
          onChange={onChangeNumOfPets}
          type=""
          placeholder="가용 추모행성 수"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <button onClick={onClickSignUpCheck}>Check</button>
      </div>

      <P5Wrapper sketch={particles} />
    </div>
  );
};

export default SignUp;
