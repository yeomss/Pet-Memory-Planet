import React from "react";
import { Route } from "react-router";
import RecoverBoardList from "../../components/RecoverBoardList";
import RecoverContent from "../../components/RecoverContent";
import RecoverForm from "../../components/RecoverForm";
import RecoverEditForm from "../../components/RecoverEditForm";

const Recover = () => {
  return (
    <div className="recover">
      <Route path="/earth/recover/viewboard" component={RecoverBoardList} />
      <Route
        path="/earth/recover/readboard/:boardId"
        exact
        component={RecoverContent}
      />
      <Route path="/earth/recover/form" component={RecoverForm} />
      <Route
        path="/earth/recover/readboard/:boardId/edit"
        exact
        component={RecoverEditForm}
      />
    </div>
  );
};

export default Recover;
