import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import axios from "axios";
import { editPost, viewBoardElement } from "../actions/board";
import Loading from "./Loading";
import { readJsonConfigFile } from "typescript";
import HomeBtn from "./HomeBtn";

const RecoverEditForm = ({ match, location }) => {
  const dispatch = useDispatch();
  const boardId = match.params.boardId;
  const token = sessionStorage.getItem("userToken");
  const boardOwner = useSelector((state) => state.board.boardOwner);
  const editTitle = useSelector((state) => state.board.editTitle);
  const editContent = useSelector((state) => state.board.editContent);

  console.log(boardOwner);
  console.log("타입확인", typeof boardOwner);
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");

  useEffect(() => {
    getBoardElementData();
    setTitle(editTitle);
    setContent(editContent);
  }, [editTitle, editContent]);

  // 게시글 데이터 조회
  const getBoardElementData = useCallback(() => {
    let url = `http://52.78.18.110:8000/readboard/${boardId}?userToken=${token}`;

    axios
      .get(url)
      .then((res) => {
        console.log(res);

        dispatch(
          viewBoardElement({
            boardInfo: res.data,
          })
        );

        dispatch(
          editPost({
            editTitle: res.data.poster.title,
            editContent: res.data.poster.content,
          })
        );
      })
      .catch((err) => console.log(err));
  }, [boardId, token]);

  // onChange 이벤트
  const onChangeImg = useCallback((e) => {
    setImg(e.target.files);
    setImgName(e.target.value);
  }, []);

  const onChangeTitle = useCallback((e) => {
    setTitle(e.target.value);
  }, []);

  const onChangeContent = useCallback((e) => {
    setContent(e.target.value);
  }, []);

  // onClick 이벤트
  const onClickEditPost = useCallback(() => {
    let formData = new FormData();
    formData.append("userToken", token);
    formData.append("boardId", boardId);
    formData.append("title", title);
    formData.append("content", content);
    formData.append("boardOwner", boardOwner);

    if (img) {
      for (let i = 0; i < img.length; i++) {
        formData.append("image", img[i]);
      }
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .put("http://52.78.18.110:8000/updateboard", formData, config)
      .then((res) => {
        console.log(res);
        window.location.replace("/earth/recover/viewboard");
      })
      .catch((err) => console.log(err));
  }, [boardId, title, content, img]);

  return (
    <>
      {editTitle ? (
        <div className="recover-container">
          <div className="form-container">
            <div className="title">게시판 글 쓰기</div>

            <div className="editor">
              <input
                className="title-box"
                value={title}
                onChange={onChangeTitle}
              ></input>
              <textarea
                className="edit-box"
                value={content}
                onChange={onChangeContent}
              ></textarea>
              <input
                type="file"
                value={imgName}
                onChange={onChangeImg}
                files
                multiple
              />
              <button className="post-button" onClick={onClickEditPost}>
                글 작성
              </button>
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

export default RecoverEditForm;
