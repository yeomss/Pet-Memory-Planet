import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { setBoardId, viewBoardElement, viewBoardList } from "../actions/board";

const RecoverBoardList = () => {
  const dispatch = useDispatch();
  const boardList = useSelector((state) => state.board.boardList);

  // 게시판 리스트 가져오기
  const getBoardList = useCallback(() => {
    axios
      .get("http://52.78.18.110:8000/viewboard")
      .then((res) => {
        console.log("viewboard => ", res);
        dispatch(viewBoardList({ boardList: res }));
      })
      .catch((err) => console.log(err));
  }, []);

  // mount
  useEffect(() => {
    getBoardList();
  }, []);

  // 게시글 조회
  const getBoardElement = useCallback((e) => {
    let boardId = Number(e.target.id);

    dispatch(
      setBoardId({
        boardId: boardId,
      })
    );

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
  }, []);

  return (
    <div className="recover-container">
      <div className="title">Board</div>

      <div className="edit-area">
        <button>
          <Link to="form">WRITE</Link>
        </button>
      </div>

      <table className="list-area">
        <tbody>
          <tr className="head">
            <th className="index">id</th>
            <th className="list-title">제목</th>
            <th className="user">작성자</th>
            <th className="date">작성일자</th>
            <th className="visit">방문수</th>
          </tr>
          {boardList.map((v, idx) => (
            <tr key={idx}>
              <td>{v.boardId}</td>
              <Link to={`readboard/${v.boardId}`}>
                <td id={v.boardId} onClick={getBoardElement}>
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
  );
};

export default RecoverBoardList;
