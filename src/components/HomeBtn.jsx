import React, { useCallback } from "react";

const HomeBtn = () => {
  const onClickHome = useCallback(() => {
    window.location.replace("/");
  }, []);

  return (
    <div className="home-btn" onClick={onClickHome}>
      <span className="material-icons">home</span>
    </div>
  );
};

export default HomeBtn;
