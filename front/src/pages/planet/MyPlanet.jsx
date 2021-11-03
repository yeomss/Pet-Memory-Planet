import React from "react";
// import circle from "../styles/images/SVG/myPlanetBtn.svg";
import "../../styles/MyPlanet.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PlanetListItem from "../../components/InsidePlanet/PlanetListItem";
import P5Wrapper from "react-p5-wrapper";
import particles from "../../components/particles.js";
import Loading from "../../components/Loading";
import HomeBtn from "../../components/HomeBtn";
import MenuBar from "../../components/MenuBar";

const MyPlanet = (state) => {
  const user = JSON.parse(localStorage.getItem("login"));
  const planet = JSON.parse(localStorage.getItem("planet"));
  const [isLoading, setIsLoading] = useState(true);
  const [list, setList] = useState([]);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    // 화면 resize
    window.addEventListener("resize", () => {
      resizeHeight();
    });

    return () => {};
  }, [height]);

  // 화면 resize 이벤트
  const resizeHeight = () => {
    setHeight(window.innerHeight);
  };

  // 초기에 내 행성 리스트를 가져오는 함수
  // planetToken 값을 삭제한다.

  // 컴포넌트가 만들어 지는 초기에 행성 데이터 리스트를 가져오는 함수를 수행한다.
  useEffect(() => {
    getPlanetList();
    // return setIsLoading(!isLoading);
  }, [isLoading]);

  //행성 리스트를 서버로부터 요청하는 함수
  const getPlanetList = async () => {
    setList(planet);

    /* 서버 코드
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
      });*/
  };

  // JSX 코드 부분
  return (
    <div className="myPlanetLIstContainer" style={{ height: height }}>
      {isLoading ? (
        <div>
          <div className="PageNameContainer">
            <span className="planetZoomPosition">My Planet List Page</span>
          </div>
          <P5Wrapper sketch={particles} />
          <div className="planetContainer" style={{ height: height }}>
            {list.map((li, index) => (
              <div className="planetBox" key={index}>
                <div className="id-box">
                  <div className="search-id">{li.name}</div>
                  <div className="down"></div>
                </div>
                <Link
                  className="planetLink"
                  to={{
                    key: index,
                    pathname: `/MyPlanetZoom/${li.id}`,
                    state: {
                      color: li.color,
                    },
                  }}
                >
                  <PlanetListItem color={li.color} idx={index} />
                </Link>
                {/* <div className="planetNickname">{li.name}</div> */}
              </div>
            ))}
          </div>
          <MenuBar />

          <HomeBtn />
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default MyPlanet;
