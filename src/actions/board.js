const ADD_POST = "ADD_POST";
const ADD_COMMENT = "ADD_COMMENT";

const SET_BOARD_ID = "SET_BOARD_ID";
const VIEW_BOARD_LIST = "VIEW_BOARD_LIST";
const VIEW_BOARD_ELEMENT = "VIEW_BOARD_ELEMENT";

// 글 생성
const addPost = (data) => {
  return {
    type: ADD_POST,
    data,
  };
};

// 댓글 생성
const addComment = (data) => {
  return {
    type: ADD_COMMENT,
    data,
  };
};

// 게시판 조회하기
const viewBoardList = (data) => {
  return {
    type: VIEW_BOARD_LIST,
    data,
  };
};

// 게시글 조회하기
const viewBoardElement = (data) => {
  return {
    type: VIEW_BOARD_ELEMENT,
    data,
  };
};

// 게시글 번호 조회하기
const setBoardId = (data) => {
  return {
    type: SET_BOARD_ID,
    data,
  };
};

module.exports = {
  addPost,
  addComment,
  viewBoardList,
  setBoardId,
  viewBoardElement,
};
