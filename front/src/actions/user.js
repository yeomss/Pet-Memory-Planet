const axios = require("axios");

const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const LOG_IN_FAILURE = "LOG_IN_FAILURE";
const LOG_OUT = "LOG_OUT";

const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

const OPEN_MY_PAGE = "OPEN_MY_PAGE";
const OPEN_MY_PAGE_REQUEST = "OPEN_MY_PAGE_REQUEST";
const OPEN_MY_PAGE_SUCCESS = "OPEN_MY_PAGE_SUCCESS";
const OPEN_MY_PAGE_FAILURE = "OPEN_MY_PAGE_FAILURE";

//
// 로그인 환경
const logIn = (data) => {
  return (dispatch, getState) => {
    console.log("로그인 시도!");
    dispatch(loginRequest(data));

    axios
      .post("http://52.78.18.110:8000/login", {
        // 백으로 정보를 보낸다.
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        dispatch(
          loginSuccess({
            // 백으로부터 데이터를 받는다.
            data: res.data,
          })
        );
        sessionStorage.setItem("userToken", res.data.userToken); // 세션 저장

        console.log("res: ", res);
        console.log("token: ", res.data.userToken);

        alert("로그인 성공!");
        window.location.replace("/");
      })
      .catch((err) => {
        dispatch(loginFailure(err));
        alert("로그인에 실패하였습니다.");
        window.location.replace("/");
      });
  };
};
// sync action 생성기
// 로그인 시도
const loginRequest = (data) => {
  return {
    type: LOG_IN_REQUEST,
    data,
  };
};
// 로그인 성공
const loginSuccess = (data) => {
  return {
    type: LOG_IN_SUCCESS,
    data,
  };
};
// 로그인 실패
const loginFailure = (err) => {
  return {
    type: LOG_IN_FAILURE,
    err,
  };
};
// 로그아웃
const logOut = () => {
  return {
    type: LOG_OUT,
  };
};

//
// 회원가입 환경
const signUp = (data) => {
  return (dispatch, getState) => {
    console.log("회원가입 시도");
    dispatch(signUpRequest(data));

    axios
      .post("http://52.78.18.110:8000/signup", {
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        numOfPets: data.numOfPets,
      })
      .then((res) => {
        dispatch(
          signUpSuccess({
            // 백으로부터 데이터를 받는다.
            data: res.data,
          })
        );

        alert("회원 가입 성공!");
        window.location.replace("/");
      })
      .catch((err) => {
        alert("회원 가입에 실패하였습니다.");
        dispatch(signUpFailure(err));
        // window.location.replace("/");
      });
  };
};
const signUpRequest = (data) => {
  return {
    type: SIGN_UP_REQUEST,
    data,
  };
};
const signUpSuccess = (data) => {
  return {
    type: SIGN_UP_SUCCESS,
    data,
  };
};
const signUpFailure = (err) => {
  return {
    type: SIGN_UP_FAILURE,
    err,
  };
};

//
// 마이페이지
const openMyPageRequest = (data) => {
  return {
    type: OPEN_MY_PAGE_REQUEST,
    data,
  };
};
const openMyPageSuccess = (data) => {
  return {
    type: OPEN_MY_PAGE_SUCCESS,
    data,
  };
};
const openMyPageFailure = (err) => {
  return {
    type: OPEN_MY_PAGE_FAILURE,
    err,
  };
};
const openMyPage = (data) => {
  return (dispatch, getState) => {
    dispatch(openMyPageRequest(data));

    axios
      .get(`http://52.78.18.110:8000/showuserinfo?userToken=${data.userToken}`)
      .then((res) => {
        console.log("res!", res);

        dispatch(
          openMyPageSuccess({
            userInfo: res.data.userInfo,
            planetInfo: res.data.planetOutside,
          })
        );

        console.log("유저인포: ", res.data.userInfo);
      })
      .catch((err) => {
        console.log(err);
        dispatch(openMyPageFailure(err));
      });
  };
};

module.exports = {
  logIn,
  logOut,
  signUp,
  openMyPage,
  openMyPageRequest,
  openMyPageSuccess,
  openMyPageFailure,
};
