import "../styles/MyPlanet.scss";
import {Link} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import axios from "axios"
import P5Wrapper from "react-p5-wrapper";
import particles from "../components/particles.js";

import { ReactComponent as PlanetBody } from "../styles/images/planet/planet-body-extend.svg";

import { useCallback } from "react";

const MyPlanetZoom = (state) => {
    // url 에 id 값 넘겨주고 이 값을 state.match.params.~ 로 받음.

    const myPlanetRef = useRef(null);
    const planetScript1 = useRef(null);

    const [planetData, setPlanetData] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const token = sessionStorage.getItem("userToken");

    let script1 = null;

    // 초기에 행성 스타일 변화 함수
    const myPlanetInit = (item) => {
        if(isLoading) {
            script1 = planetScript1.current;
    
            script1.style.opacity = 1;
    
            item.style.width = 40+"vw";
            item.style.opacity = 1;
        }
    };

    const getMyPlanetData = async() => {
        const config = {
            params: {
              userToken: token,
              planetId:state.match.params.planetId
            }
          };

        await axios.get(`http://52.78.18.110:8000/showplanet`,config)
        .then((res)=>{
            console.log('통신 성공')
            console.log(res);

            setPlanetData(res.data.planetOutside[0]);

            sessionStorage.setItem("planetToken",res.data.planetToken);

            setIsLoading(!isLoading);
        })
        .catch((err)=>{
            console.log(err);
        });
    };

    useEffect(()=> {
        // console.log(state.match.params.planetId);
        const myPlanet = myPlanetRef.current;
        getMyPlanetData();

        return setIsLoading(!isLoading);

    },[])

    const mouseOver = () => {
        const myPlanet = myPlanetRef.current;

        myPlanet.style.width = 42 + "vw";
        myPlanet.style.height = 42 + "vw";
    };

    const mouseOut = () => {
        const myPlanet = myPlanetRef.current;

        myPlanet.style.width = 40 + "vw";
        myPlanet.style.height = 40 + "vw";
    };

    return(    
        <div className="planetZoomContinaer">
            {isLoading? (
            <>
                <div className="PageNameContainer">
                <span className="planetZoomPosition">My Planet Page</span>
            </div>
            <P5Wrapper sketch={particles} />
            <div className="planetScriptContainer2">
                <div className="planetScript">
                    <div className="userNameBox">
                        <div className="userName">{planetData.userNickname} 님의 행성</div>
                    </div>
                    <div className="imageBox">
                        <img className="representPhoto" src={`http://52.78.18.110:8000/${planetData.representPhoto}`}/>
                    </div>
                    <div className="welcomeMsg">
                        <div className="planetValue">{planetData.planetIntro}</div>
                    </div>
                </div>
            </div>
            <div className="planetImgContainer">
                <Link to={
                    {
                        pathname:`/MyPlanetInside/${state.match.params.planetId}`
                    }
                }>
                    <div className="new-planet">
                        <PlanetBody className="myPlanetZoom" fill={planetData.color}  onMouseOver={mouseOver} onMouseOut={mouseOut} ref={myPlanetRef} /> 
                    </div>

                    {/*<img className="myPlanetZoom" onMouseOver={mouseOver} onMouseOut={mouseOut} ref={myPlanetRef} src={circle}/>*/}
                </Link>
                <div className="planetNickname">
                    {isLoading? planetData.planetNickname : "-"}

                </div>
            </div>

            {/* 변수 대신 opcatity 로 조절. */}
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
            ):(null)}
            
        </div>
    )
}

export default MyPlanetZoom;