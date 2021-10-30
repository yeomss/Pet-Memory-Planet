import React from "react";
// import circle from "../styles/images/SVG/myPlanetBtn.svg";
import "../../styles/MyPlanet.scss";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import { ReactComponent as PlanetBody } from "../../styles/images/planet/planet-body-extend.svg";

const MyPlanet = (state) => {
  const token = sessionStorage.getItem("userToken");
  const [isLoading, setIsLoading] = useState(false);
  const [list,setList] = useState([]);


  // 초기에 내 행성 리스트를 가져오는 함수
  // planetToken 값을 삭제한다.
  const getPlanetList = async() => {
    sessionStorage.removeItem("planetToken");
    const config = {
      params: {
        userToken: token,
      }
    };
    await axios.get(`http://52.78.18.110:8000/showplanetlist/`
    ,config)
    .then((res)=>{
      console.log(res);
      setList(res.data);
      console.log(list);

      setIsLoading(!isLoading);
    })
    .catch((err)=> {
      console.log(err);
      console.log(err.response);
    })
  };

  useEffect(()=> {
    getPlanetList();
    return setIsLoading(!isLoading);
  },[])

  return (
    <div className="myPlanetLIstContainer">
      {isLoading? (
        <>
          <div className="PageNameContainer">
            <span className="planetZoomPosition">My Planet List Page</span>
          </div>
          <div className="planetContainer">
            {list.map((li,index) => (
              <div className="planetBox">
                <Link className="planetLink" to={{
                  key:index,
                  pathname: `/MyPlanetZoom/${li.planetId}`
                  
                }}>
                  <PlanetBody className="planetImg" fill={li.color[0]} />
              </Link>
              <div className="planetNickname">{li.planetNickname}</div>
            </div>    
          ))
        }
      </div>
        </>
      ): (null)}

    </div>
  );
};

export default MyPlanet;
