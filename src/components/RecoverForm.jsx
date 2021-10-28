import axios from "axios";
import React, { useCallback, useState } from "react";
import { addPost } from "../actions/board";
import useInput from "../hooks/useInput";

const RecoverForm = () => {
  const [title, onChangeTitle] = useInput("");
  const [content, onChangeContent] = useInput("");
  const [img, setImg] = useState("");
  const [imgName, setImgName] = useState("");

  // onChange 이벤트
  const onChangeImg = useCallback((e) => {
    setImg(e.target.files);
    setImgName(e.target.value);
    console.log("파일: ", e.target.files);

    console.log(typeof img);
  }, []);

  // onClick 이벤트
  const onClickAddPost = useCallback(() => {
    let token = sessionStorage.getItem("userToken");

    let formData = new FormData();
    formData.append("userToken", token);
    formData.append("title", title);
    formData.append("content", content);
    // formData.append("image", img[0]);

    for (let i = 0; i < img.length; i++) {
      formData.append("image", img[i]);
    }

    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };

    axios
      .post("http://52.78.18.110:8000/createboard", formData, config)
      .then((res) => {
        console.log(res);
        window.location.replace("/earth/recover/viewBoard");
      })
      .catch((err) => console.log(err));
  }, [title, content, img]);

  return (
    <div className="recover-container">
      <div className="form-container">
        <div className="title">게시판 글 쓰기</div>

        <div className="editor">
          <input
            className="title-box"
            vlaue={title}
            onChange={onChangeTitle}
          ></input>
          <textarea
            className="edit-box"
            vlaue={content}
            onChange={onChangeContent}
          ></textarea>
          <input
            type="file"
            value={imgName}
            onChange={onChangeImg}
            files
            multiple
          />
        </div>

        <button className="post-button" onClick={onClickAddPost}>
          글 작성
        </button>
      </div>
    </div>
  );
};

export default RecoverForm;
