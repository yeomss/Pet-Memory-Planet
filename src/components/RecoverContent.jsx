import axios from "axios";
import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { viewBoardElement } from "../actions/board";
import useInput from "../hooks/useInput";

const RecoverContent = ({ match, location }) => {
  const boardId = match.params.boardId;
  const token = sessionStorage.getItem("userToken");
  const [comment, onChangeComment] = useInput("");

  const poster = useSelector((state) => state.board.poster);
  const comments = useSelector((state) => state.board.comments);
  const dispatch = useDispatch();

  console.log("mach: ", match);
  console.log(boardId);
  console.log("location: ", location);

  useEffect(() => {
    getBoardElementData();
  }, []);

  // 게시글 데이터 조회
  const getBoardElementData = useCallback(() => {
    let url = `http://52.78.18.110:8000/readboard/${boardId}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res);
        dispatch(
          viewBoardElement({
            poster: res.data.poster,
            comments: res.data.comments,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [boardId]);

  // 댓글 작성 이벤트
  const onClickAddComment = useCallback(() => {
    // dispatch(
    //   addComment({
    //     comment: comment,
    //   })
    // );

    let data = {
      userToken: token,
      comment: comment,
    };

    let url = `http://52.78.18.110:8000/createcomment/${boardId}`;

    axios
      .post(url, data)
      .then((res) => {
        console.log(res);
        window.location.replace("/earth/recover/viewBoard");
      })
      .catch((err) => console.log(err));
  }, [comment]);

  // const onClickCheck = useCallback(() => {
  //   let token = sessionStorage.getItem("token");

  //   let data = {
  //     userToken: token,
  //     password: password,
  //     nickname: nicknameTemp,
  //     numOfPets: numOfPetsTemp,
  //   };

  //   axios
  //     .put("http://52.78.18.110:8000/updateuserinfo", data)
  //     .res((res) => {
  //       console.log(res);
  //       console.log("prevToken:", sessionStorage.getItem("token"));
  //       sessionStorage.setItem(res.data.userToken);
  //       console.log("newToken:", res.data.userToken);
  //     })
  //     .catch((err) => console.log(err));

  //   console.log(email, nicknameTemp, password, passwordCheck, numOfPetsTemp);
  // }, [nicknameTemp, password, numOfPetsTemp]);

  // 게시글 삭제 버튼 클릭
  const onCLickBoardDelete = useCallback(() => {
    console.log("삭제 버튼 클릭");

    // let data = {
    //   userToken: token,
    //   boardId: boardId,
    // };

    // let config = {
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   data: {
    //     userToken: token,
    //     boardId: boardId,
    //   },
    // };

    console.log("boardId:", boardId);
    axios
      .delete(`http://52.78.18.110:8000/deleteboard?userToken=${token}&boardId=${boardId}`)
      .then((res) => {console.log(res); window.history.back();})
      .catch((err) => console.log(err));

  }, [boardId]);

  // 코멘트 렌더링
  const commentsComponent = comments.map((v, idx) => {
    return (
      <div className="comments-area">
        <div className="btn-area">
          <button className="delete">삭제</button>
          <button className="edit">수정</button>
          <button className="recomment">대댓글</button>
        </div>
        <div key={idx} className="user">
          {v.userNickname}
        </div>
        <div key={idx} className="date">
          {v.date}
        </div>
        <div key={idx} className="comment">
          {v.comment}
        </div>
      </div>
    );
  });

  return (
    <div className="recover-container">
      <div className="title">게시판 타이틀</div>
      <div className="board-title">
        {poster.title ? poster.title : "게시글 제목"}
      </div>

      <div className="content-area">
        <div className="img">
          {poster.image
            ? poster.image.map((v, idx) => <img key={idx} src={v} />)
            : "게시글 이미지"}
        </div>
        <div className="content">
          {poster.content ? poster.content : "게시글 컨텐츠"}
        </div>

        <div className="edit-area">
          <button>
            <Link to={location.pathname + "/edit"}>수정</Link>
          </button>
          <button onClick={onCLickBoardDelete}>삭제</button>
        </div>

        <div className="comment-area">
          <div className="title">Comments</div>
          <div className="post">
            <textarea
              className="post-form"
              name=""
              id=""
              vlaue={comment}
              onChange={onChangeComment}
              rows="3"
              placeholder="글 작성"
            ></textarea>
            <button onClick={onClickAddComment}>Comment</button>
          </div>
          <div className="comments">{Comment ? commentsComponent : null}</div>
        </div>
      </div>
    </div>
  );
};

export default RecoverContent;
