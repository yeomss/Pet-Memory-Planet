import React from "react";
import { Route } from "react-router";
import RecoverBoardList from "../../components/BoardList";
import RecoverContent from "../../components/BoardContent";
import RecoverForm from "../../components/BoardAddForm";
import RecoverEditForm from "../../components/BoardEditForm";

const Recover = () => {
  return (
    <div className="recover">
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
