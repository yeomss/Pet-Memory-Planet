import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
// import { openMyPage } from "../actions/user";
import Loading from "./Loading";

const MyUserInfo = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("userToken");
  // const userInfo = useSelector((state) => state.user.userInfo);
  // const editEmail = useSelector((state) => state.user.editEmail);
  // const editNickname = useSelector((state) => state.user.editNickname);
  // const editNumOfPets = useSelector((state) => state.user.editNumOfPets);
  const [userInfo, setUserInfo] = useState("");
  const [userInfo2, setUserInfo2] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editNickname, setEditNickname] = useState("");
  const [editNumOfPets, setEditNumOfPets] = useState("");

  // console.log("하이루: ", editNumOfPets);

  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [numOfPets, setNumOfPets] = useState("");

  useEffect(() => {
    getUserData();
    // setUserInfo(userInfo2);
    // setEmail(editEmail);
    // setNickname(editNickname);
    // setNumOfPets(editNumOfPets);
  }, []);

  // 마이페이지 데이터 받아오기
  const getUserData = useCallback(async () => {
    await axios
      .get(`http://52.78.18.110:8000/showuserinfo?userToken=${token}`)
      .then((res) => {
        console.log("res!", res);

        setUserInfo(res.data.userInfo);
        setEmail(res.data.userInfo.email);
        setNickname(res.data.userInfo.nickname);
        setNumOfPets(res.data.userInfo.numOfPets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, userInfo, email, nickname, numOfPets]);

  // onChange 이벤트
  const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
  }, []);
  const onChangeNumOfPets = useCallback((e) => {
    setNumOfPets(e.target.value);
  }, []);

  // 마이페이지 정보 수정 버튼 클릭
  const onClickCheck = useCallback(() => {
    let data = {
      userToken: token,
      password: password,
      nickname: nickname,
      numOfPets: numOfPets,
    };

    axios
      .put("http://52.78.18.110:8000/updateuserinfo", data)
      .then((res) => {
        console.log(res);
        sessionStorage.setItem("userToken", res.data.userToken);
        alert("회원 정보 수정 완료!");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        alert("회원 정보 수정 오류");
        window.location.reload();
      });
  }, [token, nickname, password, numOfPets]);

  return (
    <>
      {userInfo ? (
        <div className="user-info-container">
          <div className="title">
            회원 정보 수정
            <div className="sub-title">회원 정보를 수정하실 수 있습니다.</div>
          </div>

          <div className="user-info-content">
            <div className="email">
              <label htmlFor="">이메일</label>
              <input value={email} disabled></input>
            </div>

            <div className="nickname">
              <label htmlFor="">닉네임</label>
              <input type="text" value={nickname} onChange={onChangeNickname} />
            </div>

            <div className="password">
              <label htmlFor="">비밀번호</label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={onChangePassword}
              />
              <br />
              <label htmlFor="">비밀번호 확인</label>
              <input
                type="password"
                name="passwordCheck"
                value={passwordCheck}
                onChange={onChangePasswordCheck}
              />
            </div>

            <div className="numOfPets">
              <label htmlFor="">가용 추모행성 개수</label>
              <select value={numOfPets} onChange={onChangeNumOfPets}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <button onClick={onClickCheck}>Check</button>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default MyUserInfo;
