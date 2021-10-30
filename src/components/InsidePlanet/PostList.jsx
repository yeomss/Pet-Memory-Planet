import "../../styles/MyPlanet.scss";
import { useRef, useEffect, useState } from "react";
import axios from "axios";

const PostList = ({ title, time, id, planetOwner }) => {
  const [isListClicked, setListClick] = useState(true);
  const PostListRef = useRef(null);
  const PostListTitleRef = useRef(null);
  const PostListTimeRef = useRef(null);

  // 행성 토큰
  const planetToken = sessionStorage.getItem("planetToken");

  const getPostData = async () => {
    const config1 = {
      params: {
        planetToken: planetToken,
      },
    };

    // 편지 목록 가져오기
    await axios
      .get(`http://52.78.18.110:8000/viewletterlist`, config1)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 삭제
  const onClickDeleteBtn = async () => {
    // console.log(isOwner);
    let classPostList = PostListRef.current;
    const config = {
      params: {
        letterId: id,
        planetToken: planetToken,
        planetOwner: planetOwner,
      },
    };

    console.log(config.params.planetOwner);
    await axios
      .delete(`http://52.78.18.110:8000/deleteletter`, config)
      .then((res) => {
        console.log(res);
        classPostList.remove();
        getPostData();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response.status);
        if (err.response.status === 401) {
          alert("삭제는 행성 주인만 할 수 있습니다.");
        }
      });
  };

  const onClickPostList = (e) => {
    let classPostList = PostListRef.current;
    let classPostListTime = PostListTimeRef.current;
    let PostListTitle = PostListTitleRef.current;
    setListClick(!isListClicked);

    if (isListClicked === true) {
      classPostList.style.height = 40 + "vh";
      classPostList.style.flexDirection = "column";

      classPostListTime.style.marginTop = 5 + "vh";
      classPostListTime.style.marginBottom = 5 + "vh";

      classPostList.style.cursor = "default";

      PostListTitle.style.marginLeft = 2 + "vh";
      PostListTitle.style.marginRightt = 2 + "vh";
    } else {
      classPostList.style.height = 10 + "vh";
      classPostList.style.flexDirection = "row";
      classPostList.style.padding = 0 + "vh";
      classPostListTime.style.margin = 0 + "vh";

      PostListTitle.style.marginLeft = 0 + "vh";
      PostListTitle.style.marginRightt = 0 + "vh";

      classPostList.style.cursor = "pointer";
    }
  };

  return (
    <div className="PostList" ref={PostListRef} onClick={onClickPostList}>
      {isListClicked ? (
        <div className="PostListTitle" ref={PostListTitleRef}>
          {title.slice(0, 10)}...
        </div>
      ) : (
        <div className="PostListTitle" ref={PostListTitleRef}>
          {title}
        </div>
      )}
      <div className="PostListTime" ref={PostListTimeRef}>
        {time.slice(0, 10)}
      </div>

      {isListClicked ? null : (
        <div className="PostDelteBtn" onClick={onClickDeleteBtn}>
          DELETE
        </div>
      )}
    </div>
  );
};

export default PostList;
