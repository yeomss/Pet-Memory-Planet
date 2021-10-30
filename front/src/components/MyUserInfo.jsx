import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openMyPage } from "../actions/user";
import Loading from "./Loading";
import useInput from "../hooks/useInput";

const MyUserInfo = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const editEmail = useSelector((state) => state.user.editEmail);
  const editNickname = useSelector((state) => state.user.editNickname);

  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, onChangePasswordCheck] = useInput("");
  const [numOfPets, onChangeNumOfPets] = useInput("");

  useEffect(() => {
    getUserData();
  }, []);

  // 마이페이지 데이터 받아오기
  const getUserData = useCallback(async () => {
    dispatch(openMyPage());

    /* 서버 코드
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
      });*/
  }, [userInfo, email, nickname, numOfPets]);

  // 마이페이지 정보 수정 버튼 클릭
  const onClickCheck = useCallback(() => {
    var data = {
      data: {
        email: editEmail,
        nickname: editNickname,
        password: password,
        numOfPets: numOfPets,
      },
    };

    if (password === passwordCheck) {
      localStorage.setItem("signup", JSON.stringify(data));
      alert("회원정보 수정 완료!");
      window.location.reload();
    } else {
      alert("비밀번호를 다시 확인해주세요");
    }

    /* 서버코드
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
      });*/
  }, [editEmail, nickname, password, numOfPets]);

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
              <input value={editEmail} disabled></input>
            </div>

            <div className="nickname">
              <label htmlFor="">닉네임</label>
              <input
                type="text"
                value={editNickname}
                onChange={onChangeNickname}
              />
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
