import React, { useCallback } from "react";
import P5Wrapper from "react-p5-wrapper";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { signUp } from "../../actions/user";
import HomeBtn from "../../components/HomeBtn";
import Loading from "../../components/Loading";
import MenuBar from "../../components/MenuBar";
import particles from "../../components/particles";
import useInput from "../../hooks/useInput";

const SignUp = () => {
  const isSignUpIn = useSelector((state) => state.user.isSignUpIn);

  const dispatch = useDispatch();
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [numOfPets, onChangeNumOfPets] = useInput(1);

  // 회원가입 버튼
  const onClickSignUpCheck = useCallback(() => {
    if (!email) {
      alert("이메일을 입력해주세요");
    } else if (!nickname) {
      alert("닉네임을 입력해주세요");
    } else if (!password) {
      alert("비밀번호를 입력해주세요");
    } else if (!passwordCheck) {
      alert("비밀번호를 확인해주세요");
    } else if (password === passwordCheck) {
      var data = {
        email: email,
        nickname: nickname,
        password: password,
        numOfPets: numOfPets,
      };
      dispatch(signUp(data));
    } else {
      alert("비밀번호를 다시 확인해주세요");
    }
  }, [email, password, passwordCheck, nickname, numOfPets]);

  return (
    <div>
      {isSignUpIn ? (
        <Loading />
      ) : (
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

          <HomeBtn />
          <MenuBar />
          <P5Wrapper sketch={particles} />
        </div>
      )}
    </div>
  );
};

export default SignUp;
