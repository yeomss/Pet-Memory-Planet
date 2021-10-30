import { useRef, useEffect, useState } from "react";
import MenuBarContents from "./MenuBarContents";
import "../styles/global.scss";

const MenuBar = () => {
  const hambugerRef = useRef(null);
  const oneRef = useRef(null);
  const twoRef = useRef(null);
  const threeRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);

  let hamburger;
  let one;
  let two;
  let three;

  useEffect(() => {
    const init = () => {
      hamburger = hambugerRef.current;
      one = oneRef.current;
      two = twoRef.current;
      three = threeRef.current;
    };

    init();
  }, []);

  const clickHamburger = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="sideMenu" onClick={clickHamburger}>
      <div
        className={
          isClicked ? "hamburger openHamburger" : "hamburger closeHamburger"
        }
        ref={hambugerRef}
      >
        <div
          className={isClicked ? "one openOne" : "one closeOne"}
          ref={oneRef}
        />
        <div
          className={isClicked ? "two openTwo" : "two closeTwo"}
          ref={twoRef}
        />
        <div
          className={isClicked ? "three openThree" : "three closeThree"}
          ref={threeRef}
        />
      </div>
      <MenuBarContents isClicked={isClicked} />
    </div>
  );
};

export default MenuBar;
