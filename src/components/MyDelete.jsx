import axios from "axios";
import React, { useCallback } from "react";

const MyDelete = () => {
  const onClickDeleteUser = useCallback(() => {
    let token = sessionStorage.getItem("token");
    console.log(token);
    axios
      .delete(`http://52.78.18.110:8000/deleteuserinfo?userToken=${token}`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="delete-container">
      회원탈퇴
      <button onClick={onClickDeleteUser}>회원탈퇴</button>
    </div>
  );
};

export default MyDelete;
