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
const OPEN_BOARD = "OPEN_BOARD";
const OPEN_MYPAGE = "OPEN_MYPAGE";
const SET_NEWTOKEN = "SET_NEWTOKEN";

// 마이 페이지
const OPEN_MY_PAGE_REQUEST = "OPEN_MY_PAGE_REQUEST";
const OPEN_MY_PAGE_SUCCESS = "OPEN_MY_PAGE_SUCCESS";
const OPEN_MY_PAGE_FAILURE = "OPEN_MY_PAGE_FAILURE";

const initialState = {
  isSignUpIn: false,
  signUpData: null, // 회원가입 성공 시 sucess 데이터가 들어옴.
  isLoggedIn: false,
  data: null, // 로그인 성공 시 토큰이 들어옴.
  isOpenMyPage: false,
  userInfo: null, // mypage 할 때 유저정보
  planetInfo: null,
};

const userReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      // 로그인
      case LOG_IN_REQUEST:
        draft.isLoggedIn = true;
        draft.data = null;
        break;

      case LOG_IN_SUCCESS:
        draft.isLoggedIn = false;
        draft.data = action.data.data;
        break;

      case LOG_IN_FAILURE:
        draft.isLoggedIn = false;
        draft.data = null;
        break;

      case LOG_OUT:
        draft.isSignUpIn = false;
        draft.signUpData = null;
        draft.isLoggedIn = false;
        draft.data = null;
        break;

      // 회원가입
      case SIGN_UP_REQUEST:
        draft.isSignUpIn = true;
        draft.signUpData = null;
        break;

      case SIGN_UP_SUCCESS:
        draft.isSignUpIn = false;
        draft.signUpData = action.data.data.signupSuccess;
        console.log("signup:", draft.isSignUpIn);
        break;

      case SIGN_UP_FAILURE:
        draft.isSignUpIn = false;
        draft.signUpData = null;
        break;

      // 마이페이지
      case OPEN_MY_PAGE_REQUEST:
        draft.isOpenMyPage = true;
        draft.userInfo = null;
        break;

      case OPEN_MY_PAGE_SUCCESS:
        draft.isOpenMyPage = false;
        draft.userInfo = action.data.userInfo;
        console.log("signup:", draft.isOpenMyPage);
        break;

      case OPEN_MY_PAGE_FAILURE:
        draft.isOpenMyPage = false;
        draft.userInfo = null;
        break;

      // 게시판
      case OPEN_BOARD:
        draft.boardInfo = action.data.boardInfo;
        console.log("boardInfo: ", draft.boardInfo);
        break;

      case OPEN_MYPAGE:
        draft.userInfo = action.data.userInfo;
        console.log("userInfo: ", draft.userInfo);
        break;

      case SET_NEWTOKEN:
        draft.newToken = action.data.newToken;
        console.log("newToken:");
        break;

      default:
        break;
    }
  });
};

module.exports = userReducer;
