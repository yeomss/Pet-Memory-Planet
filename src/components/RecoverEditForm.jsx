import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import axios from "axios";
import { viewBoardElement } from "../actions/board";

const RecoverEditForm = ({ match, location }) => {
  const dispatch = useDispatch();
  const boardId = match.params.boardId;
  const token = sessionStorage.getItem("userToken");
  const title = useSelector((state) => state.board.poster.title);
  const content = useSelector((state) => state.board.poster.content);

  //   console.log("img:", img);
  const [titleTemp, onChangeTitle] = useInput(title);
  const [contentTemp, onChangeContent] = useInput(content);
  const [img, setImg] = useState(null);
  const [imgName, setImgName] = useState();

  console.log("titleTemp: ", titleTemp);
  console.log("title: ", title);
  console.log("contentTemp", contentTemp);

  useEffect(() => {
    getBoardElementData();
  }, [title, content, titleTemp]);

  // 게시글 데이터 조회
  const getBoardElementData = useCallback(() => {
    let url = `http://52.78.18.110:8000/readboard/${boardId}`;
    console.log(boardId, "하이루");

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

  // onChange 이벤트
  const onChangeImg = useCallback((e) => {
    setImg(e.target.files);
    setImgName(e.target.value);
    console.log("파일:", e.target.files);
    console.log("파일 name:", e.target.value);
  }, []);

  // onClick 이벤트
  const onClickEditPost = useCallback(() => {
    let formData = new FormData();
    formData.append("userToken", token);
    formData.append("boardId", boardId);
    formData.append("title", titleTemp);
    formData.append("content", contentTemp);

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
        window.location.replace("/earth/recover/viewBoard");
      })
      .catch((err) => console.log(err));
  }, [boardId, titleTemp, contentTemp, img]);

  return (
    <div className="recover-container">
      <div className="form-container">
        <div className="title">게시판 글 쓰기</div>

        <div className="editor">
          <input
            className="title-box"
            value={titleTemp}
            onChange={onChangeTitle}
          ></input>
          <textarea
            className="edit-box"
            value={contentTemp}
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
  );
};

export default RecoverEditForm;
