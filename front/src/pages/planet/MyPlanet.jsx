import React from "react";
// import circle from "../styles/images/SVG/myPlanetBtn.svg";
import "../../styles/MyPlanet.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlanetListItem from "../../components/InsidePlanet/PlanetListItem";
import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles.js";

const MyPlanet = (state) => {
  const token = sessionStorage.getItem("userToken");
  const [isLoading, setIsLoading] = useState(false);
  const [list, setList] = useState([]);

  // 초기에 내 행성 리스트를 가져오는 함수
  // planetToken 값을 삭제한다.

  //행성 리스트를 서버로부터 요청하는 함수
  const getPlanetList = async () => {
    sessionStorage.removeItem("planetToken");
    const config = {
      params: {
        userToken: token,
      },
    };

    // 서버로부터 행성 리스트를 받아온다.
    await axios
      .get(`http://52.78.18.110:8000/showplanetlist/`, config)
      .then((res) => {
        console.log(res);

        // list 변수에 요청한 데이터를 저장한다.
        setList(res.data);
        setIsLoading(!isLoading);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  };

  // 컴포넌트가 만들어 지는 초기에 행성 데이터 리스트를 가져오는 함수를 수행한다.
  useEffect(() => {
    getPlanetList();
    return setIsLoading(!isLoading);
  }, []);

  // JSX 코드 부분
  return (
    <div className="myPlanetLIstContainer">
      {isLoading ? (
        <>
          <div className="PageNameContainer">
            <span className="planetZoomPosition">My Planet List Page</span>
          </div>
          <P5Wrapper sketch={particles} />
          <div className="planetContainer">
            {/* 받아온 행성 리스트를 PlanetListItem 컴포넌트에 하나씩 전달해서 화면에 출력한다. */}
            {/* 각 컴포넌트에 Link 를 연결해서 해당 행성으로 이동 할 수 있도록 한다. */}
            {list.map((li, index) => (
              <div className="planetBox">
                <Link
                  className="planetLink"
                  to={{
                    key: index,
                    pathname: `/MyPlanetZoom/${li.planetId}`,
                    state: {
                      color: li.color,
                    },
                  }}
                >
                  <PlanetListItem color={li.color} idx={index} />
                </Link>
                <div className="planetNickname">{li.planetNickname}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default MyPlanet;
