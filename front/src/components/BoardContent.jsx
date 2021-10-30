import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { viewBoardElement } from "../actions/board";
import useInput from "../hooks/useInput";
import HomeBtn from "./HomeBtn";
import Loading from "./Loading";

const RecoverContent = ({ match, location }) => {
  const dispatch = useDispatch();
  const boardId = match.params.boardId;
  const token = sessionStorage.getItem("userToken");
  const [comment, onChangeComment] = useInput("");
  const [editComment, onChangeEditComment] = useInput("");
  const [recomment, onChangeRecomment] = useInput("");
  const [editCommentId, setEditCommentId] = useState();
  const [isCommentEdit, setIsCommentEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [recommentId, setRecommentId] = useState();

  const boardInfo = useSelector((state) => state.board.boardInfo);
  const poster = useSelector((state) => state.board.boardPoster);
  const comments = useSelector((state) => state.board.boardComments);
  const boardOwner = useSelector((state) => state.board.boardOwner);

  console.log("mach: ", match);
  console.log(boardId);
  console.log("location: ", location);
  console.log(boardOwner);

  useEffect(() => {
    getBoardElementData();
  }, []);

  // 게시글 데이터 조회
  const getBoardElementData = useCallback(async () => {
    let url = `http://52.78.18.110:8000/readboard/${boardId}?userToken=${token}`;

    await axios
      .get(url)
      .then((res) => {
        console.log(res);
        dispatch(
          viewBoardElement({
            boardInfo: res.data,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [boardId]);

  // 게시글 삭제 버튼 클릭
  const onCLickBoardDelete = useCallback(async () => {
    console.log("삭제 버튼 클릭", boardId);

    await axios
      .delete(
        `http://52.78.18.110:8000/deleteboard?userToken=${token}&boardId=${boardId}&boardOwner=${boardOwner}`
      )
      .then((res) => {
        console.log(res);
        window.history.back();
      })
      .catch((err) => console.log(err));
  }, [boardId, boardOwner]);

  // 댓글 작성 이벤트
  const onClickAddComment = useCallback(async () => {
    let data = {
      userToken: token,
      comment: comment,
    };

    let url = `http://52.78.18.110:8000/createcomment/${boardId}`;

    await axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }, [comment, boardId, boardOwner]);

  // 댓글 수정 이벤트
  const onClickEditComment = useCallback(
    async (e) => {
      let commentId = e.target.id;
      setIsCommentEdit(!isCommentEdit);
      setEditCommentId(commentId);
    },
    [isCommentEdit, editComment, editCommentId]
  );
  const onClickEditCommentCheck = useCallback(
    (e) => {
      let commentId = e.target.id;
      let commentOwner = e.target.value;

      let data = {
        userToken: token,
        commentId: commentId,
        commentOwner: commentOwner,
        comment: editComment,
      };

      axios
        .put("http://52.78.18.110:8000/updatecomment", data)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
    [editComment]
  );

  // 댓글 삭제 이벤트
  const onClickDeleteComment = useCallback(async (e) => {
    let commentId = e.target.id;
    let commentOwner = e.target.value;

    console.log(commentId, commentOwner);

    await axios
      .delete(
        `http://52.78.18.110:8000/deletecomment?userToken=${token}&commentId=${commentId}&commentOwner=${commentOwner}`
      )
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  }, []);

  // 대댓글 클릭 이벤트
  const onClickRecomment = useCallback(
    (e) => {
      console.log("대댓글 클릭");
      setIsRecomment(!isRecomment);
      setRecommentId(e.target.id);
      console.log("대댓글", e.target.id);
    },
    [isRecomment]
  );

  // 대댓글 이벤트
  const onClickRecommentCheck = useCallback(
    (e) => {
      let commentId = e.target.id;

      let data = {
        userToken: token,
        commentId: commentId,
        comment: recomment,
      };
      axios
        .post(`http://52.78.18.110:8000/createreply/${boardId}`, data)
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));

      console.log("commentId:", commentId);
    },
    [token, boardId, recomment]
  );

  return (
    <>
      {boardInfo ? (
        <div className="recover-container">
          <div className="title">게시판 타이틀</div>
          <div className="board-title">{poster.title}</div>

          <div className="content-area">
            <div className="recover-img content">
              {poster.image.map((v, idx) => (
                <img key={idx} src={`http://52.78.18.110:8000/${v}`} />
              ))}
              <div>{poster.content}</div>
            </div>

            {boardOwner ? (
              <div className="edit-area">
                <button>
                  <Link to={location.pathname + "/edit"}>수정</Link>
                </button>
                <button onClick={onCLickBoardDelete}>삭제</button>
              </div>
            ) : null}

            <div className="comment-area">
              <div className="comment-title">Comments</div>
              <div className="comment-post">
                <textarea
                  className="post-form"
                  vlaue={comment}
                  onChange={onChangeComment}
                  rows="3"
                  placeholder="글 작성"
                ></textarea>
                <button onClick={onClickAddComment}>Comment</button>
              </div>
              {comments.map((v, idx) => (
                <>
                  {v.parentCommentId == null ? (
                    <div key={idx} className="comments-area">
                      <div className="btn-area">
                        {v.commentOwner ? (
                          <>
                            <button
                              className="comment-delete"
                              id={v.commentId}
                              value={v.commentOwner}
                              onClick={onClickDeleteComment}
                            >
                              삭제
                            </button>
                            <button
                              className="comment-edit"
                              id={v.commentId}
                              value={v.commentOwner}
                              onClick={onClickEditComment}
                            >
                              수정
                            </button>
                          </>
                        ) : null}
                        <button
                          className="recomment"
                          id={v.commentId}
                          onClick={onClickRecomment}
                        >
                          대댓글
                        </button>
                      </div>
                      <div className="comment-user">{v.userNickname}</div>
                      <div className="comment-date">{v.date}</div>

                      {isRecomment & (recommentId == v.commentId) ? (
                        <div className="re-comment">
                          <textarea
                            value={recomment}
                            onChange={onChangeRecomment}
                          ></textarea>
                          <button
                            onClick={onClickRecommentCheck}
                            id={v.commentId}
                          >
                            확인
                          </button>
                        </div>
                      ) : null}
                      {isCommentEdit & (editCommentId == v.commentId) ? (
                        <>
                          <textarea
                            className="comment-comment"
                            value={editComment}
                            onChange={onChangeEditComment}
                          ></textarea>
                          <button
                            id={v.commentId}
                            value={v.commentOwner}
                            onClick={onClickEditCommentCheck}
                          >
                            다시 수정
                          </button>
                        </>
                      ) : (
                        <div className="comment-comment">{v.comment}</div>
                      )}

                      {/* 반복문 이렇게 */}
                      {comments.map((w) => (
                        <div>
                          {w.parentCommentId == v.commentId ? (
                            <div style={{ color: "white" }}>{w.comment}</div>
                          ) : null}
                        </div>
                      ))}

                      {/* 두번째 반복문 */}
                    </div>
                  ) : null}
                </>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <HomeBtn />
    </>
  );
};

export default RecoverContent;
