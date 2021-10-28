import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMypage } from "../actions/user";
// import { openMypage } from "../actions/user";
import useInput from "../hooks/useInput";

const MyUserInfo = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("token");

  const isOpenMyPage = useSelector((state) => state.user.isOpenMyPage);
  console.log(isOpenMyPage);
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo);

  //   const user = useSelector((state) => state.user.userInfo);
  //   console.log("userInfo입니다: ", user);
  //   const email = user[0].email;
  //   const nickname = user[0].nickname;
  //   const numOfPets = user[0].numOfPets;

  //   console.log(email, nickname, numOfPets);
  const [nicknameTemp, onChangeNickname] = useInput();
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [numOfPetsTemp, onChangeNumOfPetsTemp] = useInput();

  //   console.log("numOfPets: ", numOfPets);
  //   console.log(typeof numOfPets);
  //   // 마이페이지 userInfo 가져오기
  //   const onClickUserInfo = useCallback(() => {
  //     let token = sessionStorage.getItem("token");
  //     console.log(
  //       "url: ",
  //       `http://52.78.18.110:8000/showuserinfo?userToken=${token}`
  //     );

  //     axios
  //       .get(`http://52.78.18.110:8000/showuserinfo?userToken=${token}`)
  //       .then((res) => {
  //         console.log(res);

  //         dispatch(
  //           openMypage({
  //             userInfo: res.data,
  //           })
  //         );
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);

  useEffect(() => {
    getUserData();

    if (!isOpenMyPage) {
      getUserData();
    }
  }, []);

  const getUserData = useCallback(() => {
    dispatch(openMypage(token));
    // let url = `http://52.78.18.110:8000/showuserinfo?userToken=${token}`;

    // axios
    //   .get(url)
    //   .then((res) => {
    //     console.log("res: ", res);
    //     dispatch(
    //       openMypage({
    //         userInfo: res.data.userInfo,
    //       })
    //     );

    //     console.log("res!!", res.data.userInfo);
    //   })
    //   .catch((err) => console.log(err));
  }, [token]);

  const onClickCheck = useCallback(() => {
    let data = {
      userToken: token,
      password: password,
      nickname: nicknameTemp,
      numOfPets: numOfPetsTemp,
    };

    axios
      .put("http://52.78.18.110:8000/updateuserinfo", data)
      .res((res) => {
        console.log(res);
        console.log("prevToken:", sessionStorage.getItem("token"));
        sessionStorage.setItem(res.data.userToken);
        console.log("newToken:", res.data.userToken);
      })
      .catch((err) => console.log(err));

    // console.log(email, nicknameTemp, password, passwordCheck, numOfPetsTemp);
  }, [nicknameTemp, password, numOfPetsTemp]);

  return (
    <div className="user-info-container">
      {/* <button onClick={getUserData}>버튼</button>
      <div className="title">회원 정보 수정</div>
      <button onClick={test}>정보 가져오기</button>
      <div className="user-info-content">
        <div className="email">
          <label htmlFor="">이메일</label>
          <div>{email}</div>
          {email ? <input type="text" value={email} /> : "이메일 수정해봐라"}
        </div>

        <div className="nickname">
          <label htmlFor="">닉네임 수정</label>
          {nickname ? (
            <input
              type="text"
              value={nicknameTemp}
              onChange={onChangeNickname}
            />
          ) : (
            "닉네임 수정해봐라"
          )}
        </div>

        <div className="password">
          <label htmlFor="">비밀번호 수정</label>
          <input
            type="text"
            name="password"
            value={password}
            onChange={onChangePassword}
          />
          <input
            type="text"
            name="passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
          />
        </div>

        <div className="numOfPets">
          <label htmlFor="">펫수</label>
          {numOfPets ? (
            <select
              name=""
              id=""
              value={numOfPetsTemp}
              onChange={onChangeNumOfPetsTemp}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          ) : null}
        </div>
      </div>

      <button onClick={onClickCheck}>수정확인버튼</button> */}
    </div>
  );
};

export default MyUserInfo;
