import { useRef, useEffect, useState } from "react";
import "../styles/global.scss";

const MenuBarContents = ({ isClicked }) => {
  useEffect(() => {
    const render = () => {
      console.log(isClicked);
    };

    render();
  }, []);
  return (
    <div
      className={isClicked ? "contents openContents" : "contents closeContents"}
    ></div>
  );
};

export default MenuBarContents;
