const { produce } = require("immer");

const ADD_POST = "ADD_POST";
const ADD_COMMENT = "ADD_COMMENT";

const SET_BOARD_ID = "SET_BOARD_ID";
const VIEW_BOARD_LIST = "VIEW_BOARD_LIST";
const VIEW_BOARD_ELEMENT = "VIEW_BOARD_ELEMENT";

const initialState = {
  boardList: [], // 게시판 전체 게시글 조회 데이터
  boardId: null, // 게시글 한 요소 조회

  poster: [], // 해당 게시글의 poster
  comments: [], // 해당 게시글의 comment
};

const boardReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case ADD_POST:
        // draft.Post.push(action.data.poster);
        console.log("data 내용: ", draft.Post);
        console.log("타입: ", typeof draft.Post);
        break;

      // 코멘트 추가 시 comment에 들어간다.
      case ADD_COMMENT:
        // draft.comment.push({ comment: action.data.comment });
        console.log("코멘트 내용: ", draft.comment);
        break;

      // 게시글 하나 요소 보기 위히여 boardId 저장
      case SET_BOARD_ID:
        draft.boardId = action.data.boardId;
        console.log("boardId: ", draft.boardId);
        break;

      // 전체 게시글 조회
      case VIEW_BOARD_LIST:
        draft.boardList = action.data.boardList.data.reverse();
        console.log("boardList: ", draft.boardList);
        break;

      // 게시글 하나 조회
      case VIEW_BOARD_ELEMENT:
        draft.poster = action.data.poster;
        draft.comments = action.data.comments;
        console.log("poster: ", draft.poster);
        console.log("comments: ", draft.comments);
        break;

      default:
        break;
    }
  });
};

module.exports = boardReducer;
