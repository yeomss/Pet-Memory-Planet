import { ReactComponent as PlanetBody } from "../../styles/images/planet/planet-body-extend.svg";
import { useEffect } from "react";
import "../../styles/MyPlanet.scss";

// 상위 컴포넌트로부터 color, idx 값을 전달 받는다.
const PlanetListItem = ({ color, idx }) => {
  //행성의 색상을 설정하는 함수
  const init = () => {
    let svg = document.getElementsByClassName("planet-body-shade");

    svg[idx].setAttribute("stop-color", color[1]);
  };

  // 컴포넌트가 생성되면서 수행될 함수 : init()
  useEffect(() => {
    init();
  });
  // JSX 코드 부분

  //상위 컴포넌트로부터 받은 color배열을 이용해서 색상을 설정한다
  return <PlanetBody className="planetImg" fill={color[0]} />;
};

export default PlanetListItem;
