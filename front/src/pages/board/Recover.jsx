import React from "react";
import { Route } from "react-router";
import RecoverBoardList from "../../components/BoardList";
import RecoverContent from "../../components/BoardContent";
import RecoverForm from "../../components/BoardAddForm";
import RecoverEditForm from "../../components/BoardEditForm";
import { useEffect } from "react";
import { useState } from "react";

const Recover = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // 화면 resize
    window.addEventListener("resize", () => {
      resizeHeight();
    });

    return () => {};
  }, [height]);

  // 화면 resize 이벤트
  const resizeHeight = () => {
    setHeight(window.innerHeight);
  };

  return (
    <div className="recover" style={{ height: height }}>
      {/* 게시판 조회 */}
      <Route path="/earth/recover/viewboard" component={RecoverBoardList} />

      {/* 게시글 조회 */}
      <Route
        path="/earth/recover/readboard/:boardId"
        exact
        component={RecoverContent}
      />

      {/* 게시글 작성 */}
      <Route path="/earth/recover/form" component={RecoverForm} />

      {/* 게시글 수정 */}
      <Route
        path="/earth/recover/readboard/:boardId/edit"
        exact
        component={RecoverEditForm}
      />
    </div>
  );
};

export default Recover;
