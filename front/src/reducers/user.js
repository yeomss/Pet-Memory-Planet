const { produce } = require("immer");

// 로그인
const LOG_IN_REQUEST = "LOG_IN_REQUEST";
const LOG_IN_SUCCESS = "LOG_IN_SUCCESS";
const LOG_IN_FAILURE = "LOG_IN_FAILURE";
const LOG_OUT = "LOG_OUT";

// 회원가입
const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

// 지구게시판
const OPEN_MYPAGE = "OPEN_MYPAGE";
const SET_NEWTOKEN = "SET_NEWTOKEN";

// 마이 페이지
const OPEN_MY_PAGE_REQUEST = "OPEN_MY_PAGE_REQUEST";
const OPEN_MY_PAGE_SUCCESS = "OPEN_MY_PAGE_SUCCESS";
const OPEN_MY_PAGE_FAILURE = "OPEN_MY_PAGE_FAILURE";

const initialState = {
  // 회원가입
  isSignUpIn: false,
  signUpData: null, // 회원가입 성공 시 sucess 데이터가 들어옴.

  // 로그인
  isLoggedIn: false,
  logIndata: null, // 로그인 성공 시 토큰이 들어옴.

  // 마이페이지 user
  isOpenMyPage: false,
  userInfo: null, // mypage 할 때 유저정보
  editEmail: "",
  editNickname: "",
  editNumOfPets: -1,
  planetInfo: null,
};

const userReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      // 회원가입
      case SIGN_UP_REQUEST:
        draft.isSignUpIn = true;
        draft.signUpData = null;
        break;
      case SIGN_UP_SUCCESS:
        draft.isSignUpIn = false;
        draft.signUpData = action.data;
        localStorage.setItem("signup", JSON.stringify(action.data));
        localStorage.setItem("planet", JSON.stringify([]));
        break;
      case SIGN_UP_FAILURE:
        draft.isSignUpIn = false;
        draft.signUpData = null;
        break;

      // 로그인
      case LOG_IN_REQUEST:
        draft.isLoggedIn = true;
        draft.logIndata = null;
        break;
      case LOG_IN_SUCCESS:
        draft.isLoggedIn = false;
        if (localStorage.getItem("signup")) {
          draft.logIndata = action.data;
          localStorage.setItem("login", JSON.stringify(action.data));
        }
        break;
      case LOG_IN_FAILURE:
        draft.isLoggedIn = false;
        draft.logIndata = null;
        break;
      case LOG_OUT:
        draft.isSignUpIn = false;
        draft.signUpData = null;
        draft.isLoggedIn = false;
        draft.logIndata = null;
        localStorage.removeItem("signup");
        localStorage.removeItem("login");
        localStorage.removeItem("planet");
        break;

      // 마이페이지
      case OPEN_MY_PAGE_REQUEST:
        draft.isOpenMyPage = true;
        draft.userInfo = null;
        break;
      case OPEN_MY_PAGE_SUCCESS:
        draft.isOpenMyPage = false;
        draft.userInfo = action.data.userInfo;
        draft.planetInfo = action.data.planetInfo;
        draft.editEmail = draft.userInfo[0].email;
        draft.editNickname = draft.userInfo[0].nickname;
        draft.editNumOfPets = draft.userInfo[0].numOfPets;
        break;
      case OPEN_MY_PAGE_FAILURE:
        draft.isOpenMyPage = false;
        draft.userInfo = null;
        break;

      default:
        break;
    }
  });
};

module.exports = userReducer;
