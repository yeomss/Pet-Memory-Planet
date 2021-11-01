const { produce } = require("immer");

const ADD_POST = "ADD_POST";
const ADD_COMMENT = "ADD_COMMENT";
const EDIT_POST = "EDIT_POST";

const SET_BOARD_ID = "SET_BOARD_ID";
const VIEW_BOARD_LIST = "VIEW_BOARD_LIST";
const VIEW_BOARD_ELEMENT = "VIEW_BOARD_ELEMENT";

const initialState = {
  boardList: [], // 게시판 전체 게시글 조회 데이터
  boardId: null, // 게시글 한 요소 조회
  boardInfo: null,
  boardOwner: false,
  boardPoster: null,
  boardComments: null,
  // commentsOwner: [],

  editTitle: "", // 수정하려는 게시글의 제목
  editContent: "", // 수정하려는 게시글의 내용
};

const boardReducer = (prevState = initialState, action) => {
  return produce(prevState, (draft) => {
    switch (action.type) {
      case ADD_POST:
        console.log("data 내용: ", draft.Post);
        console.log("타입: ", typeof draft.Post);
        break;
      case EDIT_POST:
        draft.editTitle = action.data.editTitle;
        draft.editContent = action.data.editContent;
        break;

      // 코멘트 추가 시 comment에 들어간다.
      case ADD_COMMENT:
        // draft.comment.push({ comment: action.data.comment });
        console.log("코멘트 내용: ", draft.comment);
        break;

      // 게시글 하나 요소 보기 위히여 boardId 저장
      case SET_BOARD_ID:
        draft.boardId = action.data.boardId;
        console.log("boardId 내용: ", draft.boardId);
        break;

      // 전체 게시글 조회
      case VIEW_BOARD_LIST:
        draft.boardList = action.data.boardList.data.reverse();
        console.log("boardList 내용: ", draft.boardList);
        break;

      // 게시글 하나 조회
      case VIEW_BOARD_ELEMENT:
        draft.boardInfo = action.data.boardInfo;
        draft.boardOwner = draft.boardInfo.boardOwner;
        draft.boardPoster = draft.boardInfo.poster;
        draft.boardComments = draft.boardInfo.comments;
        // for (let i = 0; i < draft.boardComments.length; i++) {
        //   let commentId = draft.boardComments[i].commentId;
        //   draft.commentsOwner.push(draft.boardComments[i].commentOwner);
        // }
        console.log("boardInfo 내용:", draft.boardInfo);
        // console.log("boardInfo 내용:", draft.commentsOwner);
        break;

      default:
        break;
    }
  });
};

module.exports = boardReducer;
