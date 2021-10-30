import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { setBoardId, viewBoardElement, viewBoardList } from "../actions/board";
import HomeBtn from "./HomeBtn";

const RecoverBoardList = () => {
  const dispatch = useDispatch();
  const token = sessionStorage.getItem("userToken");
  const boardList = useSelector((state) => state.board.boardList);

  // 게시판 리스트 가져오기
  const getBoardList = useCallback(async () => {
    await axios
      .get("http://52.78.18.110:8000/viewboard")
      .then((res) => {
        dispatch(viewBoardList({ boardList: res }));
      })
      .catch((err) => console.log(err));
  }, []);

  // mount
  useEffect(() => {
    getBoardList();
  }, []);

  return (
    <>
      {boardList ? (
        <div className="recover-container">
          <div className="title">Board</div>
          <div className="edit-area">
            <button>
              <Link to="form">WRITE</Link>
            </button>
          </div>

          <table className="table table-hover table-striped text-center">
            <thead>
              <tr>
                <th class="text-center">id</th>
                <th class="text-center">제목</th>
                <th class="text-center">작성자</th>
                <th class="text-center">작성일자</th>
                <th class="text-center">방문수</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>하이루</th>
                <th class="list-title">하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              <tr>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
                <th>하이루</th>
              </tr>
              {boardList.map((v, idx) => (
                <tr key={idx}>
                  <td>{v.boardId}</td>
                  <Link to={`readboard/${v.boardId}`}>
                    <td class="list-title" id={v.boardId}>
                      {v.title}
                    </td>
                  </Link>
                  <td>{v.userNickname}</td>
                  <td>{v.date}</td>
                  <td>{v.counter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Loading />
      )}
      <HomeBtn />
    </>
  );
};

export default RecoverBoardList;
