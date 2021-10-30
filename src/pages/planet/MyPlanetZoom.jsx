import "../styles/MyPlanet.scss";

import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles.js";
import X from "../styles/images/SVG/X2white.svg";

import { ReactComponent as PlanetBody } from "../styles/images/planet/planet-body-extend.svg";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import PlanetEars from "../../components/PlanetEars";

import {
  setPlanetEarsIdx,
  setPlanetNoseIdx,
  setPlanetMouthIdx,
  setPlanetEarsColor,
  setPlanetNoseColor,
  setPlanetMouthColor,
} from "../../actions/planet";
import PlanetNose from "../../components/PlanetNose";
import PlanetMouth from "../../components/PlanetMouth";

const MyPlanetZoom = (state) => {
  // url 에 id 값 넘겨주고 이 값을 state.match.params.~ 로 받음.

  const myPlanetRef = useRef(null);
  const planetScript1 = useRef(null);

  const [planetData, setPlanetData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const token = sessionStorage.getItem("userToken");

  // 리덕스에 설정한 변수를 변경 하기 위한 dispatch 선언
  const dispatch = useDispatch();

  // 행성 색 초기화
  const setColorFunc = () => {
    let svg = document.getElementsByClassName("planet-body-shade");
    svg[0].setAttribute("stop-color", state.location.state.color[1]);
  };

  // 리덕스 부분
  // 귀 모양은 배열의 인덱스를 통해, 색상은 지정된 값으로 설정된다.

  // 행성 귀 설정
  const setPlanetEar = useCallback(
    async (idx, color) => {
      await dispatch(
        setPlanetEarsIdx({
          planetEarsIdx: idx,
        })
      );
      await dispatch(
        setPlanetEarsColor({
          planetEarsColor: color,
        })
      );
    },
    [isLoading]
  );

  // 행성 코 설정
  const setPlanetNose = useCallback(
    async (idx, color) => {
      await dispatch(
        setPlanetNoseIdx({
          planetNoseIdx: idx,
        })
      );

      dispatch(setPlanetNoseColor({ color }));
    },
    [isLoading]
  );

  // 행성 입 설정
  const setPlanetMouth = useCallback(
    async (idx, color) => {
      await dispatch(
        setPlanetMouthIdx({
          planetMouthIdx: idx,
        })
      );

      dispatch(setPlanetMouthColor({ color }));
    },
    [isLoading]
  );

  // 행성의 고유 아이디를 통해 선택한 행성의 정보를 받아오는 함수
  const getMyPlanetData = async () => {
    const config = {
      params: {
        userToken: token,
        planetId: state.match.params.planetId,
      },
    };

    // 서버로 부터 행성 아이디를 통해 행성 정보를 받아온다.
    await axios
      .get(`http://52.78.18.110:8000/showplanet`, config)
      .then((res) => {
        console.log(res);

        // 행성 정보를 planetData 에 stste 를 통해 설정한다.
        setPlanetData(res.data.planetOutside);

        // 발급받은 행성 토큰을 세션스토리지에 저장한다.
        sessionStorage.setItem("planetToken", res.data.planetToken);

        // 통신에 성공하면 귀, 코, 입 설정 함수에 값을 전달한다.
        setPlanetEar(
          res.data.planetOutside.ears[0],
          res.data.planetOutside.ears[1]
        );
        setPlanetNose(
          res.data.planetOutside.nose[0],
          res.data.planetOutside.nose[1]
        );
        setPlanetMouth(
          res.data.planetOutside.mouth[0],
          res.data.planetOutside.mouth[1]
        );
        setColorFunc();
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getMyPlanetData();

    return setIsLoading(!isLoading);
  }, []);

  // JSX 코드 부분
  return (
    <div className="planetZoomContinaer">
      {isLoading ? (
        <>
          {/* 상단에 현재 페이지를 나타내는 영역 */}
          <div className="PageNameContainer">
            <span className="planetZoomPosition">My Planet Page</span>
          </div>

          {/* 배경 */}
          <P5Wrapper sketch={particles} />

          {/* 사용자 이름, 사진, 환영 메세지를 보여줄 영역 */}
          <div className="planetScriptContainer2">
            <div className="planetScript">
              <div className="userNameBox">
                <div className="userName">
                  {planetData.userNickname} 님의 행성
                </div>
              </div>

              <div className="imageBox">
                {/* 이미지를 설정 하지 않은 경우 미리 설정된 이미지가 보여진다. */}
                <img
                  className="representPhoto"
                  src={
                    planetData.representPhoto === null
                      ? X
                      : `http://52.78.18.110:8000/${planetData.representPhoto}`
                  }
                />
              </div>
              <div className="welcomeMsg">
                <div className="planetWelcomeValue">
                  {planetData.planetIntro}
                </div>
              </div>
            </div>
          </div>

          {/* 사용자 행성이 보여질 영역 */}
          <div className="planetImgContainer">
            {/* 해당 행성 내부로 이동 할 수 있도록 Link를 연결 */}
            <Link
              to={{
                pathname: `/MyPlanetInside/${state.match.params.planetId}`,
              }}
            >
              <div className="new-planet">
                <PlanetEars className="planet-ears1111" />
                <PlanetNose className="planet-nose" />
                <PlanetMouth className="planet-mouth" />
                <PlanetBody
                  className="myPlanetZoom"
                  fill={state.location.state.color[0]}
                  ref={myPlanetRef}
                />
              </div>
            </Link>
            <div className="planetZoomNickname">
              {isLoading ? planetData.planetNickname : "-"}
            </div>
          </div>

          {/* 반려동물에 대한 정보를 보여줄 영역 */}
          <div className="planetScriptContainer1" ref={planetScript1}>
            <div className="planetScript">
              <div className="subTitleContainer">
                <div className="planetValue">반려동물 정보</div>
              </div>
              <div className="textBox">
                <div className="planetItem">이름</div>
                <div className="planetValue">{planetData.petName}</div>
              </div>
              <div className="textBox">
                <div className="planetItem">종</div>
                <div className="planetValue">{planetData.breed}</div>
              </div>
              <div className="textBox">
                <div className="planetItem">성별</div>
                <div className="planetValue">{planetData.gender}</div>
              </div>
              <div className="textBox">
                <div className="planetItem">좋아하는것</div>
                <div className="planetValue">{planetData.favorite}</div>
              </div>
              <div className="textBox">
                <div>{planetData.birthday}</div>
                <div>~</div>
                <div>{planetData.deathday}</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MyPlanetZoom;
