import React, { useEffect, useState } from "react";
import P5Wrapper from "react-p5-wrapper";
import particles from "../components/particles";
import { debounce } from "lodash";

const ResizeHome = () => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    heith: window.innerHeight,
  });

  const handleResize = debounce(() => {
    setWindowSize({
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
  }, 1000);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return (
    <>
      <P5Wrapper
        sketch={particles}
        style={{
          width: windowSize.width + "px",
          height: windowSize.height + "px",
        }}
      />
    </>
  );
};

export default ResizeHome;
