import "../../styles/MyPlanet.scss";
import { useRef } from "react";
import axios from "axios";
import X1 from "../../styles/images/SVG/X1.svg";

// 방명록 내용, 작성자, 작성일자, 인덱스, 주인여부에 대한 정보를
// 상위 컴포넌트(PlanetIside.jsx)로부터 반복문으로 받아온다
const GuestBookList = ({ content, userNickname, date, index, planetOwner }) => {
  // 행성 토큰
  const planetToken = sessionStorage.getItem("planetToken");

  const guestBookListRef = useRef(null);

  // 방명록 삭제
  const guestBookDelBtnClick = async () => {
    let classGuestBookList = guestBookListRef.current;
    console.log(typeof index);
    const config = {
      params: {
        planetToken: planetToken,
        index: index,
        planetOwner: planetOwner,
      },
    };
    await axios
      .delete(`http://52.78.18.110:8000/deleteguestbook`, config)
      .then((res) => {
        console.log(res);

        //삭제가 성공하면 배열에서 삭제 한다.(화면에서 사라짐)
        classGuestBookList.remove();
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
        if (err.response.status === 401) {
          alert("삭제는 본인만 할 수 있습니다.");
        }
      });
  };

  return (
    <div className="guestBookList" ref={guestBookListRef}>
      {/* 방명록 내용 영역 */}
      <div className="guestBookUserNickName">
        작성자 : {userNickname}
        {/* 삭제 버튼 */}
        <img
          className="guestBookDelBtn"
          onClick={guestBookDelBtnClick}
          src={X1}
        />
      </div>
      <div className="divider"></div>
      <div className="guestBookContent">{content}</div>
      <div className="guestBookDate">작성일자 : {date.slice(0, 10)}</div>
    </div>
  );
};

export default GuestBookList;
