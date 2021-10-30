import axios from "axios";
import React, { useCallback } from "react";

const MyDelete = () => {
  const onClickDeleteUser = useCallback(() => {
    let token = sessionStorage.getItem("userToken");
    console.log(token);
    axios
      .delete(`http://52.78.18.110:8000/deleteuserinfo?userToken=${token}`)
      .then((res) => {
        console.log(res);
        window.location.replace("/");
        sessionStorage.removeItem("userToken");
        sessionStorage.removeItem("planetToken");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="delete-container">
      <div className="delete-title">
        회원탈퇴
        <div className="delete-subtitle">회원 탈퇴를 하실 수 있습니다.</div>
      </div>
      <button onClick={onClickDeleteUser}>회원탈퇴</button>
    </div>
  );
};

export default MyDelete;
